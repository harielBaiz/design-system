import type { ReactNode } from 'react';
import { Badge } from '../src';

/** One illustrated example, marked Do or Don't. The example is inert: it illustrates, it is not a control. */
export function DoDont({ kind, caption, children }: { kind: 'do' | 'dont'; caption: ReactNode; children: ReactNode }) {
  const isDo = kind === 'do';
  return (
    <figure className={`dd dd--${kind}`}>
      <Badge type={isDo ? 'positive' : 'critical'} startIcon={isDo ? 'check' : 'x'} className="dd__badge">{isDo ? 'Do' : 'Don’t'}</Badge>
      <div className="dd__example" inert>{children}</div>
      <figcaption className="dd__caption">{caption}</figcaption>
    </figure>
  );
}

/** A guideline with a title, a short explanation and a Do / Don't pair. */
export function BestPractice({ id, title, text, children }: { id?: string; title: string; text: ReactNode; children: ReactNode }) {
  const slug = id ?? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return (
    <section className="dd-practice" aria-labelledby={`bp-${slug}`}>
      <h3 id={slug} className="dx-h3"><span id={`bp-${slug}`}>{title}</span></h3>
      <p className="dx-p">{text}</p>
      <div className="dd-pair">{children}</div>
    </section>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return <pre className="dd-code"><code>{children}</code></pre>;
}
