import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmojiPicker } from './EmojiPicker';
import { Popover } from '../Popover/Popover';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof EmojiPicker> = {
  title: 'Components/EmojiPicker',
  component: EmojiPicker,
  tags: ['!autodocs'], // documented in EmojiPicker.mdx
  parameters: { layout: 'centered' },
  args: { columns: 8 },
  argTypes: { onSelect: { action: 'selected' } },
};
export default meta;
type Story = StoryObj<typeof EmojiPicker>;

export const Default: Story = {
  render: (args) => (
    <div style={{ border: '1px solid var(--border-mid)', borderRadius: 12 }}><EmojiPicker {...args} /></div>
  ),
};
export const WithRecent: Story = {
  args: { recent: ['🚀', '🎉', '👍'] },
  render: Default.render,
};
export const InAPopover: Story = {
  name: 'In a popover (message composer)',
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('Great work');
    const btn = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ font: 'var(--t-body-md)', minWidth: 140 }}>{text}</span>
        <Button ref={btn} iconOnly variant="secondary" aria-label="Add emoji" aria-expanded={open} aria-haspopup="dialog" onClick={() => setOpen((o) => !o)}>
          <Icon name="smile" size={16} />
        </Button>
        <Popover open={open} onOpenChange={setOpen} anchorRef={btn} placement="bottom-start" role="dialog" aria-label="Emoji picker">
          <EmojiPicker {...args} onSelect={(e) => { setText((t) => t + e); setOpen(false); btn.current?.focus(); }} />
        </Popover>
      </div>
    );
  },
};
export const FewColumns: Story = { args: { columns: 6 }, render: Default.render };
