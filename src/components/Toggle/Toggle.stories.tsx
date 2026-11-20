import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toggle';
import { FieldGroup } from '../FormField/FormField';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['!autodocs'], // documented in Toggle.mdx
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  args: { label: 'Dark mode', size: 'md', showIcon: true },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const WithDescription: Story = {
  args: { label: 'Reduce motion', description: 'Turns off animations across the site.', defaultChecked: true },
};
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Toggle {...args} size="md" label="Medium (default)" defaultChecked />
      <Toggle {...args} size="sm" label="Small" defaultChecked />
    </div>
  ),
};
export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Toggle {...args} disabled label="Disabled off" />
      <Toggle {...args} disabled defaultChecked label="Disabled on" />
    </div>
  ),
};
export const WithoutIcon: Story = { args: { showIcon: false, defaultChecked: true } };
export const Controlled: Story = {
  render: (args) => {
    const [on, setOn] = useState(false);
    return (
      <>
        <Toggle {...args} label="Show insights" checked={on} onCheckedChange={setOn} />
        <p style={{ marginTop: 12, font: 'var(--t-caption)', color: 'var(--text-3)' }}>State: {on ? 'on' : 'off'}</p>
      </>
    );
  },
};
export const InAGroup: Story = {
  render: () => (
    <FieldGroup legend="Preferences" description="Each change applies immediately.">
      <Toggle label="Dark mode" />
      <Toggle label="Reduce motion" defaultChecked />
      <Toggle label="Show insights" defaultChecked />
    </FieldGroup>
  ),
};
