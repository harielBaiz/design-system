import { cloneElement, useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactElement, type ReactNode } from 'react';
import { Popover } from '../Popover/Popover';
import type { Placement } from '../../utils/position';
import './Dropdown.css';

export type DropdownEntry =
  | { type?: 'item'; id: string; label: string; icon?: ReactNode; shortcut?: string; description?: string; danger?: boolean; disabled?: boolean; onSelect?: () => void }
  | { type: 'separator' }
  | { type: 'label'; label: string };

export interface DropdownProps {
  /** The button that opens the menu. It must accept a ref and `onClick`. */
  trigger: ReactElement<Record<string, unknown>>;
  items: DropdownEntry[];
  /** Called with the item id after any item is chosen. */
  onSelect?: (id: string) => void;
  placement?: Placement;
  /** Names the menu for screen readers. */
  'aria-label'?: string;
  matchWidth?: boolean;
}

/** A menu of actions that opens from a button. For choosing a value in a form use `Select`. */
export function Dropdown({ trigger, items, onSelect, placement = 'bottom-start', 'aria-label': ariaLabel, matchWidth }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [focusAt, setFocusAt] = useState<'first' | 'last'>('first');
  const anchor = useRef<HTMLElement | null>(null);
  const menu = useRef<HTMLDivElement | null>(null);
  const typed = useRef({ text: '', t: 0 });
  const menuId = useId();

  const close = useCallback((restore = true) => {
    setOpen(false);
    if (restore) anchor.current?.focus();
  }, []);

  const buttons = () => Array.from(menu.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? []);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => {
      const list = buttons();
      (focusAt === 'last' ? list[list.length - 1] : list[0])?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [open, focusAt]);

  const onMenuKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const list = buttons();
    const i = list.indexOf(document.activeElement as HTMLButtonElement);
    const go = (n: number) => { e.preventDefault(); list[(n + list.length) % list.length]?.focus(); };
    if (e.key === 'ArrowDown') go(i + 1);
    else if (e.key === 'ArrowUp') go(i - 1);
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(list.length - 1);
    else if (e.key === 'Tab') close(false);
    else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      window.clearTimeout(typed.current.t);
      typed.current.text += e.key.toLowerCase();
      typed.current.t = window.setTimeout(() => { typed.current.text = ''; }, 600);
      const hit = [...list.slice(i + 1), ...list.slice(0, i + 1)].find((b) => (b.textContent ?? '').trim().toLowerCase().startsWith(typed.current.text));
      hit?.focus();
    }
  };

  const props = trigger.props as Record<string, unknown> & { ref?: unknown };
  const el = cloneElement(trigger, {
    'aria-haspopup': 'menu',
    'aria-expanded': open,
    'aria-controls': open ? menuId : undefined,
    onClick: (e: unknown) => { (props.onClick as ((e: unknown) => void) | undefined)?.(e); setFocusAt('first'); setOpen((o) => !o); },
    onKeyDown: (e: KeyboardEvent) => {
      (props.onKeyDown as ((e: unknown) => void) | undefined)?.(e);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); setFocusAt(e.key === 'ArrowUp' ? 'last' : 'first'); setOpen(true); }
    },
    ref: (node: HTMLElement | null) => {
      anchor.current = node;
      const r = props.ref as ((n: HTMLElement | null) => void) | { current: HTMLElement | null } | undefined;
      if (typeof r === 'function') r(node); else if (r) r.current = node;
    },
  });

  return (
    <>
      {el}
      <Popover
        open={open}
        onOpenChange={(o) => { if (!o) close(true); }}
        anchorRef={anchor}
        placement={placement}
        offset={4}
        matchWidth={matchWidth}
        id={menuId}
        role="menu"
        aria-label={ariaLabel}
        aria-orientation="vertical"
        className="ds-menu"
        onKeyDown={onMenuKey}
      >
        <div ref={menu} className="ds-menu__list">
          {items.map((it, i) => {
            if (it.type === 'separator') return <div key={`s${i}`} role="separator" className="ds-menu__sep" />;
            if (it.type === 'label') return <div key={`l${i}`} role="presentation" className="ds-menu__label">{it.label}</div>;
            return (
              <button
                key={it.id}
                type="button"
                role="menuitem"
                tabIndex={-1}
                disabled={it.disabled}
                className={['ds-menu__item', it.danger && 'is-danger'].filter(Boolean).join(' ')}
                onClick={() => { it.onSelect?.(); onSelect?.(it.id); close(true); }}
              >
                {it.icon && <span className="ds-menu__icon" aria-hidden="true">{it.icon}</span>}
                <span className="ds-menu__text">
                  <span className="ds-menu__label-text">{it.label}</span>
                  {it.description && <span className="ds-menu__desc">{it.description}</span>}
                </span>
                {it.shortcut && <kbd className="ds-menu__shortcut">{it.shortcut}</kbd>}
              </button>
            );
          })}
        </div>
      </Popover>
    </>
  );
}
