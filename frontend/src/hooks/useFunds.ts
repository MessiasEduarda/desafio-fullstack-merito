import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fundService } from '../services/fund.service';
import type { CreateFundDTO } from '../types';

export function useFunds() {
  return useQuery({
    queryKey: ['funds'],
    queryFn: fundService.getAll,
  });
}

export function useCreateFund() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateFundDTO) => fundService.create(dto),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['funds'] }),
  });
}

export function useUpdateFund() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Partial<CreateFundDTO> }) =>
      fundService.update(id, dto),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['funds'] }),
  });
}

export function useDeleteFund() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => fundService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['funds'] }),
  });
}