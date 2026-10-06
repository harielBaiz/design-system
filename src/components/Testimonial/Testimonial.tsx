import { Icon } from '../Icon/Icon';
import './Testimonial.css';

export interface TestimonialProps {
  quote: string;
  role: string;
  moment?: string;
  /** `large` = pull-quote with icon; `compact` = card. */
  size?: 'large' | 'compact';
}

export function Testimonial({ quote, role, moment, size = 'large' }: TestimonialProps) {
  return (
    <figure className={`ds-quote${size === 'compact' ? ' ds-quote--sm' : ''}`}>
      {size === 'large' && <Icon name="quote" size={48} className="ds-quote__icon" />}
      <blockquote style={{ margin: 0 }}><p className="ds-quote__text">{quote}</p></blockquote>
      <figcaption className="ds-quote__meta">
        <span className="ds-quote__role">{role}</span>
        {moment && <span className="ds-quote__moment">{moment}</span>}
      </figcaption>
    </figure>
  );
}
