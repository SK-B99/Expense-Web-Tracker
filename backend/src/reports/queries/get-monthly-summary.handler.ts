
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma/prisma.service'; 
import { GetMonthlySummaryQuery } from './get-monthly-summary.query';

interface MonthlyRow {
  month: Date;
  income: string;
  expenses: string;
}

@QueryHandler(GetMonthlySummaryQuery)
export class GetMonthlySummaryHandler
  implements IQueryHandler<GetMonthlySummaryQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetMonthlySummaryQuery) {
    const { userId, months } = query;

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - (months - 1));
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    const rows = await this.prisma.$queryRaw<MonthlyRow[]>`
      SELECT
        date_trunc('month', "date") AS month,
        COALESCE(SUM("amount") FILTER (WHERE "type" = 'INCOME'), 0) AS income,
        COALESCE(SUM("amount") FILTER (WHERE "type" = 'EXPENSE'), 0) AS expenses
      FROM "transactions"
      WHERE "userId" = ${userId}
        AND "date" >= ${startDate}
      GROUP BY month
      ORDER BY month ASC
    `;

    return rows.map((row) => ({
      month: row.month.toISOString().slice(0, 7), // "2026-09"
      income: Number(row.income),
      expenses: Number(row.expenses),
      net: Number(row.income) - Number(row.expenses),
    }));
  }
}