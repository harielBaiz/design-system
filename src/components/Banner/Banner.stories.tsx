import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner } from './Banner';
import { Button } from '../Button/Button';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['!autodocs'], // documented in Banner.mdx
  parameters: { layout: 'fullscreen' },
  args: { tone: 'info', title: 'Scheduled maintenance.', children: 'The site will be read-only on Sunday from 02:00 to 03:00.' },
  argTypes: { tone: { control: 'select', options: ['info', 'success', 'warning', 'danger', 'brand'] } },
};
export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {};
export const Tones: Story = {
  render: () => (
    <div>
      {(['info', 'success', 'warning', 'danger', 'brand'] as const).map((t) => (
        <Banner key={t} tone={t} title={`${t[0].toUpperCase()}${t.slice(1)}.`}>This is a {t} banner.</Banner>
      ))}
    </div>
  ),
};
export const WithAction: Story = {
  render: () => (
    <Banner tone="brand" title="New:" action={<Button size="sm" variant="inverse">Try the agent</Button>}>
      Ask my portfolio agent anything about my work.
    </Banner>
  ),
};
export const Dismissible: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return open ? (
      <Banner tone="warning" title="Your session ends in 5 minutes." onDismiss={() => setOpen(false)}>Save your work to keep it.</Banner>
    ) : (
      <div style={{ padding: 16 }}><Button size="sm" variant="secondary" onClick={() => setOpen(true)}>Show banner again</Button></div>
    );
  },
};
export const NoIcon: Story = { args: { hideIcon: true } };
