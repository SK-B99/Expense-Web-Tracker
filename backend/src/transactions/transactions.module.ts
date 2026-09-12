import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TransactionsController } from './transactions.controller';

import { CreateTransactionHandler } from './commands/create-transaction/create-transaction.handler';
import { UpdateTransactionHandler } from './commands/update-transaction/update-transaction.handler';
import { DeleteTransactionHandler } from './commands/delete-transaction/delete-transaction.handler';

import { GetTransactionsHandler } from './queries/get-transactions/get-transactions.handler';
import { GetTransactionHandler } from './queries/get-transaction/get-transaction.handler';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [CqrsModule,AuthModule],
  controllers: [TransactionsController],
  providers: [
    CreateTransactionHandler,
    UpdateTransactionHandler,
    DeleteTransactionHandler,
    GetTransactionsHandler,
    GetTransactionHandler,
  ],
})
export class TransactionsModule {}