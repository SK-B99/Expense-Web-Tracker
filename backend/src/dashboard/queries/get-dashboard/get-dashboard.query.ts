// get-dashboard.query.ts
export class GetDashboardQuery {
  constructor(
    public readonly userId: number,
    public readonly startDate: Date,
    public readonly endDate: Date,
  ) {}
}