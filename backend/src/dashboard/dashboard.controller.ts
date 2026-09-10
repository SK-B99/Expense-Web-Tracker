import { Controller, Get, Req } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetDashboardQuery } from './queries/get-dashboard/get-dashboard.query.js'; 

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getDashboard(@Req() req) {
    return this.queryBus.execute(
      new GetDashboardQuery(req.user.id),
    );
  }
}