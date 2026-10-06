import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatMessage } from './ChatMessage';

const meta: Meta<typeof ChatMessage> = {
  title: 'Patterns/ChatMessage', component: ChatMessage,
  decorators: [(S) => <div style={{ width: 420, display: 'flex', flexDirection: 'column', gap: 10 }}><S /></div>],
  args: { from: 'bot', children: 'Hi! I can answer questions about Bort\'s experience and case studies.' },
};
export default meta;
type Story = StoryObj<typeof ChatMessage>;
export const Bot: Story = {};
export const User: Story = { args: { from: 'user', children: 'Where has he worked?' } };
export const Pending: Story = { args: { status: 'pending' } };
export const Error: Story = { args: { status: 'error', children: 'Rate limit reached. Try again in a minute.' } };
export const Conversation: Story = {
  render: () => (<><ChatMessage from="bot">Hi! Ask me anything.</ChatMessage><ChatMessage from="user">What does Bort specialize in?</ChatMessage><ChatMessage from="bot" status="pending" /></>),
};
