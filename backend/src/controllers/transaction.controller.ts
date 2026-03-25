import { Request, Response, NextFunction } from 'express';
import { transactionService } from '../services/transaction.service';

export const transactionController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try { res.json(await transactionService.getAll()); } catch (err) { next(err); }
  },
  getWalletSummary: async (req: Request, res: Response, next: NextFunction) => {
    try { res.json(await transactionService.getWalletSummary()); } catch (err) { next(err); }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try { res.status(201).json(await transactionService.create(req.body)); } catch (err) { next(err); }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try { await transactionService.delete(req.params.id as string); res.status(204).send(); } catch (err) { next(err); }
  },
};
