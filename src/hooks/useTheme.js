import { useCallback, useEffect, useState } from 'react';

// Keep in sync with the inline script in index.html (it applies the saved theme before first paint).
const STORAGE_KEY = 'theme';
const THEME_COLORS = { dark: '#0a0a0b', light: '#f6f4ef' };

const getCurrentTheme = () => {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
};

/** Site theme: dark by default, light when the visitor picks it. The choice is remembered. */
export default function useTheme() {
  const [theme, setTheme] = useState(getCurrentTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable (e.g. private mode): the theme still switches for this visit
    }
    setTheme(next);
  }, [theme]);

  return { theme, toggleTheme };
}
