import {
  transactionRepository,
  CreateTransactionDTO,
  TransactionType,
} from '../repositories/transaction.repository';
import { fundRepository } from '../repositories/fund.repository';
import { AppError } from '../middlewares/error.middleware';
import { prisma } from '../lib/prisma';

export const transactionService = {
  getAll: () => transactionRepository.findAll(),

  getByFund: (fundId: string) => transactionRepository.findByFundId(fundId),

  getWalletSummary: async () => {
    const balance = await transactionRepository.getWalletBalance();
    const totalTransactions = await prisma.transaction.count();
    return { balance, totalTransactions };
  },

  create: async (data: {
    fundId: string;
    type: string;
    value: number;
    date: string;
  }) => {
    const fund = await fundRepository.findById(data.fundId);
    if (!fund) throw new AppError('Fund not found', 404);

    if (!['APORTE', 'RESGATE'].includes(data.type)) {
      throw new AppError('Invalid transaction type');
    }
    if (data.type === 'RESGATE') {
      const currentBalance = await transactionRepository.getWalletBalance();
      if (data.value > currentBalance) {
        throw new AppError(
          `Saldo insuficiente. Saldo atual: R$ ${currentBalance.toFixed(2)}`,
          400,
        );
      }
    }

    const quotas = data.value / fund.quotaValue;

    const dto: CreateTransactionDTO = {
      fundId: data.fundId,
      type: data.type as TransactionType,
      value: data.value,
      quotas,
      date: new Date(data.date + 'T12:00:00-03:00'),
    };

    return transactionRepository.create(dto);
  },

  delete: async (id: string) => transactionRepository.delete(id),
};