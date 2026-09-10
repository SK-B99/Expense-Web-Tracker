import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { DeleteTransactionCommand } from './delete-transaction.command';

@CommandHandler(DeleteTransactionCommand)
export class DeleteTransactionHandler
  implements ICommandHandler<DeleteTransactionCommand>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: DeleteTransactionCommand) {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id: command.transactionId,
        userId: command.userId,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    await this.prisma.transaction.delete({
      where: {
        id: command.transactionId,
      },
    });

    return {
      message: 'Transaction deleted successfully',
    };
  }
}