import type { ReactElement, ReactNode } from 'react';
import { Overview, Why, Architecture, Decisions } from './pagesIntro';
import { ColorOverview, ColorPalette, ColorProduct, Typography, Spacing, Effects } from './pagesFoundations';
import { ActionsPage, FormsPage, ContentPage, DisplayPage, FeedbackPage, OverlaysPage, ChatPage, AskAssistantPage } from './pagesComponents';

export interface PageDef {
  title: string;
  lead: ReactNode;
  Component: () => ReactElement;
  related?: string[];
  /** Overview draws its own hero instead of a title and lead. */
  bare?: boolean;
}

export const PAGES: Record<string, PageDef> = {
  '/': { title: 'Design System', lead: '', Component: Overview, bare: true },
  '/why': { title: 'Why', lead: 'One system for two very different products.', Component: Why, related: ['/architecture', '/decisions'] },
  '/architecture': { title: 'Architecture', lead: 'Meaning in the middle makes themes cheap.', Component: Architecture, related: ['/foundations/color/product', '/decisions'] },
  '/decisions': { title: 'Decisions', lead: 'Six calls, and the reasons behind them.', Component: Decisions, related: ['/why', '/architecture'] },
  '/foundations/color': { title: 'Color', lead: 'A systematic and accessible color palette that supports functional needs and a themeable product.', Component: ColorOverview, related: ['/foundations/color/palette', '/foundations/color/product'] },
  '/foundations/color/palette': { title: 'Palette', lead: 'A scale of raw colors to choose from. Nothing here has a meaning yet.', Component: ColorPalette, related: ['/foundations/color', '/foundations/color/product'] },
  '/foundations/color/product': { title: 'Color in product', lead: 'How color carries meaning in the interface, and how semantic tokens keep it consistent across themes.', Component: ColorProduct, related: ['/foundations/color/palette', '/architecture'] },
  '/foundations/typography': { title: 'Typography', lead: 'Three families and one composite type scale.', Component: Typography, related: ['/foundations/spacing'] },
  '/foundations/spacing': { title: 'Spacing and size', lead: 'A 4px spacing scale, three radii and one shared control height scale.', Component: Spacing, related: ['/foundations/typography', '/components/forms'] },
  '/foundations/effects': { title: 'Elevation and motion', lead: 'Shadows, the modal scrim, durations and easing.', Component: Effects, related: ['/components/overlays', '/components/feedback'] },
  '/components/actions': { title: 'Actions', lead: 'Buttons and toggles that start something.', Component: ActionsPage, related: ['/components/forms', '/components/overlays'] },
  '/components/forms': { title: 'Forms', lead: 'Controls that share one shell for labels, help and validation.', Component: FormsPage, related: ['/components/actions', '/components/feedback'] },
  '/components/content': { title: 'Content', lead: 'Tags, badges and the blocks that build portfolio pages.', Component: ContentPage, related: ['/components/display'] },
  '/components/display': { title: 'Display', lead: 'People, loading states, progress and empty states.', Component: DisplayPage, related: ['/components/content', '/components/feedback'] },
  '/components/feedback': { title: 'Feedback', lead: 'Messages at three scales: the whole app, a section and a moment.', Component: FeedbackPage, related: ['/components/overlays', '/components/display'] },
  '/components/overlays': { title: 'Overlays', lead: 'Dialogs, menus, tooltips and pickers, rendered in the browser top layer.', Component: OverlaysPage, related: ['/components/feedback', '/foundations/effects'] },
  '/patterns/ask-assistant': { title: 'Ask assistant', lead: 'A chat window that answers questions without taking people off the page.', Component: AskAssistantPage, related: ['/components/chat', '/components/overlays'] },
  '/components/chat': { title: 'Chat', lead: 'The pieces the AI agent is built from.', Component: ChatPage, related: ['/components/forms', '/components/content'] },
};
