import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'text' | 'inverse' | 'inverse-outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface SharedProps {
  /** Visual weight. Use ONE `primary` per page or area. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Square, icon-only button. Provide `aria-label`. */
  iconOnly?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  /** Stretch to the width of the container (e.g. login forms). */
  fullWidth?: boolean;
}

function classes({ variant = 'primary', size = 'md', iconOnly, fullWidth, loading, className }: SharedProps & { loading?: boolean; className?: string }) {
  return ['ds-btn', `ds-btn--${variant}`, `ds-btn--${size}`, iconOnly && 'ds-btn--icon', fullWidth && 'ds-btn--full', loading && 'is-loading', className].filter(Boolean).join(' ');
}

export interface ButtonProps extends SharedProps, ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Shows a spinner and ignores clicks while work is in progress.
   * Prefer this to `disabled`: the button stays focusable and announces `aria-busy`.
   */
  loading?: boolean;
  /**
   * Makes this a toggle button for binary choices (Save, Favorite). Controlled: pass `pressed` and `onPressedChange`.
   * Sets `aria-pressed`. Keep the label length similar in both states and swap an outline icon for a filled one.
   */
  pressed?: boolean;
  onPressedChange?: (next: boolean) => void;
}

/** Triggers an action on the current page. For navigation use `LinkButton`. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, iconOnly, fullWidth, startIcon, endIcon, loading, pressed, onPressedChange, className, children, type = 'button', onClick, ...rest },
  ref,
) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (loading) { e.preventDefault(); return; }
    onClick?.(e);
    if (pressed !== undefined) onPressedChange?.(!pressed);
  };
  return (
    <button
      ref={ref}
      type={type}
      className={classes({ variant, size, iconOnly, fullWidth, loading, className })}
      aria-busy={loading || undefined}
      aria-pressed={pressed}
      onClick={handleClick}
      {...rest}
    >
      {loading && <span className="ds-btn__spinner" aria-hidden="true" />}
      <span className="ds-btn__content">{startIcon}<span className="ds-btn__label">{children}</span>{endIcon}</span>
      {loading && <span className="sr-only">Loading</span>}
    </button>
  );
});

export interface LinkButtonProps extends SharedProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  /** Opens in a new tab with a safe `rel`. */
  external?: boolean;
}

/** Looks like a Button but is a real link: it navigates (URL changes). Use for "View case study", "Download CV". */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(function LinkButton(
  { variant = 'secondary', size, iconOnly, fullWidth, startIcon, endIcon, external, className, children, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      className={classes({ variant, size, iconOnly, fullWidth, className })}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      <span className="ds-btn__content">{startIcon}<span className="ds-btn__label">{children}</span>{endIcon}</span>
    </a>
  );
});
