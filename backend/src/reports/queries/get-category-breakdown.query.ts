export class GetCategoryBreakdownQuery {
  constructor(
    public readonly userId: number,
    public readonly startDate: Date,
    public readonly endDate: Date,
  ) {}
}