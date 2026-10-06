import type { ReactNode } from 'react';
import './ChatMessage.css';

export interface ChatMessageProps {
  from: 'bot' | 'user';
  /** `pending` shows animated dots; `error` uses danger tokens. */
  status?: 'ok' | 'pending' | 'error';
  children?: ReactNode;
}

export function ChatMessage({ from, status = 'ok', children }: ChatMessageProps) {
  const cls = ['ds-msg', `ds-msg--${from}`, status === 'error' && 'ds-msg--error', status === 'pending' && 'ds-msg--pending'].filter(Boolean).join(' ');
  return (
    <div className={cls} role={status === 'error' ? 'alert' : undefined}>
      {status === 'pending' ? (<><span className="sr-only">Bot is typing</span><span className="ds-msg__dots" aria-hidden="true"><span>●</span><span>●</span><span>●</span></span></>) : children}
    </div>
  );
}
