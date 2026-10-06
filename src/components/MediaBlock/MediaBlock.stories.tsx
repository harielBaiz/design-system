import type { Meta, StoryObj } from '@storybook/react-vite';
import { MediaBlock } from './MediaBlock';

const meta: Meta<typeof MediaBlock> = {
  title: 'Components/MediaBlock', component: MediaBlock, parameters: { layout: 'padded' },
  decorators: [(S) => <div style={{ width: 640 }}><S /></div>],
  args: { caption: 'Fig. 1: the token pipeline.' },
};
export default meta;
export const Placeholder: StoryObj<typeof MediaBlock> = {};
