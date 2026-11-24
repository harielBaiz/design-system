import { useEffect, useState } from 'react';
import type { IconName } from '../src';

/** TODO: replace with the deployed Storybook URL (planned: https://design.harielbaiz.com). */
/** Local while developing (npm run storybook). Replace with the published URL once Storybook is deployed. */
export const STORYBOOK_URL = 'http://localhost:6006';
export const GITHUB_URL = 'https://github.com/harielBaiz/design-system';
export const LAB_URL = 'https://harielbaiz.com/lab.html';

export interface NavNode {
  title: string;
  /** Route, like `/foundations/color/palette`. Groups have no path. */
  path?: string;
  children?: NavNode[];
  /** Link that leaves the site. */
  external?: string;
  icon?: IconName;
}

export const NAV: NavNode[] = [
  { title: 'Overview', path: '/' },
  { title: 'Why', path: '/why' },
  { title: 'Architecture', path: '/architecture' },
  { title: 'Decisions', path: '/decisions' },
  {
    title: 'Foundations',
    children: [
      {
        title: 'Color',
        children: [
          { title: 'Overview', path: '/foundations/color' },
          { title: 'Palette', path: '/foundations/color/palette' },
          { title: 'Color in product', path: '/foundations/color/product' },
        ],
      },
      { title: 'Typography', path: '/foundations/typography' },
      { title: 'Spacing and size', path: '/foundations/spacing' },
      { title: 'Elevation and motion', path: '/foundations/effects' },
    ],
  },
  {
    title: 'Components',
    children: [
      { title: 'Actions', path: '/components/actions' },
      { title: 'Forms', path: '/components/forms' },
      { title: 'Content', path: '/components/content' },
      { title: 'Display', path: '/components/display' },
      { title: 'Feedback', path: '/components/feedback' },
      { title: 'Overlays', path: '/components/overlays' },
      { title: 'Chat', path: '/components/chat' },
    ],
  },
  {
    title: 'Patterns',
    children: [
      { title: 'Ask assistant', path: '/patterns/ask-assistant' },
    ],
  },
  {
    title: 'Resources',
    children: [
      { title: 'Storybook', external: STORYBOOK_URL, icon: 'arrow-up-right' },
      { title: 'GitHub', external: GITHUB_URL, icon: 'arrow-up-right' },
    ],
  },
];

export function leaves(nodes: NavNode[] = NAV, trail: NavNode[] = []): { node: NavNode; trail: NavNode[] }[] {
  return nodes.flatMap((n) => (n.children ? leaves(n.children, [...trail, n]) : [{ node: n, trail }]));
}
export function findTrail(path: string) {
  return leaves().find((l) => l.node.path === path);
}
export function firstPath(node: NavNode): string | undefined {
  if (node.path) return node.path;
  for (const c of node.children ?? []) { const p = firstPath(c); if (p) return p; }
  return undefined;
}

/** Hash routing: `#/foundations/color`. Other hashes (in-page anchors, placeholders) leave the page where it is. */
const read = () => {
  const h = window.location.hash;
  if (!h.startsWith('#/')) return null;
  const p = h.slice(1).split('#')[0].replace(/\/+$/, '');
  return p || '/';
};
export function useRoute() {
  const [route, setRoute] = useState(() => read() ?? '/');
  useEffect(() => {
    const on = () => { const r = read(); if (r) setRoute(r); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}
export const href = (path: string) => `#${path}`;
