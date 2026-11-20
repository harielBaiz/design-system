import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import './Banner.css';

export type BannerTone = 'info' | 'success' | 'warning' | 'danger' | 'brand';

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: BannerTone;
  title?: ReactNode;
  /** A button or link shown after the message. */
  action?: ReactNode;
  /** Shows a close button. The page decides what happens (hide it, remember it). */
  onDismiss?: () => void;
  dismissLabel?: string;
  hideIcon?: boolean;
  icon?: IconName;
}

const ICON: Record<BannerTone, IconName> = { info: 'info', success: 'check-circle', warning: 'alert-triangle', danger: 'alert-circle', brand: 'sparkles' };

/** A message for the whole page or app, placed at the very top. For a message inside content use `Notice`. */
export function Banner({ tone = 'info', title, action, onDismiss, dismissLabel = 'Dismiss', hideIcon, icon, className, children, ...rest }: BannerProps) {
  const urgent = tone === 'danger' || tone === 'warning';
  return (
    <div role={urgent ? 'alert' : 'status'} className={['ds-banner', `ds-banner--${tone}`, className].filter(Boolean).join(' ')} {...rest}>
      <div className="ds-banner__inner">
        {!hideIcon && <Icon name={icon ?? ICON[tone]} size={18} className="ds-banner__icon" />}
        <p className="ds-banner__text">
          {title && <strong className="ds-banner__title">{title} </strong>}
          {children}
        </p>
        {action && <div className="ds-banner__action">{action}</div>}
      </div>
      {onDismiss && (
        <button type="button" className="ds-banner__close" onClick={onDismiss} aria-label={dismissLabel}>
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  );
}
