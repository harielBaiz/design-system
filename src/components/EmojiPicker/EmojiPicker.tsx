import { useId, useMemo, useRef, useState, type HTMLAttributes, type KeyboardEvent } from 'react';
import { Icon } from '../Icon/Icon';
import { EMOJI_CATEGORIES, type EmojiCategory } from './emojiData';
import './EmojiPicker.css';

export interface EmojiPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  onSelect: (emoji: string) => void;
  /** Replace the built-in set. */
  categories?: EmojiCategory[];
  /** Emoji shown first under “Recent”. The picker adds the ones people choose. */
  recent?: string[];
  columns?: number;
  searchLabel?: string;
}

/** A panel for choosing an emoji, with search and categories. Put it inside a `Popover` for a reaction or message picker. */
export function EmojiPicker({ onSelect, categories = EMOJI_CATEGORIES, recent: initialRecent = [], columns = 8, searchLabel = 'Search emoji', className, ...rest }: EmojiPickerProps) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<string>(categories[0]?.id ?? '');
  const [recent, setRecent] = useState<string[]>(initialRecent);
  const [active, setActive] = useState(0);
  const grid = useRef<HTMLDivElement>(null);
  const liveId = useId();

  const all = useMemo(() => categories.flatMap((c) => c.emojis), [categories]);
  const list: [string, string][] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) return all.filter(([, k]) => k.includes(q));
    if (cat === 'recent') return recent.map((e) => all.find(([x]) => x === e) ?? ([e, ''] as [string, string]));
    return categories.find((c) => c.id === cat)?.emojis ?? [];
  }, [query, cat, recent, categories, all]);

  const choose = (e: string) => {
    setRecent((r) => [e, ...r.filter((x) => x !== e)].slice(0, columns));
    onSelect(e);
  };
  const focusCell = (i: number) => {
    const n = Math.max(0, Math.min(list.length - 1, i));
    setActive(n);
    requestAnimationFrame(() => grid.current?.querySelectorAll<HTMLButtonElement>('[role="gridcell"]')[n]?.focus());
  };
  const onGridKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: columns, ArrowUp: -columns };
    if (e.key in map) { e.preventDefault(); focusCell(active + map[e.key]); }
    else if (e.key === 'Home') { e.preventDefault(); focusCell(0); }
    else if (e.key === 'End') { e.preventDefault(); focusCell(list.length - 1); }
  };

  const tabs: (EmojiCategory | { id: 'recent'; label: string; icon: string })[] = [
    ...(recent.length ? [{ id: 'recent' as const, label: 'Recent', icon: '🕘' }] : []),
    ...categories,
  ];
  const title = query ? 'Results' : tabs.find((t) => t.id === cat)?.label;

  return (
    <div className={['ds-emoji', className].filter(Boolean).join(' ')} {...rest}>
      <div className="ds-emoji__search">
        <Icon name="search" size={16} />
        <input
          type="search"
          className="ds-emoji__input"
          value={query}
          placeholder={searchLabel}
          aria-label={searchLabel}
          onChange={(e) => { setQuery(e.target.value); setActive(0); }}
          onKeyDown={(e) => { if (e.key === 'ArrowDown' && list.length) { e.preventDefault(); focusCell(0); } }}
        />
      </div>
      {!query && (
        <div className="ds-emoji__tabs" role="group" aria-label="Categories">
          {tabs.map((t) => (
            <button key={t.id} type="button" className="ds-emoji__tab" aria-pressed={cat === t.id} aria-label={t.label} title={t.label}
              onClick={() => { setCat(t.id); setActive(0); }}>
              <span aria-hidden="true">{t.icon}</span>
            </button>
          ))}
        </div>
      )}
      <p className="ds-emoji__title">{title}</p>
      {list.length ? (
        <div ref={grid} role="grid" aria-label={title} className="ds-emoji__grid" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }} onKeyDown={onGridKey}>
          {list.map(([e, name], i) => (
            <button key={e + i} type="button" role="gridcell" tabIndex={i === active ? 0 : -1} className="ds-emoji__cell"
              aria-label={name ? name.split(' ')[0] : e} title={name} onFocus={() => setActive(i)} onClick={() => choose(e)}>
              <span aria-hidden="true">{e}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="ds-emoji__empty">No emoji found for “{query}”.</p>
      )}
      <p id={liveId} className="ds-emoji__live" role="status" aria-live="polite">{query ? `${list.length} results` : ''}</p>
    </div>
  );
}
