import type { HTMLAttributes, ReactNode } from 'react';
import './Badge.css';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'success' | 'danger' | 'warning' | 'info' | 'overlay';
  children: ReactNode;
}

/** Small status/metadata label. Grew out of the portfolio's `.sd-optional-badge` and `.case-row__lock`. */
export function Badge({ tone = 'neutral', className, children, ...rest }: BadgeProps) {
  const cls = ['ds-badge', tone !== 'neutral' && `ds-badge--${tone}`, className].filter(Boolean).join(' ');
  return <span className={cls} {...rest}>{children}</span>;
}
