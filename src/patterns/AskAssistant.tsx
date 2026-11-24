import { useRef, useState } from 'react';
import { Button, ChatComposer, ChatMessage, Drawer, Icon } from '..';

type Msg = { from: 'bot' | 'user'; text: string; status?: 'ok' | 'pending' | 'error' };

const WELCOME: Msg = { from: 'bot', text: 'Hi. Ask me about the work in this portfolio.' };

/**
 * Pattern demo: a launcher, a non-modal Drawer, a message log and a ChatComposer with suggested prompts.
 * It lives here, not in the library exports, because it is a recipe and not a component.
 * Type “fail” to see the error state.
 */
export function AskAssistant({ label = 'Ask about my work', defaultOpen = false }: { label?: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [log, setLog] = useState<Msg[]>([WELCOME]);
  const logRef = useRef<HTMLDivElement>(null);

  const reply = (text: string) =>
    new Promise<void>((resolve) => {
      setLog((l) => [...l, { from: 'user', text }, { from: 'bot', text: '', status: 'pending' }]);
      window.setTimeout(() => {
        const failed = /fail/i.test(text);
        setLog((l) => [
          ...l.slice(0, -1),
          failed
            ? { from: 'bot', text: 'I could not reach the agent. Try again in a moment.', status: 'error' }
            : { from: 'bot', text: 'This is a demo. The real agent answers from my case studies and links to the source.' },
        ]);
        logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
        resolve();
      }, 1100);
    });

  return (
    <>
      <Button variant="secondary" startIcon={<Icon name="sparkles" size={16} />} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {label}
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Ask about my work"
        description="Answers come from my case studies."
        actions={<Button variant="ghost" iconOnly aria-label="Start a new chat" onClick={() => setLog([WELCOME])}><Icon name="pencil" size={16} /></Button>}
        footer={
          <ChatComposer
            onSend={reply}
            label="Your question"
            placeholder="Ask about my work"
            suggestions={['What did you do at Bitsight?', 'Show me a design system decision']}
            size="md"
          />
        }
      >
        <div ref={logRef} role="log" aria-live="polite" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {log.map((m, i) => <ChatMessage key={i} from={m.from} status={m.status}>{m.text}</ChatMessage>)}
        </div>
      </Drawer>
    </>
  );
}
