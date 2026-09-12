// src/reports/reports.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaModule } from '../../prisma/prisma.module'; 

import { ReportsController } from './reports.controller'; 
import { GetCategoryBreakdownHandler } from './get-category-breakdown.handler'; 
import { GetMonthlySummaryHandler } from './get-monthly-summary.handler'; 
@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [ReportsController],
  providers: [GetCategoryBreakdownHandler, GetMonthlySummaryHandler],
})
export class ReportsModule {}