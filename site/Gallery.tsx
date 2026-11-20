import { useRef, useState } from 'react';
import {
  Button, Input, Select, Checkbox, Radio, RadioGroup, Toggle, FieldGroup, Chip, Badge, Callout, InsightItem, OutcomeStat,
  ChatMessage, ChatComposer, Icon,
  Avatar, AvatarGroup, ChipGroup, Breadcrumbs, Scroller, MotionText, Skeleton, ProgressCircle, EmptyState,
  Banner, Notice, useToast, Modal, Popover, Tooltip, Dropdown, EmojiPicker,
} from '../src';

export function Demo({ title, note, children, wide }: { title: string; note?: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`gal-demo${wide ? ' gal-demo--wide' : ''}`}>
      <h4 className="gal-demo__title">{title}</h4>
      {note && <p className="site-note">{note}</p>}
      <div className="gal-demo__body">{children}</div>
    </div>
  );
}

export function Actions() {
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const run = () => { setBusy(true); window.setTimeout(() => setBusy(false), 1600); };
  return (
    <div className="gal-grid">
      <Demo title="Variants" note="One primary per area. The rest step back.">
        <div className="gal-row">
          <Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button>
          <Button variant="text">Text</Button><Button variant="danger">Delete</Button>
        </div>
      </Demo>
      <Demo title="Sizes" note="Heights come from the shared control scale, so they line up with inputs.">
        <div className="gal-row gal-row--end"><Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button></div>
      </Demo>
      <Demo title="Loading" note="Stays focusable and says it is busy, instead of disabling.">
        <Button loading={busy} onClick={run} startIcon={<Icon name="send" size={16} />}>{busy ? 'Sending' : 'Send message'}</Button>
      </Demo>
      <Demo title="Toggle button" note="aria-pressed for a binary choice. The icon fills when on.">
        <Button variant="secondary" pressed={saved} onPressedChange={setSaved} startIcon={<Icon name="star" size={16} filled={saved} />}>{saved ? 'Saved' : 'Save'}</Button>
      </Demo>
      <Demo title="Icon only" note="Always needs an accessible name.">
        <div className="gal-row">
          <Button iconOnly aria-label="Copy" variant="secondary"><Icon name="copy" size={18} /></Button>
          <Button iconOnly aria-label="Search" variant="ghost"><Icon name="search" size={18} /></Button>
        </div>
      </Demo>
    </div>
  );
}

export function Forms() {
  const [plan, setPlan] = useState('monthly');
  const [email, setEmail] = useState('bort@');
  const [touched, setTouched] = useState(true);
  const bad = touched && !/^\S+@\S+\.\S+$/.test(email);
  const [items, setItems] = useState({ a: true, b: false });
  const all = items.a && items.b;
  const none = !items.a && !items.b;
  return (
    <div className="gal-grid">
      <Demo title="Input with validation" note="Blur the field to validate. The error replaces the helper text.">
        <Input
          label="Email" type="email" value={email} required
          description="I only use it to reply."
          onChange={(e) => setEmail(e.target.value)} onBlur={() => setTouched(true)}
          messages={bad ? [{ type: 'error', text: 'Enter an email like you@company.com.' }] : [{ type: 'success', text: 'Looks good.' }]}
        />
      </Demo>
      <Demo title="Input sizes">
        <div className="gal-stack">
          <Input label="Small" size="sm" placeholder="32px" />
          <Input label="Large" size="lg" placeholder="48px, the touch-first size" startIcon="search" />
        </div>
      </Demo>
      <Demo title="Select" note="A styled native select, so every keyboard and phone picker works.">
        <Select label="Your role" placeholder="Choose a role" options={[
          { value: 'designer', label: 'Product designer' }, { value: 'pm', label: 'Product manager' }, { value: 'eng', label: 'Engineer' },
        ]} />
      </Demo>
      <Demo title="Radio group" note="Tab enters once, arrow keys move.">
        <RadioGroup legend="Plan" value={plan} onValueChange={setPlan}>
          <Radio value="monthly" label="Monthly" /><Radio value="yearly" label="Yearly" description="Two months free." />
        </RadioGroup>
      </Demo>
      <Demo title="Checkbox with a mixed parent" note="The parent shows a mixed state when children differ.">
        <FieldGroup legend="Export">
          <Checkbox label="All case studies" checked={all} indeterminate={!all && !none} onChange={(e) => setItems({ a: e.target.checked, b: e.target.checked })} />
          <div className="gal-indent">
            <Checkbox label="Design tokens" checked={items.a} onChange={(e) => setItems({ ...items, a: e.target.checked })} />
            <Checkbox label="InfoSec questionnaire" checked={items.b} onChange={(e) => setItems({ ...items, b: e.target.checked })} />
          </div>
        </FieldGroup>
      </Demo>
      <Demo title="Toggle" note="For settings that apply immediately.">
        <FieldGroup legend="Preferences" hideLegend>
          <Toggle label="Reduce motion" description="Turns off animation." />
          <Toggle label="Show insights" defaultChecked />
        </FieldGroup>
      </Demo>
    </div>
  );
}

export function Content() {
  const [tags, setTags] = useState(['Figma', 'Storybook', 'React']);
  const [on, setOn] = useState<string[]>(['All']);
  return (
    <div className="gal-grid">
      <Demo title="Chips" note="Values people pick, toggle or remove. Static unless interactive.">
        <div className="gal-row"><Chip>Design systems</Chip><Chip onClose={() => {}}>Tokens</Chip><Chip interactive>Suggested prompt</Chip></div>
        <ChipGroup aria-label="Filter">{['All', 'Case studies', 'AI'].map((t) => <Chip key={t} interactive selected={on.includes(t)} onClick={() => setOn((c) => (c.includes(t) ? c.filter((x) => x !== t) : [...c, t]))}>{t}</Chip>)}</ChipGroup>
        <ChipGroup aria-label="Skills">{tags.map((t) => <Chip key={t} onClose={() => setTags((c) => c.filter((x) => x !== t))}>{t}</Chip>)}</ChipGroup>
      </Demo>
      <Demo title="Badges" note="Status and counts. A badge informs and is never clickable.">
        <div className="gal-row"><Badge>Default</Badge><Badge type="positive">Positive</Badge><Badge type="critical">Critical</Badge><Badge type="warning">Warning</Badge><Badge type="info">Info</Badge><Badge type="ai" startIcon="sparkles">AI</Badge></div>
        <div className="gal-row"><Badge count={3} type="bulletin" aria-label="3 unread" /><Badge count={120} type="critical" aria-label="Over 99" /></div>
      </Demo>
      <Demo title="Insights" note="Icon and text, so color is never the only signal.">
        <div className="gal-stack">
          <InsightItem tone="win" icon="check-circle">Every participant finished every task.</InsightItem>
          <InsightItem tone="pain" icon="alert-triangle">Reviewers couldn&rsquo;t filter flagged answers.</InsightItem>
        </div>
      </Demo>
      <Demo title="Callout">
        <Callout><p style={{ margin: 0 }}>One short note that sets a point apart from the text around it.</p></Callout>
      </Demo>
      <Demo title="Outcome stat">
        <div className="gal-row"><OutcomeStat value="42" label="components" /><OutcomeStat value="3" label="themes" /></div>
      </Demo>
    </div>
  );
}

export function Display() {
  const people = ['Ana Pérez', 'Bo Chen', 'Cleo Dias', 'Dev Patel', 'Eli Ross', 'Fay Núñez'];
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState(0);
  return (
    <div className="gal-grid">
      <Demo title="Avatars" note="Image, then initials, then icon. Colour comes from the name.">
        <div className="gal-row"><Avatar name="Ana Pérez" presence="online" size="lg" /><Avatar name="Bo Chen" /><Avatar name="Cleo Dias" shape="square" /><Avatar icon={<Icon name="sparkles" size={14} />} aria-label="Assistant" /></div>
        <AvatarGroup max={4}>{people.map((n) => <Avatar key={n} name={n} />)}</AvatarGroup>
      </Demo>
      <Demo title="Breadcrumbs" note="Press the dots to expand a long trail.">
        <Breadcrumbs maxItems={3} items={[{ label: 'Home', href: '#' }, { label: 'Work', href: '#' }, { label: 'Case studies', href: '#' }, { label: 'Design systems', href: '#' }, { label: 'Form controls' }]} />
      </Demo>
      <Demo title="Scroller" note="Edge fades show there is more. Focus it and use the arrow keys.">
        <Scroller aria-label="Topics" direction="horizontal" showButtons style={{ maxWidth: '100%' }}>
          {['Design systems', 'Accessibility', 'Prototyping', 'Research', 'Storybook', 'React', 'Tokens', 'Motion'].map((t) => <Chip key={t}>{t}</Chip>)}
        </Scroller>
      </Demo>
      <Demo title="Motion text" note="Static when you prefer reduced motion.">
        <p style={{ margin: 0, font: 'var(--t-heading-sm)' }}>
          <MotionText effect="cycle" text="I work on" words={['design systems', 'case studies', 'AI agents']} />
        </p>
        <p key={reply} style={{ margin: 0, font: 'var(--t-body-md)' }}><MotionText effect="typewriter" text="Hello, I am Ariel." /></p>
        <Button size="sm" variant="secondary" onClick={() => setReply((n) => n + 1)}>Replay</Button>
      </Demo>
      <Demo title="Skeleton and progress" note="Loading shapes, and a ring for known progress.">
        <div className="gal-row">
          <ProgressCircle value={64} size="lg" showValue aria-label="Upload" /><ProgressCircle size="md" aria-label="Loading" /><ProgressCircle value={100} tone="success" size="lg" showValue={false} aria-label="Done"><Icon name="check" size={18} /></ProgressCircle>
        </div>
        <div className="gal-stack" aria-busy={loading} style={{ width: '100%' }}>
          {loading ? <div className="gal-row" style={{ alignItems: 'flex-start' }}><Skeleton shape="circle" width={40} /><div style={{ flex: 1 }}><Skeleton width="40%" style={{ marginBottom: 8 }} /><Skeleton lines={2} /></div></div>
            : <div className="gal-row"><Avatar name="Ana Pérez" size="lg" /><span>Loaded. Ana shared a file with you.</span></div>}
          <Button size="sm" variant="secondary" onClick={() => setLoading((l) => !l)}>{loading ? 'Show loaded' : 'Show skeleton'}</Button>
        </div>
      </Demo>
      <Demo title="Empty state" wide>
        <EmptyState icon="search" title="No results for “zebra”" description="Check the spelling or try a broader term." actions={<Button variant="secondary">Clear search</Button>} />
      </Demo>
    </div>
  );
}

export function Feedback() {
  const { toast } = useToast();
  const [banner, setBanner] = useState(true);
  return (
    <div className="gal-grid">
      <Demo title="Banner" note="For the whole app, at the very top." wide>
        <div style={{ alignSelf: 'stretch', borderRadius: 'var(--r-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
          {banner ? <Banner tone="brand" title="New:" onDismiss={() => setBanner(false)} action={<Button size="sm" variant="inverse">Try the agent</Button>}>Ask my portfolio agent about my work.</Banner>
            : <div style={{ padding: 12 }}><Button size="sm" variant="secondary" onClick={() => setBanner(true)}>Show banner</Button></div>}
        </div>
      </Demo>
      <Demo title="Notice" note="Inline, next to the content it is about.">
        <div className="gal-stack">
          <Notice tone="info" title="Calls are recorded">Everyone hears a short notice first.</Notice>
          <Notice tone="warning" title="Storage almost full" actions={<Button size="sm" variant="secondary">Manage files</Button>}>You have used 94% of your plan.</Notice>
        </div>
      </Demo>
      <Demo title="Toast" note="Hover a toast to pause it. Errors stay until dismissed.">
        <div className="gal-row">
          <Button variant="secondary" onClick={() => toast({ title: 'Changes saved', tone: 'success' })}>Success</Button>
          <Button variant="secondary" onClick={() => toast({ title: 'Archived', action: { label: 'Undo', onClick: () => {} } })}>With undo</Button>
          <Button variant="secondary" onClick={() => toast({ title: 'Could not save', description: 'Check your connection.', tone: 'danger' })}>Error</Button>
        </div>
      </Demo>
    </div>
  );
}

export function Overlays() {
  const [open, setOpen] = useState(false);
  const [danger, setDanger] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState('Great work');
  const emojiBtn = useRef<HTMLButtonElement>(null);
  const [last, setLast] = useState('nothing yet');
  return (
    <div className="gal-grid">
      <Demo title="Modal" note="Native dialog: focus is trapped, Escape closes, focus returns to the button.">
        <div className="gal-row">
          <Button onClick={() => setOpen(true)}>Invite</Button>
          <Button variant="danger" onClick={() => setDanger(true)}>Delete project</Button>
        </div>
        <Modal open={open} onClose={() => setOpen(false)} title="Invite a teammate" description="They get an email with a link to join."
          footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Send invite</Button></>}>
          <Input label="Email" type="email" placeholder="name@company.com" />
        </Modal>
        <Modal open={danger} onClose={() => setDanger(false)} size="sm" kind="danger" title="Delete this project?" description="This removes 12 files. You cannot undo it."
          footer={<><Button variant="secondary" onClick={() => setDanger(false)}>Keep project</Button><Button variant="danger" onClick={() => setDanger(false)}>Delete</Button></>} />
      </Demo>
      <Demo title="Tooltip" note="Shows on hover and on keyboard focus. Escape hides it.">
        <div className="gal-row">
          <Tooltip content="Copy link"><Button iconOnly variant="secondary" aria-label="Copy link"><Icon name="copy" size={16} /></Button></Tooltip>
          <Tooltip content="Add a title to publish." delay={0}><span tabIndex={0} style={{ display: 'inline-block' }}><Button disabled>Publish</Button></span></Tooltip>
        </div>
      </Demo>
      <Demo title="Dropdown" note="Arrow keys, Home, End and typing a letter all work.">
        <div className="gal-row">
          <Dropdown aria-label="Project actions" onSelect={setLast} trigger={<Button variant="secondary" endIcon={<Icon name="chevron-down" size={16} />}>Actions</Button>}
            items={[
              { id: 'edit', label: 'Edit', icon: <Icon name="pencil" size={16} />, shortcut: 'E' },
              { id: 'copy', label: 'Copy link', icon: <Icon name="copy" size={16} /> },
              { type: 'separator' },
              { id: 'delete', label: 'Delete', icon: <Icon name="trash" size={16} />, danger: true },
            ]} />
          <span className="site-note">Chose: {last}</span>
        </div>
      </Demo>
      <Demo title="Emoji picker" note="Inside a popover. Search, categories, arrow keys.">
        <div className="gal-row">
          <span>{text}</span>
          <Button ref={emojiBtn} iconOnly variant="secondary" aria-label="Add emoji" aria-haspopup="dialog" aria-expanded={emojiOpen} onClick={() => setEmojiOpen((o) => !o)}><Icon name="smile" size={16} /></Button>
          <Popover open={emojiOpen} onOpenChange={setEmojiOpen} anchorRef={emojiBtn} role="dialog" aria-label="Emoji picker">
            <EmojiPicker onSelect={(e) => { setText((t) => t + e); setEmojiOpen(false); emojiBtn.current?.focus(); }} />
          </Popover>
        </div>
      </Demo>
    </div>
  );
}

export function Chat() {
  const [log, setLog] = useState<{ from: 'bot' | 'user'; text: string; pending?: boolean }[]>([
    { from: 'bot', text: 'Hi. Ask me about the work in this portfolio.' },
  ]);
  const send = (text: string) =>
    new Promise<void>((resolve) => {
      setLog((l) => [...l, { from: 'user', text }, { from: 'bot', text: '', pending: true }]);
      window.setTimeout(() => {
        setLog((l) => [...l.slice(0, -1), { from: 'bot', text: 'This is a demo. The real agent answers from my case studies.' }]);
        resolve();
      }, 1100);
    });
  return (
    <div className="gal-grid gal-grid--one">
      <Demo title="Agent chat" note="The same Input and Button the AI agent uses. Try a suggestion." wide>
        <div className="gal-chat">
          <div className="gal-chat__log" role="log" aria-live="polite">
            {log.map((m, i) => <ChatMessage key={i} from={m.from} status={m.pending ? 'pending' : 'ok'}>{m.text}</ChatMessage>)}
          </div>
          <ChatComposer onSend={send} label="Ask the agent" placeholder="Ask about my work" suggestions={['What did you do at Bitsight?', 'Show me a design system decision']} />
        </div>
      </Demo>
    </div>
  );
}
