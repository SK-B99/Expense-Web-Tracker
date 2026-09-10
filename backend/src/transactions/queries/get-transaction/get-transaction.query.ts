export class GetTransactionQuery {
  constructor(
    public readonly userId: number,
    public readonly transactionId: number,
  ) {}
}