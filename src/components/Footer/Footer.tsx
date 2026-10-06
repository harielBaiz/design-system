import './Footer.css';

export interface FooterProps { text: string; links?: { label: string; href: string }[] }

export function Footer({ text, links = [] }: FooterProps) {
  return (
    <footer className="ds-footer">
      <p>{text}</p>
      {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
    </footer>
  );
}
