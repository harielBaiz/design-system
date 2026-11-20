import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'arcade';
export const THEMES: { id: Theme; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'arcade', label: 'Arcade' },
];

export function useThemeState() {
  const [theme, setTheme] = useState<Theme>(() => {
    const t = document.documentElement.getAttribute('data-theme');
    return t === 'dark' || t === 'arcade' ? t : 'light';
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('ds-site-theme', theme); } catch { /* storage can be blocked; the page works without it */ }
  }, [theme]);
  return [theme, setTheme] as const;
}

export const ThemeContext = createContext<Theme>('light');
export const useSiteTheme = () => useContext(ThemeContext);
