import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['!autodocs'], // documented in Modal.mdx
  parameters: { layout: 'centered' },
  args: { size: 'md', kind: 'default', dismissible: true, title: 'Invite a teammate', description: 'They get an email with a link to join.' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    kind: { control: 'inline-radio', options: ['default', 'danger'] },
    open: { table: { disable: true } }, onClose: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Invite</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)}
          footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Send invite</Button></>}>
          <Input label="Email" type="email" placeholder="name@company.com" />
        </Modal>
      </>
    );
  },
};
export const Confirmation: Story = {
  args: { size: 'sm', kind: 'danger', title: 'Delete this project?', description: 'This removes 12 files. You cannot undo it.' },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>Delete project</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)}
          footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Keep project</Button><Button variant="danger" onClick={() => setOpen(false)}>Delete</Button></>} />
      </>
    );
  },
};
export const ForcedChoice: Story = {
  args: { dismissible: false, title: 'Accept the new terms', description: 'You need to accept to keep using the app.' },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} footer={<Button onClick={() => setOpen(false)}>Accept</Button>}>
          Escape, the scrim and the close button are turned off. Only the button closes it.
        </Modal>
      </>
    );
  },
};
export const LongContent: Story = {
  args: { size: 'lg', title: 'Terms of use' },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>Read terms</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} footer={<Button onClick={() => setOpen(false)}>Close</Button>}>
          {Array.from({ length: 14 }, (_, i) => <p key={i}>Section {i + 1}. The body scrolls while the title and the buttons stay in view.</p>)}
        </Modal>
      </>
    );
  },
};
