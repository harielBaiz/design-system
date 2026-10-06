import type { Meta, StoryObj } from '@storybook/react-vite';
import { CaseRow } from './CaseRow';
import { Badge } from '../Badge/Badge';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof CaseRow> = {
  title: 'Components/CaseRow', component: CaseRow, parameters: { layout: 'padded' },
  decorators: [(S) => <div style={{ width: 560 }}><S /></div>],
  args: { href: '#', title: 'Design tokens at scale', description: 'How a token architecture turned a theme change from a find-and-replace into a one-line edit.', tags: ['Design systems', 'B2B SaaS'] },
};
export default meta;
type Story = StoryObj<typeof CaseRow>;
export const Default: Story = {};
export const Locked: Story = { args: { badge: <Badge tone="overlay"><Icon name="lock" size={12} /> Protected</Badge> } };
export const Wide: Story = { args: { wide: true }, decorators: [(S) => <div style={{ width: 900 }}><S /></div>] };
