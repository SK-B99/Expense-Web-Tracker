import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaModule } from '../prisma/prisma.module';

import { AuthController } from './auth.controller';

import { RegisterHandler } from './commands/register/register.handler';
import { LoginHandler } from './commands/login/login.handler';
import { RefreshHandler } from './commands/refresh/refresh.handler';
import { LogoutHandler } from './commands/logout/logout.handler';

import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule,
    CqrsModule,

    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    PrismaModule,

    JwtModule.register({}),
  ],

  controllers: [
    AuthController,
  ],

  providers: [
    RegisterHandler,
    LoginHandler,
    RefreshHandler,
    LogoutHandler,
    JwtStrategy,
    JwtAuthGuard,
  ],

  exports: [
    JwtModule,
    PassportModule,
    JwtAuthGuard,
  ],
})
export class AuthModule {}
