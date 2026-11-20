import { useCallback, useEffect, useRef, useState, type CSSProperties, type HTMLAttributes } from 'react';
import { Icon } from '../Icon/Icon';
import './Scroller.css';

export interface ScrollerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  direction?: 'vertical' | 'horizontal';
  /** Height limit for vertical scrollers (CSS length). */
  maxHeight?: CSSProperties['maxHeight'];
  /** Fade the edges that have more content. */
  fade?: boolean;
  /** Previous and next buttons for horizontal scrollers, for pointer users. */
  showButtons?: boolean;
  /** Names the scrollable region. Required so keyboard and screen reader users know what they are scrolling. */
  'aria-label': string;
  children: React.ReactNode;
}

/** A scroll container with a quiet scrollbar, edge fades that hint at more content, and keyboard access. */
export function Scroller({ direction = 'vertical', maxHeight, fade = true, showButtons, className, style, children, 'aria-label': label, ...rest }: ScrollerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: true });
  const horizontal = direction === 'horizontal';

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const pos = horizontal ? el.scrollLeft : el.scrollTop;
    const max = (horizontal ? el.scrollWidth - el.clientWidth : el.scrollHeight - el.clientHeight);
    setEdge({ start: pos <= 1, end: pos >= max - 1 });
  }, [horizontal]);

  useEffect(() => {
    measure();
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    Array.from(el.children).forEach((c) => ro.observe(c));
    return () => ro.disconnect();
  }, [measure, children]);

  const nudge = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const by = (horizontal ? el.clientWidth : el.clientHeight) * 0.8 * dir;
    el.scrollBy({ [horizontal ? 'left' : 'top']: by, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  const overflow = !(edge.start && edge.end);
  return (
    <div className={['ds-scroller', `ds-scroller--${direction}`, className].filter(Boolean).join(' ')} style={style} {...rest}>
      <div
        ref={ref}
        className={['ds-scroller__viewport', fade && 'has-fade', edge.start && 'at-start', edge.end && 'at-end'].filter(Boolean).join(' ')}
        style={{ maxHeight: horizontal ? undefined : maxHeight }}
        role="region"
        aria-label={label}
        tabIndex={overflow ? 0 : undefined}
        onScroll={measure}
      >
        {children}
      </div>
      {horizontal && showButtons && overflow && (
        <>
          <button type="button" className="ds-scroller__btn ds-scroller__btn--prev" tabIndex={-1} aria-hidden="true" hidden={edge.start} onClick={() => nudge(-1)}><Icon name="chevron-left" size={16} /></button>
          <button type="button" className="ds-scroller__btn ds-scroller__btn--next" tabIndex={-1} aria-hidden="true" hidden={edge.end} onClick={() => nudge(1)}><Icon name="chevron-right" size={16} /></button>
        </>
      )}
    </div>
  );
}
