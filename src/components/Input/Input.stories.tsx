import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, type InputMessage } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['!autodocs'], // documented in Input.mdx
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  args: { label: 'Full name', placeholder: 'Ada Lovelace', size: 'md', type: 'text' },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    type: { control: 'select', options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date', 'time', 'file', 'color', 'textarea'] },
    startIcon: { control: 'select', options: [undefined, 'search', 'lock', 'globe', 'sparkles', 'send'] },
    endIcon: { control: 'select', options: [undefined, 'check', 'info', 'x'] },
    messages: { control: 'object' },
    validate: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { label: 'Email', type: 'email', placeholder: 'you@company.com', description: 'We only use this to reply to you.' },
};

export const Required: Story = { args: { required: true, description: 'As it appears on your ID.' } };

export const Disabled: Story = { args: { disabled: true, defaultValue: 'Read-only value' } };
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'hhhariel@yahoo.com.ar', label: 'Contact email' } };

// ── sizes ────────────────────────────────────────────────
export const Sizes: Story = {
  decorators: [(Story) => <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 16 }}><Story /></div>],
  render: (args) => (
    <>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Input key={s} {...args} size={s} label={`Size ${s}`} placeholder={`${s} input`} />
      ))}
    </>
  ),
};

// ── types ────────────────────────────────────────────────
export const Types: Story = {
  decorators: [(Story) => <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 16 }}><Story /></div>],
  render: () => (
    <>
      <Input label="Text" type="text" placeholder="Text" />
      <Input label="Password" type="password" defaultValue="hunter2" />
      <Input label="Email" type="email" placeholder="you@company.com" />
      <Input label="Number" type="number" placeholder="0" />
      <Input label="Phone" type="tel" placeholder="+54 11 5555 5555" />
      <Input label="Date" type="date" />
      <Input label="Time" type="time" />
      <Input label="File" type="file" />
      <Input label="Color" type="color" defaultValue="#171717" />
      <Input label="Message" type="textarea" placeholder="Tell me about your project" />
    </>
  ),
};

// ── validation states ────────────────────────────────────
export const ValidationStates: Story = {
  decorators: [(Story) => <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 16 }}><Story /></div>],
  render: () => (
    <>
      <Input label="Error" defaultValue="bort@" messages={[{ type: 'error', text: 'Enter a valid email address.' }]} />
      <Input label="Warning" defaultValue="bort" messages={[{ type: 'warning', text: 'Usernames under 6 characters are easy to guess.' }]} />
      <Input label="Success" defaultValue="bort_design" messages={[{ type: 'success', text: 'Username is available.' }]} />
      <Input label="Info" defaultValue="" placeholder="optional" messages={[{ type: 'info', text: 'Optional. Shown on your public profile.' }]} />
    </>
  ),
};

/** Show validation only after the user has left the field (blur), never on first render. */
export const ValidateOnBlur: Story = {
  args: { label: 'Email', type: 'email', placeholder: 'you@company.com', required: true },
  render: (args) => {
    const [value, setValue] = useState('');
    const [touched, setTouched] = useState(false);
    const invalid = touched && !/^\S+@\S+\.\S+$/.test(value);
    const messages: InputMessage[] | undefined = invalid ? [{ type: 'error', text: 'Enter a valid email address.' }] : touched ? [{ type: 'success', text: 'Looks good.' }] : undefined;
    return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} onBlur={() => setTouched(true)} messages={messages} />;
  },
};

// ── features ─────────────────────────────────────────────
/** The clear button appears only while there is text. */
export const Search: Story = { args: { label: 'Search components', type: 'search', placeholder: 'Search…', defaultValue: 'input' } };

/** Prefix and suffix text. Give them a spoken name when the symbol alone is ambiguous. */
export const PrefixAndSuffix: Story = {
  decorators: [(Story) => <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 16 }}><Story /></div>],
  render: () => (
    <>
      <Input label="Budget" type="number" prefixText="$" prefixLabel="US dollars" placeholder="0.00" />
      <Input label="Weight" type="number" suffixText="kg" suffixLabel="kilograms" placeholder="0" />
      <Input label="Work email" suffixText="@company.com" placeholder="first.last" />
    </>
  ),
};

/** The error replaces the helper text, so nothing below the field jumps. `reserveMessageSpace` keeps the line free. */
export const ErrorReplacesHelperText: Story = {
  args: { label: 'Username', description: '6–20 characters, letters and numbers only.', reserveMessageSpace: true },
  render: (args) => {
    const [value, setValue] = useState('bo');
    const [touched, setTouched] = useState(false);
    const messages: InputMessage[] | undefined = touched && value.length < 6 ? [{ type: 'error', text: 'Use at least 6 characters.' }] : undefined;
    return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} onBlur={() => setTouched(true)} messages={messages} />;
  },
};
export const WithIcons: Story = { args: { label: 'Website', startIcon: 'globe', endIcon: 'check', placeholder: 'https://' } };
export const PasswordToggle: Story = { args: { label: 'Password', type: 'password', defaultValue: 'correct horse battery' } };

export const LengthValidation: Story = {
  args: { label: 'Headline', description: 'A one-line summary of your work.', validate: { max: 40, warnAt: 32 }, defaultValue: 'Senior Product Designer, design systems' },
};

export const LengthRange: Story = {
  args: { label: 'Why do you want to work together?', type: 'textarea', rows: 3, validate: { min: 20, max: 200 }, defaultValue: 'Design systems.' },
};

/** Do: the label stays visible after typing. Don't: a placeholder that vanishes and was doing the label's job. */
export const PlaceholderIsNotALabel: Story = {
  decorators: [(Story) => <div style={{ width: 640 }}><Story /></div>],
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <div>
        <p style={{ font: 'var(--t-label-md)', color: 'var(--text-success)', margin: '0 0 8px' }}>Do</p>
        <Input label="Work email" description="Use the address you check most often." type="email" placeholder="you@company.com" />
      </div>
      <div>
        <p style={{ font: 'var(--t-label-md)', color: 'var(--text-danger)', margin: '0 0 8px' }}>Don't</p>
        <input aria-label="Work email" placeholder="Enter your work email" style={{ width: '100%', height: 40, padding: '0 12px', border: '1px solid var(--control-border)', borderRadius: 12, background: 'var(--control-bg)', color: 'var(--text)', font: 'var(--t-ui-lg)' }} />
      </div>
    </div>
  ),
};

export const Textarea: Story = {
  args: { label: 'Message', type: 'textarea', rows: 4, placeholder: 'Tell me about your project', validate: { max: 280 } },
};
