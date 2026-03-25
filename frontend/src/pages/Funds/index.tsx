import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFunds, useCreateFund, useDeleteFund } from '../../hooks/useFunds';
import {
  Button, Input, Select, Modal, Badge, ConfirmModal,
  ToastContainer, useToast, CurrencyInput,
} from '../../components/ui';
import { fmt } from '../../utils/format';
import { getErrorMessage } from '../../utils/error';
import {
  pageWrapper, pageHeader, pageTitleGroup, pageTitle, pageSubtitle,
  tableCard, tableWrapper, table, tableHead, tableTh,
  tableTbody, tableTr, tableTd, tableTdBold, emptyState,
  formWrapper, formActions,
} from './styles';

const schema = z.object({
  name:       z.string().min(2, 'Nome obrigatório'),
  ticker:     z.string().min(2, 'Ticker obrigatório'),
  type:       z.string().min(1, 'Tipo obrigatório'),
  quotaValue: z.coerce.number().positive('Valor deve ser positivo'),
});

type FormData = z.infer<typeof schema>;

const FUND_TYPES = [
  { value: 'Renda Fixa',     label: 'Renda Fixa' },
  { value: 'Renda Variável', label: 'Renda Variável' },
  { value: 'Multimercado',   label: 'Multimercado' },
  { value: 'FII',            label: 'FII' },
];

export function Funds() {
  const [isOpen, setIsOpen]             = useState(false);
  const [fundToDelete, setFundToDelete] = useState<string | null>(null);
  const toast                           = useToast();

  const { data: funds, isLoading }                             = useFunds();
  const { mutate: createFund, isPending }                      = useCreateFund();
  const { mutate: deleteFund, isPending: isDeleting }          = useDeleteFund();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    createFund(data, {
      onSuccess: () => {
        reset();
        setIsOpen(false);
        toast.success('Fundo cadastrado com sucesso!');
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
      },
    });
  };

  const handleConfirmDelete = () => {
    if (!fundToDelete) return;
    deleteFund(fundToDelete, {
      onSuccess: () => {
        setFundToDelete(null);
        toast.success('Fundo removido com sucesso!');
      },
      onError: (err) => {
        setFundToDelete(null);
        toast.error(getErrorMessage(err));
      },
    });
  };

  return (
    <section className={pageWrapper}>
      <ToastContainer toasts={toast.toasts} onRemove={toast.remove} />

      <header className={pageHeader}>
        <div className={pageTitleGroup}>
          <h1 className={pageTitle}>Fundos</h1>
          <p className={pageSubtitle}>Gerencie os fundos de investimento</p>
        </div>
        <Button onClick={() => setIsOpen(true)}>+ Novo Fundo</Button>
      </header>

      <article className={tableCard}>
        <div className={tableWrapper}>
          <table className={table}>
            <thead className={tableHead}>
              <tr>
                {['Nome', 'Ticker', 'Tipo', 'Valor da Cota', 'Ações'].map((h) => (
                  <th key={h} className={tableTh}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className={tableTbody}>
              {isLoading && (
                <tr>
                  <td colSpan={5} className={emptyState}>Carregando...</td>
                </tr>
              )}
              {funds?.map((fund) => (
                <tr key={fund.id} className={tableTr}>
                  <td className={tableTdBold}>{fund.name}</td>
                  <td className={tableTd}>
                    <Badge label={fund.ticker} variant="info" />
                  </td>
                  <td className={tableTd}>{fund.type}</td>
                  <td className={tableTd}>{fmt(fund.quotaValue)}</td>
                  <td className={tableTd}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => setFundToDelete(fund.id)}
                    >
                      Remover
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {(!funds || funds.length === 0) && !isLoading && (
            <p className={emptyState}>Nenhum fundo cadastrado</p>
          )}
        </div>
      </article>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Novo Fundo">
        <form onSubmit={handleSubmit(onSubmit)} className={formWrapper}>
          <Input
            label="Nome do Fundo"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            label="Ticker"
            {...register('ticker')}
            error={errors.ticker?.message}
            placeholder="Ex: MXRF11"
          />
          <Select
            label="Tipo"
            {...register('type')}
            options={FUND_TYPES}
            error={errors.type?.message}
          />
          <Controller
            name="quotaValue"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                label="Valor da Cota (R$)"
                value={field.value}
                onChange={field.onChange}
                error={errors.quotaValue?.message}
              />
            )}
          />
          <div className={formActions}>
            <Button variant="secondary" type="button" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" loading={isPending}>Cadastrar</Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={fundToDelete !== null}
        onClose={() => setFundToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Remover Fundo"
        message="Tem certeza que deseja remover este fundo? Esta ação não pode ser desfeita."
        confirmLabel="Remover"
        isPending={isDeleting}
      />
    </section>
  );
}