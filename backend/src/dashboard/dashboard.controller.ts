import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetDashboardQuery } from './queries/get-dashboard/get-dashboard.query';
import { GetSpendingOverTimeQuery } from './queries/get-dashboard/get-spending-over-time.query';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, RequestUser } from '../auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getDashboard(
    @CurrentUser() user: RequestUser,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.queryBus.execute(
      new GetDashboardQuery(
        user.id,
        new Date(startDate),
        new Date(endDate),
      ),
    );
  }

  @Get('spending-over-time')
  async getSpendingOverTime(
    @CurrentUser() user: RequestUser,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.queryBus.execute(
      new GetSpendingOverTimeQuery(
        user.id,
        new Date(startDate),
        new Date(endDate),
      ),
    );
  }
}