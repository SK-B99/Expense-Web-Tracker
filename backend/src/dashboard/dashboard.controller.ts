import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { QueryBus } from '@nestjs/cqrs';

import { GetDashboardQuery } from './queries/get-dashboard/get-dashboard.query';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getDashboard(
    @Req() req: Request & { user: { id: number } },
  ) {
    return this.queryBus.execute(
      new GetDashboardQuery(req.user.id),
    );
  }
}