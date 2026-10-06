import type { Meta, StoryObj } from '@storybook/react-vite';
import { Testimonial } from './Testimonial';

const meta: Meta<typeof Testimonial> = {
  title: 'Components/Testimonial', component: Testimonial, parameters: { layout: 'padded' },
  decorators: [(S) => <div style={{ width: 720 }}><S /></div>],
  args: { quote: 'He made the system feel inevitable.', role: 'Engineering Manager', moment: 'After the token rollout' },
  argTypes: { size: { control: 'inline-radio', options: ['large', 'compact'] } },
};
export default meta;
type Story = StoryObj<typeof Testimonial>;
export const Large: Story = {};
export const Compact: Story = { args: { size: 'compact', quote: 'Clear, fast and kind to work with.' } };
