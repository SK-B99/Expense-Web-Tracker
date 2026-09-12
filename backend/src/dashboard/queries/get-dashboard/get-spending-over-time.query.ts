
export class GetSpendingOverTimeQuery {
  constructor(
    public readonly userId: number,
    public readonly days: number = 30,
  ) {}
}