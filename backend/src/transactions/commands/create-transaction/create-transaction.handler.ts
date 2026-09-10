import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTransactionCommand } from './create-transaction.command';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler
  implements ICommandHandler<CreateTransactionCommand>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateTransactionCommand) {
    const {
      userId,
      type,
      amount,
      category,
      description,
      date,
    } = command;

    return this.prisma.transaction.create({
      data: {
        userId,
        type,
        amount,
        category,
        description,
        date,
      },
    });
  }
}