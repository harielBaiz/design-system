import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import './CopyButton.css';

export interface CopyButtonProps {
  /** Text copied to the clipboard. */
  value: string;
  label?: string;
}

/** Icon button that swaps copy → check for 1.6s. Announces the result politely. */
export function CopyButton({ value, label = 'Copy' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try { await navigator.clipboard.writeText(value); } catch { /* clipboard blocked: still show nothing wrong */ return; }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <>
      <button type="button" className={`ds-copy${copied ? ' is-copied' : ''}`} onClick={copy} aria-label={copied ? 'Copied' : label}>
        <Icon name={copied ? 'check' : 'copy'} size={14} />
      </button>
      <span className="sr-only" role="status">{copied ? 'Copied to clipboard' : ''}</span>
    </>
  );
}
