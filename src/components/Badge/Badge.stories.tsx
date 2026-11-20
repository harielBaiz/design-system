import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, type BadgeType } from './Badge';
import { Icon } from '../Icon/Icon';

const TYPES: BadgeType[] = ['default', 'info', 'positive', 'warning', 'critical', 'bulletin', 'ai'];

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['!autodocs'], // documented in Badge.mdx
  parameters: { layout: 'centered' },
  args: { children: 'Beta', kind: 'label', type: 'default', outlined: false, subtle: false },
  argTypes: {
    kind: { control: 'inline-radio', options: ['label', 'count'] },
    type: { control: 'select', options: [...TYPES, 'overlay'] },
    startIcon: { control: false }, endIcon: { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

const row = { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' } as const;
const grid = { display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '12px 24px', alignItems: 'center', justifyItems: 'start' } as const;
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

export const Default: Story = {};
export const Label: Story = { render: () => <div style={row}><Badge>Beta</Badge><Badge type="positive">Resolved</Badge><Badge type="critical">Overdue</Badge></div> };
export const Count: Story = {
  render: () => (
    <div style={row}>
      <Badge count={3} type="bulletin" aria-label="3 unread messages" />
      <Badge count={18} aria-label="18 items" />
      <Badge count={250} type="critical" aria-label="More than 99 failures" />
    </div>
  ),
};
export const Types: Story = {
  render: () => (
    <div style={grid}>
      <strong>Type</strong><strong>Label</strong><strong>Count</strong>
      {TYPES.map((t, i) => (
        <>
          <code key={`n${t}`}>{t}</code>
          <Badge key={`l${t}`} type={t}>{t === 'ai' ? 'AI summary' : cap(t)}</Badge>
          {t === 'ai' ? <span key={`c${t}`} style={{ color: 'var(--text-3)' }}>Label only</span> : <Badge key={`c${t}`} type={t} count={i + 1} aria-label={`${i + 1} ${t}`} />}
        </>
      ))}
    </div>
  ),
};
export const Outlined: Story = {
  render: () => (
    <div style={row}>{TYPES.map((t) => <Badge key={t} type={t} outlined>{cap(t)}</Badge>)}<Badge type="bulletin" outlined count={6} aria-label="6" /></div>
  ),
};
export const Subtle: Story = {
  render: () => (
    <div style={row}>
      <Badge type="bulletin">Live</Badge><Badge type="bulletin" subtle>Live</Badge>
      <Badge type="bulletin" count={6} aria-label="6" /><Badge type="bulletin" subtle count={6} aria-label="6" />
      <Badge type="bulletin" subtle outlined>Live</Badge>
    </div>
  ),
};
export const WithIcons: Story = {
  name: 'Icons',
  render: () => (
    <div style={row}>
      <Badge startIcon="lock">Locked</Badge>
      <Badge type="positive" startIcon="check-circle">Resolved</Badge>
      <Badge type="critical" startIcon="alert-circle">Failed</Badge>
      <Badge type="ai" startIcon="sparkles">AI summary</Badge>
      <Badge type="info" endIcon={<Icon name="arrow-up-right" size={12} />}>New</Badge>
    </div>
  ),
};
export const Decorative: Story = {
  render: () => (
    <div style={row}>
      {(['red-300', 'orange-300', 'amber-300', 'lime-300', 'green-400', 'teal-400', 'cyan-400', 'blue-300', 'indigo-300', 'purple-300', 'magenta-300'] as const).map((d) => (
        <Badge key={d} decoration={d}>{cap(d.split('-')[0])}</Badge>
      ))}
    </div>
  ),
};
export const Examples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={row}>
        <Badge type="info">Co-host</Badge><Badge>Customer</Badge><Badge startIcon="lock">Locked</Badge><Badge type="warning">In progress</Badge>
        <Badge type="positive">Resolved</Badge><Badge type="critical">Recording</Badge><Badge type="bulletin">Live</Badge><Badge type="ai" startIcon="sparkles">AI recap</Badge>
      </div>
      <div style={row}>
        <Badge count={1} type="bulletin" aria-label="1 unread" /><Badge count={18} aria-label="18 items" /><Badge count={120} type="critical" aria-label="Over 99 alerts" />
        <Badge type="positive" kind="count" count={5} aria-label="5 percent" />
      </div>
    </div>
  ),
};
export const OnImage: Story = { args: { type: 'overlay', startIcon: 'lock', children: 'Password protected' } };
