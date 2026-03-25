"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fundRepository = void 0;
const prisma_1 = require("../lib/prisma");
exports.fundRepository = {
    findAll: () => prisma_1.prisma.fund.findMany({ orderBy: { createdAt: 'desc' } }),
    findById: (id) => prisma_1.prisma.fund.findUnique({ where: { id } }),
    findByTicker: (ticker) => prisma_1.prisma.fund.findUnique({ where: { ticker } }),
    create: (data) => prisma_1.prisma.fund.create({ data }),
    update: (id, data) => prisma_1.prisma.fund.update({ where: { id }, data }),
    delete: (id) => prisma_1.prisma.fund.delete({ where: { id } }),
};
