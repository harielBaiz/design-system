import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactSection } from './ContactSection';

const meta: Meta<typeof ContactSection> = {
  title: 'Components/ContactSection', component: ContactSection, parameters: { layout: 'fullscreen' },
  args: { title: "Let's work together", body: 'Open to senior product design roles focused on design systems.', email: 'hhhariel@yahoo.com.ar', links: [{ label: 'LinkedIn', href: '#' }, { label: 'Download CV', href: '#' }] },
};
export default meta;
export const Default: StoryObj<typeof ContactSection> = {};
