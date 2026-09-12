
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PrismaService } from '../../../prisma/prisma.service';
import { GetTransactionsQuery } from './get-transactions.query';

@QueryHandler(GetTransactionsQuery)
export class GetTransactionsHandler
  implements IQueryHandler<GetTransactionsQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetTransactionsQuery) {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId: query.userId },
      orderBy: { date: 'desc' },
    });

    return transactions.map((t) => ({
      id: t.id,
      type: t.type,
      amount: Number(t.amount),
      category: t.category,
      description: t.description,
      date: t.date.toISOString(),
    }));
  }
}