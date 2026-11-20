import { useRef, useState } from 'react';
import { PALETTE, PALETTE_HUES, PALETTE_STEPS } from '../tokens/palette';
import './PaletteGrid.css';

/** Docs-only components for the Palette page. Not part of the library exports. */

const NEUTRAL: [string, string][] = [
  ['0', '#ffffff'], ['50', '#fafafa'], ['100', '#f5f5f5'], ['200', '#e8e8e8'], ['300', '#d4d4d4'], ['400', '#a3a3a3'],
  ['500', '#737373'], ['600', '#525252'], ['700', '#3d3d3d'], ['800', '#262626'], ['900', '#171717'], ['950', '#0a0a0a'],
];

function lum(hex: string) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
export function contrast(a: string, b: string) {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
function level(r: number) { return r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA large' : 'Fail'; }
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

type LabelMode = 'hex' | 'token' | 'contrast';

function Cell({ token, hex, step, mode, onCopy }: { token: string; hex: string; step: string; mode: LabelMode; onCopy: (t: string) => void }) {
  const white = contrast(hex, '#ffffff'), black = contrast(hex, '#000000');
  const fg = white >= black ? '#ffffff' : '#000000';
  const best = Math.max(white, black);
  return (
    <li className="pal-cell">
      <button type="button" className="pal-cell__btn" style={{ background: hex, color: fg }} onClick={() => onCopy(`var(${token})`)} aria-label={`${token}, ${hex}. Copy variable`}>
        <span className="pal-cell__step">{step}</span>
        <span className="pal-cell__val">
          {mode === 'hex' && hex.toUpperCase()}
          {mode === 'token' && token.replace('--color-', '')}
          {mode === 'contrast' && (<>{best.toFixed(1)}:1 <small>{level(best)}</small></>)}
        </span>
      </button>
    </li>
  );
}

export function PaletteGrid({ only }: { only?: string[] }) {
  const [mode, setMode] = useState<LabelMode>('hex');
  const [note, setNote] = useState('');
  const timer = useRef<number | undefined>(undefined);
  const copy = (t: string) => {
    navigator.clipboard?.writeText(t).catch(() => {});
    setNote(`Copied ${t}`);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setNote(''), 1800);
  };
  const hues = only ?? [...PALETTE_HUES];
  return (
    <div className="pal">
      <div className="pal__bar">
        <div role="group" aria-label="Swatch label" className="pal__seg">
          {(['hex', 'token', 'contrast'] as const).map((m) => (
            <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)}>{m === 'hex' ? 'Hex' : m === 'token' ? 'Token' : 'Contrast'}</button>
          ))}
        </div>
        <span className="pal__hint">Click a swatch to copy its CSS variable.</span>
        <span className="pal__note" role="status" aria-live="polite">{note}</span>
      </div>

      <nav className="pal__jump" aria-label="Jump to a hue">
        {hues.map((h) => <a key={h} href={`#palette-${h}`}><span style={{ background: PALETTE[h][500] }} aria-hidden="true" />{cap(h)}</a>)}
        <a href="#palette-neutral"><span style={{ background: '#737373' }} aria-hidden="true" />Neutral</a>
      </nav>

      {hues.map((h) => (
        <section key={h} id={`palette-${h}`} className="pal__hue" aria-labelledby={`pal-h-${h}`}>
          <h3 id={`pal-h-${h}`}>{cap(h)} <code>--color-{h}-*</code></h3>
          <ul className="pal__row">
            {PALETTE_STEPS.map((s) => <Cell key={s} step={String(s)} hex={PALETTE[h][s]} token={`--color-${h}-${s}`} mode={mode} onCopy={copy} />)}
          </ul>
        </section>
      ))}

      <section id="palette-neutral" className="pal__hue" aria-labelledby="pal-h-neutral">
        <h3 id="pal-h-neutral">Neutral <code>--n-*</code></h3>
        <ul className="pal__row pal__row--neutral">
          {NEUTRAL.map(([s, hex]) => <Cell key={s} step={s} hex={hex} token={`--n-${s}`} mode={mode} onCopy={copy} />)}
        </ul>
      </section>
    </div>
  );
}

/** For each hue, the first step where text on white reaches 4.5:1, and the last step where black text does. */
export function ContrastTable() {
  return (
    <div className="pal__tablewrap">
      <table className="pal__table">
        <thead><tr><th scope="col">Hue</th><th scope="col">Text on white passes from</th><th scope="col">Black text passes up to</th><th scope="col">Steps that work as a tint</th></tr></thead>
        <tbody>
          {PALETTE_HUES.map((h) => {
            const onWhite = PALETTE_STEPS.find((s) => contrast(PALETTE[h][s], '#ffffff') >= 4.5);
            const onBlack = [...PALETTE_STEPS].reverse().find((s) => contrast(PALETTE[h][s], '#000000') >= 4.5);
            return (
              <tr key={h}>
                <th scope="row"><span className="pal__dot" style={{ background: PALETTE[h][500] }} aria-hidden="true" />{cap(h)}</th>
                <td>{onWhite ?? '—'}</td><td>{onBlack ?? '—'}</td><td>50, 100, 200</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
