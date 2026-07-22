/**
 * useBooking Hook
 * 
 * Manages booking wizard state and logic.
 * Handles multi-step form state, validation, and booking creation.
 */

import { useState, useCallback, useMemo } from 'react';
import { Service, Practitioner, BookingRecord } from '../../../shared/types';
import { SERVICES, PRACTITIONERS } from '../../../data/mockData';
import { 
  createBookingRecord, 
  validateBookingForm, 
  getAvailablePractitioners 
} from '../services/bookingService';
import { AVAILABLE_GOALS, TIME_SLOTS } from '../types';

interface UseBookingReturn {
  // State
  step: number;
  selectedService: Service;
  selectedPractitioner: Practitioner;
  selectedDate: string;
  selectedTimeSlot: string;
  questionnaire: {
    intentReason: string;
    emotionalStateScore: number;
    sessionMode: 'online' | 'in_person';
    goals: string[];
  };
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  confirmedRecord: BookingRecord | null;
  
  // Computed
  availablePractitioners: Practitioner[];
  timeSlots: readonly string[];
  availableGoals: readonly string[];
  isFormValid: boolean;
  formErrors: Record<string, string>;
  
  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setSelectedServiceId: (id: string) => void;
  setSelectedPractitionerId: (id: string) => void;
  setSelectedDate: (date: string) => void;
  setSelectedTimeSlot: (time: string) => void;
  setQuestionnaire: (questionnaire: any) => void;
  toggleGoal: (goal: string) => void;
  setGuestName: (name: string) => void;
  setGuestEmail: (email: string) => void;
  setGuestPhone: (phone: string) => void;
  createBooking: () => BookingRecord | null;
  reset: () => void;
}

export const useBooking = (initialServiceId?: string): UseBookingReturn => {
  // Step state
  const [step, setStep] = useState(1);

  // Service selection
  const [selectedServiceId, setSelectedServiceId] = useState(
    initialServiceId || SERVICES[0].id
  );
  const selectedService = useMemo(
    () => SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0],
    [selectedServiceId]
  );

  // Questionnaire
  const [questionnaire, setQuestionnaire] = useState({
    intentReason: '',
    emotionalStateScore: 4,
    sessionMode: 'online' as const,
    goals: ['Nervous System Calibration', 'Emotional Release'],
  });

  // Practitioner selection
  const availablePractitioners = useMemo(
    () => getAvailablePractitioners(selectedService, PRACTITIONERS),
    [selectedService]
  );

  const [selectedPractitionerId, setSelectedPractitionerId] = useState(
    availablePractitioners[0]?.id || PRACTITIONERS[0].id
  );
  const selectedPractitioner = useMemo(
    () => PRACTITIONERS.find((p) => p.id === selectedPractitionerId) || PRACTITIONERS[0],
    [selectedPractitionerId]
  );

  // Date and time
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:30 AM');

  // Guest details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  // Confirmation
  const [confirmedRecord, setConfirmedRecord] = useState<BookingRecord | null>(null);

  // Form validation
  const { isValid: isFormValid, errors: formErrors } = useMemo(
    () => validateBookingForm({ guestName, guestEmail, guestPhone }),
    [guestName, guestEmail, guestPhone]
  );

  // Navigation
  const nextStep = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, 5));
  }, []);

  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1));
  }, []);

  // Goal toggle
  const toggleGoal = useCallback((goal: string) => {
    setQuestionnaire((prev) => {
      const exists = prev.goals.includes(goal);
      return {
        ...prev,
        goals: exists
          ? prev.goals.filter((g) => g !== goal)
          : [...prev.goals, goal],
      };
    });
  }, []);

  // Create booking
  const createBooking = useCallback(() => {
    if (!isFormValid) return null;

    const booking = createBookingRecord(selectedService, selectedPractitioner, {
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      guestName,
      guestEmail,
      guestPhone,
      questionnaire,
    });

    setConfirmedRecord(booking);
    return booking;
  }, [
    isFormValid,
    selectedService,
    selectedPractitioner,
    selectedDate,
    selectedTimeSlot,
    guestName,
    guestEmail,
    guestPhone,
    questionnaire,
  ]);

  // Reset
  const reset = useCallback(() => {
    setStep(1);
    setSelectedServiceId(initialServiceId || SERVICES[0].id);
    setQuestionnaire({
      intentReason: '',
      emotionalStateScore: 4,
      sessionMode: 'online',
      goals: ['Nervous System Calibration', 'Emotional Release'],
    });
    setSelectedPractitionerId(availablePractitioners[0]?.id || PRACTITIONERS[0].id);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
    setSelectedTimeSlot('10:30 AM');
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setConfirmedRecord(null);
  }, [initialServiceId, availablePractitioners]);

  return {
    step,
    selectedService,
    selectedPractitioner,
    selectedDate,
    selectedTimeSlot,
    questionnaire,
    guestName,
    guestEmail,
    guestPhone,
    confirmedRecord,
    availablePractitioners,
    timeSlots: TIME_SLOTS,
    availableGoals: AVAILABLE_GOALS,
    isFormValid,
    formErrors,
    setStep,
    nextStep,
    prevStep,
    setSelectedServiceId,
    setSelectedPractitionerId,
    setSelectedDate,
    setSelectedTimeSlot,
    setQuestionnaire,
    toggleGoal,
    setGuestName,
    setGuestEmail,
    setGuestPhone,
    createBooking,
    reset,
  };
};
