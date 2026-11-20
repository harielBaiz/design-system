import type { CSSProperties, HTMLAttributes } from 'react';
import './Skeleton.css';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** `text` is a line of text, `rect` a block (image, card), `circle` an avatar. */
  shape?: 'text' | 'rect' | 'circle';
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  /** Number of text lines. The last one is shorter. */
  lines?: number;
  /** Turn off the shimmer. */
  still?: boolean;
}

/** A grey placeholder in the shape of content that is still loading. It is decorative, so hide it from assistive tech. */
export function Skeleton({ shape = 'text', width, height, lines = 1, still, className, style, ...rest }: SkeletonProps) {
  const cls = ['ds-skeleton', `ds-skeleton--${shape}`, still && 'is-still', className].filter(Boolean).join(' ');
  if (shape === 'text' && lines > 1) {
    return (
      <div className="ds-skeleton-lines" aria-hidden="true" style={{ width, ...style }} {...rest}>
        {Array.from({ length: lines }, (_, i) => <span key={i} className={cls} style={{ width: i === lines - 1 ? '60%' : '100%' }} />)}
      </div>
    );
  }
  const size: CSSProperties = shape === 'circle' ? { width: width ?? 40, height: height ?? width ?? 40 } : { width, height };
  return <div className={cls} aria-hidden="true" style={{ ...size, ...style }} {...rest} />;
}
