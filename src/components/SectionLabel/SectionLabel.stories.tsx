import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionLabel } from './SectionLabel';

const meta: Meta<typeof SectionLabel> = { title: 'Components/SectionLabel', component: SectionLabel, args: { children: 'Featured work' } };
export default meta;
export const Default: StoryObj<typeof SectionLabel> = {};
