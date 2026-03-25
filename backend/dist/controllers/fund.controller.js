"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fundController = void 0;
const fund_service_1 = require("../services/fund.service");
exports.fundController = {
    getAll: async (req, res, next) => {
        try {
            res.json(await fund_service_1.fundService.getAll());
        }
        catch (err) {
            next(err);
        }
    },
    getById: async (req, res, next) => {
        try {
            res.json(await fund_service_1.fundService.getById(String(req.params.id)));
        }
        catch (err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        try {
            res.status(201).json(await fund_service_1.fundService.create(req.body));
        }
        catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            res.json(await fund_service_1.fundService.update(String(req.params.id), req.body));
        }
        catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            await fund_service_1.fundService.delete(String(req.params.id));
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    },
};
