/**
 * Booking Step 3: Date & Time Selection
 * 
 * Allows user to select date and time for their session.
 */

import React from 'react';
import { Button, Input } from '../../../shared/components/ui';
import { ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import { cn } from '../../../shared/utils';

interface BookingStepDateTimeProps {
  selectedDate: string;
  selectedTimeSlot: string;
  practitionerName: string;
  timeSlots: readonly string[];
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const BookingStepDateTime: React.FC<BookingStepDateTimeProps> = ({
  selectedDate,
  selectedTimeSlot,
  practitionerName,
  timeSlots,
  onDateChange,
  onTimeChange,
  onNext,
  onPrev,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-xl font-bold text-forest">Select Date & Time Slot</h3>
        <p className="text-xs text-forest/70 mt-1 font-light">
          Guiding Practitioner: <span className="font-bold text-forest">{practitionerName}</span>
        </p>
      </div>

      {/* Date Input */}
      <div>
        <label className="block text-xs font-label uppercase tracking-widest text-forest font-bold mb-2">
          Session Date
        </label>
        <Input
          type="date"
          min={todayStr}
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
        />
      </div>

      {/* Time Slot Picker */}
      <div>
        <label className="block text-xs font-label uppercase tracking-widest text-forest font-bold mb-2">
          Available Time Slots (GMT / Local Chamber Time)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => onTimeChange(slot)}
              className={cn(
                'p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2',
                selectedTimeSlot === slot
                  ? 'bg-forest text-gold border-forest'
                  : 'bg-white text-forest/70 border-forest/10 hover:border-forest'
              )}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{slot}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>

        <Button onClick={onNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
          Guest Details
        </Button>
      </div>
    </div>
  );
};

BookingStepDateTime.displayName = 'BookingStepDateTime';
