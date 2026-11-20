import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormField, useField, type FieldMessage } from './FormField';

function RawExample({ messages, description }: { messages?: FieldMessage[]; description?: string }) {
  const f = useField({ description, messages });
  return (
    <FormField
      id={f.id} label="Custom control" description={description} descId={f.descId}
      messages={messages} msgId={f.msgId} state={f.state} size="md"
    >
      <div className="ds-field__box">
        <input id={f.id} className="ds-field__control" aria-describedby={f.describedBy()} aria-invalid={f.state === 'error' || undefined} />
      </div>
    </FormField>
  );
}

const meta: Meta<typeof RawExample> = {
  title: 'Patterns/FormField',
  component: RawExample,
  tags: ['!autodocs'], // documented in FormField.mdx
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  args: { description: 'Supporting text sits under the control.' },
};
export default meta;
type Story = StoryObj<typeof RawExample>;

export const Default: Story = {};
export const WithMessage: Story = {
  args: { messages: [{ type: 'error', text: 'Messages replace the supporting text on screen.' }] },
};
