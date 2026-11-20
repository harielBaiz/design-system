import {
  forwardRef, useRef, useState,
  type ChangeEvent, type InputHTMLAttributes, type ReactNode, type Ref, type TextareaHTMLAttributes,
} from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { FormField, useField, FIELD_ICON_SIZE, mergeRefs, type FieldMessage, type MessageType } from '../FormField/FormField';
import './Input.css';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type InputType =
  | 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  | 'date' | 'time' | 'file' | 'color' | 'textarea';
export type { MessageType };
export type InputMessage = FieldMessage;

export interface InputLengthValidation {
  /** Minimum length: passed to the native `minlength`. The counter shows how many characters are still needed. */
  min?: number;
  /** Hard limit: passed to the native `maxlength`. */
  max?: number;
  /** Counter turns to warning at this length. Defaults to 90% of max. Ignored without `max`. */
  warnAt?: number;
}

type NativeProps = Omit<InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'type' | 'prefix'>;

export interface InputProps extends NativeProps {
  /** Visible label. Required for accessibility unless you pass `aria-label`. Never replace it with a placeholder. */
  label?: string;
  /** Hide the label visually but keep it for screen readers (e.g. a chat composer next to a Send button). */
  hideLabel?: boolean;
  /**
   * Supporting text under the field. When `messages` are present they REPLACE it on screen
   * (so the layout doesn't shift); it stays available to screen readers, read before the message.
   */
  description?: string;
  type?: InputType;
  size?: InputSize;
  /** Validation feedback. Show it only after the user has interacted with the field. */
  messages?: InputMessage[];
  /** Adds a live counter and sets native `minlength` / `maxlength`. */
  validate?: InputLengthValidation;
  /** Icon at the start of the field. `search` type gets a search icon by default. */
  startIcon?: IconName;
  /** Icon at the end of the field. */
  endIcon?: IconName;
  /** Text before the value, e.g. a currency symbol (`$`). Not for textarea. */
  prefixText?: string;
  /** Spoken name for the prefix, e.g. "US dollars". Falls back to the visible text. */
  prefixLabel?: string;
  /** Text after the value, e.g. a unit (`kg`) or an email domain (`@company.com`). Not for textarea. */
  suffixText?: string;
  suffixLabel?: string;
  /** `type="search"` only: show a clear button while there is text. Default true. */
  clearable?: boolean;
  /** Called after the clear button empties the field. */
  onClear?: () => void;
  /** Always keep one line of space under the field so messages appearing later don't shift the layout. */
  reserveMessageSpace?: boolean;
  /** Rows for `type="textarea"`. */
  rows?: number;
  /** Extra content at the end of the control. Prefer placing controls NEXT to the field. */
  endAdornment?: ReactNode;
  /** Applied to the outer wrapper. */
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(function Input(
  {
    label, hideLabel, description, type = 'text', size = 'md', messages, validate,
    startIcon, endIcon, endAdornment, prefixText, prefixLabel, suffixText, suffixLabel,
    clearable = true, onClear, reserveMessageSpace,
    rows = 3, disabled, readOnly, required,
    id: idProp, className, wrapperClassName, onChange, value, defaultValue, ...rest
  },
  ref,
) {
  const field = useField({ id: idProp, description, messages });
  const { id, descId, msgId, state } = field;
  const countId = validate ? `${id}-count` : undefined;
  const preId = prefixText ? `${id}-prefix` : undefined;
  const sufId = suffixText ? `${id}-suffix` : undefined;

  const localRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const setRefs = mergeRefs<HTMLInputElement | HTMLTextAreaElement>(localRef, ref);

  const [inner, setInner] = useState(String(defaultValue ?? ''));
  const current = value !== undefined ? String(value) : inner;
  const handleChange = (e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
    if (value === undefined) setInner(e.target.value);
    onChange?.(e);
  };

  const [revealed, setRevealed] = useState(false);
  const isPassword = type === 'password';
  const isTextarea = type === 'textarea';
  const isSearch = type === 'search';
  const nativeType = isPassword && revealed ? 'text' : type;

  const leading: IconName | undefined = startIcon ?? (isSearch ? 'search' : undefined);
  const iconPx = FIELD_ICON_SIZE[size];
  const showClear = isSearch && clearable && !disabled && !readOnly && current.length > 0;

  const clear = () => {
    const el = localRef.current as HTMLInputElement | null;
    if (!el) return;
    // Works for controlled and uncontrolled fields: set the native value and let React see an input event.
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(el, '');
    el.dispatchEvent(new Event('input', { bubbles: true }));
    onClear?.();
    el.focus();
  };

  const count = current.length;
  const max = validate?.max;
  const min = validate?.min;
  const warnAt = max !== undefined ? validate?.warnAt ?? Math.floor(max * 0.9) : undefined;
  const counterState = max !== undefined && warnAt !== undefined ? (count >= max ? 'error' : count >= warnAt ? 'warning' : undefined) : undefined;
  const needed = min !== undefined && count < min ? min - count : 0;
  const counterText = [
    max !== undefined ? `${count}/${max}` : `${count}`,
    needed > 0 ? `${needed} more needed (min ${min})` : null,
  ].filter(Boolean).join(' · ');

  // Order matters for screen readers: prefix, suffix, supporting text, then the message, then the counter.
  const describedBy = field.describedBy([preId, sufId], [countId]);

  const common = {
    id,
    disabled,
    readOnly,
    required,
    value: value !== undefined ? value : undefined,
    defaultValue,
    onChange: handleChange,
    maxLength: max,
    minLength: min,
    'aria-required': required || undefined,
    'aria-invalid': state === 'error' || undefined,
    'aria-describedby': describedBy,
    className: 'ds-field__control ds-input__control',
    ...rest,
  };

  const hasEnd = Boolean(endIcon || isPassword || showClear || endAdornment);
  const wrapCls = [
    'ds-input', `ds-input--${size}`,
    isTextarea && 'ds-input--textarea',
    leading && 'has-start', hasEnd && 'has-end',
    wrapperClassName,
  ].filter(Boolean).join(' ');

  return (
    <FormField
      id={id} label={label} hideLabel={hideLabel} required={required}
      description={description} descId={descId} messages={messages} msgId={msgId} state={state}
      size={size} disabled={disabled} readOnly={readOnly}
      reserveMessageSpace={reserveMessageSpace}
      className={wrapCls}
      footerEnd={validate && (
        <span id={countId} className={`ds-field__count${counterState ? ` ds-field__count--${counterState}` : ''}`} aria-live="polite">
          <span className="sr-only">Character count: </span>{counterText}
        </span>
      )}
    >
      <div className={['ds-field__box ds-input__field', className].filter(Boolean).join(' ')}>
        {leading && <span className="ds-input__icon ds-input__icon--start"><Icon name={leading} size={iconPx} /></span>}
        {prefixText && !isTextarea && (
          <span className="ds-input__affix" id={preId}>
            <span aria-hidden={prefixLabel ? true : undefined}>{prefixText}</span>
            {prefixLabel && <span className="sr-only">{prefixLabel}</span>}
          </span>
        )}

        {isTextarea ? (
          <textarea ref={setRefs as Ref<HTMLTextAreaElement>} rows={rows} {...(common as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
        ) : (
          <input ref={setRefs as Ref<HTMLInputElement>} type={nativeType} {...(common as InputHTMLAttributes<HTMLInputElement>)} />
        )}

        {suffixText && !isTextarea && (
          <span className="ds-input__affix" id={sufId}>
            <span aria-hidden={suffixLabel ? true : undefined}>{suffixText}</span>
            {suffixLabel && <span className="sr-only">{suffixLabel}</span>}
          </span>
        )}

        {showClear && (
          <button type="button" className="ds-input__toggle" onClick={clear} aria-label="Clear search">
            <Icon name="x" size={iconPx} />
          </button>
        )}
        {isPassword ? (
          <button
            type="button"
            className="ds-input__toggle"
            onClick={() => setRevealed((r) => !r)}
            aria-label={revealed ? 'Hide password' : 'Show password'}
            aria-pressed={revealed}
            disabled={disabled}
          >
            <Icon name={revealed ? 'eye-off' : 'eye'} size={iconPx} />
          </button>
        ) : endIcon ? (
          <span className="ds-input__icon ds-input__icon--end"><Icon name={endIcon} size={iconPx} /></span>
        ) : null}
        {endAdornment && <span className="ds-input__adornment">{endAdornment}</span>}
      </div>

    </FormField>
  );
});
