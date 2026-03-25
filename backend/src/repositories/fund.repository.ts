import { prisma } from '../lib/prisma';

export interface CreateFundDTO {
  name: string;
  ticker: string;
  type: string;
  quotaValue: number;
}

export const fundRepository = {
  findAll: () => prisma.fund.findMany({ orderBy: { createdAt: 'desc' } }),
  findById: (id: string) => prisma.fund.findUnique({ where: { id } }),
  findByTicker: (ticker: string) => prisma.fund.findUnique({ where: { ticker } }),
  create: (data: CreateFundDTO) => prisma.fund.create({ data }),
  update: (id: string, data: Partial<CreateFundDTO>) => prisma.fund.update({ where: { id }, data }),
  delete: (id: string) => prisma.fund.delete({ where: { id } }),
};