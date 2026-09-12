import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateTransactionDto } from './commands/create-transaction/create-transaction.dto';
import { CreateTransactionCommand } from './commands/create-transaction/create-transaction.command';
import { GetTransactionsQuery } from './queries/get-transactions/get-transactions.query';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, RequestUser } from '../auth/decorators/current-user.decorator';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async findAll(
    @CurrentUser() user: RequestUser,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.queryBus.execute(
      new GetTransactionsQuery(
        user.id,
        new Date(startDate),
        new Date(endDate),
      ),
    );
  }

  @Post()
  async create(
    @CurrentUser() user: RequestUser,
    @Body() dto: CreateTransactionDto,
  ) {
    return this.commandBus.execute(
      new CreateTransactionCommand(
        user.id,
        dto.type,
        dto.amount,
        dto.category,
        dto.description,
        new Date(dto.date),
      ),
    );
  }
}