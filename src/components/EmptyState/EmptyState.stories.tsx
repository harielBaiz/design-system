import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';
import { Button } from '../Button/Button';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['!autodocs'], // documented in EmptyState.mdx
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 520, border: '1px dashed var(--border-mid)', borderRadius: 12 }}><Story /></div>],
  args: { icon: 'inbox', title: 'No messages yet', description: 'When someone writes to you, the conversation shows up here.', size: 'md' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};
export const WithActions: Story = {
  args: { icon: 'plus', title: 'Create your first project', description: 'Projects keep your files and notes together.', actions: <><Button>New project</Button><Button variant="secondary">Import</Button></> },
};
export const NoResults: Story = {
  args: { icon: 'search', title: 'No results for “zebra”', description: 'Check the spelling or try a broader term.', actions: <Button variant="secondary">Clear search</Button> },
};
export const ErrorState: Story = {
  name: 'Something went wrong',
  args: { icon: 'alert-circle', title: 'We could not load your files', description: 'Check your connection and try again.', actions: <Button>Try again</Button> },
};
export const Sizes: Story = {
  decorators: [(Story) => <div style={{ width: 520 }}><Story /></div>],
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => <div key={s} style={{ border: '1px dashed var(--border-mid)', borderRadius: 12 }}><EmptyState {...args} size={s} /></div>)}
    </div>
  ),
};
export const InsideACard: Story = {
  name: 'Compact, inside a list',
  args: { size: 'sm', icon: 'bell', title: 'You are all caught up', description: undefined },
};
export const CustomIllustration: Story = {
  args: { icon: <span style={{ fontSize: 28 }}>🌵</span>, title: 'Nothing grows here yet', description: 'Add your first item to get started.' },
};
