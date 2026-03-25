import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  useTransactions,
  useCreateTransaction,
  useDeleteTransaction,
  useWalletSummary,
} from '../../hooks/useTransactions';
import { useFunds } from '../../hooks/useFunds';
import {
  Button, Input, Select, Modal, Badge, ConfirmModal,
  ToastContainer, useToast, CurrencyInput,
} from '../../components/ui';
import { fmt } from '../../utils/format';
import { getErrorMessage } from '../../utils/error';
import {
  pageWrapper, pageHeader, pageTitleGroup, pageTitle, pageSubtitle,
  balanceCard, balanceLabel, balanceValueGreen, balanceValueRed,
  tableCard, tableWrapper, table, tableHead, tableTh,
  tableTbody, tableTr, tableTd, tableTdBold, emptyState,
  formWrapper, formActions,
} from './styles';

const schema = z.object({
  fundId: z.string().min(1, 'Selecione um fundo'),
  type:   z.enum(['APORTE', 'RESGATE']),
  value:  z.coerce.number().positive('Valor deve ser positivo'),
  date:   z.string()
    .min(1, 'Data obrigatória')
    .refine((val) => {
      const year = new Date(val).getFullYear();
      return year >= 1000 && year <= 9999;
    }, 'Ano deve ter 4 dígitos'),
});

type FormData = z.infer<typeof schema>;

const TYPE_OPTIONS = [
  { value: 'APORTE',  label: 'Aporte' },
  { value: 'RESGATE', label: 'Resgate' },
];

export function Transactions() {
  const [isOpen, setIsOpen]                           = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
  const toast                                         = useToast();

  const { data: transactions, isLoading }                    = useTransactions();
  const { data: summary }                                    = useWalletSummary();
  const { data: funds }                                      = useFunds();
  const { mutate: createTransaction, isPending }             = useCreateTransaction();
  const { mutate: deleteTransaction, isPending: isDeleting } = useDeleteTransaction();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    createTransaction(data, {
      onSuccess: () => {
        reset();
        setIsOpen(false);
        toast.success('Movimentação registrada com sucesso!');
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
      },
    });
  };

  const handleConfirmDelete = () => {
    if (!transactionToDelete) return;
    deleteTransaction(transactionToDelete, {
      onSuccess: () => {
        setTransactionToDelete(null);
        toast.success('Movimentação removida com sucesso!');
      },
      onError: (err) => {
        setTransactionToDelete(null);
        toast.error(getErrorMessage(err));
      },
    });
  };

  const fundOptions = funds?.map((f) => ({
    value: f.id,
    label: `${f.ticker} — ${f.name}`,
  })) ?? [];

  const balance = summary?.balance ?? 0;

  return (
    <section className={pageWrapper}>
      <ToastContainer toasts={toast.toasts} onRemove={toast.remove} />

      <header className={pageHeader}>
        <div className={pageTitleGroup}>
          <h1 className={pageTitle}>Movimentações</h1>
          <p className={pageSubtitle}>Registre aportes e resgates</p>
        </div>
        <Button onClick={() => setIsOpen(true)}>+ Nova Movimentação</Button>
      </header>

      <article className={balanceCard}>
        <p className={balanceLabel}>Saldo da Carteira</p>
        <p className={balance >= 0 ? balanceValueGreen : balanceValueRed}>
          {fmt(balance)}
        </p>
      </article>

      <article className={tableCard}>
        <div className={tableWrapper}>
          <table className={table}>
            <thead className={tableHead}>
              <tr>
                {['Data', 'Fundo', 'Ticker', 'Tipo', 'Valor', 'Cotas', 'Ações'].map((h) => (
                  <th key={h} className={tableTh}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className={tableTbody}>
              {isLoading && (
                <tr>
                  <td colSpan={7} className={emptyState}>Carregando...</td>
                </tr>
              )}
              {transactions?.map((t) => (
                <tr key={t.id} className={tableTr}>
                  <td className={tableTd}>
                    {t.date ? t.date.slice(0, 10).split('-').reverse().join('/') : '—'}
                  </td>
                  <td className={tableTdBold}>{t.fund.name}</td>
                  <td className={tableTd}>
                    <Badge label={t.fund.ticker} variant="info" />
                  </td>
                  <td className={tableTd}>
                    <Badge
                      label={t.type}
                      variant={t.type === 'APORTE' ? 'success' : 'danger'}
                    />
                  </td>
                  <td className={tableTd}>{fmt(t.value)}</td>
                  <td className={tableTd}>{t.quotas.toFixed(4)}</td>
                  <td className={tableTd}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => setTransactionToDelete(t.id)}
                    >
                      Remover
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {(!transactions || transactions.length === 0) && !isLoading && (
            <p className={emptyState}>Nenhuma movimentação registrada</p>
          )}
        </div>
      </article>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Nova Movimentação">
        <form onSubmit={handleSubmit(onSubmit)} className={formWrapper}>
          <Select
            label="Fundo"
            {...register('fundId')}
            options={fundOptions}
            error={errors.fundId?.message}
          />
          <Select
            label="Tipo"
            {...register('type')}
            options={TYPE_OPTIONS}
            error={errors.type?.message}
          />
          <Controller
            name="value"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                label="Valor (R$)"
                value={field.value}
                onChange={field.onChange}
                error={errors.value?.message}
              />
            )}
          />
          <Input
            label="Data"
            type="date"
            max="9999-12-31"
            {...register('date')}
            error={errors.date?.message}
          />
          <div className={formActions}>
            <Button variant="secondary" type="button" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" loading={isPending}>Registrar</Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={transactionToDelete !== null}
        onClose={() => setTransactionToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Remover Movimentação"
        message="Tem certeza que deseja remover esta movimentação? Esta ação não pode ser desfeita."
        confirmLabel="Remover"
        isPending={isDeleting}
      />
    </section>
  );
}