import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { QueryBus } from '@nestjs/cqrs';

import { GetDashboardQuery } from './queries/get-dashboard/get-dashboard.query';
import { GetSpendingOverTimeQuery } from './queries/get-dashboard/get-spending-over-time.query'; 

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

  @Get('spending-over-time')
  async getSpendingOverTime(
    @Req() req: Request & { user: { id: number } },
    @Query('days') days?: string,
  ) {
    return this.queryBus.execute(
      new GetSpendingOverTimeQuery(
        req.user.id,
        days ? parseInt(days, 10) : 30,
      ),
    );
  }
}