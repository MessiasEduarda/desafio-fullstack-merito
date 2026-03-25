export const badgeVariants = {
  success: 'bg-green-100 text-green-700 border border-green-200',
  danger:  'bg-red-100 text-red-700 border border-red-200',
  info:    'bg-blue-100 text-blue-700 border border-blue-200',
  warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  neutral: 'bg-gray-100 text-gray-600 border border-gray-200',
} as const;

export const badgeBase = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';