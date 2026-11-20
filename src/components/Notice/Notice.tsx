import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import './Notice.css';

export type NoticeTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface NoticeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: NoticeTone;
  title?: ReactNode;
  /** Buttons or links placed under the message. */
  actions?: ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
  hideIcon?: boolean;
  icon?: IconName;
}

const ICON: Record<NoticeTone, IconName> = { info: 'info', success: 'check-circle', warning: 'alert-triangle', danger: 'alert-circle', neutral: 'info' };

/** An inline message about the content next to it. For the whole page use `Banner`. */
export function Notice({ tone = 'info', title, actions, onDismiss, dismissLabel = 'Dismiss', hideIcon, icon, className, children, ...rest }: NoticeProps) {
  const urgent = tone === 'danger' || tone === 'warning';
  return (
    <div role={urgent ? 'alert' : 'status'} className={['ds-notice', `ds-notice--${tone}`, className].filter(Boolean).join(' ')} {...rest}>
      {!hideIcon && <Icon name={icon ?? ICON[tone]} size={18} className="ds-notice__icon" />}
      <div className="ds-notice__body">
        {title && <p className="ds-notice__title">{title}</p>}
        {children && <div className="ds-notice__text">{children}</div>}
        {actions && <div className="ds-notice__actions">{actions}</div>}
      </div>
      {onDismiss && (
        <button type="button" className="ds-notice__close" onClick={onDismiss} aria-label={dismissLabel}>
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  );
}
