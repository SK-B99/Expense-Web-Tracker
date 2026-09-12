import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Request } from 'express';

import { CreateTransactionDto } from './commands/create-transaction/create-transaction.dto';
import { CreateTransactionCommand } from './commands/create-transaction/create-transaction.command';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async create(
    @Req() req: Request & { user: { id: number } },
    @Body() dto: CreateTransactionDto,
  ) {
    return this.commandBus.execute(
      new CreateTransactionCommand(
        req.user.id,
        dto.type,
        dto.amount,
        dto.category,
        dto.description,
        new Date(dto.date),
      ),
    );
  }
}