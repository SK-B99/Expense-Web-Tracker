
export class GetMonthlySummaryQuery {
  constructor(
    public readonly userId: number,
    public readonly months: number = 6,
  ) {}
}