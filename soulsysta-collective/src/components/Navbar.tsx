import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, Calendar, Wind, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenSearch: () => void;
  onOpenBreathe: () => void;
  onOpenContact: () => void;
  onOpenAdmin: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenSearch,
  onOpenBreathe,
  onOpenContact,
  onOpenAdmin,
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'The Collective' },
    { id: 'therapy', label: 'Therapy & Rituals' },
    { id: 'book', label: 'Books & Publishing' },
    { id: 'founder', label: 'Founder Story' },
    { id: 'initiative', label: 'Youth & Social Impact' },
    { id: 'journal', label: 'Journal' },
  ];

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-forest text-gold px-4 py-2 text-center text-xs tracking-widest font-label uppercase flex items-center justify-center gap-3 border-b border-forest/50">
        <span>✦ Sanctuary Locations in London, Zurich & Digital Private Chambers</span>
        <span className="hidden md:inline">•</span>
        <button 
          onClick={onOpenBreathe}
          className="hidden md:flex items-center gap-1.5 underline hover:text-white transition-colors cursor-pointer"
        >
          <Wind className="w-3.5 h-3.5" /> 2-Minute Somatic Grounding Tool
        </button>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'glass-panel border-b border-forest/10 shadow-xs py-3'
            : 'bg-ivory/90 backdrop-blur-md py-4 border-b border-forest/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="font-serif text-2xl md:text-3xl tracking-tight text-forest font-bold block group-hover:text-gold transition-colors">
                SOULSYSTA
              </span>
              <span className="text-[9px] tracking-[0.25em] font-label text-forest/60 uppercase block -mt-1">
                COLLECTIVE
              </span>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-label uppercase tracking-widest text-forest">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-1 cursor-pointer transition-colors relative ${
                  activeTab === link.id
                    ? 'text-forest font-bold'
                    : 'hover:text-gold text-forest/70'
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-forest rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-forest hover:text-forest hover:bg-surface-container rounded-full transition-colors cursor-pointer"
              title="Search Rituals, Books & Articles"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="p-2 text-forest hover:text-forest hover:bg-surface-container rounded-full transition-colors relative cursor-pointer"
              title="Shopping Bag"
              aria-label="Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin CRM Button */}
            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-[11px] font-label tracking-wider uppercase border border-forest/20 hover:border-forest text-forest rounded-full transition-colors cursor-pointer"
              title="Internal CRM & Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-forest" />
              <span>CRM</span>
            </button>

            {/* Book Session Primary CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-forest hover:bg-forest/90 text-ivory text-xs font-label uppercase tracking-widest rounded-full transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Book Ritual</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-forest hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-forest/40 backdrop-blur-sm flex justify-end">
          <div className="w-4/5 max-w-sm bg-ivory h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-forest/10">
                <div>
                  <span className="font-serif text-xl font-bold text-forest">SOULSYSTA</span>
                  <span className="block text-[9px] font-label tracking-widest text-forest/60">COLLECTIVE</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-forest hover:bg-surface-container rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActiveTab(link.id);
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`block w-full text-left py-2 text-sm font-label uppercase tracking-widest ${
                      activeTab === link.id
                        ? 'text-forest font-bold border-l-2 border-forest pl-3'
                        : 'text-forest/70 hover:text-forest'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}

                <button
                  onClick={() => {
                    onOpenContact();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm font-label uppercase tracking-widest text-forest/70"
                >
                  Contact & Speaking
                </button>

                <button
                  onClick={() => {
                    onOpenAdmin();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-left py-2 text-sm font-label uppercase tracking-widest text-gold font-semibold"
                >
                  <ShieldCheck className="w-4 h-4" /> Admin & CRM Portal
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-forest/10 space-y-3">
              <button
                onClick={() => {
                  onOpenBreathe();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-surface-container text-forest text-xs font-label uppercase tracking-widest rounded-full font-semibold border border-forest/10"
              >
                <Wind className="w-4 h-4 text-gold" /> Somatic Breathing Circle
              </button>

              <button
                onClick={() => {
                  onOpenBooking();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-forest text-ivory text-xs font-label uppercase tracking-widest rounded-full font-semibold"
              >
                Book Private Session
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
