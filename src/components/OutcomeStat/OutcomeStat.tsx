import type { ReactNode } from 'react';
import './OutcomeStat.css';

export interface OutcomeStatProps { value: string; label: ReactNode }

/** Big number + caption card for case-study outcomes. */
export function OutcomeStat({ value, label }: OutcomeStatProps) {
  return (
    <div className="ds-stat">
      <span className="ds-stat__number">{value}</span>
      <span className="ds-stat__label">{label}</span>
    </div>
  );
}
