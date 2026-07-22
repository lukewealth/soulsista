/**
 * Booking Step 5: Confirmation
 * 
 * Displays booking confirmation with calendar and WhatsApp integration.
 */

import React, { useState } from 'react';
import { BookingRecord } from '../../../shared/types';
import { Button, Card } from '../../../shared/components/ui';
import { Check, Calendar, Copy, Share2 } from 'lucide-react';

interface BookingStepConfirmationProps {
  booking: BookingRecord;
  onClose: () => void;
}

export const BookingStepConfirmation: React.FC<BookingStepConfirmationProps> = ({
  booking,
  onClose,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(booking.zoomLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="space-y-6 text-center py-4">
      {/* Success Icon */}
      <div className="w-16 h-16 bg-forest text-gold rounded-full flex items-center justify-center mx-auto shadow-lg">
        <Check className="w-8 h-8" />
      </div>

      {/* Confirmation Message */}
      <div>
        <span className="text-xs font-label uppercase tracking-[0.25em] text-gold font-bold block">
          RESERVATION CONFIRMED
        </span>
        <h3 className="font-serif text-3xl font-extrabold text-forest mt-1">
          Your Journey Begins.
        </h3>
        <p className="text-xs text-forest/70 mt-1">
          Booking Reference: <span className="font-mono font-bold text-forest">{booking.id}</span>
        </p>
      </div>

      {/* Booking Details Card */}
      <Card padding="md" className="text-left">
        <div className="grid sm:grid-cols-2 gap-3 text-xs text-forest/70">
          <div>
            <span className="block text-[10px] font-label uppercase text-forest/50">Guest</span>
            <span className="font-bold text-forest">{booking.guestName}</span>
          </div>
          <div>
            <span className="block text-[10px] font-label uppercase text-forest/50">Ritual</span>
            <span className="font-bold text-forest">{booking.serviceTitle}</span>
          </div>
          <div>
            <span className="block text-[10px] font-label uppercase text-forest/50">Practitioner</span>
            <span className="font-bold text-forest">{booking.practitionerName}</span>
          </div>
          <div>
            <span className="block text-[10px] font-label uppercase text-forest/50">Date & Time</span>
            <span className="font-bold text-forest">
              {booking.date} at {booking.timeSlot}
            </span>
          </div>
        </div>

        {/* Zoom Link */}
        <div className="p-3.5 bg-surface-container rounded-xl border border-forest/10 flex items-center justify-between gap-2 mt-4">
          <div className="truncate">
            <span className="block text-[10px] font-label uppercase text-forest/50">
              Private Virtual Chamber Link
            </span>
            <span className="font-mono text-xs font-bold text-forest truncate block">
              {booking.zoomLink}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            leftIcon={copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          >
            {copiedLink ? 'Copied' : 'Copy'}
          </Button>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid sm:grid-cols-2 gap-3 pt-2">
        <a
          href={booking.googleCalendarUrl}
          target="_blank"
          rel="noreferrer"
          className="p-3.5 bg-forest text-gold rounded-full text-xs font-label uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-forest/90 transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span>Add to Google Calendar</span>
        </a>

        <a
          href={booking.whatsappShareUrl}
          target="_blank"
          rel="noreferrer"
          className="p-3.5 bg-green-600 text-white rounded-full text-xs font-label uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>Notify via WhatsApp</span>
        </a>
      </div>

      {/* Close Button */}
      <div className="pt-4 border-t border-forest/10">
        <Button variant="outline" onClick={onClose}>
          Close & Return to Sanctuary
        </Button>
      </div>
    </div>
  );
};

BookingStepConfirmation.displayName = 'BookingStepConfirmation';
