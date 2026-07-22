/**
 * App Component
 * 
 * Main application component.
 * Orchestrates features and manages global state.
 */

import React, { useState } from 'react';
import { BookingRecord, TabId } from './shared/types';
import { useToast, useLocalStorage } from './shared/hooks';
import { STORAGE_KEYS } from './shared/constants';
import { BookingWizard } from './features/booking';

// TODO: Import other features as they are refactored
// import { Navbar } from './shared/components/layout/Navbar';
// import { HeroSlider } from './features/home/components/HeroSlider';
// etc.

export const App: React.FC = () => {
  // Global state
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [hasVisited, setHasVisited] = useLocalStorage(STORAGE_KEYS.HAS_VISITED, false);
  
  // Booking state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>();
  
  // Toast notifications
  const { toasts, addToast, removeToast } = useToast();

  // Handlers
  const handleOpenBooking = (serviceId?: string) => {
    setBookingServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleBookingComplete = (booking: BookingRecord) => {
    addToast('success', 'Reservation Confirmed', `Booking ${booking.id} created successfully.`);
    // TODO: Save booking to backend
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingServiceId(undefined);
  };

  // Mark as visited after first load
  React.useEffect(() => {
    if (!hasVisited) {
      setHasVisited(true);
    }
  }, [hasVisited, setHasVisited]);

  return (
    <div className="min-h-screen bg-ivory text-forest">
      {/* TODO: Add Navbar */}
      {/* <Navbar activeTab={activeTab} onTabChange={setActiveTab} /> */}

      {/* Main Content */}
      <main>
        {/* TODO: Add feature pages based on activeTab */}
        {activeTab === 'home' && (
          <div className="p-8">
            <h1 className="font-serif text-4xl font-bold text-forest">
              Welcome to Soulsysta Collective
            </h1>
            <p className="mt-4 text-forest/70">
              Premium therapy, wellness, and transformation for women.
            </p>
            <button
              onClick={() => handleOpenBooking()}
              className="mt-6 px-6 py-3 bg-forest text-ivory rounded-full font-label uppercase tracking-widest hover:bg-forest/90 transition-colors"
            >
              Book a Session
            </button>
          </div>
        )}
      </main>

      {/* TODO: Add Footer */}
      {/* <Footer /> */}

      {/* Booking Wizard */}
      <BookingWizard
        isOpen={isBookingOpen}
        initialServiceId={bookingServiceId}
        onClose={handleCloseBooking}
        onBookingComplete={handleBookingComplete}
      />

      {/* TODO: Add other modals */}
      {/* Toast notifications will be added here */}
    </div>
  );
};

export default App;
