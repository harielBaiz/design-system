import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Nav } from './Nav';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { LangToggle } from '../LangToggle/LangToggle';

const meta: Meta<typeof Nav> = {
  title: 'Components/Nav', component: Nav, parameters: { layout: 'fullscreen' },
  args: { brand: 'Hariel Baiz', links: [{ label: 'Work', href: '#work', current: true }, { label: 'About', href: '#about' }, { label: 'Contact', href: '#contact' }] },
};
export default meta;
export const Default: StoryObj<typeof Nav> = {
  render: (args) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [lang, setLang] = useState<'en' | 'es'>('en');
    return <Nav {...args} controls={<><ThemeToggle theme={theme} onToggle={(t) => { setTheme(t); document.documentElement.setAttribute('data-theme', t); }} /><LangToggle lang={lang} onToggle={setLang} /></>} />;
  },
};
