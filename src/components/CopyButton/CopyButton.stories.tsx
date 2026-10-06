import type { Meta, StoryObj } from '@storybook/react-vite';
import { CopyButton } from './CopyButton';

const meta: Meta<typeof CopyButton> = { title: 'Components/CopyButton', component: CopyButton, args: { value: 'hhhariel@yahoo.com.ar', label: 'Copy email' } };
export default meta;
export const Default: StoryObj<typeof CopyButton> = {
  render: (args) => (<span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, font: 'var(--t-ui-md)' }}>{args.value}<CopyButton {...args} /></span>),
};
