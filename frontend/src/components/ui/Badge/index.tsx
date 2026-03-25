import { badgeBase, badgeVariants } from './styles';

export interface BadgeProps {
  label: string;
  variant: keyof typeof badgeVariants;
}

export function Badge({ label, variant }: BadgeProps) {
  return (
    <span className={`${badgeBase} ${badgeVariants[variant]}`}>
      {label}
    </span>
  );
}