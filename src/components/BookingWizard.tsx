import React, { useState } from 'react';
import { SERVICES, PRACTITIONERS } from '../data/mockData';
import { Service, BookingRecord, PreBookingQuestionnaire } from '../types';
import { X, Calendar as CalendarIcon, Clock, User, Check, Sparkles, Video, MapPin, ArrowRight, ArrowLeft, Copy, ExternalLink, Share2, ShieldCheck, HeartHandshake } from 'lucide-react';

interface BookingWizardProps {
  initialServiceId?: string;
  onClose: () => void;
  onBookingComplete: (booking: BookingRecord) => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  initialServiceId,
  onClose,
  onBookingComplete,
}) => {
  const [step, setStep] = useState<number>(1); // 1: Service & Questionnaire, 2: Guide, 3: Date/Time, 4: Guest Contact, 5: Confirmation

  // Selected state
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || SERVICES[0].id
  );
  const selectedService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const [questionnaire, setQuestionnaire] = useState<PreBookingQuestionnaire>({
    intentReason: '',
    emotionalStateScore: 4,
    sessionMode: 'online',
    goals: ['Nervous System Calibration', 'Emotional Release'],
  });

  const availablePractitioners = PRACTITIONERS.filter((p) =>
    selectedService.practitionerIds.includes(p.id)
  );
  const [selectedPractitionerId, setSelectedPractitionerId] = useState<string>(
    availablePractitioners[0]?.id || PRACTITIONERS[0].id
  );
  const selectedPractitioner = PRACTITIONERS.find((p) => p.id === selectedPractitionerId) || PRACTITIONERS[0];

  // Calendar State
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow.toISOString().split('T')[0];
  });

  const availableTimeSlots = [
    '09:00 AM',
    '10:30 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM',
  ];
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30 AM');

  // Contact details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  // Confirmed booking record
  const [confirmedRecord, setConfirmedRecord] = useState<BookingRecord | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const availableGoals = [
    'Identity & Inner Authority',
    'Burnout & Stress Recovery',
    'Somatic Nervous System Reset',
    'Grief & Emotional Processing',
    'Leadership & Purpose Realignment',
  ];

  const toggleGoal = (goal: string) => {
    setQuestionnaire((prev) => {
      const exists = prev.goals.includes(goal);
      if (exists) return { ...prev, goals: prev.goals.filter((g) => g !== goal) };
      return { ...prev, goals: [...prev.goals, goal] };
    });
  };

  const handleCreateBooking = () => {
    if (!guestName || !guestEmail) return;

    const bookingId = `SSL-${Math.floor(100000 + Math.random() * 900000)}`;
    const zoomLink = `https://soulsysta.app/sanctuary/${bookingId}`;
    
    // Google Calendar URL generator
    const startDateTime = new Date(`${selectedDate} ${selectedTimeSlot}`).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `Soulsysta Session: ${selectedService.title}`
    )}&dates=${startDateTime}/${startDateTime}&details=${encodeURIComponent(
      `Guided by ${selectedPractitioner.name}. Private Sanctuary Link: ${zoomLink}`
    )}&location=${encodeURIComponent(
      questionnaire.sessionMode === 'online' ? 'Online Private Digital Chamber' : 'London Sanctuary Studio'
    )}`;

    // WhatsApp Notification Message Generator
    const waText = `Hello Soulsysta Team! My booking ID is ${bookingId} for ${selectedService.title} with ${selectedPractitioner.name} on ${selectedDate} at ${selectedTimeSlot}. Guest: ${guestName}`;
    const waUrl = `https://wa.me/2348068679674?text=${encodeURIComponent(waText)}`;

    const newRecord: BookingRecord = {
      id: bookingId,
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      practitionerId: selectedPractitioner.id,
      practitionerName: selectedPractitioner.name,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      guestName,
      guestEmail,
      guestPhone,
      questionnaire,
      totalPriceUSD: selectedService.priceUSD,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      googleCalendarUrl: gCalUrl,
      whatsappShareUrl: waUrl,
      zoomLink,
    };

    setConfirmedRecord(newRecord);
    onBookingComplete(newRecord);
    setStep(5); // Move to confirmation step
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D3A2F]/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FDFCFB] w-full max-w-3xl rounded-3xl shadow-2xl border border-[#EAE2D8] overflow-hidden relative my-8">
        
        {/* Header Bar */}
        <div className="bg-[#2D3A2F] text-[#FDFCFB] p-6 flex items-center justify-between border-b border-[#3A4A3E]">
          <div>
            <span className="text-[10px] font-label uppercase tracking-[0.25em] text-[#D4A39E] font-bold block">
              GUEST RESERVATION WIZARD
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold">
              {step === 5 ? 'Reservation Confirmed' : 'Reserve Your Ritual of Care'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Progress Bar */}
        {step < 5 && (
          <div className="bg-[#FAF7F2] px-6 py-3 border-b border-[#EAE2D8] flex items-center justify-between text-xs font-label uppercase text-[#888888]">
            <span className="font-bold text-[#2D3A2F]">Step {step} of 4</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    step >= i ? 'w-8 bg-[#2D3A2F]' : 'w-2 bg-[#EAE2D8]'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Wizard Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* STEP 1: Service Selection & Pre-Booking Questionnaire */}
          {step === 1 && (
            <div className="space-y-6">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold mb-2">
                  1. Select Your Desired Ritual
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full p-3.5 bg-white border border-[#EAE2D8] rounded-2xl text-sm font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#2D3A2F]"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} — ${s.priceUSD} ({s.durationMinutes} mins)
                    </option>
                  ))}
                </select>
              </div>

              {/* Session Mode Toggle */}
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold mb-2">
                  2. Choose Sanctuary Environment
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setQuestionnaire({ ...questionnaire, sessionMode: 'online' })}
                    className={`p-4 rounded-2xl border text-left flex items-center gap-3 cursor-pointer ${
                      questionnaire.sessionMode === 'online'
                        ? 'border-[#2D3A2F] bg-[#2D3A2F]/5 font-bold text-[#2D3A2F]'
                        : 'border-[#EAE2D8] bg-white text-[#555555]'
                    }`}
                  >
                    <Video className="w-5 h-5 text-[#B88A85]" />
                    <div>
                      <span className="block text-xs uppercase font-label">Virtual Chamber</span>
                      <span className="text-[10px] text-[#888888]">Encrypted HD Portal</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setQuestionnaire({ ...questionnaire, sessionMode: 'in_person' })}
                    className={`p-4 rounded-2xl border text-left flex items-center gap-3 cursor-pointer ${
                      questionnaire.sessionMode === 'in_person'
                        ? 'border-[#2D3A2F] bg-[#2D3A2F]/5 font-bold text-[#2D3A2F]'
                        : 'border-[#EAE2D8] bg-white text-[#555555]'
                    }`}
                  >
                    <MapPin className="w-5 h-5 text-[#B88A85]" />
                    <div>
                      <span className="block text-xs uppercase font-label">In-Person Sanctuary</span>
                      <span className="text-[10px] text-[#888888]">London / Zurich</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Emotional State Interactive Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold">
                    3. Current Emotional State Calibration
                  </label>
                  <span className="text-xs font-bold text-[#B88A85]">
                    {questionnaire.emotionalStateScore <= 3 && 'Overwhelmed / Depleted'}
                    {questionnaire.emotionalStateScore > 3 && questionnaire.emotionalStateScore <= 7 && 'Seeking Direction'}
                    {questionnaire.emotionalStateScore > 7 && 'Centered & Ready for Expansion'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={questionnaire.emotionalStateScore}
                  onChange={(e) => setQuestionnaire({ ...questionnaire, emotionalStateScore: parseInt(e.target.value) })}
                  className="w-full accent-[#2D3A2F] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#888888] font-label uppercase mt-1">
                  <span>1 - Exhausted</span>
                  <span>5 - Seeking Balance</span>
                  <span>10 - Tranquil</span>
                </div>
              </div>

              {/* Primary Goals Checkboxes */}
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold mb-2">
                  4. Intended Outcomes for this Session
                </label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {availableGoals.map((goal) => {
                    const selected = questionnaire.goals.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => toggleGoal(goal)}
                        className={`p-3 rounded-xl border text-xs text-left font-medium transition-all cursor-pointer flex items-center justify-between ${
                          selected
                            ? 'bg-[#2D3A2F] text-[#D4A39E] border-[#2D3A2F]'
                            : 'bg-white text-[#555555] border-[#EAE2D8] hover:border-[#2D3A2F]'
                        }`}
                      >
                        <span>{goal}</span>
                        {selected && <Check className="w-4 h-4 text-[#D4A39E]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Intent text area */}
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold mb-1">
                  5. What brings you to Soulsysta today? (Optional)
                </label>
                <textarea
                  value={questionnaire.intentReason}
                  onChange={(e) => setQuestionnaire({ ...questionnaire, intentReason: e.target.value })}
                  placeholder="Share any specific challenges, transitions, or hopes for your session..."
                  rows={2}
                  className="w-full p-3 bg-white border border-[#EAE2D8] rounded-2xl text-xs text-[#1A1A1A] focus:outline-none focus:border-[#2D3A2F]"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-8 py-3 bg-[#2D3A2F] hover:bg-[#222D24] text-[#FDFCFB] text-xs font-label uppercase tracking-widest font-bold rounded-full transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Select Practitioner</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: Select Practitioner */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">Select Your Guide</h3>
                <p className="text-xs text-[#555555] mt-1 font-light">
                  Choose the expert practitioner best aligned with your needs for {selectedService.title}.
                </p>
              </div>

              <div className="space-y-4">
                {availablePractitioners.map((p) => {
                  const isSelected = selectedPractitionerId === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPractitionerId(p.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                        isSelected
                          ? 'border-[#2D3A2F] bg-[#2D3A2F]/5 shadow-sm'
                          : 'border-[#EAE2D8] bg-white hover:border-[#2D3A2F]'
                      }`}
                    >
                      <img src={p.imageUrl} alt={p.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#2D3A2F]" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif font-bold text-base text-[#2D3A2F]">{p.name}</h4>
                          {isSelected && <span className="bg-[#2D3A2F] text-[#D4A39E] text-[10px] font-label font-bold uppercase px-2.5 py-1 rounded-full">Selected</span>}
                        </div>
                        <p className="text-xs text-[#B88A85] font-medium">{p.title}</p>
                        <p className="text-xs text-[#555555] mt-1 line-clamp-2 font-light">{p.bio}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-[#EAE2D8] text-[#2D3A2F] text-xs font-label uppercase tracking-widest rounded-full cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-8 py-3 bg-[#2D3A2F] text-[#FDFCFB] text-xs font-label uppercase tracking-widest font-bold rounded-full cursor-pointer flex items-center gap-2"
                >
                  <span>Select Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Picker */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">Select Date & Time Slot</h3>
                <p className="text-xs text-[#555555] mt-1 font-light">
                  Guiding Practitioner: <span className="font-bold text-[#2D3A2F]">{selectedPractitioner.name}</span>
                </p>
              </div>

              {/* Date Input */}
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold mb-2">
                  Session Date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3.5 bg-white border border-[#EAE2D8] rounded-2xl text-sm font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#2D3A2F]"
                />
              </div>

              {/* Time Slot Picker */}
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold mb-2">
                  Available Time Slots (GMT / Local Chamber Time)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {availableTimeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        selectedTimeSlot === slot
                          ? 'bg-[#2D3A2F] text-[#D4A39E] border-[#2D3A2F]'
                          : 'bg-white text-[#555555] border-[#EAE2D8] hover:border-[#2D3A2F]'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{slot}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-[#EAE2D8] text-[#2D3A2F] text-xs font-label uppercase tracking-widest rounded-full cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-8 py-3 bg-[#2D3A2F] text-[#FDFCFB] text-xs font-label uppercase tracking-widest font-bold rounded-full cursor-pointer flex items-center gap-2"
                >
                  <span>Guest Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Guest Contact Details & Confirm */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">Guest Information</h3>
                <p className="text-xs text-[#555555] mt-1 font-light">
                  No account registration required. Your private confirmation & calendar link will be generated instantly.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Amina Mansoor"
                    className="w-full p-3.5 bg-white border border-[#EAE2D8] rounded-2xl text-sm font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#2D3A2F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="amina@example.com"
                    className="w-full p-3.5 bg-white border border-[#EAE2D8] rounded-2xl text-sm font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#2D3A2F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold mb-1">
                    WhatsApp / Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+44 7123 456789"
                    className="w-full p-3.5 bg-white border border-[#EAE2D8] rounded-2xl text-sm font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#2D3A2F]"
                  />
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EAE2D8] space-y-2">
                <div className="flex justify-between text-xs text-[#555555]">
                  <span>Ritual:</span>
                  <span className="font-bold text-[#2D3A2F]">{selectedService.title}</span>
                </div>
                <div className="flex justify-between text-xs text-[#555555]">
                  <span>Guide:</span>
                  <span className="font-bold text-[#2D3A2F]">{selectedPractitioner.name}</span>
                </div>
                <div className="flex justify-between text-xs text-[#555555]">
                  <span>Schedule:</span>
                  <span className="font-bold text-[#2D3A2F]">{selectedDate} at {selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#2D3A2F] pt-2 border-t border-[#EAE2D8]">
                  <span>Total Investment:</span>
                  <span>${selectedService.priceUSD} USD</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 border border-[#EAE2D8] text-[#2D3A2F] text-xs font-label uppercase tracking-widest rounded-full cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <button
                  type="button"
                  disabled={!guestName || !guestEmail}
                  onClick={handleCreateBooking}
                  className="px-8 py-3.5 bg-[#2D3A2F] hover:bg-[#222D24] disabled:opacity-50 text-[#FDFCFB] text-xs font-label uppercase tracking-widest font-bold rounded-full cursor-pointer flex items-center gap-2 shadow-md"
                >
                  <HeartHandshake className="w-4 h-4 text-[#D4A39E]" />
                  <span>Confirm Reservation (${selectedService.priceUSD})</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Confirmation Screen */}
          {step === 5 && confirmedRecord && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-[#2D3A2F] text-[#D4A39E] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-label uppercase tracking-[0.25em] text-[#B88A85] font-bold block">
                  RESERVATION CONFIRMED
                </span>
                <h3 className="font-serif text-3xl font-extrabold text-[#2D3A2F] mt-1">
                  Your Journey Begins.
                </h3>
                <p className="text-xs text-[#555555] mt-1">
                  Booking Reference: <span className="font-mono font-bold text-[#2D3A2F]">{confirmedRecord.id}</span>
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="p-6 bg-white rounded-2xl border border-[#EAE2D8] text-left space-y-3">
                <div className="grid sm:grid-cols-2 gap-3 text-xs text-[#555555]">
                  <div>
                    <span className="block text-[10px] font-label uppercase text-[#888888]">Guest</span>
                    <span className="font-bold text-[#2D3A2F]">{confirmedRecord.guestName}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-label uppercase text-[#888888]">Ritual</span>
                    <span className="font-bold text-[#2D3A2F]">{confirmedRecord.serviceTitle}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-label uppercase text-[#888888]">Practitioner</span>
                    <span className="font-bold text-[#2D3A2F]">{confirmedRecord.practitionerName}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-label uppercase text-[#888888]">Date & Time</span>
                    <span className="font-bold text-[#2D3A2F]">{confirmedRecord.date} at {confirmedRecord.timeSlot}</span>
                  </div>
                </div>

                {/* Digital Portal Link */}
                <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#EAE2D8] flex items-center justify-between gap-2 mt-4">
                  <div className="truncate">
                    <span className="block text-[10px] font-label uppercase text-[#888888]">Private Virtual Chamber Link</span>
                    <span className="font-mono text-xs font-bold text-[#2D3A2F] truncate block">{confirmedRecord.zoomLink}</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(confirmedRecord.zoomLink);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2000);
                    }}
                    className="p-2 bg-white rounded-lg border border-[#EAE2D8] text-[#2D3A2F] hover:bg-[#2D3A2F] hover:text-white transition-colors cursor-pointer shrink-0"
                    title="Copy Link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Integration Buttons */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={confirmedRecord.googleCalendarUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 bg-[#2D3A2F] text-[#D4A39E] rounded-full text-xs font-label uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-[#222D24] transition-colors"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Add to Google Calendar</span>
                </a>

                <a
                  href={confirmedRecord.whatsappShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 bg-[#25D366] text-white rounded-full text-xs font-label uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Notify via WhatsApp</span>
                </a>
              </div>

              <div className="pt-4 border-t border-[#EAE2D8]">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-[#FAF7F2] hover:bg-[#EAE2D8] text-[#2D3A2F] text-xs font-label uppercase tracking-widest rounded-full font-bold cursor-pointer"
                >
                  Close & Return to Sanctuary
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
