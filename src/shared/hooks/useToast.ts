/**
 * useToast Hook
 * 
 * Manages toast notifications throughout the application.
 * Provides a simple API for showing success, info, and error messages.
 */

import { useState, useCallback } from 'react';
import { ToastMessage, ToastType } from '../../types';
import { generateToastId, TOAST_DURATION } from '../../utils';

interface UseToastReturn {
  toasts: ToastMessage[];
  addToast: (type: ToastType, title: string, message: string) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: ToastType, title: string, message: string) => {
    const id = generateToastId();
    const newToast: ToastMessage = { id, type, title, message };
    
    setToasts((prev) => [...prev, newToast]);

    // Auto-remove after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
  };
};
