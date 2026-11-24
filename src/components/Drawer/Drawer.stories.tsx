import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer } from './Drawer';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['!autodocs'], // documented in Drawer.mdx
  parameters: { layout: 'centered' },
  args: { title: 'Notes', description: 'Saved on this device.', placement: 'bottom-end', modal: false, open: false, onClose: () => {} },
  argTypes: {
    placement: { control: 'select', options: ['bottom-end', 'bottom-start', 'right', 'left'] },
    open: { control: false }, onClose: { control: false }, actions: { control: false }, footer: { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof Drawer>;

const Body = () => (
  <>
    <p style={{ margin: 0, color: 'var(--text-2)' }}>The page behind stays usable. Scroll, click and type outside the drawer while it is open.</p>
    <ul style={{ color: 'var(--text-2)', paddingLeft: 20 }}>{Array.from({ length: 12 }, (_, i) => <li key={i}>A line of content to make the body scroll ({i + 1})</li>)}</ul>
  </>
);

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen((o) => !o)}>{open ? 'Close drawer' : 'Open drawer'}</Button>
        <Drawer {...args} open={open} onClose={() => setOpen(false)}><Body /></Drawer>
      </>
    );
  },
};

export const Placements: Story = {
  render: (args) => {
    const [at, setAt] = useState<null | 'bottom-end' | 'bottom-start' | 'right' | 'left'>(null);
    return (
      <>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['bottom-end', 'bottom-start', 'right', 'left'] as const).map((p) => <Button key={p} variant="secondary" onClick={() => setAt(p)}>{p}</Button>)}
        </div>
        {(['bottom-end', 'bottom-start', 'right', 'left'] as const).map((p) => (
          <Drawer key={p} {...args} placement={p} title={`Placement: ${p}`} open={at === p} onClose={() => setAt(null)}><Body /></Drawer>
        ))}
      </>
    );
  },
};

export const Modal: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open settings</Button>
        <Drawer
          {...args} modal placement="right" title="Settings" description="Changes apply to this browser." open={open} onClose={() => setOpen(false)}
          footer={<div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Save</Button></div>}
        >
          <Body />
        </Drawer>
      </>
    );
  },
};

export const WithActionsAndFooter: Story = {
  name: 'Actions and footer',
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer
          {...args} open={open} onClose={() => setOpen(false)}
          actions={<Button variant="ghost" iconOnly aria-label="Start over"><Icon name="pencil" size={16} /></Button>}
          footer={<Button variant="secondary" onClick={() => setOpen(false)}>Done</Button>}
        >
          <Body />
        </Drawer>
      </>
    );
  },
};
