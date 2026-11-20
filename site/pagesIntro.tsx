import { LinkButton, Callout, Badge, Chip, Icon, SectionLabel, HeroFacts, Code } from '../src';
import { STORYBOOK_URL, GITHUB_URL } from './nav';
import { H2, P, Cards } from './ui';

const DECISIONS = [
  { h: 'Keep the UI neutral and let color mean something.', p: 'The brand color is a neutral flip. The primary button is near black in light mode and near white in dark. Color is saved for status, so a green or red element always carries a message.' },
  { h: 'Measure the borders, don’t eyeball them.', p: 'My first control border was 2.5:1 against white. Form controls need 3:1, so I darkened it. The status borders were picked the same way.' },
  { h: 'Build the shell once.', p: 'Input, Select, Checkbox, Radio and Toggle share one FormField. Label, helper text, validation messages and ids are decided in a single place. When an error appears it replaces the helper text on screen, so the layout doesn’t jump. Screen readers still hear both.' },
  { h: 'Don’t disable the button, show the work.', p: 'A loading button stays focusable and says it’s busy. A disabled one drops out of the keyboard order and tells people nothing about why.' },
  { h: 'Borrow the guidance, not the look.', p: 'I read the Input and Button pages of Atlassian and Material 3 and kept what fit. One primary action per area. Buttons for actions, links for places. No placeholder standing in for a label. Errors that replace helper text. 48px as the touch-first size.' },
  { h: 'Document every component the same way.', p: 'Each page follows one order: when to use it, when not to, variants, accessibility, API, tokens. A missing section shows up fast. If one is hard to write, the component usually isn’t finished.' },
];

export function Overview() {
  return (
    <>
      <div className="dx-hero">
        <SectionLabel>Lab · Design system</SectionLabel>
        <p className="dx-hero__title">My own design system, built in code.</p>
        <div className="dx-actions">
          <LinkButton href={STORYBOOK_URL} variant="primary" size="lg" endIcon={<Icon name="arrow-up-right" size={18} />}>Open Storybook</LinkButton>
          <LinkButton href={GITHUB_URL} external variant="secondary" size="lg">View on GitHub</LinkButton>
        </div>
        <HeroFacts columns={[
          [{ label: 'Role', value: 'Designer and builder' }, { label: 'Status', value: 'Version 0.1, work in progress' }],
          [{ label: 'Built with', value: 'React, TypeScript, Storybook, Claude' }, { label: 'Themes', value: 'Light, dark and arcade' }],
        ]} />
        <p className="dx-hint"><Icon name="sparkles" size={14} /> Try the theme switcher at the top. This whole site, including every example, is built from the system.</p>
      </div>
      <H2>Start here</H2>
      <Cards items={[
        { title: 'Why', text: 'One system for a portfolio and an AI agent that look nothing alike.', path: '/why' },
        { title: 'Foundations', text: 'The color palette, semantic tokens, type, spacing and motion.', path: '/foundations/color' },
        { title: 'Components', text: '42 components in seven groups, live and with best practices.', path: '/components/actions' },
        { title: 'Decisions', text: 'Six calls I made, and the reasons behind them.', path: '/decisions' },
      ]} />
    </>
  );
}

export function Why() {
  return (
    <>
      <H2>The problem</H2>
      <P>My portfolio already had a design system. It lived in CSS files and a design.md, and it only worked for one site.</P>
      <P>Then I started an AI agent that answers questions about my work. It looks nothing like the portfolio, with a retro palette and square corners. I needed one system that could carry both without forking.</P>
      <H2>The approach</H2>
      <P>I rebuilt it in React and Storybook, and used the agent as the stress test. I made the decisions and reviewed every one. Claude did most of the typing.</P>
    </>
  );
}

export function Architecture() {
  return (
    <>
      <H2>Three layers</H2>
      <P>Each layer only reads from the layer below it.</P>
      <ol className="site-layers">
        <li className="site-layer"><Badge outlined>Layer 1</Badge><h3>Primitives</h3><p>Raw values. A neutral scale, four status scales and a twelve-hue palette. Nothing in the UI uses them directly.</p><Code>--n-950 · --color-blue-500</Code></li>
        <li className="site-layer"><Badge outlined>Layer 2</Badge><h3>Semantic</h3><p>Meaning. What a color is for, not what it looks like. Themes swap values here.</p><Code>--text · --bg · --control-border</Code></li>
        <li className="site-layer"><Badge outlined>Layer 3</Badge><h3>Components</h3><p>Buttons, inputs and the rest. They only read semantic tokens, so they never know which theme is on.</p><Code>.ds-btn · .ds-field__box</Code></li>
      </ol>
      <Callout><p className="dx-callout">The arcade theme is the proof. It swaps token values for the agent’s retro look, and no component changes. Switch themes at the top to see the same page three ways.</p></Callout>
    </>
  );
}

export function Decisions() {
  return (
    <>
      <H2>Six calls</H2>
      <ol className="site-decisions">
        {DECISIONS.map((d, i) => (
          <li key={d.h} className="site-decision">
            <span className="site-decision__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div><h3>{d.h}</h3><p>{d.p}</p></div>
          </li>
        ))}
      </ol>
      <H2>What isn’t done</H2>
      <Callout><p className="dx-callout">Table, Pagination and Combobox aren’t built yet. The arcade theme’s control borders sit at about 1.8:1 against its background, below the 3:1 I hold the other themes to. Fixing that changes the agent’s look, and I haven’t made that call yet.</p></Callout>
    </>
  );
}
