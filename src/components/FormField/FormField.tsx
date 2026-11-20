import { useId, type ReactNode, type Ref } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import './FormField.css';

/* ─────────────────────────────────────────────────────────────
 * FormField: the shared shell for every form control.
 * One place decides how a label, supporting text, validation
 * messages and a counter are laid out, linked (aria-describedby)
 * and announced. Input, Select, Checkbox, Radio and Toggle all
 * build on it, so they behave and read the same way.
 * ──────────────────────────────────────────────────────────── */

export type MessageType = 'error' | 'warning' | 'success' | 'info';
export type FieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface FieldMessage {
  type: MessageType;
  text: string;
}

const SEVERITY: MessageType[] = ['error', 'warning', 'success', 'info'];

/** Highest-severity message decides the field's visual state. */
export function fieldState(messages: FieldMessage[] = []): MessageType | undefined {
  return SEVERITY.find((t) => messages.some((m) => m.type === t));
}

export const MESSAGE_ICON: Record<MessageType, IconName> = {
  error: 'alert-circle', warning: 'alert-triangle', success: 'check-circle', info: 'info',
};

/** Icon pixel size that stays proportional to the control size. */
export const FIELD_ICON_SIZE: Record<FieldSize, number> = { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 };

/** Combine refs so a component can keep its own ref and still forward the consumer's. */
export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (el: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as { current: T | null }).current = el;
    }
  };
}

export interface UseFieldOptions {
  id?: string;
  description?: string;
  messages?: FieldMessage[];
}

/** Ids, state and the aria-describedby string for one field. */
export function useField({ id: idProp, description, messages }: UseFieldOptions) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const descId = description ? `${id}-desc` : undefined;
  const msgId = messages?.length ? `${id}-msg` : undefined;
  const state = fieldState(messages);

  /**
   * Order matters for screen readers: things that qualify the value first (`before`, e.g. a prefix),
   * then the supporting text, then the message, then anything extra (`after`, e.g. a counter).
   */
  const describedBy = (before: (string | undefined)[] = [], after: (string | undefined)[] = []) =>
    [...before, descId, msgId, ...after].filter(Boolean).join(' ') || undefined;

  return { id, descId, msgId, state, describedBy };
}

/** The list of validation messages. Every message carries an icon so colour is never the only signal. */
export function FieldMessages({ id, messages }: { id?: string; messages: FieldMessage[] }) {
  return (
    <ul className="ds-field__messages" id={id}>
      {messages.map((m, i) => (
        <li key={i} className={`ds-field__msg ds-field__msg--${m.type}`} role={m.type === 'error' ? 'alert' : undefined}>
          <Icon name={MESSAGE_ICON[m.type]} size={14} />
          <span>{m.text}</span>
        </li>
      ))}
    </ul>
  );
}

export interface FormFieldProps {
  /** Id of the control. The label points at it. */
  id: string;
  label?: ReactNode;
  /** Hide the label visually but keep it for screen readers. */
  hideLabel?: boolean;
  required?: boolean;
  /**
   * Supporting text. When `messages` are present they REPLACE it on screen so the layout doesn't shift;
   * it stays in the DOM for screen readers, read before the message.
   */
  description?: string;
  descId?: string;
  messages?: FieldMessage[];
  msgId?: string;
  /** Visual state, from `useField`. */
  state?: MessageType;
  size?: FieldSize;
  disabled?: boolean;
  readOnly?: boolean;
  /** `stacked`: label above the control (Input, Select). `inline`: control first, label beside it (Checkbox, Radio, Toggle). */
  layout?: 'stacked' | 'inline';
  /** Always keep one line of space under the field so messages appearing later don't shift the layout. */
  reserveMessageSpace?: boolean;
  /** Right side of the footer, e.g. a character counter. Stacked layout only. */
  footerEnd?: ReactNode;
  className?: string;
  /** The control itself. */
  children: ReactNode;
}

export function FormField({
  id, label, hideLabel, required, description, descId, messages, msgId, state, size,
  disabled, readOnly, layout = 'stacked', reserveMessageSpace, footerEnd, className, children,
}: FormFieldProps) {
  const cls = [
    'ds-field',
    `ds-field--${layout}`,
    size && `ds-field--${size}`,
    state && `ds-field--${state}`,
    disabled && 'is-disabled',
    readOnly && 'is-readonly',
    className,
  ].filter(Boolean).join(' ');

  const hasSupport = Boolean(description || msgId);
  const labelEl = label ? (
    <label className={`ds-field__label${hideLabel ? ' sr-only' : ''}`} htmlFor={id}>
      {label}
      {/* The asterisk stays in the accessible name. */}
      {required && <span className="ds-field__req"> *</span>}
    </label>
  ) : null;

  const support = (
    <>
      {description && <p className={msgId ? 'sr-only' : 'ds-field__desc'} id={descId}>{description}</p>}
      {msgId && <FieldMessages id={msgId} messages={messages!} />}
    </>
  );

  if (layout === 'inline') {
    return (
      <div className={cls}>
        <div className="ds-field__row">
          {children}
          {(labelEl || hasSupport) && (
            <div className="ds-field__text">
              {labelEl}
              {(hasSupport || reserveMessageSpace) && <div className="ds-field__support">{support}</div>}
            </div>
          )}
        </div>
      </div>
    );
  }

  const showFooter = hasSupport || Boolean(footerEnd) || reserveMessageSpace;
  return (
    <div className={cls}>
      {labelEl}
      {children}
      {showFooter && (
        <div className="ds-field__footer">
          <div className="ds-field__support">{support}</div>
          {footerEnd}
        </div>
      )}
    </div>
  );
}

export interface FieldGroupProps {
  /** Visible title of the group. Required: a group of controls needs a name. */
  legend: ReactNode;
  hideLegend?: boolean;
  description?: string;
  /** Messages about the whole group. They appear under the items. */
  messages?: FieldMessage[];
  required?: boolean;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  /** `radiogroup` for radios, `group` (default) for checkboxes and toggles. */
  role?: 'group' | 'radiogroup';
  id?: string;
  className?: string;
  children: ReactNode;
}

/** A fieldset and legend around related controls (checkboxes, radios, toggles). */
export function FieldGroup({
  legend, hideLegend, description, messages, required, disabled, orientation = 'vertical',
  role, id: idProp, className, children,
}: FieldGroupProps) {
  const { id, descId, msgId, state, describedBy } = useField({ id: idProp, description, messages });
  const cls = ['ds-group', state && `ds-group--${state}`, className].filter(Boolean).join(' ');
  return (
    <fieldset
      className={cls}
      id={id}
      disabled={disabled}
      role={role}
      aria-required={role === 'radiogroup' && required ? true : undefined}
      aria-describedby={describedBy()}
    >
      <legend className={`ds-group__legend${hideLegend ? ' sr-only' : ''}`}>
        {legend}
        {required && <span className="ds-field__req"> *</span>}
      </legend>
      {description && <p className="ds-field__desc" id={descId}>{description}</p>}
      <div className={`ds-group__items ds-group__items--${orientation}`}>{children}</div>
      {msgId && <FieldMessages id={msgId} messages={messages!} />}
    </fieldset>
  );
}
