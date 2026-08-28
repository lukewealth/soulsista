/**
 * ThemeToggle
 *
 * Compact toggle: cycles through System → Light → Dark → System.
 * Designed for the navbar — 44×44pt touch target, 4.5:1 contrast,
 * visible focus ring, and a clear sun/moon icon.
 */

import React, { useEffect, useState } from 'react';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { useTheme, ThemeMode, ResolvedTheme } from './ThemeContext';

const MODES: { value: ThemeMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: 'system', label: 'System', icon: Monitor },
  { value: 'light', label: 'Day', icon: Sun },
  { value: 'dark', label: 'Night', icon: Moon },
];

const ThemeIcon: React.FC<{ resolved: ResolvedTheme; className?: string }> = ({
  resolved,
  className,
}) => {
  // Subtle crossfade between sun and moon based on resolved theme
  return (
    <span className="relative inline-flex items-center justify-center w-5 h-5">
      <Sun
        className={`absolute w-5 h-5 transition-all duration-300 ${
          resolved === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
        } ${className ?? ''}`}
        aria-hidden
      />
      <Moon
        className={`absolute w-5 h-5 transition-all duration-300 ${
          resolved === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
        } ${className ?? ''}`}
        aria-hidden
      />
    </span>
  );
};

export const ThemeToggle: React.FC<{ variant?: 'icon' | 'menu' }> = ({ variant = 'icon' }) => {
  const { mode, resolved, setMode, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-theme-menu]')) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={`Theme: ${mode}. Click to toggle.`}
        title={`Theme: ${mode} (${resolved}). Click to toggle.`}
        className="relative inline-flex items-center justify-center w-11 h-11 rounded-full text-forest hover:text-gold hover:bg-forest/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory transition-all"
      >
        <ThemeIcon resolved={resolved} />
      </button>
    );
  }

  // Full menu variant (for settings / admin)
  return (
    <div className="relative" data-theme-menu>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-forest/5 hover:bg-forest/10 text-forest text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory transition-all"
      >
        <ThemeIcon resolved={resolved} className="w-4 h-4" />
        <span className="capitalize">{mode === 'system' ? `Auto (${resolved})` : mode === 'light' ? 'Day' : 'Night'}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Theme"
          className="absolute right-0 top-full mt-2 w-48 bg-ivory-elevated text-forest rounded-xl shadow-xl border border-forest/10 z-50 overflow-hidden"
        >
          {MODES.map(({ value, label, icon: Icon }) => {
            const isActive = mode === value;
            return (
              <button
                key={value}
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => {
                  setMode(value);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
                  isActive
                    ? 'bg-gold/10 text-gold font-semibold'
                    : 'text-forest hover:bg-forest/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>
                  {label}
                  {value === 'system' && (
                    <span className="ml-1 text-xs opacity-70">({resolved})</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
