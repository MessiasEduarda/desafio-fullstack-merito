"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionService = void 0;
const transaction_repository_1 = require("../repositories/transaction.repository");
const fund_repository_1 = require("../repositories/fund.repository");
const error_middleware_1 = require("../middlewares/error.middleware");
const prisma_1 = require("../lib/prisma");
exports.transactionService = {
    getAll: () => transaction_repository_1.transactionRepository.findAll(),
    getByFund: (fundId) => transaction_repository_1.transactionRepository.findByFundId(fundId),
    getWalletSummary: async () => {
        const balance = await transaction_repository_1.transactionRepository.getWalletBalance();
        const totalTransactions = await prisma_1.prisma.transaction.count();
        return { balance, totalTransactions };
    },
    create: async (data) => {
        const fund = await fund_repository_1.fundRepository.findById(data.fundId);
        if (!fund)
            throw new error_middleware_1.AppError('Fund not found', 404);
        if (!['APORTE', 'RESGATE'].includes(data.type)) {
            throw new error_middleware_1.AppError('Invalid transaction type');
        }
        if (data.type === 'RESGATE') {
            const currentBalance = await transaction_repository_1.transactionRepository.getWalletBalance();
            if (data.value > currentBalance) {
                throw new error_middleware_1.AppError(`Saldo insuficiente. Saldo atual: R$ ${currentBalance.toFixed(2)}`, 400);
            }
        }
        const quotas = data.value / fund.quotaValue;
        const dto = {
            fundId: data.fundId,
            type: data.type,
            value: data.value,
            quotas,
            date: new Date(data.date),
        };
        return transaction_repository_1.transactionRepository.create(dto);
    },
    delete: async (id) => transaction_repository_1.transactionRepository.delete(id),
};
