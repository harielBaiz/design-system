import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';
import { Icon } from '../Icon/Icon';

const trail = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Case studies', href: '#cases' },
  { label: 'Design systems', href: '#ds' },
  { label: 'Form controls' },
];

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['!autodocs'], // documented in Breadcrumbs.mdx
  parameters: { layout: 'centered' },
  args: { items: trail.slice(0, 3) },
};
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {};
export const WithIcon: Story = {
  args: { items: [{ label: 'Home', href: '#home', icon: <Icon name="home" size={14} /> }, ...trail.slice(1, 3)] },
};
export const Collapsed: Story = {
  name: 'Collapsed (long trail)',
  args: { items: trail, maxItems: 3 },
};
export const CustomSeparator: Story = { args: { items: trail.slice(0, 3), separator: '/' } };
