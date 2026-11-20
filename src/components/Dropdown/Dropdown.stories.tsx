import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown, type DropdownEntry } from './Dropdown';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

const items: DropdownEntry[] = [
  { id: 'edit', label: 'Edit', icon: <Icon name="pencil" size={16} />, shortcut: 'E' },
  { id: 'copy', label: 'Copy link', icon: <Icon name="copy" size={16} />, shortcut: 'C' },
  { id: 'share', label: 'Share…', icon: <Icon name="send" size={16} /> },
  { type: 'separator' },
  { id: 'delete', label: 'Delete', icon: <Icon name="trash" size={16} />, danger: true },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['!autodocs'], // documented in Dropdown.mdx
  parameters: { layout: 'centered' },
  args: { items, 'aria-label': 'Project actions', placement: 'bottom-start' },
  argTypes: { placement: { control: 'select', options: ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end', 'right', 'left'] }, trigger: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: (args) => <Dropdown {...args} trigger={<Button variant="secondary" endIcon={<Icon name="chevron-down" size={16} />}>Actions</Button>} />,
};
export const IconTrigger: Story = {
  name: 'Icon button trigger',
  render: (args) => <Dropdown {...args} placement="bottom-end" trigger={<Button iconOnly variant="secondary" aria-label="More actions"><Icon name="ellipsis" size={16} /></Button>} />,
};
export const Groups: Story = {
  name: 'Groups, descriptions, disabled',
  args: {
    'aria-label': 'Account',
    items: [
      { type: 'label', label: 'Account' },
      { id: 'profile', label: 'Profile', icon: <Icon name="user" size={16} />, description: 'ariel@example.com' },
      { id: 'inbox', label: 'Inbox', icon: <Icon name="mail" size={16} />, shortcut: 'G I' },
      { id: 'billing', label: 'Billing', disabled: true, description: 'Only owners can change billing' },
      { type: 'separator' },
      { type: 'label', label: 'Appearance' },
      { id: 'theme', label: 'Switch theme', icon: <Icon name="moon" size={16} /> },
    ] satisfies DropdownEntry[],
  },
  render: (args) => <Dropdown {...args} trigger={<Button variant="secondary" startIcon={<Icon name="user" size={16} />}>Account</Button>} />,
};
export const HandleSelection: Story = {
  render: (args) => {
    const [last, setLast] = useState('nothing yet');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <Dropdown {...args} onSelect={setLast} trigger={<Button>Choose an action</Button>} />
        <span style={{ font: 'var(--t-ui-md)', color: 'var(--text-2)' }}>You chose: {last}</span>
      </div>
    );
  },
};
