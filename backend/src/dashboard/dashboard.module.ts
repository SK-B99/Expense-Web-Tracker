import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DashboardController } from './dashboard.controller.js';
import { GetDashboardHandler } from './queries/get-dashboard/get-dashboard.handler.js';

@Module({
  imports: [CqrsModule],
  controllers: [DashboardController],
  providers: [
    GetDashboardHandler,
  ],
})
export class DashboardModule {}