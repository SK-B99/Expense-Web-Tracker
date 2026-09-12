import {
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Request, Response } from 'express';

import { RegisterDto } from './commands/register/register.dto';
import { RegisterCommand } from './commands/register/register.command';

import { LoginDto } from './commands/login/login.dto';
import { LoginCommand } from './commands/login/login.command';

import { RefreshCommand } from './commands/refresh/refresh.command';
import { LogoutCommand } from './commands/logout/logout.command';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
  ) {
    return this.commandBus.execute(
      new RegisterCommand(
        dto.name,
        dto.email,
        dto.password,
      ),
    );
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.commandBus.execute(
      new LoginCommand(
        dto.email,
        dto.password,
      ),
    );

    res.cookie(
      'refresh_token',
      result.refreshToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:
          process.env.NODE_ENV === 'production'
            ? 'none'
            : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/auth',
      },
    );

    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken =
      req.cookies?.refresh_token;

    if (!refreshToken) {
      return {
        message: 'Refresh token missing',
      };
    }

    const result =
      await this.commandBus.execute(
        new RefreshCommand(refreshToken),
      );

    res.cookie(
      'refresh_token',
      result.refreshToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:
          process.env.NODE_ENV === 'production'
            ? 'none'
            : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/auth',
      },
    );

    return {
      accessToken: result.accessToken,
    };
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken =
      req.cookies?.refresh_token;

    if (refreshToken) {
      await this.commandBus.execute(
        new LogoutCommand(refreshToken),
      );
    }

    res.clearCookie(
      'refresh_token',
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:
          process.env.NODE_ENV === 'production'
            ? 'none'
            : 'lax',
        path: '/auth',
      },
    );

    return {
      message: 'Logged out successfully',
    };
  }
}