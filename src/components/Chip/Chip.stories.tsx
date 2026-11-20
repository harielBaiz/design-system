import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip, ChipGroup } from './Chip';
import { Avatar } from '../Avatar/Avatar';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['!autodocs'], // documented in Chip.mdx
  parameters: { layout: 'centered' },
  args: { children: 'Design systems', size: 'md', interactive: false, disabled: false },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    startIcon: { control: false }, avatar: { control: false }, onClose: { control: false }, onClick: { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof Chip>;

const row = { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' } as const;

export const Default: Story = { args: { onClose: () => {} } };
export const Sizes: Story = {
  render: () => <div style={row}><Chip size="sm" onClose={() => {}}>Small</Chip><Chip size="md" onClose={() => {}}>Medium</Chip><Chip size="lg" onClose={() => {}}>Large</Chip></div>,
};
export const Interactive: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <div style={row}>
        <Chip interactive onClick={() => {}}>Suggested prompt</Chip>
        <Chip interactive selected={on} onClick={() => setOn((v) => !v)}>{on ? 'Selected' : 'Not selected'}</Chip>
      </div>
    );
  },
};
export const Disabled: Story = {
  render: () => <div style={row}><Chip disabled onClose={() => {}}>Disabled</Chip><Chip interactive disabled>Disabled button</Chip></div>,
};
export const WithoutClose: Story = { render: () => <div style={row}><Chip>Read only</Chip><Chip interactive>Interactive</Chip></div> };
export const WithIcon: Story = { render: () => <div style={row}><Chip startIcon="lock">Private</Chip><Chip startIcon="star" interactive>Favourites</Chip></div> };
export const WithIconAndClose: Story = { render: () => <div style={row}><Chip startIcon="mail" onClose={() => {}}>ana@example.com</Chip></div> };
export const WithAvatar: Story = {
  render: () => <div style={row}><Chip avatar={<Avatar name="Ana Pérez" size="xs" />} onClose={() => {}}>Ana Pérez</Chip></div>,
};
export const Truncated: Story = {
  render: () => <Chip maxWidth={160} onClose={() => {}} aria-label="Redesigning the whole onboarding flow">Redesigning the whole onboarding flow</Chip>,
};
export const Groups: Story = {
  render: () => {
    const [on, setOn] = useState<string[]>(['All']);
    const [tags, setTags] = useState(['Tokens', 'Motion', 'React']);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ChipGroup aria-label="Filter">
          {['All', 'Case studies', 'AI'].map((t) => (
            <Chip key={t} interactive selected={on.includes(t)} onClick={() => setOn((c) => (c.includes(t) ? c.filter((x) => x !== t) : [...c, t]))}>{t}</Chip>
          ))}
        </ChipGroup>
        <ChipGroup aria-label="Skills">
          {tags.map((t) => <Chip key={t} onClose={() => setTags((c) => c.filter((x) => x !== t))}>{t}</Chip>)}
        </ChipGroup>
      </div>
    );
  },
};
