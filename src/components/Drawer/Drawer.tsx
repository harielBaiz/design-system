import { useEffect, useId, useRef, type HTMLAttributes, type KeyboardEvent, type ReactNode, type RefObject } from 'react';
import { Icon } from '../Icon/Icon';
import './Drawer.css';

export type DrawerPlacement = 'bottom-end' | 'bottom-start' | 'right' | 'left';

export interface DrawerProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  open: boolean;
  /** Called on Escape and on the close button. */
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  /**
   * `bottom-end` and `bottom-start` dock a floating panel in a corner.
   * `right` and `left` are full-height sheets along an edge.
   */
  placement?: DrawerPlacement;
  /** Blocks the page behind the drawer (dims it and traps focus). The default is non-modal: the page stays usable. */
  modal?: boolean;
  /** Extra buttons for the header, next to the close button. */
  actions?: ReactNode;
  /** Pinned to the bottom, under the scrolling body. For a composer or action buttons. */
  footer?: ReactNode;
  /** Element to focus on open. Default: the first focusable element, else the panel. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  closeLabel?: string;
  /** Panel width in px for the docked sizes. */
  width?: number;
}

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * A panel that opens from a corner or an edge of the screen and keeps its content while closed.
 * Non-modal by default, like a chat window. Set `modal` to block the page, like a settings sheet.
 */
export function Drawer({
  open, onClose, title, description, placement = 'bottom-end', modal = false, actions, footer, initialFocusRef,
  closeLabel = 'Close', width = 440, className, children, style, ...rest
}: DrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const titleId = useId(), descId = useId();

  useEffect(() => {
    const el: HTMLElement | null = modal ? dialogRef.current : popRef.current;
    if (!el) return;
    if (open) {
      lastFocus.current = document.activeElement as HTMLElement | null;
      if (modal) { const d = el as HTMLDialogElement; if (!d.open) d.showModal(); }
      else if (!el.matches(':popover-open')) el.showPopover();
      requestAnimationFrame(() => {
        const target = initialFocusRef?.current ?? el.querySelector<HTMLElement>(`.ds-drawer__body ${FOCUSABLE}, .ds-drawer__footer ${FOCUSABLE}`) ?? el.querySelector<HTMLElement>('.ds-drawer__close') ?? el;
        target.focus({ preventScroll: true });
      });
    } else {
      if (modal) { const d = el as HTMLDialogElement; if (d.open) d.close(); }
      else if (el.matches(':popover-open')) el.hidePopover();
      lastFocus.current?.focus?.({ preventScroll: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, modal]);

  const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) { e.stopPropagation(); onClose(); } };

  const cls = ['ds-drawer', `ds-drawer--${placement}`, modal && 'ds-drawer--modal', className].filter(Boolean).join(' ');
  const st = { ['--dr-w' as string]: `${width}px`, ...style };
  const panel = (
    <>
      <header className="ds-drawer__header">
        <div className="ds-drawer__heading">
          <h2 id={titleId} className="ds-drawer__title">{title}</h2>
          {description && <p id={descId} className="ds-drawer__desc">{description}</p>}
        </div>
        <div className="ds-drawer__actions">
          {actions}
          <button type="button" className="ds-drawer__close" onClick={onClose} aria-label={closeLabel}><Icon name="x" size={18} /></button>
        </div>
      </header>
      <div className="ds-drawer__body">{children}</div>
      {footer && <footer className="ds-drawer__footer">{footer}</footer>}
    </>
  );

  if (modal) {
    return (
      <dialog
        ref={dialogRef} className={cls} style={st} aria-labelledby={titleId} aria-describedby={description ? descId : undefined}
        onCancel={(e) => { e.preventDefault(); onClose(); }}
        onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
        {...(rest as HTMLAttributes<HTMLDialogElement>)}
      >
        {panel}
      </dialog>
    );
  }
  return (
    <div
      ref={popRef} popover="manual" role="dialog" aria-labelledby={titleId} aria-describedby={description ? descId : undefined}
      tabIndex={-1} className={cls} style={st} onKeyDown={onKeyDown} {...rest}
    >
      {panel}
    </div>
  );
}
