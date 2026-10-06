import type { Meta, StoryObj } from '@storybook/react-vite';
import { InsightItem } from './InsightItem';

const meta: Meta<typeof InsightItem> = {
  title: 'Components/InsightItem', component: InsightItem,
  decorators: [(S) => <ul style={{ width: 560, display: 'flex', flexDirection: 'column', gap: 12, padding: 0, margin: 0 }}><S /></ul>],
  args: { children: <><strong>Insight.</strong> Analysts re-typed the same answers every quarter.</> },
  argTypes: { tone: { control: 'inline-radio', options: ['neutral', 'win', 'pain'] } },
};
export default meta;
type Story = StoryObj<typeof InsightItem>;
export const Neutral: Story = {};
export const Win: Story = { args: { tone: 'win', children: <><strong>Win.</strong> Answer reuse cut review time by half.</> } };
export const Pain: Story = { args: { tone: 'pain', children: <><strong>Pain.</strong> Questionnaires arrive in 40 different formats.</> } };
