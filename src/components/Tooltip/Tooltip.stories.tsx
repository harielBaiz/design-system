import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['!autodocs'], // documented in Tooltip.mdx
  parameters: { layout: 'centered' },
  args: { content: 'Copy link', placement: 'top', delay: 400 },
  argTypes: {
    placement: { control: 'select', options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'right'] },
    children: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => <Tooltip {...args}><Button variant="secondary">Hover or focus me</Button></Tooltip>,
};
export const IconButton: Story = {
  name: 'Icon-only button',
  render: (args) => (
    <Tooltip {...args} content="Copy link"><Button iconOnly variant="secondary" aria-label="Copy link"><Icon name="copy" size={16} /></Button></Tooltip>
  ),
};
export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 16 }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <Tooltip key={p} content={`Placed ${p}`} placement={p} delay={0}><Button variant="secondary" size="sm">{p}</Button></Tooltip>
      ))}
    </div>
  ),
};
export const NoDelay: Story = {
  render: (args) => <Tooltip {...args} delay={0} content="Shows right away"><Button variant="secondary">No delay</Button></Tooltip>,
};
export const OnDisabled: Story = {
  name: 'Explaining a disabled control',
  render: (args) => (
    <Tooltip {...args} content="Add a title to publish.">
      <span tabIndex={0} style={{ display: 'inline-block' }}><Button disabled>Publish</Button></span>
    </Tooltip>
  ),
};
