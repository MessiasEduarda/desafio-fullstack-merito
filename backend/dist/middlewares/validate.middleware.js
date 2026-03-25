"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionSchema = exports.UpdateFundSchema = exports.CreateFundSchema = void 0;
exports.validate = validate;
const zod_1 = require("zod");
function validate(schema) {
    return (req, res, next) => {
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
exports.CreateFundSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Nome é obrigatório'),
    ticker: zod_1.z.string().min(1, 'Ticker é obrigatório').transform((v) => v.toUpperCase()),
    type: zod_1.z.string().min(1, 'Tipo é obrigatório'),
    quotaValue: zod_1.z
        .number('Valor da cota deve ser um número')
        .positive('Valor da cota deve ser positivo'),
});
exports.UpdateFundSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    ticker: zod_1.z
        .string()
        .min(1)
        .transform((v) => v.toUpperCase())
        .optional(),
    type: zod_1.z.string().min(1).optional(),
    quotaValue: zod_1.z.number().positive().optional(),
});
exports.CreateTransactionSchema = zod_1.z.object({
    fundId: zod_1.z.string().min(1, 'Fundo é obrigatório'),
    type: zod_1.z.enum(['APORTE', 'RESGATE'], 'Tipo deve ser APORTE ou RESGATE'),
    value: zod_1.z
        .number('Valor deve ser um número')
        .positive('Valor deve ser positivo'),
    date: zod_1.z.string().min(1, 'Data é obrigatória'),
});
