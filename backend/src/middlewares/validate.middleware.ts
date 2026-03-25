import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      res.status(400).json({ error: 'Validation error', details: errors });
      return;
    }
    req.body = result.data;
    next();
  };
}

export const CreateFundSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  ticker: z.string().min(1, 'Ticker é obrigatório').transform((v) => v.toUpperCase()),
  type: z.string().min(1, 'Tipo é obrigatório'),
  quotaValue: z
    .number('Valor da cota deve ser um número')
    .positive('Valor da cota deve ser positivo'),
});

export const UpdateFundSchema = z.object({
  name: z.string().min(1).optional(),
  ticker: z
    .string()
    .min(1)
    .transform((v) => v.toUpperCase())
    .optional(),
  type: z.string().min(1).optional(),
  quotaValue: z.number().positive().optional(),
});

export const CreateTransactionSchema = z.object({
  fundId: z.string().min(1, 'Fundo é obrigatório'),
  type: z.enum(['APORTE', 'RESGATE'], 'Tipo deve ser APORTE ou RESGATE'),
  value: z
    .number('Valor deve ser um número')
    .positive('Valor deve ser positivo'),
  date: z.string().min(1, 'Data é obrigatória'),
});