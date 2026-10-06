import { Icon } from '../Icon/Icon';
import './LangToggle.css';

export interface LangToggleProps {
  lang: 'en' | 'es';
  onToggle: (next: 'en' | 'es') => void;
}

/** EN / ES pill. The active language is emphasised; the button switches to the other one. */
export function LangToggle({ lang, onToggle }: LangToggleProps) {
  const next = lang === 'en' ? 'es' : 'en';
  return (
    <button type="button" className="ds-lang" onClick={() => onToggle(next)} aria-label={next === 'es' ? 'Cambiar a español' : 'Switch to English'}>
      <Icon name="globe" size={14} />
      <span className={lang === 'en' ? 'ds-lang__active' : undefined}>EN</span>
      <span aria-hidden="true">/</span>
      <span className={lang === 'es' ? 'ds-lang__active' : undefined}>ES</span>
    </button>
  );
}
