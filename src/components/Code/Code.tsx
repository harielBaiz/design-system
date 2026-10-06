import type { HTMLAttributes } from 'react';
import './Code.css';

/** Inline code / token name. */
export function Code({ className, ...rest }: HTMLAttributes<HTMLElement>) {
  return <code className={['ds-code', className].filter(Boolean).join(' ')} {...rest} />;
}
