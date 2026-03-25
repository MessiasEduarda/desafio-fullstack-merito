"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fundService = void 0;
const fund_repository_1 = require("../repositories/fund.repository");
const error_middleware_1 = require("../middlewares/error.middleware");
exports.fundService = {
    getAll: () => fund_repository_1.fundRepository.findAll(),
    getById: async (id) => {
        const fund = await fund_repository_1.fundRepository.findById(id);
        if (!fund)
            throw new error_middleware_1.AppError('Fund not found', 404);
        return fund;
    },
    create: async (data) => {
        const existing = await fund_repository_1.fundRepository.findByTicker(data.ticker);
        if (existing)
            throw new error_middleware_1.AppError('Ticker already exists');
        return fund_repository_1.fundRepository.create(data);
    },
    update: async (id, data) => {
        await exports.fundService.getById(id);
        return fund_repository_1.fundRepository.update(id, data);
    },
    delete: async (id) => {
        await exports.fundService.getById(id);
        return fund_repository_1.fundRepository.delete(id);
    },
};
