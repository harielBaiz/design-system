import { useRef, useState, type KeyboardEvent } from 'react';
import { Input, type InputSize } from '../Input/Input';
import { Button } from '../Button/Button';
import { Chip } from '../Chip/Chip';
import { Icon } from '../Icon/Icon';
import './ChatComposer.css';

export interface ChatComposerProps {
  /** Called with the trimmed text when the user presses Send or Enter. Return a promise to keep the composer busy until it settles. */
  onSend: (text: string) => void | Promise<void>;
  /** Suggested prompts, shown as action chips until the first message. */
  suggestions?: string[];
  placeholder?: string;
  /** Accessible name for the field. */
  label?: string;
  maxLength?: number;
  size?: InputSize;
  /** Grow to a textarea: Enter sends, Shift+Enter adds a new line. */
  multiline?: boolean;
  disabled?: boolean;
  /** Disables the field and shows a busy Send button. */
  loading?: boolean;
  /** Error text under the field (e.g. rate limit). */
  error?: string;
}

/**
 * Message input for the AI agent: Input + Send button + suggested prompts.
 * Enter sends, empty messages are ignored, the field refocuses after sending.
 */
export function ChatComposer({
  onSend, suggestions = [], placeholder = 'Type your question', label = 'Your question',
  maxLength = 1000, size = 'lg', multiline, disabled, loading, error,
}: ChatComposerProps) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [used, setUsed] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const locked = disabled || loading || busy;

  const send = async (raw: string) => {
    if (locked) return;
    const msg = raw.trim();
    if (!msg) { setEmptyError(true); ref.current?.focus(); return; }
    setEmptyError(false);
    setUsed(true);
    setText('');
    setBusy(true);
    try { await onSend(msg); } finally { setBusy(false); ref.current?.focus(); }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Enter' || e.nativeEvent.isComposing) return;
    if (multiline && e.shiftKey) return;
    e.preventDefault();
    void send(text);
  };

  return (
    <div className="ds-composer">
      {!used && suggestions.length > 0 && (
        <div className="ds-composer__chips">
          {suggestions.map((s) => <Chip key={s} variant="action" disabled={locked} onClick={() => void send(s)}>{s}</Chip>)}
        </div>
      )}
      <div className="ds-composer__row">
        <Input
          ref={ref}
          hideLabel
          label={label}
          size={size}
          type={multiline ? 'textarea' : 'text'}
          rows={2}
          placeholder={placeholder}
          value={text}
          maxLength={maxLength}
          autoComplete="off"
          disabled={locked}
          onChange={(e) => { setText(e.target.value); if (emptyError) setEmptyError(false); }}
          onKeyDown={onKeyDown}
          messages={error ? [{ type: 'error', text: error }] : emptyError ? [{ type: 'error', text: 'Type a question first.' }] : undefined}
        />
        <Button
          size={size === 'xl' ? 'lg' : size === 'lg' ? 'lg' : 'md'}
          iconOnly
          aria-label="Send message"
          loading={loading || busy}
          disabled={disabled}
          onClick={() => void send(text)}
        >
          <Icon name="send" size={18} />
        </Button>
      </div>
      {multiline && <p className="ds-composer__hint">Enter to send, Shift+Enter for a new line.</p>}
    </div>
  );
}
