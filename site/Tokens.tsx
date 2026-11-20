import { useEffect, useState } from 'react';
import { PALETTE, PALETTE_HUES, PALETTE_STEPS } from '../src/tokens/palette';

import type { Theme } from './theme';

/** Reads a CSS variable's resolved value from the root, again whenever the theme changes. */
function useResolved(token: string, theme: Theme) {
  const [value, setValue] = useState('');
  useEffect(() => {
    // wait one frame so the new data-theme has been applied
    const id = requestAnimationFrame(() => setValue(getComputedStyle(document.documentElement).getPropertyValue(token).trim()));
    return () => cancelAnimationFrame(id);
  }, [token, theme]);
  return value;
}

function Swatch({ token, theme, showValue = true }: { token: string; theme: Theme; showValue?: boolean }) {
  const v = useResolved(token, theme);
  return (
    <li className="tk-swatch">
      <span className="tk-swatch__chip" style={{ background: `var(${token})` }} aria-hidden="true" />
      <code className="tk-swatch__name">{token}</code>
      {showValue && <span className="tk-swatch__val">{v}</span>}
    </li>
  );
}

const NEUTRAL = [0, 50, 100, 200, 300, 400, 500, 550, 600, 700, 800, 900, 950].map((n) => `--n-${n}`);
const STATUS = ['success', 'danger', 'warning', 'info'];
const STEPS = [50, 100, 300, 500, 600, 800, 950];
const SEMANTIC = ['--bg', '--bg-subtle', '--bg-muted', '--bg-inverse', '--surface-card', '--text', '--text-2', '--text-3', '--border', '--border-str', '--control-border', '--control-selected-bg', '--focus-ring'];
const TYPE = [
  ['--t-display-lg', 'Display'], ['--t-heading-xl', 'Heading XL'], ['--t-heading-lg', 'Heading LG'], ['--t-heading-md', 'Heading MD'],
  ['--t-body-lg', 'Body LG'], ['--t-body-md', 'Body MD'], ['--t-label-md', 'Label MD'], ['--t-caption', 'Caption'],
];
const SPACE = [1, 2, 3, 4, 6, 8, 12, 16];
const RADIUS = ['--r-sm', '--r-md', '--r-lg', '--r-pill'];
const SIZES = [['--size-100', 'xs'], ['--size-200', 'sm'], ['--size-300', 'md'], ['--size-400', 'lg'], ['--size-500', 'xl']];

function TypeRow({ token, label, theme }: { token: string; label: string; theme: Theme }) {
  const v = useResolved(token, theme);
  return (
    <li className="tk-type">
      <span className="tk-type__sample" style={{ font: `var(${token})` }}>{label}</span>
      <code className="tk-type__name">{token}</code>
      <span className="tk-swatch__val">{v}</span>
    </li>
  );
}

/** Neutral steps 50–950, shown as vertical columns next to the hues. */
const NEUTRAL_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

/** The whole palette as vertical columns: a neutral column and twelve hues, light at the top. */
export function PaletteColumns() {
  return (
    <div className="pc" role="img" aria-label="Color palette: a neutral scale and twelve hues, each in eleven steps from light to dark">
      <div className="pc__col" aria-hidden="true">
        {NEUTRAL_STEPS.map((n) => <span key={n} style={{ background: `var(--n-${n})` }} />)}
      </div>
      {PALETTE_HUES.map((h) => (
        <div key={h} className="pc__col" aria-hidden="true">
          {PALETTE_STEPS.map((n) => <span key={n} style={{ background: PALETTE[h][n] }} />)}
        </div>
      ))}
    </div>
  );
}

export function PaletteStrips() {
  return (
    <div className="tk-pal" role="list">
      {PALETTE_HUES.map((h) => (
        <div key={h} className="tk-pal__row" role="listitem">
          <span className="tk-pal__name">{h}</span>
          <ul className="tk-pal__steps">
            {PALETTE_STEPS.map((n) => <li key={n} style={{ background: PALETTE[h][n] }} title={`--color-${h}-${n} ${PALETTE[h][n]}`}><span className="sr-only">{`--color-${h}-${n}`}</span></li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function NeutralScale({ theme }: { theme: Theme }) {
  return <ul className="tk-grid">{NEUTRAL.map((t) => <Swatch key={t} token={t} theme={theme} />)}</ul>;
}

export function StatusScales() {
  return (
    <div className="tk-status">
      {STATUS.map((s) => (
        <div key={s} className="tk-status__row">
          <span className="tk-status__name">{s}</span>
          <ul className="tk-status__steps">
            {STEPS.map((n) => <li key={n} style={{ background: `var(--${s}-${n})` }} title={`--${s}-${n}`}><span className="sr-only">{`--${s}-${n}`}</span></li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function SemanticTokens({ theme, tokens = SEMANTIC }: { theme: Theme; tokens?: string[] }) {
  return <ul className="tk-grid">{tokens.map((t) => <Swatch key={t} token={t} theme={theme} />)}</ul>;
}

export function TypeScale({ theme }: { theme: Theme }) {
  return <ul className="tk-types">{TYPE.map(([t, l]) => <TypeRow key={t} token={t} label={l} theme={theme} />)}</ul>;
}

export function SpaceScale() {
  return (
    <ul className="tk-space">
      {SPACE.map((n) => <li key={n}><code>--space-{n}</code><span className="tk-space__bar" style={{ width: `var(--space-${n})` }} /></li>)}
    </ul>
  );
}
export function RadiusScale() {
  return <ul className="tk-radius">{RADIUS.map((r) => <li key={r}><span className="tk-radius__box" style={{ borderRadius: `var(${r})` }} /><code>{r}</code></li>)}</ul>;
}
export function SizeScale() {
  return <ul className="tk-size">{SIZES.map(([t, l]) => <li key={t}><span className="tk-size__box" style={{ height: `var(${t})` }} /><code>{l}</code></li>)}</ul>;
}
