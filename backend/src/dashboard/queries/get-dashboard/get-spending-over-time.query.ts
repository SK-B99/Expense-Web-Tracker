// get-spending-over-time.query.ts
export class GetSpendingOverTimeQuery {
  constructor(
    public readonly userId: number,
    public readonly startDate: Date,
    public readonly endDate: Date,
  ) {}
}