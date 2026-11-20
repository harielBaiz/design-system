import { useState } from 'react';
import { Button, Input, Notice, Badge, Icon } from '../src';
import { PaletteGrid, ContrastTable } from '../src/foundations/PaletteGrid';
import { PaletteColumns, NeutralScale, StatusScales, SemanticTokens, TypeScale, SpaceScale, RadiusScale, SizeScale } from './Tokens';
import { useSiteTheme } from './theme';
import { BestPractice, DoDont, CodeBlock } from './DoDont';
import { H2, H3, P, Ul, Note } from './ui';

export function ColorOverview() {
  const theme = useSiteTheme();
  return (
    <>
      <PaletteColumns />
      <H2>Two kinds of color token</H2>
      <P><strong>Palette</strong> tokens are raw colors with no meaning, like <code>--color-blue-500</code>. <strong>Semantic</strong> tokens are jobs, like <code>--text-danger</code> or <code>--surface-info</code>, and they point at a palette step. Components only read semantic tokens, so a theme or a brand change is one edit.</P>
      <H2>Neutral scale</H2>
      <Note>The only UI palette. Primitives, so components never read them directly.</Note>
      <NeutralScale theme={theme} />
      <H2>Status scales</H2>
      <Note>Color appears only to carry a message. Light and dark pick different steps from the same scale.</Note>
      <StatusScales />
    </>
  );
}

export function ColorPalette() {
  return (
    <>
      <H2>Choose a color</H2>
      <P>Twelve hues and a neutral scale, each in steps from 50 (lightest) to 950 (darkest). Every step has the same perceived lightness in every hue. Nothing here has a meaning yet.</P>
      <PaletteGrid />
      <H2>Reading the scale</H2>
      <Ul items={[
        <><strong>50 to 200</strong> are tints. Use them for backgrounds and fills behind dark text.</>,
        <><strong>300 and 400</strong> are light mid tones. Use them for borders, dividers and decoration, not for text.</>,
        <><strong>500 and 600</strong> are strong mid tones for fills, charts and icons. Check contrast before putting text on them.</>,
        <><strong>700 to 950</strong> are shades. Use them for text on light backgrounds, or for surfaces in dark themes.</>,
      ]} />
      <H2>Contrast</H2>
      <P>Text needs 4.5:1 against its background. Large text, icons and control borders need 3:1. This table shows where each hue crosses the line.</P>
      <ContrastTable />
      <H2>Best practices</H2>
      <BestPractice title="Pair steps with intent" text="Use the same step for the same job across hues, such as 100 for tinted surfaces and 700 for text on them. Steps line up, so contrast stays predictable.">
        <DoDont kind="do" caption="Text uses step 700 on a step 100 tint. The pair passes 4.5:1.">
          <div style={{ background: 'var(--color-blue-100)', color: 'var(--color-blue-700)', padding: 16, borderRadius: 8, font: 'var(--t-label-md)' }}>Release notes are ready</div>
        </DoDont>
        <DoDont kind="dont" caption="Text uses step 400 on a step 100 tint. The pair fails 4.5:1 and is hard to read.">
          <div style={{ background: 'var(--color-blue-100)', color: 'var(--color-blue-400)', padding: 16, borderRadius: 8, font: 'var(--t-label-md)' }}>Release notes are ready</div>
        </DoDont>
      </BestPractice>
      <BestPractice title="Reach for semantic tokens" text="A palette step is not a role. Give a color a job with a semantic token, then use that token in components.">
        <DoDont kind="do" caption="The component reads a semantic token. A theme can change it.">
          <CodeBlock>{`.ds-error { color: var(--text-danger); }`}</CodeBlock>
        </DoDont>
        <DoDont kind="dont" caption="The component reads a palette step. It will not follow the dark theme.">
          <CodeBlock>{`.ds-error { color: var(--color-red-600); }`}</CodeBlock>
        </DoDont>
      </BestPractice>
    </>
  );
}

function ThemePreview({ theme, label }: { theme: 'light' | 'dark' | 'arcade'; label: string }) {
  return (
    <div className="dx-mode" data-theme={theme}>
      <strong className="dx-mode__label">{label}</strong>
      <Notice tone="danger" title="Could not save">Check your connection.</Notice>
      <div className="dx-mode__row"><Button size="sm">Save</Button><Button size="sm" variant="secondary">Cancel</Button></div>
      <Input label="Email" size="sm" placeholder="you@company.com" />
    </div>
  );
}

export function ColorProduct() {
  const theme = useSiteTheme();
  return (
    <>
      <H2>Use semantic color tokens</H2>
      <P>Color in the product has a purpose. Components read semantic tokens such as <code>--text</code>, <code>--surface-danger</code> and <code>--control-border</code>. Each token has one value per theme, so the same component works in light, dark and arcade without changes.</P>
      <CodeBlock>{`/* a component */
.ds-notice { background: var(--surface-danger); border-color: var(--border-danger); color: var(--text); }

/* tokens.css: the theme decides the value */
:root              { --surface-danger: var(--danger-50); }
[data-theme="dark"]{ --surface-danger: var(--danger-950); }`}</CodeBlock>
      <H2>Color roles</H2>
      <P>Roles group tokens by job. Pick the role first, then the token.</P>
      <H3>Text and surfaces</H3>
      <SemanticTokens theme={theme} tokens={['--bg', '--bg-subtle', '--bg-muted', '--bg-inverse', '--surface-card', '--text', '--text-2', '--text-3']} />
      <H3>Borders and controls</H3>
      <SemanticTokens theme={theme} tokens={['--border', '--border-mid', '--border-str', '--control-border', '--control-border-focus', '--control-selected-bg', '--focus-ring']} />
      <H3>Status</H3>
      <SemanticTokens theme={theme} tokens={['--surface-success', '--text-success', '--surface-danger', '--text-danger', '--surface-warning', '--text-warning', '--surface-info', '--text-info']} />
      <H2>Best practices</H2>
      <BestPractice title="Preserve color semantics" text="Use feedback colors consistently to keep communication clear and avoid confusion.">
        <DoDont kind="do" caption="An error uses the danger tone, so color and message agree.">
          <Notice tone="danger" title="Account authentication failed.">Please re-authenticate in the Account section.</Notice>
        </DoDont>
        <DoDont kind="dont" caption="The same error in a neutral notice. The color says nothing about severity.">
          <Notice tone="neutral" title="Account authentication failed.">Please re-authenticate in the Account section.</Notice>
        </DoDont>
      </BestPractice>
      <BestPractice title="Don’t rely on color alone" text="Pair color with an icon or a label so people who cannot tell the colors apart still get the message.">
        <DoDont kind="do" caption="A status badge has an icon and a word as well as a color.">
          <Badge type="critical" startIcon="alert-circle">Failed</Badge>
        </DoDont>
        <DoDont kind="dont" caption="A bare colored dot. Nothing tells people what it means.">
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--danger-600)', display: 'inline-block' }} />
        </DoDont>
      </BestPractice>
      <BestPractice title="Keep brand color for interaction" text="The brand color marks what people can act on. Do not use it to decorate static content.">
        <DoDont kind="do" caption="Only the action uses the strong fill. The rest stays neutral.">
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><span style={{ font: 'var(--t-ui-md)' }}>Draft saved</span><Button size="sm">Publish</Button></div>
        </DoDont>
        <DoDont kind="dont" caption="Static text in the interactive color looks like a button or a link.">
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><span style={{ font: 'var(--t-ui-md)', color: 'var(--brand)', textDecoration: 'underline' }}>Draft saved</span><Button size="sm" variant="secondary">Publish</Button></div>
        </DoDont>
      </BestPractice>
      <H2>Modes</H2>
      <P>A mode swaps token values. The same components are shown below in each of the three themes, regardless of the theme you picked at the top.</P>
      <div className="dx-modes">
        <ThemePreview theme="light" label="Light" />
        <ThemePreview theme="dark" label="Dark" />
        <ThemePreview theme="arcade" label="Arcade" />
      </div>
    </>
  );
}

const FAMILIES = [
  { name: 'General Sans', token: '--f-ui', use: 'Interface and headings', sample: 'Design systems that scale' },
  { name: 'Lora', token: '--f-body', use: 'Long-form body text', sample: 'The quick brown fox jumps over the lazy dog.' },
  { name: 'DM Mono', token: '--f-mono', use: 'Labels, code and eyebrows', sample: 'const token = "--text-danger";' },
];

export function Typography() {
  const theme = useSiteTheme();
  return (
    <>
      <H2>Font families</H2>
      <ul className="dx-fonts">
        {FAMILIES.map((f) => (
          <li key={f.name}>
            <span className="dx-fonts__sample" style={{ fontFamily: `var(${f.token})` }}>{f.sample}</span>
            <span className="dx-fonts__meta"><strong>{f.name}</strong> <code>{f.token}</code> · {f.use}</span>
          </li>
        ))}
      </ul>
      <H2>Type scale</H2>
      <P>Each token sets size, weight and line height together with the CSS <code>font</code> shorthand, so a style is always applied as a whole.</P>
      <TypeScale theme={theme} />
      <H2>Best practices</H2>
      <BestPractice title="Use the composite tokens" text="Set type with one token instead of mixing size, weight and line height by hand.">
        <DoDont kind="do" caption="One token sets every part of the style.">
          <CodeBlock>{`.title { font: var(--t-heading-md); }`}</CodeBlock>
        </DoDont>
        <DoDont kind="dont" caption="Hand-picked values drift from the scale and miss theme and font updates.">
          <CodeBlock>{`.title { font-size: 19px; font-weight: 650; line-height: 1.3; }`}</CodeBlock>
        </DoDont>
      </BestPractice>
      <BestPractice title="Write labels in sentence case" text="Sentence case is easier to scan than capitals. Keep uppercase for short eyebrow labels only.">
        <DoDont kind="do" caption="A verb in sentence case.">
          <Button>Save changes</Button>
        </DoDont>
        <DoDont kind="dont" caption="All capitals slow reading and feel like shouting.">
          <Button>SAVE CHANGES</Button>
        </DoDont>
      </BestPractice>
    </>
  );
}

export function Spacing() {
  return (
    <>
      <H2>Space</H2>
      <P>Spacing steps are multiples of 4px. Use them for padding, gaps and margins.</P>
      <SpaceScale />
      <H2>Radius</H2>
      <RadiusScale />
      <H2>Control size</H2>
      <P>Inputs, selects and buttons share one height scale, so controls line up when they sit in the same row.</P>
      <SizeScale />
      <H2>Best practices</H2>
      <BestPractice title="Share the control scale" text="Controls in one row use the same size, so their heights match.">
        <DoDont kind="do" caption="Input and button are both medium. Their heights match.">
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}><Input label="Email" placeholder="you@company.com" /><Button>Subscribe</Button></div>
        </DoDont>
        <DoDont kind="dont" caption="A large button next to a small input. The row looks uneven.">
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}><Input label="Email" size="sm" placeholder="you@company.com" /><Button size="lg">Subscribe</Button></div>
        </DoDont>
      </BestPractice>
    </>
  );
}

export function Effects() {
  const [go, setGo] = useState(false);
  return (
    <>
      <H2>Elevation</H2>
      <P>Three shadows for raised surfaces. Menus, dialogs and toasts use the larger ones. Overlays render in the browser top layer, so there is no z-index scale.</P>
      <div className="dx-shadows">
        {['sm', 'md', 'lg'].map((s) => <div key={s} className="dx-shadow" style={{ boxShadow: `var(--shadow-${s})` }}><code>--shadow-{s}</code></div>)}
      </div>
      <H2>Scrim</H2>
      <P>Behind a modal, <code>--overlay-scrim</code> dims the page so the dialog stands out.</P>
      <div className="dx-scrim"><div className="dx-scrim__layer" /><span>Page content</span></div>
      <H2>Motion</H2>
      <P>Three durations and two easing curves. Use <em>ease out</em> for things entering and <em>ease in-out</em> for things moving or changing. Under reduced motion every duration becomes 0.</P>
      <div className="dx-motion">
        <Button variant="secondary" size="sm" onClick={() => setGo((g) => !g)}>Play</Button>
        {['fast', 'base', 'slow'].map((d) => (
          <div key={d} className="dx-motion__row">
            <code>--dur-{d}</code>
            <span className="dx-motion__track"><span className="dx-motion__dot" style={{ transform: go ? 'translateX(var(--dx-travel))' : 'none', transition: `transform var(--dur-${d}) var(--ease-out)` }} /></span>
          </div>
        ))}
      </div>
      <H2>Best practices</H2>
      <BestPractice title="Respect reduced motion" text="Use the duration tokens. They fall to zero when someone asks for less motion, so you do not need a special case.">
        <DoDont kind="do" caption="The duration is a token that honors reduced motion.">
          <CodeBlock>{`.panel { transition: transform var(--dur-base) var(--ease-out); }`}</CodeBlock>
        </DoDont>
        <DoDont kind="dont" caption="A fixed time keeps animating for people who turned motion off.">
          <CodeBlock>{`.panel { transition: transform 400ms ease; }`}</CodeBlock>
        </DoDont>
      </BestPractice>
    </>
  );
}
