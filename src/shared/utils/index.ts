/**
 * Shared Utility Functions for Soulsysta Collective
 * 
 * Pure utility functions used across all features.
 * All functions are pure and have no side effects.
 */

import { clsx, type ClassValue } from 'clsx';
import { format, parseISO, isValid } from 'date-fns';
import { VALIDATION, DATE_FORMATS, CURRENCY, ANIMATION } from '../constants';

// ============================================================================
// String Utilities
// ============================================================================

/**
 * Capitalizes the first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Converts a string to title case
 */
export const toTitleCase = (str: string): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Truncates a string to a specified length
 */
export const truncate = (str: string, length: number): string => {
  if (!str || str.length <= length) return str;
  return str.slice(0, length).trim() + '...';
};

/**
 * Generates a URL-safe slug from a string
 */
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ============================================================================
// Validation Utilities
// ============================================================================

/**
 * Validates an email address
 */
export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  return VALIDATION.EMAIL_REGEX.test(email);
};

/**
 * Validates a phone number
 */
export const isValidPhone = (phone: string): boolean => {
  if (!phone) return false;
  return VALIDATION.PHONE_REGEX.test(phone);
};

/**
 * Validates a name (minimum length, no special characters)
 */
export const isValidName = (name: string): boolean => {
  if (!name) return false;
  const trimmed = name.trim();
  return (
    trimmed.length >= VALIDATION.MIN_NAME_LENGTH &&
    trimmed.length <= VALIDATION.MAX_NAME_LENGTH &&
    /^[a-zA-Z\s'-]+$/.test(trimmed)
  );
};

/**
 * Validates a message (not empty, within length limit)
 */
export const isValidMessage = (message: string): boolean => {
  if (!message) return false;
  const trimmed = message.trim();
  return trimmed.length > 0 && trimmed.length <= VALIDATION.MAX_MESSAGE_LENGTH;
};

// ============================================================================
// Date Utilities
// ============================================================================

/**
 * Formats a date string to display format
 */
export const formatDate = (dateString: string, formatStr: string = DATE_FORMATS.DISPLAY): string => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return dateString;
    return format(date, formatStr);
  } catch {
    return dateString;
  }
};

/**
 * Formats a date with time
 */
export const formatDateTime = (dateString: string): string => {
  return formatDate(dateString, DATE_FORMATS.DISPLAY_WITH_TIME);
};

/**
 * Gets relative time string (e.g., "2 hours ago")
 */
export const getRelativeTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return dateString;
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    
    return formatDate(dateString);
  } catch {
    return dateString;
  }
};

/**
 * Checks if a date is in the past
 */
export const isDateInPast = (dateString: string): boolean => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return false;
    return date.getTime() < Date.now();
  } catch {
    return false;
  }
};

/**
 * Checks if a date is in the future
 */
export const isDateInFuture = (dateString: string): boolean => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return false;
    return date.getTime() > Date.now();
  } catch {
    return false;
  }
};

// ============================================================================
// Number Utilities
// ============================================================================

/**
 * Formats a number as currency
 */
export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat(CURRENCY.LOCALE, {
    style: 'currency',
    currency: CURRENCY.CODE,
  }).format(amount);
};

/**
 * Formats a number with commas
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat(CURRENCY.LOCALE).format(num);
};

/**
 * Rounds a number to specified decimal places
 */
export const round = (num: number, decimals: number = 2): number => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Calculates percentage
 */
export const percentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return round((value / total) * 100, 1);
};

// ============================================================================
// Array Utilities
// ============================================================================

/**
 * Removes duplicate items from an array
 */
export const unique = <T>(arr: T[]): T[] => {
  return [...new Set(arr)];
};

/**
 * Shuffles an array randomly
 */
export const shuffle = <T>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Groups an array by a key
 */
export const groupBy = <T>(arr: T[], key: keyof T): Record<string, T[]> => {
  return arr.reduce((groups, item) => {
    const groupKey = String(item[key]);
    return {
      ...groups,
      [groupKey]: [...(groups[groupKey] || []), item],
    };
  }, {} as Record<string, T[]>);
};

/**
 * Sorts an array by a key
 */
export const sortBy = <T>(arr: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...arr].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// ============================================================================
// Object Utilities
// ============================================================================

/**
 * Picks specific keys from an object
 */
export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
    return result;
  }, {} as Pick<T, K>);
};

/**
 * Omits specific keys from an object
 */
export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
};

/**
 * Checks if an object is empty
 */
export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

// ============================================================================
// CSS/Class Utilities
// ============================================================================

/**
 * Merges class names with clsx
 */
export const cn = (...inputs: ClassValue[]): string => {
  return clsx(inputs);
};

/**
 * Creates a conditional class string
 */
export const conditionalClass = (
  baseClass: string,
  condition: boolean,
  trueClass: string,
  falseClass?: string
): string => {
  return cn(baseClass, condition ? trueClass : falseClass);
};

// ============================================================================
// ID Generation
// ============================================================================

/**
 * Generates a unique ID
 */
export const generateId = (prefix: string = ''): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  const id = `${timestamp}-${random}`;
  return prefix ? `${prefix}-${id}` : id;
};

/**
 * Generates a booking reference ID
 */
export const generateBookingId = (): string => {
  const prefix = 'SSL';
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${random}`;
};

/**
 * Generates an order ID
 */
export const generateOrderId = (): string => {
  const prefix = 'ORD';
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${random}`;
};

/**
 * Generates a donation ID
 */
export const generateDonationId = (): string => {
  const prefix = 'ALY';
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${random}`;
};

/**
 * Generates an enquiry ID
 */
export const generateEnquiryId = (): string => {
  const prefix = 'ENQ';
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${random}`;
};

/**
 * Generates a toast ID
 */
export const generateToastId = (): string => {
  return `TST-${Date.now()}`;
};

// ============================================================================
// URL Utilities
// ============================================================================

/**
 * Generates a Google Calendar URL
 */
export const generateGoogleCalendarUrl = (
  title: string,
  date: string,
  time: string,
  description: string,
  location: string
): string => {
  const startDateTime = new Date(`${date} ${time}`).toISOString().replace(/-|:|\.\d\d\d/g, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startDateTime}/${startDateTime}`,
    details: description,
    location: location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

/**
 * Generates a WhatsApp URL
 */
export const generateWhatsAppUrl = (phone: string, message: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

/**
 * Generates a mailto URL
 */
export const generateMailtoUrl = (
  email: string,
  subject: string,
  body: string
): string => {
  const params = new URLSearchParams({
    subject: subject,
    body: body,
  });
  return `mailto:${email}?${params.toString()}`;
};

// ============================================================================
// Animation Utilities
// ============================================================================

/**
 * Creates a CSS transition string
 */
export const createTransition = (
  properties: string | string[],
  duration: number = ANIMATION.DURATION_NORMAL,
  easing: string = ANIMATION.EASING_DEFAULT
): string => {
  const props = Array.isArray(properties) ? properties : [properties];
  return props.map((prop) => `${prop} ${duration}ms ${easing}`).join(', ');
};

/**
 * Creates a CSS animation string
 */
export const createAnimation = (
  name: string,
  duration: number = ANIMATION.DURATION_NORMAL,
  easing: string = ANIMATION.EASING_DEFAULT,
  delay: number = 0,
  iterationCount: number | 'infinite' = 1
): string => {
  return `${name} ${duration}ms ${easing} ${delay}ms ${iterationCount}`;
};

// ============================================================================
// Local Storage Utilities
// ============================================================================

/**
 * Safely gets an item from localStorage
 */
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * Safely sets an item in localStorage
 */
export const setToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

/**
 * Safely removes an item from localStorage
 */
export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
  }
};

// ============================================================================
// Debounce/Throttle Utilities
// ============================================================================

/**
 * Debounces a function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttles a function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// ============================================================================
// Error Handling Utilities
// ============================================================================

/**
 * Safely executes a function and returns a result or error
 */
export const safeExecute = <T>(
  func: () => T,
  fallback: T
): T => {
  try {
    return func();
  } catch {
    return fallback;
  }
};

/**
 * Checks if an error is a specific type
 */
export const isErrorOfType = <T extends Error>(
  error: unknown,
  errorType: new (...args: any[]) => T
): error is T => {
  return error instanceof errorType;
};

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Checks if a value is not null or undefined
 */
export const isDefined = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

/**
 * Checks if a value is a string
 */
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

/**
 * Checks if a value is a number
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * Checks if a value is an array
 */
export const isArray = <T>(value: unknown): value is T[] => {
  return Array.isArray(value);
};

/**
 * Checks if a value is an object
 */
export const isObject = (value: unknown): value is object => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};
