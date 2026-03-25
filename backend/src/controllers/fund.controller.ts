import { Request, Response, NextFunction } from 'express';
import { fundService } from '../services/fund.service';

export const fundController = {
  getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json(await fundService.getAll()); } catch (err) { next(err); }
  },
  getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json(await fundService.getById(String(req.params.id))); } catch (err) { next(err); }
  },
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(201).json(await fundService.create(req.body)); } catch (err) { next(err); }
  },
  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json(await fundService.update(String(req.params.id), req.body)); } catch (err) { next(err); }
  },
  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { await fundService.delete(String(req.params.id)); res.status(204).send(); } catch (err) { next(err); }
  },
};