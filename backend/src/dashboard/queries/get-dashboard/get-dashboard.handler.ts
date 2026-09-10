import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma/prisma.service.js'; 
import { GetDashboardQuery } from './get-dashboard.query.js'; 
@QueryHandler(GetDashboardQuery)
export class GetDashboardHandler
  implements IQueryHandler<GetDashboardQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetDashboardQuery) {
    const userId = query.userId;

    const [income, expenses, recentTransactions] =
      await Promise.all([
        this.prisma.transaction.aggregate({
          where: {
            userId,
            type: 'INCOME',
          },
          _sum: {
            amount: true,
          },
        }),

        this.prisma.transaction.aggregate({
          where: {
            userId,
            type: 'EXPENSE',
          },
          _sum: {
            amount: true,
          },
        }),

        this.prisma.transaction.findMany({
          where: {
            userId,
          },
          orderBy: {
            date: 'desc',
          },
          take: 5,
        }),
      ]);

    const totalIncome = Number(income._sum.amount ?? 0);

    const totalExpenses = Number(expenses._sum.amount ?? 0);

    const balance = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      balance,
      recentTransactions,
    };
  }
}