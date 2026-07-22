/**
 * Booking Step 4: Guest Details
 * 
 * Collects guest contact information for the booking.
 */

import React from 'react';
import { Service, Practitioner } from '../../../shared/types';
import { Button, Input, Card } from '../../../shared/components/ui';
import { ArrowRight, ArrowLeft, HeartHandshake } from 'lucide-react';

interface BookingStepGuestDetailsProps {
  service: Service;
  practitioner: Practitioner;
  selectedDate: string;
  selectedTimeSlot: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  formErrors: Record<string, string>;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
  onSubmit: () => void;
  onPrev: () => void;
  isFormValid: boolean;
}

export const BookingStepGuestDetails: React.FC<BookingStepGuestDetailsProps> = ({
  service,
  practitioner,
  selectedDate,
  selectedTimeSlot,
  guestName,
  guestEmail,
  guestPhone,
  formErrors,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onSubmit,
  onPrev,
  isFormValid,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-xl font-bold text-forest">Guest Information</h3>
        <p className="text-xs text-forest/70 mt-1 font-light">
          No account registration required. Your private confirmation & calendar link will be generated instantly.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Full Name *"
          type="text"
          required
          value={guestName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="e.g. Amina Mansoor"
          error={formErrors.guestName}
        />

        <Input
          label="Email Address *"
          type="email"
          required
          value={guestEmail}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="amina@example.com"
          error={formErrors.guestEmail}
        />

        <Input
          label="WhatsApp / Phone Number (Optional)"
          type="tel"
          value={guestPhone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="+44 7123 456789"
          error={formErrors.guestPhone}
        />
      </div>

      {/* Order Summary */}
      <Card padding="md" className="bg-surface-container">
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-forest/70">
            <span>Ritual:</span>
            <span className="font-bold text-forest">{service.title}</span>
          </div>
          <div className="flex justify-between text-xs text-forest/70">
            <span>Guide:</span>
            <span className="font-bold text-forest">{practitioner.name}</span>
          </div>
          <div className="flex justify-between text-xs text-forest/70">
            <span>Schedule:</span>
            <span className="font-bold text-forest">
              {selectedDate} at {selectedTimeSlot}
            </span>
          </div>
          <div className="flex justify-between text-sm font-bold text-forest pt-2 border-t border-forest/10">
            <span>Total Investment:</span>
            <span>${service.priceUSD} USD</span>
          </div>
        </div>
      </Card>

      <div className="pt-4 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>

        <Button
          onClick={onSubmit}
          disabled={!isFormValid}
          leftIcon={<HeartHandshake className="w-4 h-4 text-gold" />}
        >
          Confirm Reservation (${service.priceUSD})
        </Button>
      </div>
    </div>
  );
};

BookingStepGuestDetails.displayName = 'BookingStepGuestDetails';
