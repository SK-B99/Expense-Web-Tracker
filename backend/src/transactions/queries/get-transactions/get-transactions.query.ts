// get-transactions.query.ts
export class GetTransactionsQuery {
  constructor(
    public readonly userId: number,
    public readonly startDate: Date,
    public readonly endDate: Date,
  ) {}
}