import { z } from 'zod';

export enum TransactionStatus {
  Pending = 'PENDING',
  Success = 'SUCCESS',
}

export type TransactionSchema = z.infer<typeof transactionSchema>;

const transactionSchema = z.object({
  id: z.string(),
  amount: z.number(),
  unique_code: z.number(),
  status: z.enum([TransactionStatus.Success, TransactionStatus.Pending]),
  sender_bank: z.string(),
  account_number: z.string(),
  beneficiary_name: z.string(),
  beneficiary_bank: z.string(),
  remark: z.string(),
  created_at: z.string(),
  completed_at: z.string(),
  fee: z.number(),
});

export const transactionsSchema = z.record(z.string(), transactionSchema);
