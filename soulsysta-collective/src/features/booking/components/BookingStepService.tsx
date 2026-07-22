/**
 * Booking Step 1: Service & Questionnaire
 * 
 * Allows user to select a service and complete the pre-booking questionnaire.
 */

import React from 'react';
import { SERVICES } from '../../../data/mockData';
import { Button, Input, Textarea, Select, Card } from '../../../shared/components/ui';
import { ArrowRight, Sparkles, Video, MapPin } from 'lucide-react';
import { cn } from '../../../shared/utils';

interface BookingStepServiceProps {
  selectedServiceId: string;
  onServiceChange: (id: string) => void;
  questionnaire: {
    intentReason: string;
    emotionalStateScore: number;
    sessionMode: 'online' | 'in_person';
    goals: string[];
  };
  onQuestionnaireChange: (questionnaire: any) => void;
  onToggleGoal: (goal: string) => void;
  onNext: () => void;
  availableGoals: readonly string[];
}

export const BookingStepService: React.FC<BookingStepServiceProps> = ({
  selectedServiceId,
  onServiceChange,
  questionnaire,
  onQuestionnaireChange,
  onToggleGoal,
  onNext,
  availableGoals,
}) => {
  const getEmotionalStateLabel = (score: number): string => {
    if (score <= 3) return 'Overwhelmed / Depleted';
    if (score <= 7) return 'Seeking Direction';
    return 'Centered & Ready for Expansion';
  };

  return (
    <div className="space-y-6">
      {/* Service Selection */}
      <div>
        <label className="block text-xs font-label uppercase tracking-widest text-forest font-bold mb-2">
          1. Select Your Desired Ritual
        </label>
        <Select
          value={selectedServiceId}
          onChange={(e) => onServiceChange(e.target.value)}
          options={SERVICES.map((s) => ({
            value: s.id,
            label: `${s.title} — $${s.priceUSD} (${s.durationMinutes} mins)`,
          }))}
        />
      </div>

      {/* Session Mode Toggle */}
      <div>
        <label className="block text-xs font-label uppercase tracking-widest text-forest font-bold mb-2">
          2. Choose Sanctuary Environment
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onQuestionnaireChange({ ...questionnaire, sessionMode: 'online' })}
            className={cn(
              'p-4 rounded-2xl border text-left flex items-center gap-3 transition-all',
              questionnaire.sessionMode === 'online'
                ? 'border-forest bg-forest/5 font-bold text-forest'
                : 'border-forest/10 bg-white text-forest/70'
            )}
          >
            <Video className="w-5 h-5 text-gold" />
            <div>
              <span className="block text-xs uppercase font-label">Virtual Chamber</span>
              <span className="text-[10px] text-forest/50">Encrypted HD Portal</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onQuestionnaireChange({ ...questionnaire, sessionMode: 'in_person' })}
            className={cn(
              'p-4 rounded-2xl border text-left flex items-center gap-3 transition-all',
              questionnaire.sessionMode === 'in_person'
                ? 'border-forest bg-forest/5 font-bold text-forest'
                : 'border-forest/10 bg-white text-forest/70'
            )}
          >
            <MapPin className="w-5 h-5 text-gold" />
            <div>
              <span className="block text-xs uppercase font-label">In-Person Sanctuary</span>
              <span className="text-[10px] text-forest/50">London / Zurich</span>
            </div>
          </button>
        </div>
      </div>

      {/* Emotional State Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-label uppercase tracking-widest text-forest font-bold">
            3. Current Emotional State Calibration
          </label>
          <span className="text-xs font-bold text-gold">
            {getEmotionalStateLabel(questionnaire.emotionalStateScore)}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={questionnaire.emotionalStateScore}
          onChange={(e) =>
            onQuestionnaireChange({
              ...questionnaire,
              emotionalStateScore: parseInt(e.target.value),
            })
          }
          className="w-full accent-forest"
        />
        <div className="flex justify-between text-[10px] text-forest/50 font-label uppercase mt-1">
          <span>1 - Exhausted</span>
          <span>5 - Seeking Balance</span>
          <span>10 - Tranquil</span>
        </div>
      </div>

      {/* Goals Selection */}
      <div>
        <label className="block text-xs font-label uppercase tracking-widest text-forest font-bold mb-2">
          4. Intended Outcomes for this Session
        </label>
        <div className="grid sm:grid-cols-2 gap-2">
          {availableGoals.map((goal) => {
            const selected = questionnaire.goals.includes(goal);
            return (
              <button
                key={goal}
                type="button"
                onClick={() => onToggleGoal(goal)}
                className={cn(
                  'p-3 rounded-xl border text-xs text-left font-medium transition-all flex items-center justify-between',
                  selected
                    ? 'bg-forest text-gold border-forest'
                    : 'bg-white text-forest/70 border-forest/10 hover:border-forest'
                )}
              >
                <span>{goal}</span>
                {selected && <Sparkles className="w-4 h-4 text-gold" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Intent Textarea */}
      <div>
        <label className="block text-xs font-label uppercase tracking-widest text-forest font-bold mb-1">
          5. What brings you to Soulsysta today? (Optional)
        </label>
        <Textarea
          value={questionnaire.intentReason}
          onChange={(e) =>
            onQuestionnaireChange({ ...questionnaire, intentReason: e.target.value })
          }
          placeholder="Share any specific challenges, transitions, or hopes for your session..."
          rows={3}
          className="text-xs"
        />
      </div>

      {/* Next Button */}
      <div className="pt-4 flex justify-end">
        <Button onClick={onNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
          Select Practitioner
        </Button>
      </div>
    </div>
  );
};

BookingStepService.displayName = 'BookingStepService';
