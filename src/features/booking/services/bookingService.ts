/**
 * Booking Service
 * 
 * Handles all booking-related business logic.
 * Separates business logic from UI components.
 */

import { Service, Practitioner, BookingRecord } from '../../../shared/types';
import { generateBookingId, generateGoogleCalendarUrl, generateWhatsAppUrl } from '../../../shared/utils';
import { CONTACT } from '../../../shared/constants';

/**
 * Generates a new booking record
 */
export const createBookingRecord = (
  service: Service,
  practitioner: Practitioner,
  formData: {
    date: string;
    timeSlot: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    questionnaire: {
      intentReason: string;
      emotionalStateScore: number;
      sessionMode: 'online' | 'in_person';
      goals: string[];
    };
  }
): BookingRecord => {
  const bookingId = generateBookingId();
  const zoomLink = `https://soulsysta.app/sanctuary/${bookingId}`;
  
  const googleCalendarUrl = generateGoogleCalendarUrl(
    `Soulsysta Session: ${service.title}`,
    formData.date,
    formData.timeSlot,
    `Guided by ${practitioner.name}. Private Sanctuary Link: ${zoomLink}`,
    formData.questionnaire.sessionMode === 'online' 
      ? 'Online Private Digital Chamber' 
      : 'London Sanctuary Studio'
  );

  const whatsappMessage = `Hello Soulsysta Team! My booking ID is ${bookingId} for ${service.title} with ${practitioner.name} on ${formData.date} at ${formData.timeSlot}. Guest: ${formData.guestName}`;
  const whatsappShareUrl = generateWhatsAppUrl(CONTACT.WHATSAPP, whatsappMessage);

  return {
    id: bookingId,
    serviceId: service.id,
    serviceTitle: service.title,
    practitionerId: practitioner.id,
    practitionerName: practitioner.name,
    date: formData.date,
    timeSlot: formData.timeSlot,
    guestName: formData.guestName,
    guestEmail: formData.guestEmail,
    guestPhone: formData.guestPhone,
    questionnaire: formData.questionnaire,
    totalPriceUSD: service.priceUSD,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    googleCalendarUrl,
    whatsappShareUrl,
    zoomLink,
  };
};

/**
 * Validates booking form data
 */
export const validateBookingForm = (formData: {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!formData.guestName.trim()) {
    errors.guestName = 'Name is required';
  } else if (formData.guestName.trim().length < 2) {
    errors.guestName = 'Name must be at least 2 characters';
  }

  if (!formData.guestEmail.trim()) {
    errors.guestEmail = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.guestEmail)) {
    errors.guestEmail = 'Please enter a valid email address';
  }

  if (formData.guestPhone && !/^\+?[\d\s-]{10,}$/.test(formData.guestPhone)) {
    errors.guestPhone = 'Please enter a valid phone number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Gets available practitioners for a service
 */
export const getAvailablePractitioners = (
  service: Service,
  practitioners: Practitioner[]
): Practitioner[] => {
  return practitioners.filter((p) => service.practitionerIds.includes(p.id));
};

/**
 * Formats booking summary for display
 */
export const formatBookingSummary = (booking: BookingRecord): string => {
  return `
Booking Reference: ${booking.id}
Service: ${booking.serviceTitle}
Practitioner: ${booking.practitionerName}
Date: ${booking.date}
Time: ${booking.timeSlot}
Guest: ${booking.guestName}
Email: ${booking.guestEmail}
Total: $${booking.totalPriceUSD} USD
Status: ${booking.status}
  `.trim();
};
