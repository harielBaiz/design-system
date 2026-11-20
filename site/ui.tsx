import type { ReactNode } from 'react';
import { Icon } from '../src';
import { STORYBOOK_URL, href } from './nav';

const slug = (t: ReactNode) => String(t).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
export const H2 = ({ children, id }: { children: ReactNode; id?: string }) => <h2 id={id ?? slug(children)} className="dx-h2">{children}</h2>;
export const H3 = ({ children, id }: { children: ReactNode; id?: string }) => <h3 id={id ?? slug(children)} className="dx-h3">{children}</h3>;
export const P = ({ children }: { children: ReactNode }) => <p className="dx-p">{children}</p>;
export const Note = ({ children }: { children: ReactNode }) => <p className="dx-note">{children}</p>;
export const Ul = ({ items }: { items: ReactNode[] }) => <ul className="dx-ul">{items.map((i, k) => <li key={k}>{i}</li>)}</ul>;

export function Cards({ items }: { items: { title: string; text: string; path: string }[] }) {
  return (
    <ul className="dx-cards">
      {items.map((c) => (
        <li key={c.path}>
          <a className="dx-card" href={href(c.path)}>
            <span className="dx-card__title">{c.title}<Icon name="arrow-right" size={16} /></span>
            <span className="dx-card__text">{c.text}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** The components that belong to a group, each linking to its Storybook docs. */
export function ComponentList({ items }: { items: { name: string; text: string }[] }) {
  return (
    <ul className="dx-complist">
      {items.map((c) => (
        <li key={c.name}>
          <a href={STORYBOOK_URL} className="dx-complist__name">{c.name}<Icon name="arrow-up-right" size={12} /></a>
          <span className="dx-complist__text">{c.text}</span>
        </li>
      ))}
    </ul>
  );
}
