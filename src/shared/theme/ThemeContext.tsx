/**
 * Theme Context
 *
 * Manages day/night theme with three modes:
 *  - 'system'  → follows the OS preference, updates live
 *  - 'light'   → always day
 *  - 'dark'    → always night
 *
 * The active resolved theme ('light' | 'dark') is applied via a
 * data-theme attribute on the <html> element. CSS variables in
 * index.css switch automatically.
 *
 * Persistence: localStorage key 'soulsysta_theme'.
 * On first load with no saved value, the OS preference is used.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';

export type ThemeMode = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'soulsysta_theme';
const ATTR = 'data-theme';

interface ThemeContextValue {
  mode: ThemeMode;
  resolved: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const isBrowser = typeof window !== 'undefined';

const getSystemTheme = (): ResolvedTheme => {
  if (!isBrowser) return 'light';
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

const readStoredMode = (): ThemeMode => {
  if (!isBrowser) return 'system';
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === 'light' || raw === 'dark' || raw === 'system') return raw;
  } catch {
    // ignore
  }
  return 'system';
};

const applyTheme = (resolved: ResolvedTheme) => {
  if (!isBrowser) return;
  const root = document.documentElement;
  root.setAttribute(ATTR, resolved);
  // Hint to the browser for native UI (form controls, scrollbars)
  root.style.colorScheme = resolved;
};

const useSystemThemeSubscription = (enabled: boolean, onChange: (t: ResolvedTheme) => void) => {
  useEffect(() => {
    if (!enabled || !isBrowser) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => onChange(e.matches ? 'dark' : 'light');
    // Modern browsers
    if (mq.addEventListener) {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
    // Legacy Safari
    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }, [enabled, onChange]);
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>(() => readStoredMode());
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => getSystemTheme());

  useSystemThemeSubscription(mode === 'system', setSystemTheme);

  const resolved: ResolvedTheme = mode === 'system' ? systemTheme : mode;

  // Apply to <html> whenever resolved changes
  useEffect(() => {
    applyTheme(resolved);
  }, [resolved]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(() => {
    // Toggle between explicit light and dark; from system, go to the opposite of the current resolved
    setModeState((prev) => {
      const currentResolved: ResolvedTheme = prev === 'system' ? systemTheme : prev;
      const nextMode: ThemeMode = currentResolved === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(STORAGE_KEY, nextMode);
      } catch {
        // ignore
      }
      return nextMode;
    });
  }, [systemTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, resolved, setMode, toggle }),
    [mode, resolved, setMode, toggle]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};
