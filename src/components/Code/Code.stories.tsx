import type { Meta, StoryObj } from '@storybook/react-vite';
import { Code } from './Code';

const meta: Meta<typeof Code> = { title: 'Components/Code', component: Code, args: { children: '--brand-fill' } };
export default meta;
export const Inline: StoryObj<typeof Code> = {};
