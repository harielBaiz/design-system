import { forwardRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { FormField, useField, type FieldMessage } from '../FormField/FormField';
import './Toggle.css';

export type ToggleSize = 'sm' | 'md';

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'role' | 'type' | 'onChange' | 'children'> {
  /** Visible label. Required for accessibility unless you pass `aria-label`. */
  label?: ReactNode;
  hideLabel?: boolean;
  description?: string;
  messages?: FieldMessage[];
  size?: ToggleSize;
  /** Controlled state. */
  checked?: boolean;
  defaultChecked?: boolean;
  /** Called with the new state. A toggle applies its effect immediately, so do the work here. */
  onCheckedChange?: (checked: boolean) => void;
  /** Show a check mark inside the thumb when on, so state is not carried by colour alone. Default true. */
  showIcon?: boolean;
  wrapperClassName?: string;
}

/**
 * A switch for a setting whose effect is immediate (like a light switch).
 * If the choice is only confirmed later by a Save or Submit button, use a Checkbox instead.
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  {
    label, hideLabel, description, messages, size = 'md', checked, defaultChecked = false,
    onCheckedChange, showIcon = true, disabled, id: idProp, className, wrapperClassName, onClick, ...rest
  },
  ref,
) {
  const field = useField({ id: idProp, description, messages });
  const { id, descId, msgId, state } = field;
  const [inner, setInner] = useState(defaultChecked);
  const on = checked !== undefined ? checked : inner;

  return (
    <FormField
      id={id} label={label} hideLabel={hideLabel}
      description={description} descId={descId} messages={messages} msgId={msgId} state={state}
      disabled={disabled} layout="inline"
      className={['ds-toggle', `ds-toggle--${size}`, wrapperClassName].filter(Boolean).join(' ')}
    >
      <button
        {...rest}
        ref={ref}
        id={id}
        type="button"
        role="switch"
        aria-checked={on}
        aria-describedby={field.describedBy()}
        disabled={disabled}
        className={['ds-toggle__track', className].filter(Boolean).join(' ')}
        onClick={(e) => {
          onClick?.(e);
          if (e.defaultPrevented) return;
          const next = !on;
          if (checked === undefined) setInner(next);
          onCheckedChange?.(next);
        }}
      >
        <span className="ds-toggle__thumb" aria-hidden="true">
          {showIcon && <Icon name="check" size={size === 'sm' ? 10 : 12} />}
        </span>
      </button>
    </FormField>
  );
});
