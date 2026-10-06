import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer', component: Footer, parameters: { layout: 'fullscreen' },
  args: { text: '© 2026 Hariel Baiz', links: [{ label: 'LinkedIn', href: '#' }, { label: 'Resume', href: '#' }] },
};
export default meta;
export const Default: StoryObj<typeof Footer> = {};
