import { Icon } from '../Icon/Icon';
import './ThemeToggle.css';

export interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: (next: 'light' | 'dark') => void;
}

/** Controlled: the consumer owns the theme and sets `data-theme` on <html>. Shows the icon of the mode you'd switch TO. */
export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button type="button" className="ds-iconbtn" onClick={() => onToggle(next)} aria-label={`Switch to ${next} mode`}>
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  );
}
