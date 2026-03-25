export const mobileMenuButton =
  'hidden max-lg:flex fixed top-4 left-4 z-[1100] items-center justify-center bg-[#BBA188] hover:bg-[#a8906f] text-white p-[10px] rounded-lg shadow-lg transition-colors duration-300';

export const overlay =
  'hidden max-lg:block fixed inset-0 bg-black/50 z-[999]';

export const sidebarContainer = [
  'h-screen py-6 bg-[#0f0f0f] border-r border-[#2a2a2a]',
  'flex flex-col items-start justify-between flex-shrink-0',
  'fixed left-0 top-0 overflow-hidden overflow-y-auto z-[1000]',
  '[transition:width_0.4s_cubic-bezier(0.4,0,0.2,1),min-width_0.4s_cubic-bezier(0.4,0,0.2,1)]',
  '[&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#2a2a2a] [&::-webkit-scrollbar-thumb]:rounded',
  'max-lg:!w-60 max-lg:!min-w-[240px]',
  'max-lg:[transition:transform_0.35s_cubic-bezier(0.4,0,0.2,1)]',
].join(' ');

export const sidebarContainerOpen  = 'max-lg:translate-x-0';
export const sidebarContainerClose = 'max-lg:-translate-x-full';

export const collapseButton =
  'max-lg:hidden flex items-center justify-center absolute left-3 top-6 z-10 w-10 h-10 bg-[#1e1e1e] hover:bg-[#2a2a2a] text-[#95A5A6] hover:text-[#BBA188] rounded-[10px] border-0 cursor-pointer transition-all duration-250';

export const topSectionMobileOverride =
  'max-lg:!max-w-[240px] max-lg:!opacity-100 max-lg:!pl-5';

export const titleText =
  'text-[26px] font-extrabold text-[#BBA188] tracking-tight mt-2 mb-1 whitespace-nowrap';

export const subtitleText =
  'text-[13px] text-[#95A5A6] mb-6 whitespace-nowrap';

export const logoCollapsed =
  'max-lg:hidden flex items-center justify-center w-full overflow-hidden';

export const logoLetter =
  'text-[22px] font-extrabold text-[#BBA188]';

export const dividerLine =
  'max-lg:hidden w-[85%] h-px bg-[#2a2a2a] pointer-events-none';

export const dividerLineBottom =
  'max-lg:hidden w-[85%] h-px bg-[#2a2a2a] pointer-events-none';

export const nav = 'w-full flex flex-col mt-1';

export const sectionDividerWrap =
  'flex items-center w-full overflow-hidden';

export const sectionDividerLine =
  'max-lg:![transform:scaleX(1)] max-lg:!opacity-100 flex-1 h-px bg-[#2a2a2a]';

export const sectionDividerLabel =
  'max-lg:!opacity-100 max-lg:![transform:translateY(0)] text-[9px] font-semibold text-[#444] tracking-[0.09em] uppercase whitespace-nowrap px-2 flex-shrink-0';

export const navItemBase =
  'group relative flex items-center w-full pr-4 py-2 no-underline rounded-r-full transition-all duration-250';

export const navItemActive  = 'bg-[rgba(187,161,136,0.08)]';
export const navItemInactive = 'hover:bg-[rgba(187,161,136,0.06)]';

export const navItemBar = 'absolute left-0 top-0 bottom-0 w-[3px] rounded-r transition-colors duration-250';
export const navItemBarActive   = 'bg-[#BBA188]';
export const navItemBarInactive = 'bg-transparent group-hover:bg-[#BBA188]';

export const navItemIconWrap =
  'flex items-center justify-center w-16 min-w-[64px] flex-shrink-0 max-lg:w-14 max-lg:min-w-[56px]';

export const navItemIconActive =
  'transition-all duration-250 text-[#BBA188]';

export const navItemIconInactive =
  'transition-all duration-250 text-[#95A5A6] group-hover:text-[#BBA188] group-hover:scale-110';

export const navItemTextBase =
  'text-[12px] max-lg:text-[13px] max-lg:!opacity-100 max-lg:!max-w-[170px]';

export const navItemTextActive =
  'font-semibold text-[#BBA188]';

export const navItemTextInactive =
  'font-normal text-[#95A5A6] group-hover:text-[#BBA188] group-hover:font-semibold';

export const tooltip =
  "pointer-events-none absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 bg-[#1e1e1e] border border-[#2a2a2a] text-[#BBA188] text-xs font-medium px-[10px] py-[5px] rounded-lg whitespace-nowrap shadow-[4px_4px_16px_rgba(0,0,0,0.4)] transition-all duration-150 z-[9999] before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-[5px] before:border-transparent before:border-r-[#2a2a2a]";

export const logoutButton =
  'group relative flex items-center w-full pr-4 py-2 border-0 bg-transparent cursor-pointer text-[12px] font-normal text-[#95A5A6] rounded-r-full transition-all duration-250 hover:bg-[rgba(231,76,60,0.07)] hover:text-[#E74C3C] max-lg:py-[10px] max-lg:text-[13px]';

export const logoutBar =
  'absolute left-0 top-0 bottom-0 w-[3px] rounded-r bg-transparent group-hover:bg-[#E74C3C] transition-colors duration-250';

export const logoutIconWrap =
  'flex items-center justify-center w-16 min-w-[64px] flex-shrink-0 max-lg:w-14 max-lg:min-w-[56px]';

export const logoutIcon =
  'text-[#95A5A6] group-hover:text-[#E74C3C] group-hover:scale-110 transition-all duration-250';

export const logoutTextClass =
  'max-lg:!opacity-100 max-lg:!max-w-[170px]';