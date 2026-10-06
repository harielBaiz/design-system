import './HeroFacts.css';

export interface HeroFactsProps {
  /** Two columns of label/value pairs. */
  columns: { label: string; value: string }[][];
}

/** Timeline / Role / Deliverables block under a case-study hero. Semantic <dl>. */
export function HeroFacts({ columns }: HeroFactsProps) {
  return (
    <dl className="ds-facts">
      {columns.map((col, i) => (
        <div className="ds-facts__col" key={i}>
          {col.map((f) => (
            <div className="ds-fact" key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
          ))}
        </div>
      ))}
    </dl>
  );
}
