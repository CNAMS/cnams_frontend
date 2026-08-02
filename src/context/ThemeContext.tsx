'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { DEFAULT_ROLE, isAppRole, type AppRole } from '@/theme/roles';

/**
 * Drives the two attributes on <html> that the token cascade reads:
 * `data-role` (which of the five role skins) and `class="dark"`.
 *
 * Both live here rather than in separate providers because they are set on the
 * same element and read by the same stylesheet — splitting them means two
 * effects racing to write to documentElement.
 */

export type ColorScheme = 'light' | 'dark' | 'system';

const ROLE_KEY = 'app-role';
const SCHEME_KEY = 'app-color-scheme';

type ThemeContextType = {
  role: AppRole;
  setRole: (role: AppRole) => void;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  /** What is actually rendering right now, with 'system' resolved. */
  resolvedScheme: 'light' | 'dark';
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Runs before first paint to apply the stored role and scheme.
 *
 * Without this the page paints with the default AWW teal light theme and then
 * snaps to the user's actual role and scheme once React hydrates — a visible
 * flash of the wrong colour on every single navigation. Inlined as a blocking
 * script because it must complete before the browser paints anything.
 */
export const themeInitScript = `
(function(){try{
  var r=localStorage.getItem('${ROLE_KEY}');
  if(r)document.documentElement.setAttribute('data-role',r);
  var s=localStorage.getItem('${SCHEME_KEY}')||'system';
  var dark=s==='dark'||(s==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark',dark);
}catch(e){}})();
`;

function isColorScheme(value: unknown): value is ColorScheme {
  return value === 'light' || value === 'dark' || value === 'system';
}

export function ThemeProvider({
  children,
  /** Pins the role for a route regardless of what is stored — e.g. the public
   *  landing page, which always renders in the AWW field theme. */
  forceRole,
}: {
  children: ReactNode;
  forceRole?: AppRole;
}) {
  const [role, setRoleState] = useState<AppRole>(forceRole ?? DEFAULT_ROLE);
  const [colorScheme, setSchemeState] = useState<ColorScheme>('system');
  const [systemDark, setSystemDark] = useState(false);

  // Adopt whatever the pre-paint script already applied, so React's state
  // agrees with the DOM instead of fighting it.
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem(ROLE_KEY);
      if (!forceRole && isAppRole(savedRole)) setRoleState(savedRole);
      const savedScheme = localStorage.getItem(SCHEME_KEY);
      if (isColorScheme(savedScheme)) setSchemeState(savedScheme);
    } catch {
      // Storage unavailable — defaults are already correct.
    }
  }, [forceRole]);

  // Track the OS preference so 'system' stays live rather than sampling once.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => setSystemDark(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  const resolvedScheme: 'light' | 'dark' =
    colorScheme === 'system' ? (systemDark ? 'dark' : 'light') : colorScheme;

  useEffect(() => {
    document.documentElement.setAttribute('data-role', role);
  }, [role]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedScheme === 'dark');
  }, [resolvedScheme]);

  const setRole = useCallback((next: AppRole) => {
    const update = () => {
      setRoleState(next);
      try { localStorage.setItem(ROLE_KEY, next); } catch {}
      // We also update the DOM manually here so the view transition catches it
      // immediately before the next frame, rather than waiting for the useEffect.
      document.documentElement.setAttribute('data-role', next);
    };

    if (typeof document !== 'undefined' && (document as any).startViewTransition) {
      (document as any).startViewTransition(update);
    } else {
      update();
    }
  }, []);

  const setColorScheme = useCallback((next: ColorScheme) => {
    const update = () => {
      setSchemeState(next);
      try { localStorage.setItem(SCHEME_KEY, next); } catch {}
      const nextResolved = next === 'system' ? (systemDark ? 'dark' : 'light') : next;
      document.documentElement.classList.toggle('dark', nextResolved === 'dark');
    };

    if (typeof document !== 'undefined' && (document as any).startViewTransition) {
      (document as any).startViewTransition(update);
    } else {
      update();
    }
  }, [systemDark]);

  return (
    <ThemeContext.Provider
      value={{ role, setRole, colorScheme, setColorScheme, resolvedScheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
