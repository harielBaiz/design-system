import { useState, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import '../ThemeToggle/ThemeToggle.css';
import './Nav.css';

export interface NavLink { label: string; href: string; current?: boolean }
export interface NavProps {
  brand: string;
  brandHref?: string;
  links: NavLink[];
  /** Right-side controls, e.g. <ThemeToggle/> and <LangToggle/>. */
  controls?: ReactNode;
}

/** Sticky top bar. Below 640px the links collapse behind a menu button. */
export function Nav({ brand, brandHref = '/', links, controls }: NavProps) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="ds-nav" aria-label="Main">
      <a className="ds-nav__brand" href={brandHref}>{brand}</a>
      <ul className={`ds-nav__links${open ? ' is-open' : ''}`} id="ds-nav-links">
        {links.map((l) => (
          <li key={l.href}><a href={l.href} aria-current={l.current ? 'page' : undefined}>{l.label}</a></li>
        ))}
      </ul>
      <div className="ds-nav__controls">
        {controls}
        <button type="button" className="ds-iconbtn ds-nav__toggle" aria-expanded={open} aria-controls="ds-nav-links" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? 'x' : 'menu'} size={18} />
        </button>
      </div>
    </nav>
  );
}
