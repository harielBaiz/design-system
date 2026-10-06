import type { HTMLAttributes } from 'react';
import './Callout.css';

/** Highlighted aside inside long-form content (portfolio `.callout`). */
export function Callout({ className, ...rest }: HTMLAttributes<HTMLElement>) {
  return <aside className={['ds-callout', className].filter(Boolean).join(' ')} {...rest} />;
}
