import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Optional', tone: 'neutral' },
  argTypes: { tone: { control: 'select', options: ['neutral', 'success', 'danger', 'warning', 'info', 'overlay'] } },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = {};
export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {(['neutral', 'success', 'danger', 'warning', 'info'] as const).map((t) => <Badge key={t} tone={t}>{t}</Badge>)}
    </div>
  ),
};
export const Locked: Story = { args: { tone: 'overlay', children: (<><Icon name="lock" size={12} /> Password protected</>) } };
