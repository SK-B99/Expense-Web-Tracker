import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

import { PrismaService } from '../../../prisma/prisma.service';
import { RefreshCommand } from './refresh.command';

interface RefreshPayload {
  sub: number;
  jti: string;
  type: 'refresh';
}

@CommandHandler(RefreshCommand)
export class RefreshHandler
  implements ICommandHandler<RefreshCommand>
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: RefreshCommand) {
    const { refreshToken } = command;

    let payload: RefreshPayload;

    try {
      payload =
        await this.jwtService.verifyAsync<RefreshPayload>(
          refreshToken,
          {
            secret: process.env.JWT_REFRESH_SECRET!,
          },
        );
    } catch {
      throw new UnauthorizedException(
        'Invalid or expired refresh token',
      );
    }

    if (
      payload.type !== 'refresh' ||
      !payload.sub ||
      !payload.jti
    ) {
      throw new UnauthorizedException(
        'Invalid refresh token',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'User not found',
      );
    }

    const refreshTokens =
      await this.prisma.refreshToken.findMany({
        where: {
          userId: user.id,
          expiresAt: {
            gt: new Date(),
          },
        },
      });

    let storedToken:
      | (typeof refreshTokens)[number]
      | undefined;

    for (const token of refreshTokens) {
      const matches = await bcrypt.compare(
        refreshToken,
        token.tokenHash,
      );

      if (matches) {
        storedToken = token;
        break;
      }
    }

    if (!storedToken) {
      throw new UnauthorizedException(
        'Refresh token has been revoked',
      );
    }

    await this.prisma.refreshToken.delete({
      where: {
        id: storedToken.id,
      },
    });

   
    const accessToken =
      await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          type: 'access',
        },
        {
          secret: process.env.JWT_ACCESS_SECRET!,
          expiresIn: '15m',
        },
      );

   
    const newJti = randomUUID();

    const newRefreshToken =
      await this.jwtService.signAsync(
        {
          sub: user.id,
          jti: newJti,
          type: 'refresh',
        },
        {
          secret: process.env.JWT_REFRESH_SECRET!,
          expiresIn: '7d',
        },
      );

    
    const newTokenHash = await bcrypt.hash(
      newRefreshToken,
      12,
    );

    const expiresAt = new Date();

    expiresAt.setDate(
      expiresAt.getDate() + 7,
    );

    await this.prisma.refreshToken.create({
      data: {
        tokenHash: newTokenHash,
        userId: user.id,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}