import { useEffect } from 'react';
import type { Preview } from '@storybook/react-vite';
import '../src/tokens/tokens.css';
import '../src/tokens/base.css';
import '../src/tokens/theme-arcade.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color mode',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'arcade', title: 'Arcade (AI agent)', icon: 'lightning' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, ctx) => {
      const theme = ['dark', 'arcade'].includes(ctx.globals.theme) ? ctx.globals.theme : 'light';
      useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.style.background = 'var(--bg)';
        document.body.style.color = 'var(--text)';
      }, [theme]);
      return <Story />;
    },
  ],
  parameters: {
    layout: 'centered',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'todo' },
    options: {
      storySort: { order: ['Foundations', 'Components', 'Patterns'] },
    },
  },
  tags: ['autodocs'],
};
export default preview;
