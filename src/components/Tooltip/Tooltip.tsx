import { cloneElement, useCallback, useEffect, useId, useRef, useState, type ReactElement, type ReactNode } from 'react';
import { Popover } from '../Popover/Popover';
import type { Placement } from '../../utils/position';
import './Tooltip.css';

export interface TooltipProps {
  /** Short plain text. For anything interactive use a Popover. */
  content: ReactNode;
  placement?: Placement;
  /** Delay before showing, in ms. Hover only. Focus shows it right away. */
  delay?: number;
  /** The element to describe. It must accept a ref, `onMouseEnter`, `onMouseLeave`, `onFocus`, `onBlur` and `aria-describedby`. */
  children: ReactElement<Record<string, unknown>>;
  disabled?: boolean;
}

/** A short label that appears on hover or focus. It describes an element; it never holds actions. */
export function Tooltip({ content, placement = 'top', delay = 400, children, disabled }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const anchor = useRef<HTMLElement | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const id = useId();

  const show = useCallback((wait: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), wait);
  }, []);
  const hide = useCallback(() => { window.clearTimeout(timer.current); setOpen(false); }, []);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  if (disabled) return children;
  const props = children.props as Record<string, unknown> & { ref?: unknown };
  const call = (name: string, e: unknown) => (props[name] as ((e: unknown) => void) | undefined)?.(e);

  const trigger = cloneElement(children, {
    'aria-describedby': [props['aria-describedby'], open ? id : undefined].filter(Boolean).join(' ') || undefined,
    onMouseEnter: (e: unknown) => { call('onMouseEnter', e); show(delay); },
    onMouseLeave: (e: unknown) => { call('onMouseLeave', e); hide(); },
    onFocus: (e: unknown) => { call('onFocus', e); show(0); },
    onBlur: (e: unknown) => { call('onBlur', e); hide(); },
    ref: (node: HTMLElement | null) => {
      anchor.current = node;
      const r = props.ref as ((n: HTMLElement | null) => void) | { current: HTMLElement | null } | undefined;
      if (typeof r === 'function') r(node); else if (r) r.current = node;
    },
  });

  return (
    <>
      {trigger}
      <Popover open={open} onOpenChange={(o) => !o && hide()} anchorRef={anchor} placement={placement} offset={6} surface="plain" closeOnOutside={false} id={id} role="tooltip">
        <span className="ds-tooltip">{content}</span>
      </Popover>
    </>
  );
}
