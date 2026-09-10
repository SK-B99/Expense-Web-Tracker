import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma/prisma.service';
import { GetTransactionsQuery } from './get-transactions.query';

@QueryHandler(GetTransactionsQuery)
export class GetTransactionsHandler
  implements IQueryHandler<GetTransactionsQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetTransactionsQuery) {
    return this.prisma.transaction.findMany({
      where: {
        userId: query.userId,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
}