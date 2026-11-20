import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast, ToastProvider, useToast, type ToastOptions } from './Toast';
import { Button } from '../Button/Button';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['!autodocs'], // documented in Toast.mdx
  parameters: { layout: 'centered' },
  decorators: [(Story) => <ToastProvider><Story /></ToastProvider>],
  args: { title: 'Changes saved', description: 'Your profile is up to date.', tone: 'success' },
  argTypes: { tone: { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'danger'] } },
};
export default meta;
type Story = StoryObj<typeof Toast>;

function Trigger({ label, options, variant = 'secondary' }: { label: string; options: ToastOptions; variant?: 'secondary' | 'danger' | 'primary' }) {
  const { toast } = useToast();
  return <Button variant={variant} onClick={() => toast(options)}>{label}</Button>;
}

export const Default: Story = {
  render: () => <Trigger variant="primary" label="Save changes" options={{ title: 'Changes saved', tone: 'success' }} />,
};
export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Trigger label="Neutral" options={{ title: 'Link copied' }} />
      <Trigger label="Info" options={{ title: 'Update available', description: 'Reload to get the latest version.', tone: 'info' }} />
      <Trigger label="Success" options={{ title: 'Message sent', tone: 'success' }} />
      <Trigger label="Warning" options={{ title: 'Connection is slow', description: 'Some changes may take longer.', tone: 'warning' }} />
      <Trigger label="Danger" options={{ title: 'Could not save', description: 'Check your connection and try again.', tone: 'danger' }} />
    </div>
  ),
};
export const WithAction: Story = {
  name: 'With an undo action',
  render: () => <Trigger label="Archive conversation" options={{ title: 'Conversation archived', action: { label: 'Undo', onClick: () => {} }, duration: 8000 }} />,
};
export const Sticky: Story = {
  name: 'Stays until dismissed',
  render: () => <Trigger label="Show sticky toast" options={{ title: 'Upload failed', description: 'The file is larger than 25 MB.', tone: 'danger', duration: 0 }} />,
};
export const Static: Story = {
  name: 'Static preview',
  render: (args) => <div style={{ width: 380 }}><Toast {...args} onDismiss={() => {}} action={{ label: 'Undo', onClick: () => {} }} /></div>,
};
