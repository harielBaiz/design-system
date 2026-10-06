import type { Meta, StoryObj } from '@storybook/react-vite';
import { OutcomeStat } from './OutcomeStat';

const meta: Meta<typeof OutcomeStat> = {
  title: 'Components/OutcomeStat', component: OutcomeStat,
  decorators: [(S) => <div style={{ width: 280 }}><S /></div>],
  args: { value: '-40%', label: 'Time to complete a questionnaire' },
};
export default meta;
export const Default: StoryObj<typeof OutcomeStat> = {};
