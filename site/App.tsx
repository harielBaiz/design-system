import { ToastProvider, useToast } from '../src';
import { useRoute } from './nav';
import { ThemeContext, useThemeState } from './theme';
import { Shell } from './Shell';

export { STORYBOOK_URL, GITHUB_URL } from './nav';

function Site() {
  const route = useRoute();
  const [theme, setTheme] = useThemeState();
  const { toast } = useToast();
  return (
    <ThemeContext.Provider value={theme}>
      <Shell route={route} theme={theme} setTheme={setTheme} onCopy={() => toast({ title: 'Link copied', tone: 'success', duration: 2500 })} />
    </ThemeContext.Provider>
  );
}

export function App() {
  return <ToastProvider><Site /></ToastProvider>;
}
