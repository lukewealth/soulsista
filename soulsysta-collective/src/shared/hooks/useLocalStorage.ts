/**
 * useLocalStorage Hook
 * 
 * Synchronizes state with localStorage.
 * Provides a useState-like API with automatic persistence.
 */

import { useState, useEffect, useCallback } from 'react';
import { getFromStorage, setToStorage, removeFromStorage } from '../utils';

interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  removeValue: () => void;
}

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> => {
  // Initialize state with value from localStorage or initial value
  const [value, setValue] = useState<T>(() => {
    return getFromStorage(key, initialValue);
  });

  // Update localStorage when value changes
  useEffect(() => {
    setToStorage(key, value);
  }, [key, value]);

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    removeFromStorage(key);
    setValue(initialValue);
  }, [key, initialValue]);

  return {
    value,
    setValue,
    removeValue,
  };
};
