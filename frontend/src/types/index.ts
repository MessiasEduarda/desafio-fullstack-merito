export interface Fund {
  id: string;
  name: string;
  ticker: string;
  type: string;
  quotaValue: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  fundId: string;
  fund: { name: string; ticker: string };
  type: 'APORTE' | 'RESGATE';
  value: number;
  quotas: number;
  date: string;
  createdAt: string;
}

export interface WalletSummary {
  balance: number;
  totalQuotas: number;
  totalTransactions: number;
}

export interface CreateFundDTO {
  name: string;
  ticker: string;
  type: string;
  quotaValue: number;
}

export interface CreateTransactionDTO {
  fundId: string;
  type: 'APORTE' | 'RESGATE';
  value: number;
  date: string;
}