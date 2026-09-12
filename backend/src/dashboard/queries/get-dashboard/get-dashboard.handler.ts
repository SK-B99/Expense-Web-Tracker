
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { GetDashboardQuery } from './get-dashboard.query.js';

@QueryHandler(GetDashboardQuery)
export class GetDashboardHandler
  implements IQueryHandler<GetDashboardQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetDashboardQuery) {
    const { userId, startDate, endDate } = query;

    const [
      allTimeIncome,
      allTimeExpenses,
      periodIncome,
      periodExpenses,
      recentTransactions,
    ] = await Promise.all([
      
      this.prisma.transaction.aggregate({
        where: { userId, type: 'INCOME' },
        _sum: { amount: true },
      }),

      this.prisma.transaction.aggregate({
        where: { userId, type: 'EXPENSE' },
        _sum: { amount: true },
      }),

      
      this.prisma.transaction.aggregate({
        where: {
          userId,
          type: 'INCOME',
          date: { gte: startDate, lte: endDate },
        },
        _sum: { amount: true },
      }),

      this.prisma.transaction.aggregate({
        where: {
          userId,
          type: 'EXPENSE',
          date: { gte: startDate, lte: endDate },
        },
        _sum: { amount: true },
      }),

      
      this.prisma.transaction.findMany({
        where: {
          userId,
          date: { gte: startDate, lte: endDate },
        },
        orderBy: { date: 'desc' },
        take: 5,
      }),
    ]);

    const balance =
      Number(allTimeIncome._sum.amount ?? 0) -
      Number(allTimeExpenses._sum.amount ?? 0);

    const totalIncome = Number(periodIncome._sum.amount ?? 0);
    const totalExpenses = Number(periodExpenses._sum.amount ?? 0);

    return {
      balance,
      totalIncome,
      totalExpenses,
      recentTransactions,
    };
  }
}