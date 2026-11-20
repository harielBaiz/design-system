import type { ReactNode } from 'react';
import { Button, Input, Chip, Banner, Notice, Toast, EmptyState, ChatMessage, ChipGroup } from '../src';
import { Actions, Forms, Content, Display, Feedback, Overlays, Chat } from './Gallery';
import { BestPractice, DoDont } from './DoDont';
import { H2, P, ComponentList } from './ui';

function Group({ items, demos, children }: { items: { name: string; text: string }[]; demos: ReactNode; children?: ReactNode }) {
  return (
    <>
      <H2>Components in this group</H2>
      <ComponentList items={items} />
      <H2>Live examples</H2>
      <P>These come straight from the library. Click, type and tab through them.</P>
      {demos}
      {children && (<><H2>Best practices</H2>{children}</>)}
    </>
  );
}

export function ActionsPage() {
  return (
    <Group
      items={[
        { name: 'Button', text: 'Triggers an action. Variants, sizes, loading and toggle.' },
        { name: 'LinkButton', text: 'A link that looks like a button, for navigation.' },
        { name: 'CopyButton', text: 'Copies text and confirms it.' },
        { name: 'ThemeToggle', text: 'Switches light, dark and arcade.' },
        { name: 'LangToggle', text: 'Switches the language.' },
      ]}
      demos={<Actions />}
    >
      <BestPractice title="One primary action per area" text="One strong button shows what to do first. The other actions step back.">
        <DoDont kind="do" caption="One primary button. Cancel is secondary.">
          <div style={{ display: 'flex', gap: 8 }}><Button variant="secondary">Cancel</Button><Button>Save changes</Button></div>
        </DoDont>
        <DoDont kind="dont" caption="Two primary buttons compete for attention.">
          <div style={{ display: 'flex', gap: 8 }}><Button>Cancel</Button><Button>Save changes</Button></div>
        </DoDont>
      </BestPractice>
      <BestPractice title="Label with a verb" text="A label should say what happens. Avoid vague words.">
        <DoDont kind="do" caption="The label names the result.">
          <Button variant="danger">Delete project</Button>
        </DoDont>
        <DoDont kind="dont" caption="“OK” does not say what will happen.">
          <Button variant="danger">OK</Button>
        </DoDont>
      </BestPractice>
    </Group>
  );
}

export function FormsPage() {
  return (
    <Group
      items={[
        { name: 'FormField', text: 'The shared shell: label, help, messages and ids.' },
        { name: 'Input', text: 'Text, email, password, search, number and more.' },
        { name: 'Select', text: 'A styled native select.' },
        { name: 'Checkbox', text: 'Zero, one or many options, with a mixed state.' },
        { name: 'Radio', text: 'One choice from a short set.' },
        { name: 'Toggle', text: 'A setting that applies right away.' },
      ]}
      demos={<Forms />}
    >
      <BestPractice title="Keep a visible label" text="A placeholder disappears when people type. Always show a label.">
        <DoDont kind="do" caption="The label stays visible. The placeholder is only an example.">
          <Input label="Email" placeholder="you@company.com" />
        </DoDont>
        <DoDont kind="dont" caption="The placeholder is the only label. It vanishes while typing.">
          <Input label="Email" hideLabel placeholder="Email" />
        </DoDont>
      </BestPractice>
      <BestPractice title="Say how to fix the error" text="Tell people what is wrong and what to do, in plain words.">
        <DoDont kind="do" caption="The message tells people how to fix it.">
          <Input label="Email" defaultValue="bort@" messages={[{ type: 'error', text: 'Enter an email like you@company.com.' }]} />
        </DoDont>
        <DoDont kind="dont" caption="“Invalid input” does not say what to change.">
          <Input label="Email" defaultValue="bort@" messages={[{ type: 'error', text: 'Invalid input.' }]} />
        </DoDont>
      </BestPractice>
    </Group>
  );
}

export function ContentPage() {
  return (
    <Group
      items={[
        { name: 'Chip', text: 'Selected values, filters, suggestions and removable items.' },
        { name: 'Badge', text: 'Status, counts and short labels.' },
        { name: 'Callout', text: 'A note that sets a point apart.' },
        { name: 'InsightItem', text: 'A finding with an icon.' },
        { name: 'OutcomeStat', text: 'A big number with a label.' },
        { name: 'HeroFacts', text: 'Short facts in columns.' },
        { name: 'Testimonial, MediaBlock, CaseRow', text: 'Portfolio content blocks.' },
        { name: 'Nav, Footer, ContactSection, Tabs', text: 'Page structure.' },
      ]}
      demos={<Content />}
    >
      <BestPractice title="Keep chips short" text="A chip is a label, not a sentence. Use one to three words.">
        <DoDont kind="do" caption="Short labels scan quickly.">
          <ChipGroup aria-label="Skills"><Chip onClose={() => {}}>B2B SaaS</Chip><Chip onClose={() => {}}>Design systems</Chip></ChipGroup>
        </DoDont>
        <DoDont kind="dont" caption="A long sentence in a chip wraps and is hard to scan.">
          <Chip>This project was about redesigning the whole onboarding flow</Chip>
        </DoDont>
      </BestPractice>
    </Group>
  );
}

export function DisplayPage() {
  return (
    <Group
      items={[
        { name: 'Avatar, AvatarGroup', text: 'People and teams, with presence.' },
        { name: 'Breadcrumbs', text: 'Where you are, and a way back up.' },
        { name: 'Scroller', text: 'A scroll area with edge fades.' },
        { name: 'MotionText', text: 'Typing, reveal, shimmer and cycling text.' },
        { name: 'Skeleton', text: 'A placeholder for loading content.' },
        { name: 'ProgressCircle', text: 'Known progress or a short wait.' },
        { name: 'EmptyState', text: 'What to show when there is nothing yet.' },
      ]}
      demos={<Display />}
    >
      <BestPractice title="Say what to do next" text="An empty state should explain why it is empty and offer a way forward.">
        <DoDont kind="do" caption="A reason and a clear action.">
          <EmptyState size="sm" icon="inbox" title="No messages yet" description="When someone writes to you, it shows up here." actions={<Button size="sm">Invite a teammate</Button>} />
        </DoDont>
        <DoDont kind="dont" caption="A dead end. People do not know what to do.">
          <EmptyState size="sm" title="Nothing here" />
        </DoDont>
      </BestPractice>
    </Group>
  );
}

export function FeedbackPage() {
  return (
    <Group
      items={[
        { name: 'Banner', text: 'A message for the whole app, at the very top.' },
        { name: 'Notice', text: 'An inline message about nearby content.' },
        { name: 'Toast', text: 'A short confirmation that goes away.' },
      ]}
      demos={<Feedback />}
    >
      <BestPractice title="Keep toasts short" text="A toast is read at a glance. One short line is enough.">
        <DoDont kind="do" caption="One line that says what happened.">
          <Toast title="Changes saved" tone="success" />
        </DoDont>
        <DoDont kind="dont" caption="A long message people cannot read before it disappears.">
          <Toast title="Your changes were saved successfully and will be visible to everyone on your team shortly" tone="success" />
        </DoDont>
      </BestPractice>
      <BestPractice title="Match the tone to the problem" text="Use the tone that matches how serious it is.">
        <DoDont kind="do" caption="A failing service is a danger banner.">
          <Banner tone="danger" title="Payments are failing.">We are working on a fix.</Banner>
        </DoDont>
        <DoDont kind="dont" caption="An outage in an info banner looks like a tip.">
          <Banner tone="info" title="Payments are failing.">We are working on a fix.</Banner>
        </DoDont>
      </BestPractice>
    </Group>
  );
}

export function OverlaysPage() {
  return (
    <Group
      items={[
        { name: 'Modal', text: 'A native dialog that blocks the page until answered.' },
        { name: 'Popover', text: 'The anchored panel behind menus and pickers.' },
        { name: 'Tooltip', text: 'A short label on hover or focus.' },
        { name: 'Dropdown', text: 'A menu of actions with full keyboard support.' },
        { name: 'EmojiPicker', text: 'Search and pick an emoji.' },
      ]}
      demos={<Overlays />}
    >
      <BestPractice title="Name the action" text="Dialog buttons should say what they do, so people do not have to re-read the question.">
        <DoDont kind="do" caption="The button names the action.">
          <div style={{ display: 'flex', gap: 8 }}><Button variant="secondary">Keep project</Button><Button variant="danger">Delete project</Button></div>
        </DoDont>
        <DoDont kind="dont" caption="“Yes” and “No” depend on how the question is read.">
          <div style={{ display: 'flex', gap: 8 }}><Button variant="secondary">No</Button><Button variant="danger">Yes</Button></div>
        </DoDont>
      </BestPractice>
      <BestPractice title="Keep tooltips to a few words" text="A tooltip names or hints. Anything longer belongs on the page.">
        <DoDont kind="do" caption="A few words that name the control.">
          <span className="ds-tooltip">Copy link</span>
        </DoDont>
        <DoDont kind="dont" caption="A long explanation that cannot be reached with a keyboard or touch.">
          <span className="ds-tooltip">Copies a link to this page so you can share it with people outside your workspace. Read our sharing guide for more.</span>
        </DoDont>
      </BestPractice>
    </Group>
  );
}

export function ChatPage() {
  return (
    <Group
      items={[
        { name: 'ChatMessage', text: 'A message from the agent or the visitor, with a pending state.' },
        { name: 'ChatComposer', text: 'The input with suggestions for the agent.' },
      ]}
      demos={<Chat />}
    >
      <BestPractice title="Keep replies scannable" text="Short messages are easier to read in a chat. Break long answers into parts.">
        <DoDont kind="do" caption="A short, direct answer.">
          <ChatMessage from="bot">I led the design system at Bitsight. Want the short version or the case study?</ChatMessage>
        </DoDont>
        <DoDont kind="dont" caption="A wall of text in one message.">
          <ChatMessage from="bot">I led the design system at Bitsight, which meant auditing every component, writing the guidelines, building tokens, rolling them out with engineering across three squads, running the review process and training the team over many months.</ChatMessage>
        </DoDont>
      </BestPractice>
    </Group>
  );
}
