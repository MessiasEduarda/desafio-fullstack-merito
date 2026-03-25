import { api } from './api';
import type { Transaction, CreateTransactionDTO, WalletSummary } from '../types';

export const transactionService = {
  getAll: async (): Promise<Transaction[]> => {
    const { data } = await api.get('/transactions');
    return data;
  },
  getWalletSummary: async (): Promise<WalletSummary> => {
    const { data } = await api.get('/transactions/wallet/summary');
    return data;
  },
  create: async (dto: CreateTransactionDTO): Promise<Transaction> => {
    const { data } = await api.post('/transactions', dto);
    return data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/transactions/${id}`);
  },
};