import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { QueryBus } from '@nestjs/cqrs';

import { GetDashboardQuery } from './queries/get-dashboard/get-dashboard.query';

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