import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionIndex } from './SectionIndex';

const items = [
  { id: 'si-context', label: '01 — Context' },
  { id: 'si-problem', label: '02 — Problem' },
  { id: 'si-system', label: '03 — System' },
  { id: 'si-outcomes', label: '04 — Outcomes' },
];

const meta: Meta<typeof SectionIndex> = {
  title: 'Components/SectionIndex',
  component: SectionIndex,
  tags: ['!autodocs'], // documented in SectionIndex.mdx
  parameters: { layout: 'fullscreen' },
  args: { 'aria-label': 'Case study sections', items, placement: 'inline' },
  argTypes: { placement: { control: 'inline-radio', options: ['inline', 'rail'] } },
};
export default meta;
type Story = StoryObj<typeof SectionIndex>;

/** A tall page so the highlight has something to follow. */
function Page({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px 120px', color: 'var(--text)' }}>
      <header id="si-hero" style={{ minHeight: 220 }}><h1 style={{ font: 'var(--t-display-lg)', margin: 0 }}>Case study</h1><p className="si-sub" style={{ color: 'var(--text-2)' }}>Scroll down to see the index react.</p></header>
      {children}
      {items.map((it) => (
        <section key={it.id} id={it.id} style={{ minHeight: 420, paddingTop: 32 }}>
          <h2 style={{ font: 'var(--t-heading-lg)', margin: '0 0 8px' }}>{it.label}</h2>
          <p style={{ color: 'var(--text-2)', maxWidth: 520 }}>Placeholder content for this section. The index marks the section whose top is in the upper part of the screen.</p>
        </section>
      ))}
      <footer id="si-footer" style={{ minHeight: 240, borderTop: '1px solid var(--border)', color: 'var(--text-3)', paddingTop: 24 }}>Footer</footer>
    </div>
  );
}

export const Inline: Story = {
  render: (args) => (
    <Page>
      <div style={{ position: 'sticky', top: 16, float: 'right', width: 170, marginRight: -200 }}>
        <SectionIndex {...args} placement="inline" />
      </div>
    </Page>
  ),
};

export const Rail: Story = {
  name: 'Rail',
  parameters: { docs: { description: { story: 'Appears after the hero scrolls away, and steps aside for the footer. It is hidden below 1280px wide.' } } },
  render: (args) => (
    <Page>
      <SectionIndex {...args} placement="rail" revealAfter=".si-sub" hideOver="#si-footer" />
    </Page>
  ),
};
