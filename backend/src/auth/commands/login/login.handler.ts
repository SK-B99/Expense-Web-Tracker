import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

import { PrismaService } from '../../../prisma/prisma.service';
import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginHandler
  implements ICommandHandler<LoginCommand>
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginCommand) {
    const {
      email,
      password,
    } = command;

    const normalizedEmail =
      email.trim().toLowerCase();

    const user =
      await this.prisma.user.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    const passwordMatches =
      await bcrypt.compare(
        password,
        user.passwordHash,
      );

    if (!passwordMatches) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

   
    const accessToken =
      await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
          type: 'access',
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '15m',
        },
      );

    const jti = randomUUID();

    const refreshToken =
      await this.jwtService.signAsync(
        {
          sub: user.id,
          jti,
          type: 'refresh',
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      );

    
    const tokenHash =
      await bcrypt.hash(
        refreshToken,
        12,
      );

    const expiresAt = new Date();

    expiresAt.setDate(
      expiresAt.getDate() + 7,
    );

    await this.prisma.refreshToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}