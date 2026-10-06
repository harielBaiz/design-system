import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, iconNames } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Foundations/Iconography',
  component: Icon,
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'select', options: iconNames },
    size: { control: { type: 'range', min: 12, max: 48, step: 2 } },
  },
  args: { name: 'search', size: 24 },
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 16 }}>
      {iconNames.map((n) => (
        <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 16, border: '1px solid var(--border)', borderRadius: 'var(--r-md)', background: 'var(--surface-card)' }}>
          <Icon name={n} size={24} />
          <code style={{ font: 'var(--t-caption)', color: 'var(--text-3)' }}>{n}</code>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      {[12, 16, 20, 24, 32, 48].map((s) => <Icon key={s} name="check-circle" size={s} />)}
    </div>
  ),
};
