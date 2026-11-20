import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Notice } from './Notice';
import { Button } from '../Button/Button';

const meta: Meta<typeof Notice> = {
  title: 'Components/Notice',
  component: Notice,
  tags: ['!autodocs'], // documented in Notice.mdx
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
  args: { tone: 'info', title: 'Calls are recorded', children: 'Everyone on the line hears a short notice before recording starts.' },
  argTypes: { tone: { control: 'select', options: ['info', 'success', 'warning', 'danger', 'neutral'] } },
};
export default meta;
type Story = StoryObj<typeof Notice>;

export const Default: Story = {};
export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['info', 'success', 'warning', 'danger', 'neutral'] as const).map((t) => (
        <Notice key={t} tone={t} title={t[0].toUpperCase() + t.slice(1)}>A short message that explains what is going on.</Notice>
      ))}
    </div>
  ),
};
export const WithActions: Story = {
  render: () => (
    <Notice tone="warning" title="Your storage is almost full" actions={<><Button size="sm" variant="secondary">Manage files</Button><Button size="sm" variant="text">Not now</Button></>}>
      You have used 94% of your plan.
    </Notice>
  ),
};
export const TitleOnly: Story = { args: { children: undefined, title: 'Changes saved', tone: 'success' } };
export const BodyOnly: Story = { args: { title: undefined } };
export const Dismissible: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return open ? <Notice tone="info" title="Tip" onDismiss={() => setOpen(false)}>Press / to focus the search field.</Notice>
      : <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>Show notice</Button>;
  },
};
