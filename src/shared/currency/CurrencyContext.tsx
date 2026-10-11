/**
 * Currency / Region Context
 *
 * Supports International (USD) and Nigerian (NGN) local pricing.
 * Persists in localStorage. When a price is missing in the selected
 * currency, the store auto-converts using the fixed rate below.
 *
 *  - The rate is intentionally pinned (not live) so that
 *    admin-entered NGN prices (e.g. 20,000) display exactly.
 *  - For services that have a custom NGN override (priceNGN), the
 *    override wins over the rate-converted value.
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

export type Currency = 'USD' | 'NGN';

const STORAGE_KEY = 'soulsysta_currency';
const RATE_USD_TO_NGN = 1500; // 1 USD = 1,500 NGN

const isBrowser = typeof window !== 'undefined';

const readStoredCurrency = (): Currency => {
  if (!isBrowser) return 'NGN';
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === 'USD' || raw === 'NGN') return raw;
  } catch {
    // ignore
  }
  return 'NGN';
};

const formatPrice = (value: number, currency: Currency): string => {
  if (!Number.isFinite(value)) return '—';
  if (currency === 'NGN') {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(Math.round(value));
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
};

const convertPrice = (usd: number, currency: Currency): number =>
  currency === 'NGN' ? usd * RATE_USD_TO_NGN : usd;

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggle: () => void;
  rate: number;
  format: (usd: number, overrideNGN?: number) => string;
  resolve: (usd: number, overrideNGN?: number) => number;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => readStoredCurrency());

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(() => {
    setCurrencyState((prev) => {
      const next: Currency = prev === 'NGN' ? 'USD' : 'NGN';
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  // Sync across tabs
  useEffect(() => {
    if (!isBrowser) return;
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === 'USD' || e.newValue === 'NGN')) {
        setCurrencyState(e.newValue);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const resolve = useCallback(
    (usd: number, overrideNGN?: number) => {
      if (currency === 'NGN') {
        return overrideNGN && overrideNGN > 0 ? overrideNGN : convertPrice(usd, 'NGN');
      }
      return usd;
    },
    [currency]
  );

  const format = useCallback(
    (usd: number, overrideNGN?: number) => formatPrice(resolve(usd, overrideNGN), currency),
    [currency, resolve]
  );

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      toggle,
      rate: RATE_USD_TO_NGN,
      format,
      resolve,
      symbol: currency === 'NGN' ? '₦' : '$',
    }),
    [currency, setCurrency, toggle, format, resolve]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = (): CurrencyContextValue => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return ctx;
};

export { RATE_USD_TO_NGN };
