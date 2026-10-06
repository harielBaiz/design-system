import { CopyButton } from '../CopyButton/CopyButton';
import './ContactSection.css';

export interface ContactSectionProps {
  title: string;
  body?: string;
  email: string;
  links?: { label: string; href: string }[];
}

/** Full-bleed inverse section: headline, copyable email, secondary text links. */
export function ContactSection({ title, body, email, links = [] }: ContactSectionProps) {
  return (
    <section className="ds-contact" aria-labelledby="ds-contact-title">
      <h2 id="ds-contact-title">{title}</h2>
      {body && <p>{body}</p>}
      <span className="ds-contact__email">
        <a href={`mailto:${email}`} className="ds-contact__link" style={{ padding: 0, color: 'inherit', font: 'inherit' }}>{email}</a>
        <CopyButton value={email} label="Copy email" />
      </span>
      {links.length > 0 && (
        <div className="ds-contact__actions">
          {links.map((l) => <a key={l.href} href={l.href} className="ds-contact__link">{l.label}</a>)}
        </div>
      )}
    </section>
  );
}
