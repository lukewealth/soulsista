/**
 * Booking Step 2: Practitioner Selection
 * 
 * Allows user to select a practitioner for their session.
 */

import React from 'react';
import { Practitioner } from '../../../shared/types';
import { Button } from '../../../shared/components/ui';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '../../../shared/utils';

interface BookingStepPractitionerProps {
  practitioners: Practitioner[];
  selectedPractitionerId: string;
  onPractitionerChange: (id: string) => void;
  serviceName: string;
  onNext: () => void;
  onPrev: () => void;
}

export const BookingStepPractitioner: React.FC<BookingStepPractitionerProps> = ({
  practitioners,
  selectedPractitionerId,
  onPractitionerChange,
  serviceName,
  onNext,
  onPrev,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-xl font-bold text-forest">Select Your Guide</h3>
        <p className="text-xs text-forest/70 mt-1 font-light">
          Choose the expert practitioner best aligned with your needs for {serviceName}.
        </p>
      </div>

      <div className="space-y-4">
        {practitioners.map((p) => {
          const isSelected = selectedPractitionerId === p.id;
          return (
            <div
              key={p.id}
              onClick={() => onPractitionerChange(p.id)}
              className={cn(
                'p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4',
                isSelected
                  ? 'border-forest bg-forest/5 shadow-sm'
                  : 'border-forest/10 bg-white hover:border-forest'
              )}
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-forest"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-base text-forest">{p.name}</h4>
                  {isSelected && (
                    <span className="bg-forest text-gold text-[10px] font-label font-bold uppercase px-2.5 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-xs text-gold font-medium">{p.title}</p>
                <p className="text-xs text-forest/70 mt-1 line-clamp-2 font-light">{p.bio}</p>
              </div>
            </div>
          );
        })}
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
          Select Date & Time
        </Button>
      </div>
    </div>
  );
};

BookingStepPractitioner.displayName = 'BookingStepPractitioner';
