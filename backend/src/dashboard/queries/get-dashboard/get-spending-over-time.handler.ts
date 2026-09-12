// get-spending-over-time.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { GetSpendingOverTimeQuery } from './get-spending-over-time.query.js';

interface DailyRow {
  day: Date;
  income: string;
  expenses: string;
}

@QueryHandler(GetSpendingOverTimeQuery)
export class GetSpendingOverTimeHandler
  implements IQueryHandler<GetSpendingOverTimeQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetSpendingOverTimeQuery) {
    const { userId, startDate, endDate } = query;

    const rows = await this.prisma.$queryRaw<DailyRow[]>`
      SELECT
        date_trunc('day', "date") AS day,
        COALESCE(SUM("amount") FILTER (WHERE "type" = 'INCOME'), 0) AS income,
        COALESCE(SUM("amount") FILTER (WHERE "type" = 'EXPENSE'), 0) AS expenses
      FROM "transactions"
      WHERE "userId" = ${userId}
        AND "date" >= ${startDate}
        AND "date" <= ${endDate}
      GROUP BY day
      ORDER BY day ASC
    `;

    return rows.map((row) => ({
      date: row.day.toISOString().split('T')[0],
      income: Number(row.income),
      expenses: Number(row.expenses),
    }));
  }
}