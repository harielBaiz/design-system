import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = { title: 'Components/ThemeToggle', component: ThemeToggle, args: { theme: 'light' } };
export default meta;
export const Default: StoryObj<typeof ThemeToggle> = {
  render: () => {
    const [t, setT] = useState<'light' | 'dark'>('light');
    return <ThemeToggle theme={t} onToggle={setT} />;
  },
};
