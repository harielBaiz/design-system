import type { Meta, StoryObj } from '@storybook/react-vite';
import { Callout } from './Callout';

const meta: Meta<typeof Callout> = {
  title: 'Components/Callout', component: Callout,
  decorators: [(S) => <div style={{ width: 560 }}><S /></div>],
  args: { children: 'Tokens cut the time to ship a theme change from days to an afternoon.' },
};
export default meta;
export const Default: StoryObj<typeof Callout> = {};
