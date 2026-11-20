import {
  createContext, forwardRef, useContext, useId, useState,
  type ChangeEvent, type InputHTMLAttributes, type ReactNode,
} from 'react';
import { FormField, FieldGroup, useField, type FieldMessage, type FieldGroupProps } from '../FormField/FormField';
import './Radio.css';

export type RadioSize = 'sm' | 'md';

interface RadioGroupContext {
  name: string;
  value: string | undefined;
  disabled?: boolean;
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
}
const GroupCtx = createContext<RadioGroupContext | null>(null);

export interface RadioGroupProps extends Omit<FieldGroupProps, 'role' | 'children'> {
  /** Shared `name` of the radios. Generated if omitted. */
  name?: string;
  /** Controlled value. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

/**
 * A set of mutually exclusive options. The native arrow-key behavior comes from the shared `name`:
 * Tab enters the group once, arrows move and select.
 */
export function RadioGroup({ name, value, defaultValue, onValueChange, disabled, children, ...group }: RadioGroupProps) {
  const autoName = useId();
  const [inner, setInner] = useState(defaultValue);
  const current = value !== undefined ? value : inner;
  const onSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setInner(e.target.value);
    onValueChange?.(e.target.value);
  };
  return (
    <GroupCtx.Provider value={{ name: name ?? autoName, value: current, disabled, onSelect }}>
      <FieldGroup {...group} role="radiogroup" disabled={disabled}>{children}</FieldGroup>
    </GroupCtx.Provider>
  );
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'prefix' | 'value'> {
  /** Value this option submits. Required. */
  value: string;
  label?: ReactNode;
  hideLabel?: boolean;
  description?: string;
  messages?: FieldMessage[];
  size?: RadioSize;
  wrapperClassName?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, hideLabel, description, messages, size = 'md', value, disabled, id: idProp, className, wrapperClassName, onChange, ...rest },
  ref,
) {
  const group = useContext(GroupCtx);
  const field = useField({ id: idProp, description, messages });
  const { id, descId, msgId, state } = field;
  const inGroup = Boolean(group);
  const isDisabled = disabled || group?.disabled;

  return (
    <FormField
      id={id} label={label} hideLabel={hideLabel}
      description={description} descId={descId} messages={messages} msgId={msgId} state={state}
      disabled={isDisabled} layout="inline"
      className={['ds-radio', `ds-radio--${size}`, wrapperClassName].filter(Boolean).join(' ')}
    >
      <span className="ds-radio__control">
        <input
          {...rest}
          ref={ref}
          id={id}
          type="radio"
          value={value}
          name={group?.name ?? rest.name}
          checked={inGroup ? group!.value === value : rest.checked}
          onChange={(e) => { group?.onSelect(e); onChange?.(e); }}
          className={['ds-radio__input', className].filter(Boolean).join(' ')}
          disabled={isDisabled}
          aria-describedby={field.describedBy()}
        />
        <span className="ds-radio__box" aria-hidden="true" />
      </span>
    </FormField>
  );
});
