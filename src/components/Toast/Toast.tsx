import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import './Toast.css';

export type ToastTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export interface ToastOptions {
  title?: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
  /** ms before it closes. `0` keeps it until dismissed. Errors should not auto-close. */
  duration?: number;
  action?: { label: string; onClick: () => void };
}

const ICON: Record<ToastTone, IconName | null> = { neutral: null, info: 'info', success: 'check-circle', warning: 'alert-triangle', danger: 'alert-circle' };

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, ToastOptions {
  onDismiss?: () => void;
  dismissLabel?: string;
}

/** The toast itself. Use `useToast()` to show one; render this directly only for documentation or custom layouts. */
export function Toast({ title, description, tone = 'neutral', action, onDismiss, dismissLabel = 'Dismiss', duration: _d, className, ...rest }: ToastProps) {
  const icon = ICON[tone];
  return (
    <div role={tone === 'danger' ? 'alert' : 'status'} className={['ds-toast', `ds-toast--${tone}`, className].filter(Boolean).join(' ')} {...rest}>
      {icon && <Icon name={icon} size={18} className="ds-toast__icon" />}
      <div className="ds-toast__body">
        {title && <p className="ds-toast__title">{title}</p>}
        {description && <p className="ds-toast__desc">{description}</p>}
      </div>
      {action && <button type="button" className="ds-toast__action" onClick={action.onClick}>{action.label}</button>}
      {onDismiss && (
        <button type="button" className="ds-toast__close" onClick={onDismiss} aria-label={dismissLabel}><Icon name="x" size={16} /></button>
      )}
    </div>
  );
}

interface Item extends ToastOptions { id: string }
interface Ctx { toast: (o: ToastOptions) => string; dismiss: (id?: string) => void }
const ToastContext = createContext<Ctx | null>(null);

export function useToast(): Ctx {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

function ToastItem({ item, onClose }: { item: Item; onClose: () => void }) {
  const duration = item.duration ?? (item.tone === 'danger' ? 0 : 5000);
  const left = useRef(duration);
  const started = useRef(0);
  const timer = useRef<number | undefined>(undefined);

  const start = useCallback(() => {
    if (!duration) return;
    started.current = Date.now();
    timer.current = window.setTimeout(onClose, left.current);
  }, [duration, onClose]);
  const pause = useCallback(() => {
    if (!duration) return;
    window.clearTimeout(timer.current);
    left.current -= Date.now() - started.current;
  }, [duration]);

  useEffect(() => { start(); return () => window.clearTimeout(timer.current); }, [start]);

  return (
    <div className="ds-toast-wrap" onMouseEnter={pause} onMouseLeave={start} onFocus={pause} onBlur={start}>
      <Toast {...item} action={item.action && { ...item.action, onClick: () => { item.action!.onClick(); onClose(); } }} onDismiss={onClose} />
    </div>
  );
}

export interface ToastProviderProps {
  children: ReactNode;
  /** Most toasts shown at once. Older ones are dropped first. */
  limit?: number;
  placement?: 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start' | 'bottom';
}

/** Wrap your app once. Toasts render in the top layer, above modals and everything else. */
export function ToastProvider({ children, limit = 4, placement = 'bottom-end' }: ToastProviderProps) {
  const [items, setItems] = useState<Item[]>([]);
  const region = useRef<HTMLDivElement>(null);
  const seq = useRef(0);

  const dismiss = useCallback((id?: string) => setItems((cur) => (id ? cur.filter((t) => t.id !== id) : [])), []);
  const toast = useCallback((o: ToastOptions) => {
    const id = `t${++seq.current}`;
    setItems((cur) => [...cur, { ...o, id }].slice(-limit));
    return id;
  }, [limit]);
  const api = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  // Re-open the popover on every new toast so it sits above any dialog that opened since.
  useLayoutEffect(() => {
    const el = region.current;
    if (!el) return;
    try {
      if (el.matches(':popover-open')) el.hidePopover?.();
      if (items.length) el.showPopover?.();
    } catch { /* ignore */ }
  }, [items.length]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div ref={region} popover="manual" role="region" aria-label="Notifications" aria-live="polite" className={`ds-toast-region ds-toast-region--${placement}`}>
        {items.map((t) => <ToastItem key={t.id} item={t} onClose={() => dismiss(t.id)} />)}
      </div>
    </ToastContext.Provider>
  );
}
