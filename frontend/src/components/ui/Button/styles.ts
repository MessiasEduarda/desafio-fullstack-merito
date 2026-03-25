export const buttonVariants = {
  primary: 'bg-[#a8906f] hover:bg-[#967f5f] text-white shadow-sm',

  danger:  'bg-red-600 hover:bg-red-700 text-white shadow-sm',

  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300',

  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
} as const;
export const buttonSizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
} as const;

export const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';