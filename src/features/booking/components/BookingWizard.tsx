/**
 * Booking Wizard Component
 * 
 * Multi-step booking flow orchestrator.
 * Manages step progression and renders appropriate step components.
 */

import React from 'react';
import { BookingRecord } from '../../../shared/types';
import { Modal } from '../../../shared/components/ui';
import { X } from 'lucide-react';
import { useBooking } from '../hooks/useBooking';
import { BookingStepService } from './BookingStepService';
import { BookingStepPractitioner } from './BookingStepPractitioner';
import { BookingStepDateTime } from './BookingStepDateTime';
import { BookingStepGuestDetails } from './BookingStepGuestDetails';
import { BookingStepConfirmation } from './BookingStepConfirmation';
import { BOOKING_STEPS } from '../types';

interface BookingWizardProps {
  isOpen: boolean;
  initialServiceId?: string;
  onClose: () => void;
  onBookingComplete: (booking: BookingRecord) => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  isOpen,
  initialServiceId,
  onClose,
  onBookingComplete,
}) => {
  const {
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
    timeSlots,
    availableGoals,
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
  } = useBooking(initialServiceId);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    const booking = createBooking();
    if (booking) {
      onBookingComplete(booking);
      nextStep();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={step === 5 ? 'Reservation Confirmed' : 'Reserve Your Ritual of Care'}
      size="lg"
    >
      {/* Header */}
      <div className="bg-forest text-ivory p-6 flex items-center justify-between border-b border-forest/50">
        <div>
          <span className="text-[10px] font-label uppercase tracking-[0.25em] text-gold font-bold block">
            GUEST RESERVATION WIZARD
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold">
            {step === 5 ? 'Reservation Confirmed' : 'Reserve Your Ritual of Care'}
          </h2>
        </div>

        <button
          onClick={handleClose}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar */}
      {step < 5 && (
        <div className="bg-surface-container px-6 py-3 border-b border-forest/10 flex items-center justify-between text-xs font-label uppercase text-forest/50">
          <span className="font-bold text-forest">Step {step} of 4</span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  step >= i ? 'w-8 bg-forest' : 'w-2 bg-forest/10'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="p-6 sm:p-8">
        {step === 1 && (
          <BookingStepService
            selectedServiceId={selectedService.id}
            onServiceChange={setSelectedServiceId}
            questionnaire={questionnaire}
            onQuestionnaireChange={setQuestionnaire}
            onToggleGoal={toggleGoal}
            onNext={nextStep}
            availableGoals={availableGoals}
          />
        )}

        {step === 2 && (
          <BookingStepPractitioner
            practitioners={availablePractitioners}
            selectedPractitionerId={selectedPractitioner.id}
            onPractitionerChange={setSelectedPractitionerId}
            serviceName={selectedService.title}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}

        {step === 3 && (
          <BookingStepDateTime
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
            practitionerName={selectedPractitioner.name}
            timeSlots={timeSlots}
            onDateChange={setSelectedDate}
            onTimeChange={setSelectedTimeSlot}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}

        {step === 4 && (
          <BookingStepGuestDetails
            service={selectedService}
            practitioner={selectedPractitioner}
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
            guestName={guestName}
            guestEmail={guestEmail}
            guestPhone={guestPhone}
            formErrors={formErrors}
            onNameChange={setGuestName}
            onEmailChange={setGuestEmail}
            onPhoneChange={setGuestPhone}
            onSubmit={handleSubmit}
            onPrev={prevStep}
            isFormValid={isFormValid}
          />
        )}

        {step === 5 && confirmedRecord && (
          <BookingStepConfirmation booking={confirmedRecord} onClose={handleClose} />
        )}
      </div>
    </Modal>
  );
};

BookingWizard.displayName = 'BookingWizard';
