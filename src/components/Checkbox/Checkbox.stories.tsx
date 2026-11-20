import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';
import { FieldGroup } from '../FormField/FormField';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['!autodocs'], // documented in Checkbox.mdx
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  args: { label: 'Send me product updates', size: 'md' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] }, messages: { control: 'object' } },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox {...args} disabled label="Disabled" />
      <Checkbox {...args} disabled defaultChecked label="Disabled and checked" />
    </div>
  ),
};
export const WithDescription: Story = {
  args: { label: 'Block anonymous callers', description: 'Callers who hide their number are sent to voicemail.' },
};
export const Required: Story = { args: { label: 'I accept the terms', required: true } };
export const ErrorState: Story = {
  args: { label: 'I accept the terms', required: true, messages: [{ type: 'error', text: 'Accept the terms to continue.' }] },
};
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox {...args} size="md" label="Medium (default)" defaultChecked />
      <Checkbox {...args} size="sm" label="Small" defaultChecked />
    </div>
  ),
};

/** A group needs a visible name: use FieldGroup (a fieldset and legend). */
export const Group: Story = {
  render: () => (
    <FieldGroup legend="Notifications" description="Choose where we can reach you.">
      <Checkbox label="Email" defaultChecked />
      <Checkbox label="Text message" />
      <Checkbox label="Push notification" description="Only when you are away from your desk." />
    </FieldGroup>
  ),
};
export const GroupError: Story = {
  render: () => (
    <FieldGroup legend="Notifications" required messages={[{ type: 'error', text: 'Choose at least one option.' }]}>
      <Checkbox label="Email" />
      <Checkbox label="Text message" />
    </FieldGroup>
  ),
};

/** The parent shows a mixed state when only some children are checked. */
export const Indeterminate: Story = {
  render: () => {
    const [items, setItems] = useState({ a: true, b: false, c: false });
    const all = Object.values(items).every(Boolean);
    const none = Object.values(items).every((v) => !v);
    const setAll = (v: boolean) => setItems({ a: v, b: v, c: v });
    return (
      <FieldGroup legend="Select cases to export">
        <Checkbox label="All cases" checked={all} indeterminate={!all && !none} onChange={(e) => setAll(e.target.checked)} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingInlineStart: 32 }}>
          {(['a', 'b', 'c'] as const).map((k, i) => (
            <Checkbox key={k} label={`Case study ${i + 1}`} checked={items[k]} onChange={(e) => setItems({ ...items, [k]: e.target.checked })} />
          ))}
        </div>
      </FieldGroup>
    );
  },
};
