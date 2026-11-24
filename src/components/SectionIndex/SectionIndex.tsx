import { useEffect, useRef, useState, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import './SectionIndex.css';

export interface SectionIndexItem {
  /** The `id` of the section on the page. */
  id: string;
  label: ReactNode;
}

export interface SectionIndexProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Names the navigation for screen readers, for example “Case study sections”. */
  'aria-label': string;
  items: SectionIndexItem[];
  /**
   * `inline` sits in the page flow (a sidebar or an “On this page” list).
   * `rail` floats in the left margin and stays out of the way until it is needed.
   */
  placement?: 'inline' | 'rail';
  /** Rail only: show the index once this element (a CSS selector, for example `.hero-sub`) has scrolled out of view. Without it the rail is always visible. */
  revealAfter?: string;
  /** Rail only: hide the index while this element (a CSS selector, for example `footer`) reaches the middle of the screen. */
  hideOver?: string;
  /** Where a section counts as “current”. Default: its top is in the upper quarter of the viewport. */
  rootMargin?: string;
  /** Called when the current section changes. */
  onActiveChange?: (id: string) => void;
}

/**
 * A list of links to the sections of a long page. The link of the section being read is marked.
 * Built for case studies and docs: it shows where you are and lets you jump.
 */
export function SectionIndex({
  items, placement = 'inline', revealAfter, hideOver, rootMargin = '-15% 0px -75% 0px', onActiveChange, className, ...rest
}: SectionIndexProps) {
  const [active, setActive] = useState<string | null>(null);
  const [shown, setShown] = useState(placement === 'inline' || !revealAfter);
  const [overFooter, setOverFooter] = useState(false);
  const cb = useRef(onActiveChange);
  cb.current = onActiveChange;
  const key = items.map((i) => i.id).join('|');

  // Current section
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        setActive(e.target.id);
        cb.current?.(e.target.id);
      }
    }, { rootMargin });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, rootMargin]);

  // Rail: reveal once the hero has scrolled past
  useEffect(() => {
    if (placement !== 'rail' || !revealAfter) { setShown(true); return; }
    const el = document.querySelector(revealAfter);
    if (!el) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => setShown(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [placement, revealAfter]);

  // Rail: step aside for the footer
  useEffect(() => {
    if (placement !== 'rail' || !hideOver) return;
    const el = document.querySelector(hideOver);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOverFooter(e.isIntersecting), { rootMargin: '0px 0px -40% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [placement, hideOver]);

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault(); // keeps working on pages that use the hash for routing
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
    setActive(id);
  };

  const cls = ['ds-secindex', `ds-secindex--${placement}`, shown && 'is-visible', overFooter && 'is-over-footer', className].filter(Boolean).join(' ');
  return (
    <nav className={cls} {...rest}>
      <ol>
        {items.map((it, i) => (
          <li key={it.id} style={{ ['--i' as string]: i }}>
            <a href={`#${it.id}`} aria-current={active === it.id ? 'location' : undefined} className={active === it.id ? 'is-active' : undefined} onClick={(e) => go(e, it.id)}>
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
