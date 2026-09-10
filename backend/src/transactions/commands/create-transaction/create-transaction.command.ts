import { TransactionType } from '@prisma/client';

export class CreateTransactionCommand {
  constructor(
    public readonly userId: number,
    public readonly type: TransactionType,
    public readonly amount: number,
    public readonly category: string | undefined,
    public readonly description: string | undefined,
    public readonly date: Date,
  ) {}
}