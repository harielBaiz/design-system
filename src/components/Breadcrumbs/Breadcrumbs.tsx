import { useState, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import './Breadcrumbs.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  icon?: ReactNode;
}

export interface BreadcrumbsProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** The trail from the top level to the current page. The last item is the current page. */
  items: BreadcrumbItem[];
  /** Collapse the middle of a long trail into “…”. Keeps the first item and the last two. */
  maxItems?: number;
  /** Replace the default chevron. Purely visual. */
  separator?: ReactNode;
  'aria-label'?: string;
}

/** Shows where the current page sits in the site and gives a way back up. */
export function Breadcrumbs({ items, maxItems, separator, className, 'aria-label': ariaLabel = 'Breadcrumb', ...rest }: BreadcrumbsProps) {
  const [expanded, setExpanded] = useState(false);
  const collapse = !!maxItems && !expanded && items.length > maxItems;
  const head = collapse ? items.slice(0, 1) : items;
  const tail = collapse ? items.slice(-(maxItems! - 1 > 1 ? maxItems! - 1 : 1)) : [];
  const hidden = collapse ? items.slice(1, items.length - tail.length) : [];

  const sep = <span className="ds-crumbs__sep" aria-hidden="true">{separator ?? <Icon name="chevron-right" size={14} />}</span>;
  const renderItem = (item: BreadcrumbItem, last: boolean, key: string) => (
    <li key={key} className="ds-crumbs__item">
      {last ? (
        <span className="ds-crumbs__current" aria-current="page">{item.icon}{item.label}</span>
      ) : (
        <a className="ds-crumbs__link" href={item.href} onClick={item.onClick}>{item.icon}{item.label}</a>
      )}
      {!last && sep}
    </li>
  );

  return (
    <nav aria-label={ariaLabel} className={['ds-crumbs', className].filter(Boolean).join(' ')} {...rest}>
      <ol className="ds-crumbs__list">
        {head.map((it, i) => renderItem(it, !collapse && i === items.length - 1, `h${i}`))}
        {collapse && (
          <li className="ds-crumbs__item">
            <button type="button" className="ds-crumbs__more" onClick={() => setExpanded(true)} aria-label={`Show ${hidden.length} more`}>
              <Icon name="ellipsis" size={16} />
            </button>
            {sep}
          </li>
        )}
        {tail.map((it, i) => renderItem(it, i === tail.length - 1, `t${i}`))}
      </ol>
    </nav>
  );
}
