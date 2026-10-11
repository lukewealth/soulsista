/**
 * CurrencyToggle
 *
 * Compact toggle that switches between International (USD)
 * and Nigeria (NGN) local pricing. 44×44pt touch target,
 * visible focus ring, WCAG AA contrast.
 */

import React, { useEffect, useState } from 'react';
import { useCurrency, Currency } from './CurrencyContext';

const OPTIONS: { value: Currency; label: string; flag: string }[] = [
  { value: 'NGN', label: 'Nigeria (NGN)', flag: '🇳🇬' },
  { value: 'USD', label: 'International (USD)', flag: '🌐' },
];

export const CurrencyToggle: React.FC<{ variant?: 'icon' | 'menu' }> = ({
  variant = 'icon',
}) => {
  const { currency, setCurrency, toggle } = useCurrency();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const click = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-currency-menu]')) setOpen(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', click);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('mousedown', click);
      document.removeEventListener('keydown', key);
    };
  }, [open]);

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={`Currency: ${currency}. Click to switch.`}
        title={`Currency: ${currency}. Click to switch.`}
        className="inline-flex items-center justify-center min-w-[44px] h-11 px-3 rounded-full text-forest hover:text-gold hover:bg-forest/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory transition-all text-xs font-bold uppercase tracking-widest"
      >
        {currency === 'NGN' ? '₦' : '$'}
      </button>
    );
  }

  return (
    <div className="relative" data-currency-menu>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-forest/5 hover:bg-forest/10 text-forest text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory transition-all"
      >
        <span className="text-base" aria-hidden>
          {currency === 'NGN' ? '🇳🇬' : '🌐'}
        </span>
        <span className="font-bold">{currency}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Currency"
          className="absolute right-0 top-full mt-2 w-56 bg-ivory-elevated text-forest rounded-xl shadow-xl border border-forest/10 z-50 overflow-hidden"
        >
          {OPTIONS.map((opt) => {
            const isActive = currency === opt.value;
            return (
              <button
                key={opt.value}
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => {
                  setCurrency(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
                  isActive
                    ? 'bg-gold/10 text-gold font-semibold'
                    : 'text-forest hover:bg-forest/5'
                }`}
              >
                <span className="text-lg" aria-hidden>
                  {opt.flag}
                </span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
