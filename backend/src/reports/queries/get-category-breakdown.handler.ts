
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma/prisma.service'; 
import { GetCategoryBreakdownQuery } from './get-category-breakdown.query';

interface CategoryRow {
  category: string | null;
  total: string;
}

@QueryHandler(GetCategoryBreakdownQuery)
export class GetCategoryBreakdownHandler
  implements IQueryHandler<GetCategoryBreakdownQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetCategoryBreakdownQuery) {
    const { userId, startDate, endDate } = query;

    const rows = await this.prisma.$queryRaw<CategoryRow[]>`
      SELECT
        COALESCE("category", 'Uncategorized') AS category,
        SUM("amount") AS total
      FROM "transactions"
      WHERE "userId" = ${userId}
        AND "type" = 'EXPENSE'
        AND "date" >= ${startDate}
        AND "date" <= ${endDate}
      GROUP BY COALESCE("category", 'Uncategorized')
      ORDER BY total DESC
    `;

    const totalSpent = rows.reduce(
      (sum, row) => sum + Number(row.total),
      0,
    );

    return rows.map((row) => ({
      category: row.category,
      amount: Number(row.total),
      percentage:
        totalSpent > 0
          ? Math.round((Number(row.total) / totalSpent) * 1000) / 10
          : 0,
    }));
  }
}