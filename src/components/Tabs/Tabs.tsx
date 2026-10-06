import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import './Tabs.css';

export interface TabItem { id: string; label: string; content: ReactNode }
export interface TabsProps { items: TabItem[]; defaultId?: string; 'aria-label': string }

/** WAI-ARIA tabs with roving tabindex and ←/→/Home/End keys. Used by the AI agent (Ask / Fight). */
export function Tabs({ items, defaultId, 'aria-label': ariaLabel }: TabsProps) {
  const base = useId();
  const [active, setActive] = useState(defaultId ?? items[0]?.id);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKey = (e: KeyboardEvent, index: number) => {
    const last = items.length - 1;
    const map: Record<string, number> = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last };
    if (!(e.key in map)) return;
    e.preventDefault();
    const target = items[map[e.key]].id;
    setActive(target);
    refs.current[target]?.focus();
  };

  return (
    <div className="ds-tabs">
      <div className="ds-tabs__list" role="tablist" aria-label={ariaLabel}>
        {items.map((t, i) => (
          <button
            key={t.id} ref={(el) => { refs.current[t.id] = el; }}
            role="tab" id={`${base}-tab-${t.id}`} aria-controls={`${base}-panel-${t.id}`}
            aria-selected={active === t.id} tabIndex={active === t.id ? 0 : -1}
            className="ds-tabs__tab" onClick={() => setActive(t.id)} onKeyDown={(e) => onKey(e, i)}
          >{t.label}</button>
        ))}
      </div>
      {items.map((t) => (
        <div key={t.id} role="tabpanel" id={`${base}-panel-${t.id}`} aria-labelledby={`${base}-tab-${t.id}`} hidden={active !== t.id} className="ds-tabs__panel">
          {t.content}
        </div>
      ))}
    </div>
  );
}
