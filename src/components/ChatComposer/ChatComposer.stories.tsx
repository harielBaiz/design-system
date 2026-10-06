import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatComposer } from './ChatComposer';
import { ChatMessage } from '../ChatMessage/ChatMessage';

const meta: Meta<typeof ChatComposer> = {
  title: 'Patterns/ChatComposer',
  component: ChatComposer,
  decorators: [(S) => <div style={{ width: 520 }}><S /></div>],
  args: {
    suggestions: ['What does Bort specialize in?', 'Where has he worked?', 'Tell me about his design systems work'],
    onSend: () => {},
  },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] } },
};
export default meta;
type Story = StoryObj<typeof ChatComposer>;

export const Default: Story = {};
export const Multiline: Story = { args: { multiline: true, placeholder: 'Ask about a case study…' } };
export const Loading: Story = { args: { loading: true } };
export const WithError: Story = { args: { error: 'Too many questions. Try again in a minute.' } };

/** Wired to a fake bot so you can try the full flow: chip or Enter → pending → reply. */
export const InAConversation: Story = {
  render: (args) => {
    const [log, setLog] = useState<{ from: 'bot' | 'user'; text: string; pending?: boolean }[]>([
      { from: 'bot', text: "Hi! I can answer questions about Bort's experience, skills and case studies." },
    ]);
    const onSend = async (text: string) => {
      setLog((l) => [...l, { from: 'user', text }, { from: 'bot', text: '', pending: true }]);
      await new Promise((r) => setTimeout(r, 1200));
      setLog((l) => [...l.slice(0, -1), { from: 'bot', text: 'He is a senior product designer focused on design systems in B2B SaaS.' }]);
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 200 }} aria-live="polite">
          {log.map((m, i) => <ChatMessage key={i} from={m.from} status={m.pending ? 'pending' : 'ok'}>{m.text}</ChatMessage>)}
        </div>
        <ChatComposer {...args} onSend={onSend} />
      </div>
    );
  },
};
