import { useEffect, useId, useRef, type DialogHTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import './Modal.css';

export interface ModalProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, 'title' | 'open' | 'onClose'> {
  open: boolean;
  /** Called on Escape, on the close button and (if allowed) on a click outside. */
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  /** Buttons for the bottom of the dialog. The primary action goes last. */
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** `danger` is for destructive confirmations. It sets `role="alertdialog"`. */
  kind?: 'default' | 'danger';
  /** Allow closing with Escape, the close button and a click on the scrim. Turn off for forced choices. */
  dismissible?: boolean;
  closeLabel?: string;
}

/**
 * A dialog that blocks the page until it is answered. Built on the native `<dialog>`:
 * it traps focus, makes the page behind inert, closes on Escape and returns focus to the trigger.
 */
export function Modal({
  open, onClose, title, description, footer, size = 'md', kind = 'default', dismissible = true, closeLabel = 'Close',
  className, children, ...rest
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId(), descId = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={['ds-modal', `ds-modal--${size}`, kind === 'danger' && 'ds-modal--danger', className].filter(Boolean).join(' ')}
      role={kind === 'danger' ? 'alertdialog' : undefined}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onCancel={(e) => { e.preventDefault(); if (dismissible) onClose(); }}
      onClose={() => { if (open) onClose(); }}
      onMouseDown={(e) => { if (dismissible && e.target === e.currentTarget) onClose(); }}
      {...rest}
    >
      {open && (
        <div className="ds-modal__panel">
          <header className="ds-modal__header">
            <div className="ds-modal__heading">
              <h2 id={titleId} className="ds-modal__title">{title}</h2>
              {description && <p id={descId} className="ds-modal__desc">{description}</p>}
            </div>
            {dismissible && (
              <button type="button" className="ds-modal__close" onClick={onClose} aria-label={closeLabel}>
                <Icon name="x" size={18} />
              </button>
            )}
          </header>
          {children && <div className="ds-modal__body">{children}</div>}
          {footer && <footer className="ds-modal__footer">{footer}</footer>}
        </div>
      )}
    </dialog>
  );
}
