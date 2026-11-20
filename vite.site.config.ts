import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The landing page for the design system. Separate from Storybook: `npm run site` to develop, `npm run build-site` to publish.
export default defineConfig({
  root: 'site',
  base: './',
  plugins: [react()],
  server: { port: 5174 },
  build: { outDir: '../site-dist', emptyOutDir: true },
});
