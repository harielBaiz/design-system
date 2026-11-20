import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Button, Breadcrumbs, Icon, Input } from '../src';
import { NAV, GITHUB_URL, LAB_URL, findTrail, firstPath, href, leaves, type NavNode } from './nav';
import { THEMES, type Theme } from './theme';
import { PAGES } from './pages';
import { Cards } from './ui';

/* ── sidebar ─────────────────────────────────────── */

function containsPath(node: NavNode, path: string): boolean {
  return node.path === path || !!node.children?.some((c) => containsPath(c, path));
}

function NavItem({ node, route, level, open, toggle, onNavigate }: {
  node: NavNode; route: string; level: number; open: Record<string, boolean>; toggle: (k: string) => void; onNavigate: () => void;
}) {
  if (node.children) {
    const isOpen = open[node.title + level] ?? containsPath(node, route);
    return (
      <li className={`dx-nav__group dx-nav__group--l${level}`}>
        <button type="button" className="dx-nav__toggle" aria-expanded={isOpen} onClick={() => toggle(node.title + level)}>
          {node.title}
          <Icon name="chevron-down" size={14} className="dx-nav__chev" />
        </button>
        {isOpen && (
          <ul className="dx-nav__list">
            {node.children.map((c) => <NavItem key={c.title} node={c} route={route} level={level + 1} open={open} toggle={toggle} onNavigate={onNavigate} />)}
          </ul>
        )}
      </li>
    );
  }
  if (node.external) {
    const outside = node.external.startsWith('http');
    return (
      <li className={`dx-nav__item dx-nav__item--l${level}`}>
        <a className="dx-nav__link" href={node.external} {...(outside ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {node.title}{node.icon && <Icon name={node.icon} size={12} />}
        </a>
      </li>
    );
  }
  return (
    <li className={`dx-nav__item dx-nav__item--l${level}`}>
      <a className="dx-nav__link" href={href(node.path!)} aria-current={node.path === route ? 'page' : undefined} onClick={onNavigate}>{node.title}</a>
    </li>
  );
}

function Sidebar({ route, onNavigate }: { route: string; onNavigate: () => void }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setOpen((o) => ({ ...o, [k]: !(o[k] ?? true) }));
  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return leaves().filter(({ node, trail }) => node.path && [node.title, ...trail.map((x) => x.title)].join(' ').toLowerCase().includes(t));
  }, [q]);

  return (
    <nav className="dx-nav" aria-label="Main">
      <div className="dx-nav__search">
        <Input label="Search" hideLabel type="search" size="sm" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} startIcon="search" />
      </div>
      {q.trim() ? (
        results.length ? (
          <ul className="dx-nav__list">
            {results.map(({ node, trail }) => (
              <li key={node.path} className="dx-nav__item dx-nav__item--l1">
                <a className="dx-nav__link dx-nav__link--result" href={href(node.path!)} onClick={() => { setQ(''); onNavigate(); }}>
                  {node.title}<span className="dx-nav__where">{trail.map((t) => t.title).join(' / ')}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : <p className="dx-nav__none" role="status">No pages match “{q}”.</p>
      ) : (
        <ul className="dx-nav__list">
          {NAV.map((n) => <NavItem key={n.title} node={n} route={route} level={0} open={open} toggle={toggle} onNavigate={onNavigate} />)}
        </ul>
      )}
    </nav>
  );
}

/* ── on this page ─────────────────────────────────── */

function Toc({ route }: { route: string }) {
  const [heads, setHeads] = useState<{ id: string; text: string; level: number }[]>([]);
  const [active, setActive] = useState('');
  const ioRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>('.dx-content h2[id], .dx-content h3[id]'));
      setHeads(els.filter((e) => !e.closest('.pal')).map((e) => ({ id: e.id, text: e.textContent ?? '', level: e.tagName === 'H2' ? 2 : 3 })));
      if (typeof IntersectionObserver === 'undefined') return;
      const io = new IntersectionObserver((entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      }, { rootMargin: '-80px 0px -70% 0px' });
      els.filter((e) => !e.closest('.pal')).forEach((e) => io.observe(e));
      ioRef.current?.disconnect();
      ioRef.current = io;
    }, 60);
    return () => { window.clearTimeout(t); ioRef.current?.disconnect(); };
  }, [route]);

  if (heads.length < 2) return null;
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    setActive(id);
  };
  return (
    <nav className="dx-toc" aria-label="On this page">
      <p className="dx-toc__title">On this page</p>
      <ul>
        {heads.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'dx-toc__sub' : undefined}>
            <a href={`#${route}`} aria-current={active === h.id ? 'location' : undefined} onClick={go(h.id)}>{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ── shell ────────────────────────────────────────── */

export function Shell({ route, theme, setTheme, onCopy }: { route: string; theme: Theme; setTheme: (t: Theme) => void; onCopy: () => void }) {
  const page = PAGES[route] ?? PAGES['/'];
  const known = !!PAGES[route];
  const [menu, setMenu] = useState(false);
  const h1 = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  const trail = findTrail(route);
  const crumbs = trail
    ? [...trail.trail.map((t) => ({ label: t.title, href: href(firstPath(t) ?? '/') })), { label: trail.node.title }]
    : [];

  useEffect(() => {
    document.title = route === '/' ? 'Design System — H. Ariel Baiz · Senior Product Designer' : `${page.title} · Design System — H. Ariel Baiz`;
    if (first.current) { first.current = false; return; }
    window.scrollTo(0, 0);
    h1.current?.focus({ preventScroll: true });
    setMenu(false);
  }, [route, page.title]);

  const Page = page.Component;
  return (
    <>
      <a className="site-skip" href="#main">Skip to content</a>
      <header className="dx-header">
        <Button iconOnly variant="ghost" className="dx-header__menu" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
          <Icon name={menu ? 'x' : 'menu'} size={18} />
        </Button>
        <a className="dx-brand" href={href('/')}><span className="dx-brand__mark" aria-hidden="true"><Icon name="sparkles" size={14} /></span>Design System<span className="dx-brand__by">H. Ariel Baiz</span></a>
        <div className="dx-header__right">
          <a className="dx-header__link" href={LAB_URL}>Lab</a>
          <a className="dx-header__link" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          <div className="site-theme" role="group" aria-label="Theme">
            {THEMES.map((t) => (
              <Button key={t.id} size="sm" variant={theme === t.id ? 'primary' : 'ghost'} pressed={theme === t.id} onPressedChange={() => setTheme(t.id)}>{t.label}</Button>
            ))}
          </div>
        </div>
      </header>

      <div className="dx-layout">
        <aside className={`dx-side${menu ? ' is-open' : ''}`}>
          <Sidebar route={route} onNavigate={() => setMenu(false)} />
        </aside>
        {menu && <button type="button" className="dx-backdrop" aria-label="Close menu" onClick={() => setMenu(false)} />}

        <main id="main" className="dx-main">
          <div className="dx-content">
            {page.bare ? (
              <h1 className="sr-only" ref={h1} tabIndex={-1}>Design System</h1>
            ) : (
              <header className="dx-pagehead">
                {crumbs.length > 0 && <Breadcrumbs items={crumbs} />}
                <div className="dx-pagehead__row">
                  <h1 className="dx-title" ref={h1} tabIndex={-1}>{page.title}</h1>
                  <Button size="sm" variant="secondary" startIcon={<Icon name="copy" size={14} />} onClick={() => { navigator.clipboard?.writeText(window.location.href).catch(() => {}); onCopy(); }}>Copy link</Button>
                </div>
                <p className="dx-lead">{page.lead}</p>
              </header>
            )}
            {!known && <p className="dx-note">That page does not exist, so here is the overview.</p>}
            <Page />

            {page.related && page.related.length > 0 && (
              <section className="dx-related" aria-labelledby="related">
                <h2 id="related" className="dx-h2">Related</h2>
                <Cards items={page.related.filter((p) => PAGES[p]).map((p) => ({ title: PAGES[p].title, text: String(PAGES[p].lead), path: p }))} />
              </section>
            )}
          </div>
          <footer className="dx-footer">
            <span>Part of my <a href={LAB_URL}>Lab</a>. Built with React, TypeScript, Storybook and Claude.</span>
            <span>General Sans from <a href="https://www.fontshare.com/fonts/general-sans" target="_blank" rel="noopener noreferrer">Fontshare</a>.</span>
          </footer>
        </main>

        <aside className="dx-right"><Toc route={route} /></aside>
      </div>
    </>
  );
}

export type { ReactNode };
