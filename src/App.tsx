import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { SpeakingPage } from './components/SpeakingPage';
import { FounderPage } from './components/FounderPage';
import { ServicesPage } from './components/ServicesPage';
import { InitiativePage } from './components/InitiativePage';
import { BookStorePage } from './components/BookStorePage';
import { BlogPage } from './components/BlogPage';
import { BlogPostPage } from './components/BlogPostPage';
import { BlogWrapper } from './components/BlogWrapper';
import { MobileNav } from './components/MobileNav';
import { BookingWizard } from './features/booking/components/BookingWizard';
import { ContactModal } from './components/ContactModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { LoadingScreen } from './components/LoadingScreen';
import { LanguageProvider } from './shared/i18n/LanguageContext';

import { BookingRecord, ContactEnquiry, ToastMessage } from './types';

type PageType = 'home' | 'speaking' | 'founder' | 'services' | 'initiative' | 'book' | 'blog' | 'booking';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  
  // Modals
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Simple state management
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'error', title: string, message: string) => {
    const id = `TST-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Handlers
  const handleOpenBooking = (serviceId?: string) => {
    setBookingServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleBookingComplete = (newBooking: BookingRecord) => {
    addToast('success', 'Reservation Confirmed', `Booking ${newBooking.id} created successfully.`);
  };

  const handleSubmitEnquiry = (enquiry: ContactEnquiry) => {
    addToast('success', 'Message Received', 'Our team will contact you shortly.');
  };

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <LanguageProvider>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <BlogWrapper onOpenBooking={handleOpenBooking} />
      )}
      
      {/* Global Modals */}
      {isBookingOpen && (
        <BookingWizard
          isOpen={isBookingOpen}
          initialServiceId={bookingServiceId}
          onClose={() => setIsBookingOpen(false)}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {isContactOpen && (
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          onSubmitEnquiry={handleSubmitEnquiry}
        />
      )}

      {isAdminOpen && (
        <AdminDashboard
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </LanguageProvider>
      </Router>
  );
}

export default App;
