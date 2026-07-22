import React, { useState } from 'react';
import { ArrowRight, Check, Calendar, MessageCircle } from 'lucide-react';
import { CONTACT } from '../shared/constants';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenContact }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 4000);
    setEmail('');
  };

  return (
    <footer className="bg-forest text-ivory pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-ivory/10">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white block">SOULSYSTA</span>
              <span className="text-[9px] tracking-[0.25em] text-gold uppercase block font-semibold">COLLECTIVE</span>
            </div>
            <p className="text-sm text-ivory/70 leading-relaxed max-w-sm">
              A luxury sanctuary for psychotherapy, wellness, and transformational guidance. 
              Built for the elevated soul seeking wholeness.
            </p>
            <div className="pt-2 text-xs text-gold font-semibold uppercase tracking-widest flex items-center gap-2">
              <span>✦ Become Whole. Live Free.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-ivory/70">
              <li>
                <button onClick={onOpenBooking} className="hover:text-gold transition-colors">
                  Book a Session
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-gold transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${CONTACT.WHATSAPP.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">Stay Connected</h4>
            <p className="text-sm text-ivory/70">
              Subscribe to receive insights on wellness and transformation.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email..."
                  className="w-full p-3 bg-ivory/10 border border-ivory/20 text-sm text-white placeholder-ivory/50 rounded-xl focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-2 bg-gold text-forest rounded-lg hover:bg-gold/90 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {subscribed && (
                <span className="text-xs text-gold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Thank you for subscribing!
                </span>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/60">
          <div>
            © {new Date().getFullYear()} Soulsysta Collective. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={onOpenBooking}
              className="hover:text-gold flex items-center gap-1 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" /> Book Session
            </button>
            <a 
              href={`https://wa.me/${CONTACT.WHATSAPP.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold flex items-center gap-1 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
