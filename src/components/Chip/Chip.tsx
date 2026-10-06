import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Chip.css';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  /** `filled` and `outline` are static tags; `action` renders a real button (e.g. suggested prompt). */
  variant?: 'filled' | 'outline' | 'action';
}

export function Chip({ variant = 'filled', children, className, ...rest }: ChipProps) {
  const cls = ['ds-chip', variant !== 'filled' && `ds-chip--${variant}`, className].filter(Boolean).join(' ');
  if (variant === 'action') return <button type="button" className={cls} {...rest}>{children}</button>;
  return <span className={cls}>{children}</span>;
}
