import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressCircle } from './ProgressCircle';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof ProgressCircle> = {
  title: 'Components/ProgressCircle',
  component: ProgressCircle,
  tags: ['!autodocs'], // documented in ProgressCircle.mdx
  parameters: { layout: 'centered' },
  args: { value: 64, size: 'lg', tone: 'brand', showValue: true, 'aria-label': 'Upload progress' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    tone: { control: 'inline-radio', options: ['brand', 'success', 'warning', 'danger'] },
  },
};
export default meta;
type Story = StoryObj<typeof ProgressCircle>;

const row = { display: 'flex', alignItems: 'center', gap: 20 } as const;

export const Default: Story = {};
export const Sizes: Story = {
  render: (args) => <div style={row}>{(['sm', 'md', 'lg', 'xl'] as const).map((s) => <ProgressCircle key={s} {...args} size={s} />)}</div>,
};
export const Tones: Story = {
  render: (args) => <div style={row}>{(['brand', 'success', 'warning', 'danger'] as const).map((t) => <ProgressCircle key={t} {...args} tone={t} aria-label={`${t} progress`} />)}</div>,
};
export const Indeterminate: Story = {
  args: { value: undefined, showValue: false, 'aria-label': 'Loading' },
  render: (args) => <div style={row}>{(['sm', 'md', 'lg', 'xl'] as const).map((s) => <ProgressCircle key={s} {...args} size={s} />)}</div>,
};
export const Animated: Story = {
  render: (args) => {
    const [v, setV] = useState(0);
    useEffect(() => { const t = setInterval(() => setV((x) => (x >= 100 ? 0 : x + 5)), 400); return () => clearInterval(t); }, []);
    return <ProgressCircle {...args} value={v} size="xl" aria-label="Exporting" />;
  },
};
export const WithContent: Story = {
  render: (args) => (
    <div style={row}>
      <ProgressCircle {...args} value={100} tone="success" size="lg" showValue={false}><Icon name="check" size={20} /></ProgressCircle>
      <ProgressCircle {...args} value={40} size="xl" showValue={false}>2:40</ProgressCircle>
    </div>
  ),
};
