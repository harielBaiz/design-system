import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MotionText } from './MotionText';
import { Button } from '../Button/Button';

const meta: Meta<typeof MotionText> = {
  title: 'Components/MotionText',
  component: MotionText,
  tags: ['!autodocs'], // documented in MotionText.mdx
  parameters: { layout: 'centered' },
  args: { text: 'Ask me anything about my work.', effect: 'typewriter' },
  argTypes: { effect: { control: 'inline-radio', options: ['typewriter', 'reveal', 'shimmer', 'cycle'] }, as: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof MotionText>;

const big = { font: 'var(--t-heading-md)', margin: 0 } as const;

export const Typewriter: Story = { render: (args) => <p style={big}><MotionText {...args} effect="typewriter" /></p> };
export const Reveal: Story = {
  name: 'Reveal words',
  render: (args) => <p style={big}><MotionText {...args} effect="reveal" text="Design systems that scale with the team." /></p>,
};
export const Shimmer: Story = {
  name: 'Shimmer (thinking)',
  render: (args) => <p style={{ ...big, font: 'var(--t-body-lg)' }}><MotionText {...args} effect="shimmer" text="Thinking about your question…" /></p>,
};
export const Cycle: Story = {
  name: 'Cycle words',
  render: (args) => <p style={big}><MotionText {...args} effect="cycle" text="I design" words={['design systems', 'case studies', 'AI agents', 'calm interfaces']} /></p>,
};
export const Loop: Story = { render: (args) => <p style={big}><MotionText {...args} effect="typewriter" loop /></p> };
export const Replay: Story = {
  render: (args) => {
    const [k, setK] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <p style={big}><MotionText key={k} {...args} effect="reveal" text="Hello, I am Ariel." /></p>
        <Button size="sm" variant="secondary" onClick={() => setK((n) => n + 1)}>Replay</Button>
      </div>
    );
  },
};
