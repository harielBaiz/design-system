import type { Meta, StoryObj } from '@storybook/react-vite';
import { Scroller } from './Scroller';
import { Chip } from '../Chip/Chip';
import { Avatar } from '../Avatar/Avatar';

const names = ['Ana Pérez', 'Bo Chen', 'Cleo Dias', 'Dev Patel', 'Eli Ross', 'Fay Núñez', 'Gus Lang', 'Hana Ito', 'Ivo Marsh', 'Jo Ruiz'];

const meta: Meta<typeof Scroller> = {
  title: 'Components/Scroller',
  component: Scroller,
  tags: ['!autodocs'], // documented in Scroller.mdx
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  args: { 'aria-label': 'People', direction: 'vertical', maxHeight: 220, fade: true },
  argTypes: { direction: { control: 'inline-radio', options: ['vertical', 'horizontal'] } },
};
export default meta;
type Story = StoryObj<typeof Scroller>;

const person = (n: string) => (
  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 4px', font: 'var(--t-ui-md)' }}><Avatar name={n} />{n}</div>
);

export const Vertical: Story = { render: (args) => <Scroller {...args}>{names.map(person)}</Scroller> };
export const NoFade: Story = { args: { fade: false }, render: Vertical.render };
export const Horizontal: Story = {
  args: { direction: 'horizontal', 'aria-label': 'Topics', showButtons: true },
  render: (args) => (
    <Scroller {...args}>
      {['Design systems', 'Accessibility', 'Prototyping', 'Research', 'Storybook', 'React', 'Tokens', 'Motion', 'Writing', 'AI agents'].map((t) => <Chip key={t}>{t}</Chip>)}
    </Scroller>
  ),
};
export const ShortContent: Story = {
  name: 'Content that fits',
  render: (args) => <Scroller {...args}>{names.slice(0, 2).map(person)}</Scroller>,
};
