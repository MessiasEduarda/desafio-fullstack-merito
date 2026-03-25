export {
  tableCard,
  tableCardHeader,
  tableCardTitle,
  tableWrapper,
  table,
  tableHead,
  tableTh,
  tableTbody,
  tableTr,
  tableTd,
  tableTdBold,
  emptyState,
  pageWrapper,
  pageHeader,
  pageTitle,
  pageSubtitle,
} from '../../styles/shared';

export const statsGrid = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5';
export const statCard =
  'bg-white rounded-2xl p-6 shadow-sm border border-[#e8ddd0] relative overflow-hidden ' +
  'before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-gradient-to-r before:from-[#a8906f] before:to-[#c8aa88]';
export const statLabel = 'text-xs font-semibold uppercase tracking-widest text-[#9e8b78]';
export const statValueGreen   = 'text-3xl font-bold mt-3 text-[#2d7a4f] tracking-tight';
export const statValueRed     = 'text-3xl font-bold mt-3 text-red-600 tracking-tight';
export const statValueNeutral = 'text-3xl font-bold mt-3 text-[#3d2f22] tracking-tight';