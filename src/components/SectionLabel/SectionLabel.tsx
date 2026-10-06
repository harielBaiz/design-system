import type { HTMLAttributes } from 'react';
import './SectionLabel.css';

/** Mono, uppercase eyebrow above a heading (portfolio `.section-label`). */
export function SectionLabel({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={['ds-eyebrow', className].filter(Boolean).join(' ')} {...rest} />;
}
