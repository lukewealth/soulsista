import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { ServicesSection } from './components/ServicesSection';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { FounderSection } from './components/FounderSection';
import { BookStoreSection } from './components/BookStoreSection';
import { BookingWizard } from './components/BookingWizard';
import { InitiativeSection } from './components/InitiativeSection';
import { BlogSection } from './components/BlogSection';
import { ResonanceQuiz } from './components/ResonanceQuiz';
import { SearchModal } from './components/SearchModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ContactModal } from './components/ContactModal';
import { BreatheModal } from './components/BreatheModal';
import { CartModal } from './components/CartModal';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { LoadingScreen } from './components/LoadingScreen';

import { SERVICES, PRACTITIONERS, FEATURED_BOOK, ARTICLES } from './data/mockData';
import { Service, BookingRecord, OrderRecord, AllyDonation, ContactEnquiry, ToastMessage, Article } from './types';
import { Calendar, Heart, BookOpen, ShieldCheck, Sparkles, Wind, ArrowRight } from 'lucide-react';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // Modals & Drawers
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [selectedDetailService, setSelectedDetailService] = useState<Service | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBreatheOpen, setIsBreatheOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart & Orders
  const [cartItems, setCartItems] = useState<
    { id: string; format: 'hardcover' | 'digital' | 'bundle'; price: number; title: string; quantity: number }[]
  >([
    { id: 'she-too-can', format: 'hardcover', price: 29.99, title: 'SHE TOO CAN. (HARDCOVER)', quantity: 1 }
  ]);

  // Initial records in memory for CRM
  const [bookings, setBookings] = useState<BookingRecord[]>([
    {
      id: 'SSL-849201',
      serviceId: 'somatic-psychotherapy',
      serviceTitle: 'Somatic Psychotherapy & Wholeness',
      practitionerId: 'merit-nene-chuks',
      practitionerName: 'Merit Nene Chuks',
      date: '2025-08-12',
      timeSlot: '10:30 AM',
      guestName: 'Dr. Amina Mansoor',
      guestEmail: 'amina@globalimpact.org',
      guestPhone: '+44 7911 123456',
      questionnaire: {
        intentReason: 'Navigating executive burnout and grief.',
        emotionalStateScore: 3,
        sessionMode: 'online',
        goals: ['Identity Integration', 'Burnout Recovery']
      },
      totalPriceUSD: 240,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      googleCalendarUrl: '#',
      whatsappShareUrl: 'https://wa.me/2348068679674',
      zoomLink: 'https://soulsysta.app/sanctuary/SSL-849201'
    }
  ]);

  const [orders, setOrders] = useState<OrderRecord[]>([
    {
      id: 'ORD-910248',
      bookId: 'she-too-can',
      format: 'hardcover',
      quantity: 1,
      totalUSD: 29.99,
      guestName: 'Chidimma Nwosu',
      guestEmail: 'chidimma@example.com',
      guestAddress: '42 Sanctuary Way, London, UK',
      status: 'shipped',
      createdAt: new Date().toISOString()
    }
  ]);

  const [donations, setDonations] = useState<AllyDonation[]>([
    {
      id: 'ALY-391024',
      tierName: 'Cultivate Change',
      amountUSD: 45,
      frequency: 'monthly',
      donorName: 'Elena Solis',
      donorEmail: 'elena@soulsysta.com',
      createdAt: new Date().toISOString()
    }
  ]);

  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([
    {
      id: 'ENQ-772910',
      type: 'speaking',
      name: 'Sarah Jenkins',
      email: 's.jenkins@oxford.ac.uk',
      organization: 'Oxford Women in Leadership',
      message: 'Requesting Merit Nene Chuks for keynote at annual symposium.',
      createdAt: new Date().toISOString()
    }
  ]);

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
    setBookings((prev) => [newBooking, ...prev]);
    addToast('success', 'Reservation Confirmed', `Booking ${newBooking.id} created successfully.`);
  };

  const handleAddToCart = (item: { id: string; format: 'hardcover' | 'digital' | 'bundle'; price: number; title: string }) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.format === item.format);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.format === item.format ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    addToast('info', 'Added to Shopping Bag', `${item.title} has been added.`);
  };

  const handleCompleteOrder = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
    addToast('success', 'Order Processed', `Thank you! Order ${order.id} received.`);
  };

  const handleDonationComplete = (donation: AllyDonation) => {
    setDonations((prev) => [donation, ...prev]);
    addToast('success', 'Ally Gift Received', `Thank you for supporting Youth Circle.`);
  };

  const handleSubmitEnquiry = (enquiry: ContactEnquiry) => {
    setEnquiries((prev) => [enquiry, ...prev]);
    addToast('success', 'Message Received', 'Our executive team will contact you shortly.');
  };

  const handleUpdateBookingStatus = (id: string, status: 'confirmed' | 'completed' | 'cancelled') => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    addToast('info', 'Booking Updated', `Status changed to ${status}.`);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen bg-ivory text-forest font-sans selection:bg-gold selection:text-white">
          
          {/* Top Navigation */}
          <Navbar
            onOpenBooking={handleOpenBooking}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenBreathe={() => setIsBreatheOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
            onOpenAdmin={() => setIsAdminOpen(true)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            onOpenCart={() => setIsCartOpen(true)}
          />

          {/* Main Page Rendering Based on Active Tab */}
          <main>
            {activeTab === 'home' && (
              <>
                <HeroSlider
                  onOpenBooking={handleOpenBooking}
                  onSelectCategory={(cat) => {
                    setActiveTab(cat);
                    const elem = document.getElementById('services-section');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onOpenBookStore={() => {
                    setActiveTab('book');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                <ServicesSection
                  onOpenDetailModal={(s) => setSelectedDetailService(s)}
                  onOpenBooking={handleOpenBooking}
                />

                <BookStoreSection
                  onAddToCart={handleAddToCart}
                  onInstantBuy={(item) => {
                    handleAddToCart(item);
                    setIsCartOpen(true);
                  }}
                />

                <FounderSection
                  onOpenContact={() => setIsContactOpen(true)}
                  onOpenBooking={() => handleOpenBooking()}
                />

                <ResonanceQuiz
                  onOpenBooking={handleOpenBooking}
                  onOpenDetailModal={(s) => setSelectedDetailService(s)}
                />

                <InitiativeSection onDonationComplete={handleDonationComplete} />

                <BlogSection />
              </>
            )}

            {/* Category Specific Tab Views */}
            {(activeTab === 'therapy' || activeTab === 'wellness' || activeTab === 'spa' || activeTab === 'youth' || activeTab === 'speaking') && (
              <div className="py-12">
                <ServicesSection
                  selectedCategoryFilter={activeTab}
                  onOpenDetailModal={(s) => setSelectedDetailService(s)}
                  onOpenBooking={handleOpenBooking}
                />
              </div>
            )}

            {activeTab === 'book' && (
              <div className="py-12">
                <BookStoreSection
                  onAddToCart={handleAddToCart}
                  onInstantBuy={(item) => {
                    handleAddToCart(item);
                    setIsCartOpen(true);
                  }}
                />
              </div>
            )}

            {activeTab === 'founder' && (
              <div className="py-12">
                <FounderSection
                  onOpenContact={() => setIsContactOpen(true)}
                  onOpenBooking={() => handleOpenBooking()}
                />
              </div>
            )}

            {activeTab === 'initiative' && (
              <div className="py-12">
                <InitiativeSection onDonationComplete={handleDonationComplete} />
              </div>
            )}

            {activeTab === 'journal' && (
              <div className="py-12">
                <BlogSection />
              </div>
            )}
          </main>

          {/* Footer */}
          <Footer
            setActiveTab={setActiveTab}
            onOpenBooking={() => handleOpenBooking()}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
            onOpenBreathe={() => setIsBreatheOpen(true)}
          />

          {/* Floating Action Trigger on Mobile */}
          <div className="sm:hidden fixed bottom-4 right-4 z-30">
            <button
              onClick={() => handleOpenBooking()}
              className="p-4 bg-forest text-gold rounded-full shadow-2xl border border-gold/30 flex items-center justify-center font-bold"
              aria-label="Book Ritual"
            >
              <Calendar className="w-6 h-6" />
            </button>
          </div>

          {/* MODALS */}
          {selectedDetailService && (
            <ServiceDetailModal
              service={selectedDetailService}
              practitioners={PRACTITIONERS}
              onClose={() => setSelectedDetailService(null)}
              onBookService={handleOpenBooking}
            />
          )}

          {isBookingOpen && (
            <BookingWizard
              initialServiceId={bookingServiceId}
              onClose={() => setIsBookingOpen(false)}
              onBookingComplete={handleBookingComplete}
            />
          )}

          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectService={(s) => setSelectedDetailService(s)}
            onSelectArticle={() => setActiveTab('journal')}
            onOpenBookStore={() => setActiveTab('book')}
            onOpenBooking={handleOpenBooking}
          />

          {isBreatheOpen && <BreatheModal onClose={() => setIsBreatheOpen(false)} />}

          {isContactOpen && (
            <ContactModal
              onClose={() => setIsContactOpen(false)}
              onSubmitEnquiry={handleSubmitEnquiry}
            />
          )}

          {isAdminOpen && (
            <AdminDashboard
              bookings={bookings}
              orders={orders}
              donations={donations}
              enquiries={enquiries}
              onClose={() => setIsAdminOpen(false)}
              onUpdateBookingStatus={handleUpdateBookingStatus}
            />
          )}

          {isCartOpen && (
            <CartModal
              items={cartItems}
              onClose={() => setIsCartOpen(false)}
              onRemoveItem={(index) =>
                setCartItems((prev) => prev.filter((_, i) => i !== index))
              }
              onCompleteOrder={handleCompleteOrder}
            />
          )}

          {/* Toast Notifications */}
          <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

        </div>
      )}
    </>
  );
}
export default App;
