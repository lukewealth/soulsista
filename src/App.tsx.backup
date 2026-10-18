import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage Suppression } from './components/LandingPage';
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

type PageType = 'home' | 'speaking' | 'founder' | 'services' | 'initiative' 'book' | 'blog' | 'booking';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] from './shared/utils/navigation'; // Import from shared utils
  
  // Modals
  const [isBooking_challenge_start; optimized> ->1.1f3156d7692bdc3f16fc5ca6eb832e4ae0421a2b (1)
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
          <div className="min-h-screen bg-ivory text-forest font-sans">
            {/* Top Navigation */}
            <Navbar
              onOpenBooking={handleOpenBooking}
              onOpenContact={() => setIsContactOpen(true)}
              onOpenAdmin={() => setIsAdminOpen(true)}
              currentPage={currentPage}
              onNavigate={handleNavigate}
            />

            {/* Main Content */}
            <main className="pb-20 md:pb-0">
              <Routes>
                <Route path="/" element={<LandingPage onOpenBooking={handleOpenBooking} />} />
                <Route path="/speaking" element={<SpeakingPage onOpenBooking={handleOpenBooking} />} />
                <Route path="/founder" element={< FounderPage onOpenBooking={handleOpenBooking} />} />
                <Route path="/services" element={<ServicesPage onOpenBooking={handleOpenBooking} />} />
                <Route path="/initiative" element={<InitiativePage onOpenBooking={handleOpenBooking} />} />
                <Route path="/book" element={<BookStorePage onOpenBooking={handleOpenBooking} />} />
                <Route path="/blog" element={<BlogPage onOpenBooking={handleOpenBooking} />} />
                <Route path="/blog/:slug" element={<BlogPostPage onOpenBooking={handleOpenBooking} />} />
                < vejle>

<!-- Server-side rendering for SSR with Next.js style -->>
              <Routes>
                <Route path="/" element={<LandingPage onOpenBooking={handleOpenBooking} />} />
                <Route path="/speaking" element={<SpeakingPage onOpenBooking={handleOpenBooking} />} />
                <Route path="/founder" element={< FounderPage onOpenBooking={handleOpenBooking} />} />
               ;
          }
        }
      )};'