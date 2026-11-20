import { useEffect, useState, type ElementType, type HTMLAttributes } from 'react';
import './MotionText.css';

export type MotionEffect = 'typewriter' | 'reveal' | 'shimmer' | 'cycle';

export interface MotionTextProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** The text to animate. For `cycle`, the text before the changing word. */
  text: string;
  effect?: MotionEffect;
  /** `cycle` only: the words that rotate. */
  words?: string[];
  /** Typewriter: ms per character. Reveal: ms between words. Cycle: ms each word stays. */
  speed?: number;
  /** Start delay in ms. */
  delay?: number;
  /** Repeat the effect (typewriter and reveal). `cycle` always repeats. */
  loop?: boolean;
  onDone?: () => void;
  as?: ElementType;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const m = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!m) return;
    const on = () => setReduced(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return reduced;
}

/** Text with a small amount of motion: typing, word-by-word reveal, a shimmer, or a rotating word. Static for people who prefer reduced motion. */
export function MotionText({ text, effect = 'typewriter', words = [], speed, delay = 0, loop, onDone, as: Tag = 'span', className, ...rest }: MotionTextProps) {
  const reduced = usePrefersReducedMotion();
  const cls = ['ds-motiontext', `ds-motiontext--${effect}`, className].filter(Boolean).join(' ');
  const [count, setCount] = useState(0);   // typewriter characters or cycle index
  const [run, setRun] = useState(0);       // restart counter for loops

  // typewriter
  useEffect(() => {
    if (effect !== 'typewriter' || reduced) return;
    setCount(0);
    let i = 0, timer: number;
    const step = () => {
      i += 1; setCount(i);
      if (i < text.length) timer = window.setTimeout(step, speed ?? 45);
      else if (loop) timer = window.setTimeout(() => setRun((r) => r + 1), 1600);
      else onDone?.();
    };
    timer = window.setTimeout(step, delay);
    return () => window.clearTimeout(timer);
  }, [effect, text, speed, delay, loop, reduced, run]); // eslint-disable-line react-hooks/exhaustive-deps

  // cycle
  useEffect(() => {
    if (effect !== 'cycle' || reduced || words.length < 2) return;
    const t = window.setInterval(() => setCount((c) => (c + 1) % words.length), speed ?? 2200);
    return () => window.clearInterval(t);
  }, [effect, words.length, speed, reduced]);

  // reveal: restart on loop
  useEffect(() => {
    if (effect !== 'reveal' || reduced) return;
    const total = delay + text.split(/\s+/).length * (speed ?? 90) + 700;
    const t = window.setTimeout(() => (loop ? setRun((r) => r + 1) : onDone?.()), total + (loop ? 1500 : 0));
    return () => window.clearTimeout(t);
  }, [effect, text, speed, delay, loop, reduced, run]); // eslint-disable-line react-hooks/exhaustive-deps

  if (effect === 'cycle') {
    const word = words[reduced ? 0 : count] ?? '';
    return (
      <Tag className={cls} {...rest}>
        <span className="ds-sr-only">{text} {words.join(', ')}</span>
        <span aria-hidden="true">{text} <span key={word} className="ds-motiontext__word">{word}</span></span>
      </Tag>
    );
  }
  if (reduced) return <Tag className={cls} {...rest}>{text}</Tag>;
  if (effect === 'shimmer') return <Tag className={cls} {...rest}>{text}</Tag>;
  if (effect === 'reveal') {
    return (
      <Tag className={cls} {...rest}>
        <span className="ds-sr-only">{text}</span>
        <span aria-hidden="true" key={run}>
          {text.split(/(\s+)/).map((w, i) => (/^\s+$/.test(w) ? w : (
            <span key={i} className="ds-motiontext__w" style={{ animationDelay: `${delay + (i / 2) * (speed ?? 90)}ms` }}>{w}</span>
          )))}
        </span>
      </Tag>
    );
  }
  return (
    <Tag className={cls} {...rest}>
      <span className="ds-sr-only">{text}</span>
      <span aria-hidden="true">{text.slice(0, count)}<span className="ds-motiontext__caret" /></span>
    </Tag>
  );
}
