import type { ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import './InsightItem.css';

export interface InsightItemProps {
  tone?: 'neutral' | 'win' | 'pain';
  icon?: IconName;
  children: ReactNode;
}

const DEFAULT_ICON: Record<NonNullable<InsightItemProps['tone']>, IconName> = { neutral: 'info', win: 'check-circle', pain: 'alert-circle' };

/** One row of an insight list. `win` / `pain` use the success / danger status tokens (no hardcoded hexes). */
export function InsightItem({ tone = 'neutral', icon, children }: InsightItemProps) {
  return (
    <li className={`ds-insight${tone !== 'neutral' ? ` ds-insight--${tone}` : ''}`}>
      <span className="ds-insight__icon"><Icon name={icon ?? DEFAULT_ICON[tone]} /></span>
      <div>{children}</div>
    </li>
  );
}
