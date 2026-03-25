import { prisma } from '../lib/prisma';

export type TransactionType = 'APORTE' | 'RESGATE';

export interface CreateTransactionDTO {
  fundId: string;
  type: TransactionType;
  value: number;
  quotas: number;
  date: Date;
}

export const transactionRepository = {
  findAll: () =>
    prisma.transaction.findMany({
      orderBy: { date: 'desc' },
      include: { fund: { select: { name: true, ticker: true } } },
    }),

  findByFundId: (fundId: string) =>
    prisma.transaction.findMany({
      where: { fundId },
      orderBy: { date: 'desc' },
      include: { fund: { select: { name: true, ticker: true } } },
    }),

  create: (data: CreateTransactionDTO) =>
    prisma.transaction.create({
      data,
      include: { fund: { select: { name: true, ticker: true } } },
    }),

  delete: (id: string) => prisma.transaction.delete({ where: { id } }),

  getWalletBalance: async (): Promise<number> => {
    const result = await prisma.transaction.groupBy({
      by: ['type'],
      _sum: { value: true },
    });

    type ResultItem = (typeof result)[number];

    const aporte =
      result.find((r: ResultItem) => r.type === 'APORTE')?._sum.value ?? 0;

    const resgate =
      result.find((r: ResultItem) => r.type === 'RESGATE')?._sum.value ?? 0;

    return aporte - resgate;
  },

  getTotalQuotas: async (): Promise<number> => {
    const result = await prisma.transaction.groupBy({
      by: ['type'],
      _sum: { quotas: true },
    });

    type ResultItem = (typeof result)[number];

    const aporte =
      result.find((r: ResultItem) => r.type === 'APORTE')?._sum.quotas ?? 0;

    const resgate =
      result.find((r: ResultItem) => r.type === 'RESGATE')?._sum.quotas ?? 0;

    return aporte - resgate;
  },
};