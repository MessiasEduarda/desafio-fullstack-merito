import { useWalletSummary, useTransactions } from '../../hooks/useTransactions';
import { useFunds } from '../../hooks/useFunds';
import { Badge } from '../../components/ui';
import { fmt } from '../../utils/format';
import {
  pageWrapper, pageHeader, pageTitle, pageSubtitle,
  statsGrid, statCard, statLabel,
  statValueGreen, statValueRed, statValueNeutral,
  tableCard, tableCardHeader, tableCardTitle,
  tableWrapper, table, tableHead, tableTh,
  tableTbody, tableTr, tableTd, tableTdBold, emptyState,
} from './styles';

export function Dashboard() {
  const { data: summary }      = useWalletSummary();
  const { data: transactions } = useTransactions();
  const { data: funds }        = useFunds();

  const balance = summary?.balance ?? 0;

  return (
    <section className={`${pageWrapper} mt-6`}>

      <header className={pageHeader}>
        <h1 className={pageTitle}>Dashboard</h1>
        <p className={pageSubtitle}>Visão geral da sua carteira</p>
      </header>

      <div className={statsGrid}>
        <article className={statCard}>
          <p className={statLabel}>Saldo da Carteira</p>
          <p className={balance >= 0 ? statValueGreen : statValueRed}>
            {fmt(balance)}
          </p>
        </article>

        <article className={statCard}>
          <p className={statLabel}>Total de Cotas</p>
          <p className={statValueNeutral}>
            {(summary?.totalQuotas ?? 0).toFixed(4)}
          </p>
        </article>

        <article className={statCard}>
          <p className={statLabel}>Total de Movimentações</p>
          <p className={statValueNeutral}>{summary?.totalTransactions ?? 0}</p>
        </article>

        <article className={statCard}>
          <p className={statLabel}>Fundos Cadastrados</p>
          <p className={statValueNeutral}>{funds?.length ?? 0}</p>
        </article>
      </div>

      <section className={tableCard}>
        <header className={tableCardHeader}>
          <h2 className={tableCardTitle}>Últimas Movimentações</h2>
        </header>

        <div className={tableWrapper}>
          <table className={table}>
            <thead className={tableHead}>
              <tr>
                {['Data', 'Fundo', 'Tipo', 'Valor', 'Cotas'].map((h) => (
                  <th key={h} className={tableTh}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className={tableTbody}>
              {transactions?.slice(0, 5).map((t) => (
                <tr key={t.id} className={tableTr}>
                  <td className={tableTd}>
                    {new Date(t.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className={tableTdBold}>{t.fund.name}</td>
                  <td className={tableTd}>
                    <Badge
                      label={t.type}
                      variant={t.type === 'APORTE' ? 'success' : 'danger'}
                    />
                  </td>
                  <td className={tableTd}>{fmt(t.value)}</td>
                  <td className={tableTd}>{t.quotas.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {(!transactions || transactions.length === 0) && (
            <p className={emptyState}>Nenhuma movimentação registrada</p>
          )}
        </div>
      </section>

    </section>
  );
}