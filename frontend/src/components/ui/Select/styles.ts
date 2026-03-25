export const selectBase =
  'w-full border rounded-full px-4 py-2 text-sm outline-none bg-white transition-all duration-200 cursor-pointer appearance-none text-[#3d2f22]';

export const selectStates = {
  default: 'border-[#d4c4b4] focus:border-[#a8906f] focus:ring-2 focus:ring-[#a8906f]/20',
  error:   'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100',
} as const;

export const labelStyle = 'text-sm font-medium text-[#5c4a38]';
export const errorStyle = 'text-xs text-red-500 mt-0.5';