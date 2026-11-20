import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  tags: ['!autodocs'], // documented in Radio.mdx
  subcomponents: { Radio } as never,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  args: { legend: 'Missed call routing', defaultValue: 'voicemail' },
  argTypes: { orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] }, messages: { control: 'object' } },
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="voicemail" label="Send to voicemail" />
      <Radio value="message" label="Play a message" />
      <Radio value="team" label="Ring a team member" />
    </RadioGroup>
  ),
};
export const WithDescriptions: Story = {
  render: (args) => (
    <RadioGroup {...args} description="Applies when you are unavailable.">
      <Radio value="voicemail" label="Send to voicemail" description="So callers can hear your voice." />
      <Radio value="message" label="Play a message" description="No voicemail is recorded." />
      <Radio value="team" label="Ring a team member" description="Someone else may be able to help." />
    </RadioGroup>
  ),
};
export const Horizontal: Story = {
  decorators: [(Story) => <div style={{ width: 460 }}><Story /></div>],
  render: (args) => (
    <RadioGroup {...args} legend="Plan" orientation="horizontal" defaultValue="monthly">
      <Radio value="monthly" label="Monthly" />
      <Radio value="yearly" label="Yearly" />
    </RadioGroup>
  ),
};
export const NoDefault: Story = {
  args: { defaultValue: undefined, required: true },
  render: (args) => (
    <RadioGroup {...args} description="Nothing is selected until you choose.">
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
    </RadioGroup>
  ),
};
export const ErrorState: Story = {
  args: { defaultValue: undefined, required: true, messages: [{ type: 'error', text: 'Choose one option to continue.' }] },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
    </RadioGroup>
  ),
};
export const Disabled: Story = {
  render: (args) => (
    <RadioGroup {...args} disabled>
      <Radio value="voicemail" label="Send to voicemail" />
      <Radio value="message" label="Play a message" />
    </RadioGroup>
  ),
};
export const OneOptionDisabled: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="voicemail" label="Send to voicemail" />
      <Radio value="message" label="Play a message" disabled />
    </RadioGroup>
  ),
};
export const Controlled: Story = {
  render: (args) => {
    const [v, setV] = useState('voicemail');
    return (
      <>
        <RadioGroup {...args} value={v} onValueChange={setV}>
          <Radio value="voicemail" label="Send to voicemail" />
          <Radio value="message" label="Play a message" />
        </RadioGroup>
        <p style={{ marginTop: 12, font: 'var(--t-caption)', color: 'var(--text-3)' }}>Value: {v}</p>
      </>
    );
  },
};
