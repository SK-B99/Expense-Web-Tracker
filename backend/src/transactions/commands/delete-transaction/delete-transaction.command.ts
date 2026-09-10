export class DeleteTransactionCommand {
  constructor(
    public readonly userId: number,
    public readonly transactionId: number,
  ) {}
}