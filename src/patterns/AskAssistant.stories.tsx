import type { Meta, StoryObj } from '@storybook/react-vite';
import { AskAssistant } from './AskAssistant';

const meta: Meta<typeof AskAssistant> = {
  title: 'Patterns/Ask assistant',
  component: AskAssistant,
  tags: ['!autodocs'], // documented in AskAssistant.mdx
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof AskAssistant>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true } };
