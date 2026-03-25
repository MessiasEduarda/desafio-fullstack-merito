import { Router } from 'express';
import { transactionController } from '../controllers/transaction.controller';
import { validate, CreateTransactionSchema } from '../middlewares/validate.middleware';

export const transactionRoutes = Router();

transactionRoutes.get('/', transactionController.getAll);
transactionRoutes.get('/wallet/summary', transactionController.getWalletSummary);
transactionRoutes.post('/', validate(CreateTransactionSchema), transactionController.create);
transactionRoutes.delete('/:id', transactionController.delete);