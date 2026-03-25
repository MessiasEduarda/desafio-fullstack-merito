"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionController = void 0;
const transaction_service_1 = require("../services/transaction.service");
exports.transactionController = {
    getAll: async (req, res, next) => {
        try {
            res.json(await transaction_service_1.transactionService.getAll());
        }
        catch (err) {
            next(err);
        }
    },
    getWalletSummary: async (req, res, next) => {
        try {
            res.json(await transaction_service_1.transactionService.getWalletSummary());
        }
        catch (err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        try {
            res.status(201).json(await transaction_service_1.transactionService.create(req.body));
        }
        catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            await transaction_service_1.transactionService.delete(req.params.id);
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    },
};
