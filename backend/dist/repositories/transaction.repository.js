"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRepository = void 0;
const prisma_1 = require("../lib/prisma");
exports.transactionRepository = {
    findAll: () => prisma_1.prisma.transaction.findMany({
        orderBy: { date: 'desc' },
        include: { fund: { select: { name: true, ticker: true } } },
    }),
    findByFundId: (fundId) => prisma_1.prisma.transaction.findMany({
        where: { fundId },
        orderBy: { date: 'desc' },
        include: { fund: { select: { name: true, ticker: true } } },
    }),
    create: (data) => prisma_1.prisma.transaction.create({
        data,
        include: { fund: { select: { name: true, ticker: true } } },
    }),
    delete: (id) => prisma_1.prisma.transaction.delete({ where: { id } }),
    getWalletBalance: async () => {
        const result = await prisma_1.prisma.transaction.groupBy({
            by: ['type'],
            _sum: { value: true },
        });
        const aporte = result.find((r) => r.type === 'APORTE')?._sum.value ?? 0;
        const resgate = result.find((r) => r.type === 'RESGATE')?._sum.value ?? 0;
        return aporte - resgate;
    },
};
