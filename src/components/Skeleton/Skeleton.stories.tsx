import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['!autodocs'], // documented in Skeleton.mdx
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  args: { shape: 'text', lines: 1 },
  argTypes: { shape: { control: 'inline-radio', options: ['text', 'rect', 'circle'] } },
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = { args: { width: '70%' } };
export const Paragraph: Story = { args: { lines: 4 } };
export const Rect: Story = { args: { shape: 'rect', height: 160 } };
export const Circle: Story = { args: { shape: 'circle', width: 48 } };
export const Still: Story = { args: { shape: 'rect', still: true } };
export const CardLoading: Story = {
  name: 'Card: loading to loaded',
  render: () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => { if (!loading) return; const t = setTimeout(() => setLoading(false), 2500); return () => clearTimeout(t); }, [loading]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div aria-busy={loading} style={{ display: 'flex', gap: 12, padding: 16, border: '1px solid var(--border-mid)', borderRadius: 12 }}>
          {loading ? <Skeleton shape="circle" width={40} /> : <Avatar name="Ana Pérez" size="lg" />}
          <div style={{ flex: 1 }}>
            {loading ? (<><Skeleton width="40%" style={{ marginBottom: 8 }} /><Skeleton lines={2} /></>) : (
              <><strong style={{ font: 'var(--t-label-md)' }}>Ana Pérez</strong><p style={{ margin: '4px 0 0', font: 'var(--t-ui-md)', color: 'var(--text-2)' }}>Shared the file “Q4 plan” with you. Open it to leave comments.</p></>
            )}
          </div>
        </div>
        <Button variant="secondary" size="sm" onClick={() => setLoading(true)}>Reload</Button>
      </div>
    );
  },
};
