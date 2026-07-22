import React, { useState } from 'react';
import { Menu, X, Calendar, Mic, Heart, BookOpen, Shield, Users, Home } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

type PageType = 'home' | 'speaking' | 'founder' | 'services' | 'initiative' | 'book' | 'booking';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenContact: () => void;
  onOpenAdmin: () => void;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenBooking, 
  onOpenContact, 
  onOpenAdmin,
  currentPage,
  onNavigate 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-forest text-gold px-4 py-2 text-center text-xs tracking-widest font-semibold uppercase">
        <span>✦ Sanctuary Locations in London, Zurich & Global</span>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-ivory/90 backdrop-blur-md border-b border-forest/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="logo-wrapper group cursor-pointer"
            aria-label="Soulsysta Collective Home"
          >
            <div className="logo-container w-12 h-12">
              <img
                src="/images/soulsysta-logo.jpg"
                alt="Soulsysta Collective Logo"
                className="w-full h-full"
              />
            </div>
            <div className="ml-3 text-left hidden sm:block">
              <span className="font-serif text-xl md:text-2xl tracking-tight text-forest font-bold block group-hover:text-gold transition-colors">
                SOULSYSTA
              </span>
              <span className="text-[9px] tracking-[0.25em] text-forest/60 uppercase block -mt-1">
                COLLECTIVE
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold uppercase tracking-widest text-forest/70">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-gold transition-colors flex items-center gap-1 ${currentPage === 'home' ? 'text-gold' : ''}`}
            >
              <Home className="w-3 h-3" />
              Home
            </button>
            <button
              onClick={() => onNavigate('founder')}
              className={`hover:text-gold transition-colors flex items-center gap-1 ${currentPage === 'founder' ? 'text-gold' : ''}`}
            >
              <Users className="w-3 h-3" />
              About
            </button>
            <button
              onClick={() => onNavigate('services')}
              className={`hover:text-gold transition-colors flex items-center gap-1 ${currentPage === 'services' ? 'text-gold' : ''}`}
            >
              <Heart className="w-3 h-3" />
              Services
            </button>
            <button
              onClick={() => onNavigate('speaking')}
              className={`hover:text-gold transition-colors flex items-center gap-1 ${currentPage === 'speaking' ? 'text-gold' : ''}`}
            >
              <Mic className="w-3 h-3" />
              Speaking
            </button>
            <button
              onClick={() => onNavigate('initiative')}
              className={`hover:text-gold transition-colors flex items-center gap-1 ${currentPage === 'initiative' ? 'text-gold' : ''}`}
            >
              <Heart className="w-3 h-3" />
              Donate
            </button>
            <button
              onClick={() => onNavigate('book')}
              className={`hover:text-gold transition-colors flex items-center gap-1 ${currentPage === 'book' ? 'text-gold' : ''}`}
            >
              <BookOpen className="w-3 h-3" />
              Books
            </button>
            <LanguageSwitcher />
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-forest/60 hover:text-gold transition-colors"
              title="Admin Dashboard"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-5 py-2.5 bg-forest hover:bg-forest/90 text-ivory text-xs font-semibold uppercase tracking-widest rounded-full transition-all shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-forest hover:bg-forest/10 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-forest/40 backdrop-blur-sm">
          <div className="w-4/5 max-w-sm bg-ivory h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto ml-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-forest/10">
                <div className="flex items-center gap-3">
                  <div className="logo-container w-10 h-10">
                    <img
                      src="/images/soulsysta-logo.jpg"
                      alt="Soulsysta Collective Logo"
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <span className="font-serif text-xl font-bold text-forest">SOULSYSTA</span>
                    <span className="block text-[9px] tracking-widest text-forest/60">COLLECTIVE</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-forest hover:bg-forest/10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                <button
                  onClick={() => {
                    onNavigate('home');
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-3 text-sm font-semibold uppercase tracking-widest transition-colors flex items-center gap-2 ${
                    currentPage === 'home' ? 'text-gold' : 'text-forest hover:text-gold'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  Home
                </button>
                <button
                  onClick={() => {
                    onNavigate('founder');
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-3 text-sm font-semibold uppercase tracking-widest transition-colors flex items-center gap-2 ${
                    currentPage === 'founder' ? 'text-gold' : 'text-forest hover:text-gold'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  About Founder
                </button>
                <button
                  onClick={() => {
                    onNavigate('services');
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-3 text-sm font-semibold uppercase tracking-widest transition-colors flex items-center gap-2 ${
                    currentPage === 'services' ? 'text-gold' : 'text-forest hover:text-gold'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  Services
                </button>
                <button
                  onClick={() => {
                    onNavigate('speaking');
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-3 text-sm font-semibold uppercase tracking-widest transition-colors flex items-center gap-2 ${
                    currentPage === 'speaking' ? 'text-gold' : 'text-forest hover:text-gold'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  Speaking & Events
                </button>
                <button
                  onClick={() => {
                    onNavigate('initiative');
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-3 text-sm font-semibold uppercase tracking-widest transition-colors flex items-center gap-2 ${
                    currentPage === 'initiative' ? 'text-gold' : 'text-forest hover:text-gold'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  Donate & Initiative
                </button>
                <button
                  onClick={() => {
                    onNavigate('book');
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-3 text-sm font-semibold uppercase tracking-widest transition-colors flex items-center gap-2 ${
                    currentPage === 'book' ? 'text-gold' : 'text-forest hover:text-gold'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Books & Library
                </button>

                <div className="pt-4 border-t border-forest/10">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-forest/10 space-y-3">
              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-forest/10 text-forest text-sm font-semibold uppercase tracking-widest rounded-full flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Admin Dashboard
              </button>
              <button
                onClick={() => {
                  onOpenBooking();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-4 bg-forest text-ivory text-sm font-semibold uppercase tracking-widest rounded-full flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-gold" />
                Book Your Session
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
