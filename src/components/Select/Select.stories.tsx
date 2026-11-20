import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const roles = [
  { value: 'designer', label: 'Product designer' },
  { value: 'pm', label: 'Product manager' },
  { value: 'eng', label: 'Engineer' },
  { value: 'other', label: 'Other' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['!autodocs'], // documented in Select.mdx
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  args: { label: 'Your role', options: roles, placeholder: 'Choose a role', size: 'md' },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    messages: { control: 'object' },
    options: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};
export const WithDescription: Story = { args: { description: 'Helps me tailor the reply.' } };
export const Required: Story = { args: { required: true } };
export const Preselected: Story = { args: { placeholder: undefined, defaultValue: 'pm' } };
export const Disabled: Story = { args: { disabled: true } };
export const Sizes: Story = {
  decorators: [(Story) => <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 16 }}><Story /></div>],
  render: (args) => (
    <>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Select key={s} {...args} size={s} label={`Size ${s}`} />
      ))}
    </>
  ),
};
export const ValidationStates: Story = {
  decorators: [(Story) => <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 16 }}><Story /></div>],
  render: (args) => (
    <>
      <Select {...args} label="Error" messages={[{ type: 'error', text: 'Choose a role to continue.' }]} />
      <Select {...args} label="Warning" defaultValue="other" placeholder={undefined} messages={[{ type: 'warning', text: 'Other roles get a generic reply.' }]} />
      <Select {...args} label="Success" defaultValue="designer" placeholder={undefined} messages={[{ type: 'success', text: 'Thanks, that helps.' }]} />
    </>
  ),
};
export const WithGroups: Story = {
  args: { options: undefined },
  render: (args) => (
    <Select {...args}>
      <optgroup label="Design"><option value="pd">Product designer</option><option value="ux">UX researcher</option></optgroup>
      <optgroup label="Product"><option value="pm">Product manager</option></optgroup>
    </Select>
  ),
};
