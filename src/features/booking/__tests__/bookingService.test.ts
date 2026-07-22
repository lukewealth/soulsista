import { describe, it, expect } from 'vitest';
import { validateBookingForm } from '../services/bookingService';
import {
  generateBookingId,
  generateGoogleCalendarUrl,
  generateWhatsAppUrl,
} from '../../../shared/utils';

describe('bookingService', () => {
  describe('generateBookingId', () => {
    it('should generate a booking ID with SSL prefix', () => {
      const id = generateBookingId();
      expect(id).toMatch(/^SSL-\d{6}$/);
    });

    it('should generate unique IDs', () => {
      const id1 = generateBookingId();
      const id2 = generateBookingId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('generateGoogleCalendarUrl', () => {
    it('should generate a valid Google Calendar URL', () => {
      const url = generateGoogleCalendarUrl(
        'Test Session',
        '2026-07-25',
        '10:00 AM',
        'Test description',
        'Online'
      );

      expect(url).toContain('https://calendar.google.com/calendar/render');
      expect(url).toContain('action=TEMPLATE');
      expect(url).toContain('text=Test');
    });

    it('should encode special characters', () => {
      const url = generateGoogleCalendarUrl(
        'Session & Workshop',
        '2026-07-25',
        '10:00 AM',
        'Description with "quotes"',
        'Online'
      );

      expect(url).toContain('&');
      expect(url).toContain('%22');
    });
  });

  describe('generateWhatsAppUrl', () => {
    it('should generate a valid WhatsApp URL', () => {
      const url = generateWhatsAppUrl('+2348068679674', 'Test message');

      expect(url).toBe('https://wa.me/2348068679674?text=Test%20message');
    });

    it('should encode message properly', () => {
      const url = generateWhatsAppUrl('+2348068679674', 'Hello & goodbye');

      expect(url).toContain('Hello%20%26%20goodbye');
    });

    it('should remove non-numeric characters from phone', () => {
      const url = generateWhatsAppUrl('+234-806-867-9674', 'Test');

      expect(url).toContain('2348068679674');
      expect(url).not.toContain('-');
    });
  });

  describe('validateBookingForm', () => {
    it('should return valid for correct form data', () => {
      const result = validateBookingForm({
        guestName: 'John Doe',
        guestEmail: 'john@example.com',
        guestPhone: '+2348068679674',
      });

      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it('should return invalid for empty name', () => {
      const result = validateBookingForm({
        guestName: '',
        guestEmail: 'john@example.com',
        guestPhone: '+2348068679674',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.guestName).toBeDefined();
    });

    it('should return invalid for short name', () => {
      const result = validateBookingForm({
        guestName: 'J',
        guestEmail: 'john@example.com',
        guestPhone: '+2348068679674',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.guestName).toBe('Name must be at least 2 characters');
    });

    it('should return invalid for empty email', () => {
      const result = validateBookingForm({
        guestName: 'John Doe',
        guestEmail: '',
        guestPhone: '+2348068679674',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.guestEmail).toBeDefined();
    });

    it('should return invalid for invalid email format', () => {
      const result = validateBookingForm({
        guestName: 'John Doe',
        guestEmail: 'not-an-email',
        guestPhone: '+2348068679674',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.guestEmail).toBe('Please enter a valid email address');
    });

    it('should return invalid for invalid phone format', () => {
      const result = validateBookingForm({
        guestName: 'John Doe',
        guestEmail: 'john@example.com',
        guestPhone: '123',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.guestPhone).toBe('Please enter a valid phone number');
    });

    it('should allow empty phone (optional field)', () => {
      const result = validateBookingForm({
        guestName: 'John Doe',
        guestEmail: 'john@example.com',
        guestPhone: '',
      });

      expect(result.isValid).toBe(true);
    });

    it('should validate Nigerian phone numbers', () => {
      const result = validateBookingForm({
        guestName: 'John Doe',
        guestEmail: 'john@example.com',
        guestPhone: '+2348068679674',
      });

      expect(result.isValid).toBe(true);
    });

    it('should return multiple errors for multiple invalid fields', () => {
      const result = validateBookingForm({
        guestName: '',
        guestEmail: 'invalid',
        guestPhone: '123',
      });

      expect(result.isValid).toBe(false);
      expect(Object.keys(result.errors).length).toBeGreaterThan(1);
    });
  });
});
