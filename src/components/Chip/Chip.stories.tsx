import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  args: { children: 'Design systems', variant: 'filled' },
  argTypes: { variant: { control: 'inline-radio', options: ['filled', 'outline', 'action'] } },
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const Filled: Story = {};
export const Outline: Story = { args: { variant: 'outline' } };
export const Action: Story = { args: { variant: 'action', children: 'What does Bort specialize in?' } };
export const TagRow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Chip>B2B SaaS</Chip><Chip>Design systems</Chip><Chip variant="outline">2024</Chip>
    </div>
  ),
};
