// src/reports/reports.controller.ts
import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'; 
import { CurrentUser, RequestUser } from '../../auth/decorators/current-user.decorator';

import { GetCategoryBreakdownQuery } from './get-category-breakdown.query'; 
import { GetMonthlySummaryQuery } from './get-monthly-summary.query'; 
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('category-breakdown')
  async getCategoryBreakdown(
    @CurrentUser() user: RequestUser,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    // Default to the current calendar month if no range is given.
    const now = new Date();

    const resolvedStart = startDate
      ? new Date(startDate)
      : new Date(now.getFullYear(), now.getMonth(), 1);

    const resolvedEnd = endDate
      ? new Date(endDate)
      : new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    if (isNaN(resolvedStart.getTime()) || isNaN(resolvedEnd.getTime())) {
      throw new Error('Invalid startDate or endDate');
    }

    return this.queryBus.execute(
      new GetCategoryBreakdownQuery(user.id, resolvedStart, resolvedEnd),
    );
  }

  @Get('monthly-summary')
  async getMonthlySummary(
    @CurrentUser() user: RequestUser,
    @Query('months', new DefaultValuePipe(6), ParseIntPipe) months: number,
  ) {
    return this.queryBus.execute(
      new GetMonthlySummaryQuery(user.id, months),
    );
  }
}