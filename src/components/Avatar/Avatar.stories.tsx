import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarGroup } from './Avatar';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['!autodocs'], // documented in Avatar.mdx
  parameters: { layout: 'centered' },
  args: { name: 'Ariel Baiz', size: 'md', shape: 'circle' },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'inline-radio', options: ['circle', 'square'] },
    presence: { control: 'inline-radio', options: [undefined, 'online', 'busy', 'away', 'offline'] },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

const row = { display: 'flex', alignItems: 'center', gap: 12 } as const;

export const Default: Story = {};
export const Image: Story = { args: { src: 'https://i.pravatar.cc/160?img=12', name: 'Sam Rivera' } };
export const ImageFallback: Story = {
  name: 'Broken image falls back to initials',
  args: { src: 'https://example.invalid/missing.png', name: 'Lucía Fernández' },
};
export const Sizes: Story = {
  render: (args) => (
    <div style={row}>{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => <Avatar key={s} {...args} size={s} />)}</div>
  ),
};
export const Shapes: Story = {
  render: (args) => (
    <div style={row}><Avatar {...args} /><Avatar {...args} shape="square" /></div>
  ),
};
export const Colors: Story = {
  name: 'Colours (from the name)',
  render: () => (
    <div style={row}>{['Ana Pérez', 'Bo Chen', 'Cleo Dias', 'Dev Patel', 'Eli Ross', 'Fay Núñez'].map((n) => <Avatar key={n} name={n} />)}</div>
  ),
};
export const Presence: Story = {
  render: (args) => (
    <div style={row}>
      {(['online', 'busy', 'away', 'offline'] as const).map((p) => <Avatar key={p} {...args} size="lg" presence={p} />)}
    </div>
  ),
};
export const IconFallback: Story = {
  args: { name: undefined, 'aria-label': 'Assistant' } as never,
  render: (args) => <Avatar {...args} icon={<Icon name="sparkles" size={16} />} />,
};
export const Group: Story = {
  render: () => (
    <AvatarGroup max={4}>
      {['Ana Pérez', 'Bo Chen', 'Cleo Dias', 'Dev Patel', 'Eli Ross', 'Fay Núñez'].map((n) => <Avatar key={n} name={n} />)}
    </AvatarGroup>
  ),
};
