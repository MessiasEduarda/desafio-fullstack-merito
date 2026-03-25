import { fundRepository, CreateFundDTO } from '../repositories/fund.repository';
import { AppError } from '../middlewares/error.middleware';

export const fundService = {
  getAll: () => fundRepository.findAll(),
  getById: async (id: string) => {
    const fund = await fundRepository.findById(id);
    if (!fund) throw new AppError('Fund not found', 404);
    return fund;
  },
  create: async (data: CreateFundDTO) => {
    const existing = await fundRepository.findByTicker(data.ticker);
    if (existing) throw new AppError('Ticker already exists');
    return fundRepository.create(data);
  },
  update: async (id: string, data: Partial<CreateFundDTO>) => {
    await fundService.getById(id);
    return fundRepository.update(id, data);
  },
  delete: async (id: string) => {
    await fundService.getById(id);
    return fundRepository.delete(id);
  },
};