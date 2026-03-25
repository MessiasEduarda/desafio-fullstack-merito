import { Router } from 'express';
import { fundController } from '../controllers/fund.controller';
import { validate, CreateFundSchema, UpdateFundSchema } from '../middlewares/validate.middleware';

export const fundRoutes = Router();

fundRoutes.get('/', fundController.getAll);
fundRoutes.get('/:id', fundController.getById);
fundRoutes.post('/', validate(CreateFundSchema), fundController.create);
fundRoutes.put('/:id', validate(UpdateFundSchema), fundController.update);
fundRoutes.delete('/:id', fundController.delete);