import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Chip } from '../Chip/Chip';
import './CaseRow.css';

export interface CaseRowProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
  title: string;
  description: string;
  tags?: string[];
  imageSrc?: string;
  imageAlt?: string;
  /** Spans two grid columns, wider 21:9 crop. */
  wide?: boolean;
  /** Overlay slot on the image, e.g. a `<Badge tone="overlay">`. */
  badge?: ReactNode;
}

/** Image-led case-study card (portfolio `.case-row`). */
export function CaseRow({ title, description, tags = [], imageSrc, imageAlt = '', wide, badge, className, ...rest }: CaseRowProps) {
  return (
    <a className={['ds-case', wide && 'ds-case--wide', className].filter(Boolean).join(' ')} {...rest}>
      <figure className="ds-case__image">
        {imageSrc && <img src={imageSrc} alt={imageAlt} />}
        {badge && <span className="ds-case__badge">{badge}</span>}
      </figure>
      <div>
        {tags.length > 0 && <div className="ds-case__tags">{tags.map((t) => <Chip key={t}>{t}</Chip>)}</div>}
        <h3 className="ds-case__title">{title}</h3>
        <p className="ds-case__desc">{description}</p>
      </div>
    </a>
  );
}
