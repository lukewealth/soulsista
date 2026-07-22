/**
 * Booking Feature Types
 * 
 * Type definitions specific to the booking feature.
 */

export interface BookingFormData {
  serviceId: string;
  practitionerId: string;
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

export interface BookingStep {
  id: number;
  title: string;
  description: string;
}

export const BOOKING_STEPS: BookingStep[] = [
  {
    id: 1,
    title: 'Service & Intent',
    description: 'Select your ritual and share your intention',
  },
  {
    id: 2,
    title: 'Select Guide',
    description: 'Choose your practitioner',
  },
  {
    id: 3,
    title: 'Date & Time',
    description: 'Schedule your session',
  },
  {
    id: 4,
    title: 'Guest Details',
    description: 'Provide contact information',
  },
  {
    id: 5,
    title: 'Confirmation',
    description: 'Review and confirm',
  },
];

export const AVAILABLE_GOALS = [
  'Identity & Inner Authority',
  'Burnout & Stress Recovery',
  'Somatic Nervous System Reset',
  'Grief & Emotional Processing',
  'Leadership & Purpose Realignment',
] as const;

export const TIME_SLOTS = [
  '09:00 AM',
  '10:30 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM',
] as const;
