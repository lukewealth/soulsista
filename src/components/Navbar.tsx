import React, { useState } from 'react';
import { Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenContact }) => {
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
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-left group cursor-pointer"
          >
            <span className="font-serif text-2xl md:text-3xl tracking-tight text-forest font-bold block group-hover:text-gold transition-colors">
              SOULSYSTA
            </span>
            <span className="text-[9px] tracking-[0.25em] text-forest/60 uppercase block -mt-1">
              COLLECTIVE
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest text-forest/70">
            <button
              onClick={onOpenBooking}
              className="hover:text-gold transition-colors"
            >
              Book Session
            </button>
            <button
              onClick={onOpenContact}
              className="hover:text-gold transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={onOpenBooking}
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-forest hover:bg-forest/90 text-ivory text-xs font-semibold uppercase tracking-widest rounded-full transition-all shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>Book Now</span>
          </button>

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
                <div>
                  <span className="font-serif text-xl font-bold text-forest">SOULSYSTA</span>
                  <span className="block text-[9px] tracking-widest text-forest/60">COLLECTIVE</span>
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
                    onOpenBooking();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 text-sm font-semibold uppercase tracking-widest text-forest hover:text-gold transition-colors"
                >
                  Book Session
                </button>
                <button
                  onClick={() => {
                    onOpenContact();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 text-sm font-semibold uppercase tracking-widest text-forest hover:text-gold transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-forest/10">
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
