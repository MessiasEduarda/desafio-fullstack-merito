import { api } from './api';
import type { Fund, CreateFundDTO } from '../types';

export const fundService = {
  getAll: async (): Promise<Fund[]> => {
    const { data } = await api.get('/funds');
    return data;
  },
  create: async (dto: CreateFundDTO): Promise<Fund> => {
    const { data } = await api.post('/funds', dto);
    return data;
  },
  update: async (id: string, dto: Partial<CreateFundDTO>): Promise<Fund> => {
    const { data } = await api.put(`/funds/${id}`, dto);
    return data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/funds/${id}`);
  },
};