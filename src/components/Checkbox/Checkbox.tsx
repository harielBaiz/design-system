import { forwardRef, useEffect, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { FormField, useField, mergeRefs, type FieldMessage } from '../FormField/FormField';
import './Checkbox.css';

export type CheckboxSize = 'sm' | 'md';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'prefix'> {
  /** Visible label. Clicking it toggles the box. Required for accessibility unless you pass `aria-label`. */
  label?: ReactNode;
  /** Hide the label visually but keep it for screen readers. */
  hideLabel?: boolean;
  /** Supporting text under the label. Messages replace it on screen. */
  description?: string;
  /** Validation feedback for this one box. For a set of boxes, put messages on the group instead. */
  messages?: FieldMessage[];
  size?: CheckboxSize;
  /**
   * "Mixed" state for a parent box whose children are partly checked.
   * Clicking it checks it; you decide what the children do.
   */
  indeterminate?: boolean;
  reserveMessageSpace?: boolean;
  /** Applied to the outer wrapper. */
  wrapperClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    label, hideLabel, description, messages, size = 'md', indeterminate, reserveMessageSpace,
    disabled, required, id: idProp, className, wrapperClassName, ...rest
  },
  ref,
) {
  const field = useField({ id: idProp, description, messages });
  const { id, descId, msgId, state } = field;
  const localRef = useRef<HTMLInputElement | null>(null);

  // `indeterminate` is a DOM property, not an attribute. Re-apply it after every render, because a click clears it natively.
  useEffect(() => {
    if (localRef.current) localRef.current.indeterminate = Boolean(indeterminate);
  });

  return (
    <FormField
      id={id} label={label} hideLabel={hideLabel} required={required}
      description={description} descId={descId} messages={messages} msgId={msgId} state={state}
      disabled={disabled} layout="inline" reserveMessageSpace={reserveMessageSpace}
      className={['ds-check', `ds-check--${size}`, wrapperClassName].filter(Boolean).join(' ')}
    >
      <span className="ds-check__control">
        <input
          {...rest}
          ref={mergeRefs(localRef, ref)}
          id={id}
          type="checkbox"
          className={['ds-check__input', className].filter(Boolean).join(' ')}
          disabled={disabled}
          required={required}
          aria-required={required || undefined}
          aria-invalid={state === 'error' || undefined}
          aria-describedby={field.describedBy()}
        />
        <span className="ds-check__box" aria-hidden="true">
          <Icon name="check" size={size === 'sm' ? 12 : 14} className="ds-check__tick" />
          <Icon name="minus" size={size === 'sm' ? 12 : 14} className="ds-check__dash" />
        </span>
      </span>
    </FormField>
  );
});
