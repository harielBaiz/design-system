import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, LinkButton } from './Button';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['!autodocs'], // documented in Button.mdx
  args: { children: 'Get in touch', variant: 'primary', size: 'md' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'text', 'inverse', 'inverse-outline', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Text: Story = { args: { variant: 'text', children: 'Download CV' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Delete project' } };
export const Disabled: Story = { args: { disabled: true } };
export const WithIcon: Story = { args: { endIcon: <Icon name="arrow-up-right" />, children: 'View case study' } };
export const IconOnly: Story = { args: { iconOnly: true, variant: 'secondary', 'aria-label': 'Send', children: <Icon name="send" /> } };
export const FullWidth: Story = { args: { fullWidth: true, children: 'Sign in' }, decorators: [(S) => <div style={{ width: 320 }}><S /></div>] };
export const Truncation: Story = {
  args: { children: 'This label is far too long for the space it has been given' },
  decorators: [(S) => <div style={{ width: 200 }}><S /></div>],
};

/** Click it: the button stays focusable and announces busy instead of being disabled. */
export const Loading: Story = {
  render: (args) => {
    const [loading, setLoading] = useState(false);
    return <Button {...args} loading={loading} onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1800); }}>Send message</Button>;
  },
};
export const LoadingStatic: Story = { args: { loading: true, children: 'Send message' } };

/** Binary choice. The label keeps a similar length in both states and the icon goes outline → filled. */
export const Toggle: Story = {
  render: (args) => {
    const [saved, setSaved] = useState(false);
    return (
      <Button {...args} variant="secondary" pressed={saved} onPressedChange={setSaved} startIcon={<Icon name="star" filled={saved} />}>
        {saved ? 'Saved' : 'Save'}
      </Button>
    );
  },
};

export const AsLink: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <LinkButton href="#case-study" variant="primary" endIcon={<Icon name="arrow-up-right" />}>View case study</LinkButton>
      <LinkButton href="https://example.com" external>Open Storybook</LinkButton>
    </div>
  ),
};

export const OnInverse: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ background: 'var(--bg-inverse)', padding: 48, display: 'flex', gap: 12 }}>
      <Button variant="inverse">Email me</Button>
      <Button variant="inverse-outline">LinkedIn</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button>
    </div>
  ),
};

/** One primary per area; secondary actions step down in weight. */
export const GroupAlignment: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 420 }}>
      <div>
        <p style={{ font: 'var(--t-caption)', color: 'var(--text-3)', margin: '0 0 8px' }}>Focused task or dialog: align right</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><Button variant="ghost">Cancel</Button><Button>Save changes</Button></div>
      </div>
      <div>
        <p style={{ font: 'var(--t-caption)', color: 'var(--text-3)', margin: '0 0 8px' }}>Full-page form: align left, primary first</p>
        <div style={{ display: 'flex', gap: 8 }}><Button>Save changes</Button><Button variant="ghost">Cancel</Button></div>
      </div>
    </div>
  ),
};
