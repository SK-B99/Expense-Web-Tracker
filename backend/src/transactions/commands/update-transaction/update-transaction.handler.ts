import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateTransactionCommand } from './update-transaction.command';

@CommandHandler(UpdateTransactionCommand)
export class UpdateTransactionHandler
  implements ICommandHandler<UpdateTransactionCommand>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: UpdateTransactionCommand) {
    const {
      userId,
      transactionId,
      type,
      amount,
      category,
      description,
      date,
    } = command;

    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return this.prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        type,
        amount,
        category,
        description,
        date,
      },
    });
  }
}