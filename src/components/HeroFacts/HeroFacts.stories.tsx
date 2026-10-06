import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroFacts } from './HeroFacts';

const meta: Meta<typeof HeroFacts> = {
  title: 'Components/HeroFacts', component: HeroFacts, parameters: { layout: 'padded' },
  decorators: [(S) => <div style={{ width: 640 }}><S /></div>],
  args: { columns: [
    [{ label: 'Timeline', value: '6 months, 2023' }, { label: 'My role', value: 'Lead product designer' }],
    [{ label: 'Deliverables', value: 'Design tokens, component library, documentation' }],
  ] },
};
export default meta;
export const Default: StoryObj<typeof HeroFacts> = {};
