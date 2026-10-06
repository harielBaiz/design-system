import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs', component: Tabs,
  decorators: [(S) => <div style={{ width: 480 }}><S /></div>],
  args: { 'aria-label': 'Mode', items: [
    { id: 'ask', label: 'Ask', content: 'Ask the bot about my work.' },
    { id: 'fight', label: 'Fight', content: 'Settle it with insults.' },
  ] },
};
export default meta;
export const Default: StoryObj<typeof Tabs> = {};
