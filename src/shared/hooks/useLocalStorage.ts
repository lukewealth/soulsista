/**
 * useLocalStorage Hook
 * 
 * Synchronizes state with localStorage.
 * Provides a useState-like API with automatic persistence.
 */

import { useState, useEffect } from 'react';
import { getFromStorage, setToStorage } from '../utils';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] => {
  // Initialize state with value from localStorage or initial value
  const [value, setValue] = useState<T>(() => {
    return getFromStorage(key, initialValue);
  });

  // Update localStorage when value changes
  useEffect(() => {
    setToStorage(key, value);
  }, [key, value]);

  return [value, setValue];
};
