import { TransactionType } from '@prisma/client';

export class UpdateTransactionCommand {
  constructor(
    public readonly userId: number,
    public readonly transactionId: number,
    public readonly type: TransactionType,
    public readonly amount: number,
    public readonly category: string | undefined,
    public readonly description: string | undefined,
    public readonly date: Date,
  ) {}
}