import { forwardRef, type ReactNode, type SelectHTMLAttributes } from 'react';
import { Icon } from '../Icon/Icon';
import { FormField, useField, FIELD_ICON_SIZE, type FieldMessage, type FieldSize } from '../FormField/FormField';
import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'multiple'> {
  /** Visible label. Required for accessibility unless you pass `aria-label`. */
  label?: string;
  hideLabel?: boolean;
  description?: string;
  size?: FieldSize;
  messages?: FieldMessage[];
  /** Options as data. Use `children` (`<option>`, `<optgroup>`) when you need groups. */
  options?: SelectOption[];
  /**
   * Text of the empty first option, e.g. "Choose a country". It is a prompt, not a label,
   * and the user can't pick it again after choosing something.
   */
  placeholder?: string;
  reserveMessageSpace?: boolean;
  wrapperClassName?: string;
  children?: ReactNode;
}

/**
 * A styled native select. The browser draws the list, so it works with every keyboard, screen reader
 * and mobile picker. Multiple selection is deliberately not supported: use Checkboxes instead.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label, hideLabel, description, size = 'md', messages, options, placeholder, reserveMessageSpace,
    disabled, required, id: idProp, className, wrapperClassName, value, defaultValue, children, ...rest
  },
  ref,
) {
  const field = useField({ id: idProp, description, messages });
  const { id, descId, msgId, state } = field;
  const initial = value === undefined && defaultValue === undefined && placeholder ? '' : defaultValue;

  return (
    <FormField
      id={id} label={label} hideLabel={hideLabel} required={required}
      description={description} descId={descId} messages={messages} msgId={msgId} state={state}
      size={size} disabled={disabled} reserveMessageSpace={reserveMessageSpace}
      className={['ds-select', wrapperClassName].filter(Boolean).join(' ')}
    >
      <div className="ds-field__box ds-select__field">
        <select
          {...rest}
          ref={ref}
          id={id}
          className={['ds-field__control', 'ds-select__control', className].filter(Boolean).join(' ')}
          disabled={disabled}
          required={required}
          value={value}
          defaultValue={initial}
          aria-required={required || undefined}
          aria-invalid={state === 'error' || undefined}
          aria-describedby={field.describedBy()}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options?.map((o) => <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
          {children}
        </select>
        <span className="ds-select__chevron" aria-hidden="true"><Icon name="chevron-down" size={FIELD_ICON_SIZE[size]} /></span>
      </div>
    </FormField>
  );
});
