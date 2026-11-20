import type { HTMLAttributes, ReactNode } from 'react';
import './ProgressCircle.css';

export interface ProgressCircleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 0 to 100. Leave undefined for an indeterminate spinner. */
  value?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  tone?: 'brand' | 'success' | 'warning' | 'danger';
  /** Show the percentage in the middle (md and larger). */
  showValue?: boolean;
  /** Replace the middle content (an icon, a time). */
  children?: ReactNode;
  /** Accessible name. Say what is progressing. */
  'aria-label': string;
}

const PX = { sm: 16, md: 32, lg: 48, xl: 72 } as const;
const STROKE = { sm: 2, md: 3, lg: 4, xl: 6 } as const;

/** Shows how far a task has got, or that something is loading. */
export function ProgressCircle({ value, size = 'md', tone = 'brand', showValue, children, className, ...rest }: ProgressCircleProps) {
  const px = PX[size], sw = STROKE[size], r = (px - sw) / 2, c = 2 * Math.PI * r;
  const determinate = typeof value === 'number';
  const v = determinate ? Math.min(100, Math.max(0, value)) : 0;
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={determinate ? Math.round(v) : undefined}
      className={['ds-progress', `ds-progress--${size}`, `ds-progress--${tone}`, !determinate && 'is-indeterminate', className].filter(Boolean).join(' ')}
      style={{ width: px, height: px }}
      {...rest}
    >
      <svg viewBox={`0 0 ${px} ${px}`} width={px} height={px} aria-hidden="true" focusable="false">
        <circle className="ds-progress__track" cx={px / 2} cy={px / 2} r={r} strokeWidth={sw} fill="none" />
        <circle
          className="ds-progress__bar"
          cx={px / 2} cy={px / 2} r={r} strokeWidth={sw} fill="none" strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={determinate ? c * (1 - v / 100) : c * 0.75}
          transform={`rotate(-90 ${px / 2} ${px / 2})`}
        />
      </svg>
      {(children || (showValue && determinate && px >= 32)) && (
        <span className="ds-progress__label" aria-hidden="true">{children ?? `${Math.round(v)}%`}</span>
      )}
    </div>
  );
}
