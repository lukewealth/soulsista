/**
 * Shared Constants for Soulsysta Collective
 * 
 * Central constants used across all features.
 * Ensures consistency and maintainability.
 */

// ============================================================================
// Brand Constants
// ============================================================================

export const BRAND = {
  NAME: 'Soulsysta Collective',
  TAGLINE: 'Become Whole. Live Free.',
  LOCATIONS: ['London', 'Zurich', 'Global'],
  FOUNDER: 'Merit Nene Chuks',
  BOOK_TITLE: 'SHE TOO CAN.',
} as const;

// ============================================================================
// Contact Information
// ============================================================================

export const CONTACT = {
  EMAIL: 'hello@soulsysta.com',
  PHONE: '+44-7123-456789',
  WHATSAPP: '+447123456789',
  ADDRESS: {
    street: '1 Sanctuary Lane',
    city: 'London',
    postalCode: 'SW1A 1AA',
    country: 'GB',
  },
} as const;

// ============================================================================
// Service Constants
// ============================================================================

export const SERVICE_CATEGORIES = {
  THERAPY: 'therapy',
  WELLNESS: 'wellness',
  SPA: 'spa',
  YOUTH: 'youth',
  SPEAKING: 'speaking',
} as const;

export const SESSION_MODES = {
  ONLINE: 'online',
  IN_PERSON: 'in_person',
} as const;

export const BOOKING_STATUS = {
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// ============================================================================
// Book Constants
// ============================================================================

export const BOOK_FORMATS = {
  HARDCOVER: 'hardcover',
  DIGITAL: 'digital',
  BUNDLE: 'bundle',
} as const;

export const ORDER_STATUS = {
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
} as const;

// ============================================================================
// Donation Constants
// ============================================================================

export const DONATION_FREQUENCIES = {
  ONE_TIME: 'one_time',
  MONTHLY: 'monthly',
} as const;

export const DONATION_TIERS = {
  SEED: 'seed',
  CULTIVATE: 'cultivate',
  LEGACY: 'legacy',
} as const;

// ============================================================================
// Contact Types
// ============================================================================

export const CONTACT_TYPES = {
  GENERAL: 'general',
  SPEAKING: 'speaking',
  VOLUNTEER: 'volunteer',
  PARTNERSHIP: 'partnership',
  THERAPY: 'therapy',
} as const;

// ============================================================================
// Toast Types
// ============================================================================

export const TOAST_TYPES = {
  SUCCESS: 'success',
  INFO: 'info',
  ERROR: 'error',
} as const;

export const TOAST_DURATION = 4000; // milliseconds

// ============================================================================
// Navigation Constants
// ============================================================================

export const TABS = {
  HOME: 'home',
  THERAPY: 'therapy',
  WELLNESS: 'wellness',
  SPA: 'spa',
  YOUTH: 'youth',
  SPEAKING: 'speaking',
  BOOK: 'book',
  FOUNDER: 'founder',
  INITIATIVE: 'initiative',
  JOURNAL: 'journal',
} as const;

// ============================================================================
// Validation Constants
// ============================================================================

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s-]{10,}$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_MESSAGE_LENGTH: 1000,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
} as const;

// ============================================================================
// Animation Constants
// ============================================================================

export const ANIMATION = {
  DURATION_FAST: 200,
  DURATION_NORMAL: 300,
  DURATION_SLOW: 500,
  EASING_DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  EASING_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  EASING_OUT: 'cubic-bezier(0.0, 0, 0.2, 1)',
  EASING_IN: 'cubic-bezier(0.4, 0, 1, 1)',
} as const;

// ============================================================================
// Breakpoint Constants
// ============================================================================

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// ============================================================================
// Z-Index Constants
// ============================================================================

export const Z_INDEX = {
  BASE: 0,
  DROPDOWN: 10,
  STICKY: 20,
  FIXED: 30,
  MODAL_BACKDROP: 40,
  MODAL: 50,
  POPOVER: 60,
  TOOLTIP: 70,
  TOAST: 80,
  LOADING: 100,
} as const;

// ============================================================================
// Local Storage Keys
// ============================================================================

export const STORAGE_KEYS = {
  HAS_VISITED: 'soulsysta_has_visited',
  BOOKING_DRAFT: 'soulsysta_booking_draft',
  CART_ITEMS: 'soulsysta_cart_items',
  THEME: 'soulsysta_theme',
} as const;

// ============================================================================
// API Endpoints (Future Use)
// ============================================================================

export const API_ENDPOINTS = {
  BOOKINGS: '/api/bookings',
  ORDERS: '/api/orders',
  DONATIONS: '/api/donations',
  CONTACT: '/api/contact',
  NEWSLETTER: '/api/newsletter',
} as const;

// ============================================================================
// Error Messages
// ============================================================================

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  BOOKING_FAILED: 'Booking failed. Please try again.',
  ORDER_FAILED: 'Order failed. Please try again.',
  DONATION_FAILED: 'Donation failed. Please try again.',
  CONTACT_FAILED: 'Message failed to send. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again later.',
} as const;

// ============================================================================
// Success Messages
// ============================================================================

export const SUCCESS_MESSAGES = {
  BOOKING_CONFIRMED: 'Your booking has been confirmed!',
  ORDER_PLACED: 'Your order has been placed successfully!',
  DONATION_RECEIVED: 'Thank you for your generous donation!',
  MESSAGE_SENT: 'Your message has been sent successfully!',
  NEWSLETTER_SUBSCRIBED: 'You have been subscribed to our newsletter!',
} as const;

// ============================================================================
// Date Formats
// ============================================================================

export const DATE_FORMATS = {
  DISPLAY: 'MMMM d, yyyy',
  DISPLAY_WITH_TIME: 'MMMM d, yyyy h:mm a',
  ISO: 'yyyy-MM-dd',
  TIME_24: 'HH:mm',
  TIME_12: 'h:mm a',
} as const;

// ============================================================================
// Currency Constants
// ============================================================================

export const CURRENCY = {
  CODE: 'USD',
  SYMBOL: '$',
  LOCALE: 'en-US',
} as const;

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat(CURRENCY.LOCALE, {
    style: 'currency',
    currency: CURRENCY.CODE,
  }).format(amount);
};

// ============================================================================
// Available Time Slots
// ============================================================================

export const TIME_SLOTS = [
  '09:00 AM',
  '10:30 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM',
] as const;

// ============================================================================
// Available Goals for Booking
// ============================================================================

export const BOOKING_GOALS = [
  'Identity & Inner Authority',
  'Burnout & Stress Recovery',
  'Somatic Nervous System Reset',
  'Grief & Emotional Processing',
  'Leadership & Purpose Realignment',
] as const;

// ============================================================================
// Emotional State Labels
// ============================================================================

export const EMOTIONAL_STATES = [
  'Overwhelmed / Depleted',
  'Seeking Direction',
  'Centered & Ready for Expansion',
] as const;

export const getEmotionalStateLabel = (score: number): string => {
  if (score <= 3) return EMOTIONAL_STATES[0];
  if (score <= 7) return EMOTIONAL_STATES[1];
  return EMOTIONAL_STATES[2];
};
