import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LangToggle } from './LangToggle';

const meta: Meta<typeof LangToggle> = { title: 'Components/LangToggle', component: LangToggle, args: { lang: 'en' } };
export default meta;
export const Default: StoryObj<typeof LangToggle> = {
  render: () => { const [l, setL] = useState<'en' | 'es'>('en'); return <LangToggle lang={l} onToggle={setL} />; },
};
