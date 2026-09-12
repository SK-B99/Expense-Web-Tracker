import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../../prisma/prisma.service';
import { LogoutCommand } from './logout.command';

interface RefreshPayload {
  sub: number;
  jti: string;
  type: 'refresh';
}

@CommandHandler(LogoutCommand)
export class LogoutHandler
  implements ICommandHandler<LogoutCommand>
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LogoutCommand) {
    const { refreshToken } = command;

    try {
      const payload =
        await this.jwtService.verifyAsync<RefreshPayload>(
          refreshToken,
          {
            secret: process.env.JWT_REFRESH_SECRET,
          },
        );

      if (
        payload.type !== 'refresh' ||
        !payload.sub
      ) {
        return;
      }

      const refreshTokens =
        await this.prisma.refreshToken.findMany({
          where: {
            userId: payload.sub,
          },
        });

      for (const token of refreshTokens) {
        const matches = await bcrypt.compare(
          refreshToken,
          token.tokenHash,
        );

        if (matches) {
          await this.prisma.refreshToken.delete({
            where: {
              id: token.id,
            },
          });

          break;
        }
      }
    } catch {
    }

    return {
      message: 'Logged out successfully',
    };
  }
}