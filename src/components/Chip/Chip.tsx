import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import './Chip.css';

export interface ChipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'onClick'> {
  /** The value the chip stands for. */
  children: ReactNode;
  /** `sm` 24px, `md` 32px, `lg` 40px. */
  size?: 'sm' | 'md' | 'lg';
  /** Makes the chip a button. Chips are not interactive by default. */
  interactive?: boolean;
  /** Called when an interactive chip is activated. */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Toggle state for an interactive chip (filters). Sets `aria-pressed`. */
  selected?: boolean;
  /** Shows a close button and calls this when it is pressed. Without it there is no close button. */
  onClose?: () => void;
  /** Accessible name for the close button. The chip text is appended. */
  closeLabel?: string;
  disabled?: boolean;
  /** An icon name or your own icon, shown before the label. */
  startIcon?: IconName | ReactNode;
  /** An `Avatar`, shown before the label. Takes the place of `startIcon`. */
  avatar?: ReactNode;
  /** Longest the chip may grow before the label truncates. Any CSS length. */
  maxWidth?: string | number;
}

/**
 * A token for a value people selected, a filter they can toggle, or an item they can remove.
 * For a passive status or count, use `Badge`.
 */
export function Chip({
  children, size = 'md', interactive, onClick, selected, onClose, closeLabel = 'Remove', disabled, startIcon, avatar, maxWidth,
  className, style, ...rest
}: ChipProps) {
  const cls = ['ds-chip', `ds-chip--${size}`, interactive && 'is-interactive', selected && 'is-selected', disabled && 'is-disabled', className]
    .filter(Boolean).join(' ');
  const lead = avatar ?? (startIcon ? (typeof startIcon === 'string' ? <Icon name={startIcon as IconName} size={size === 'sm' ? 12 : 14} /> : startIcon) : null);
  const label = typeof children === 'string' ? children : undefined;
  const inner = <span className="ds-chip__label">{children}</span>;

  return (
    <span className={cls} style={{ maxWidth, ...style }} aria-disabled={disabled || undefined} {...rest}>
      {interactive ? (
        <button
          type="button"
          className="ds-chip__main"
          disabled={disabled}
          aria-pressed={selected === undefined ? undefined : selected}
          onClick={onClick}
        >
          {lead && <span className="ds-chip__lead">{lead}</span>}
          {inner}
        </button>
      ) : (
        <span className="ds-chip__main">
          {lead && <span className="ds-chip__lead">{lead}</span>}
          {inner}
        </span>
      )}
      {onClose && (
        <button
          type="button"
          className="ds-chip__close"
          disabled={disabled}
          onClick={onClose}
          aria-label={label ? `${closeLabel} ${label}` : closeLabel}
        >
          <Icon name="x" size={12} />
        </button>
      )}
    </span>
  );
}

export interface ChipGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Names the set for screen readers. */
  'aria-label': string;
}

/** Wraps related chips. Chips wrap onto new lines and keep an even gap. */
export function ChipGroup({ className, ...rest }: ChipGroupProps) {
  return <div role="group" className={['ds-chip-group', className].filter(Boolean).join(' ')} {...rest} />;
}
