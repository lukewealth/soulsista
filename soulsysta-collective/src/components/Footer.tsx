import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Mail, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  onOpenContact: () => void;
  onOpenBreathe: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenBooking,
  onOpenAdmin,
  onOpenContact,
  onOpenBreathe,
}) => {
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
    <footer className="bg-[#2D3A2F] text-[#FDFCFB] border-t border-[#3A4A3E] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3A4A3E]">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white block">SOULSYSTA</span>
              <span className="text-[9px] font-label tracking-[0.25em] text-[#D4A39E] uppercase block font-bold">COLLECTIVE</span>
            </div>
            <p className="text-xs text-[#D8E0DA] leading-relaxed max-w-sm font-light">
              A luxury wellness, therapy, publishing, and transformational lifestyle sanctuary for women and youth. Dedicated to somatic liberation, literature, and leadership wholeness.
            </p>
            <div className="pt-2 text-xs text-[#D4A39E] font-label uppercase tracking-widest flex items-center gap-2 font-bold">
              <span>✦ Become Whole. Live Free.</span>
            </div>
          </div>

          {/* Nav Column 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-label uppercase tracking-widest text-[#D4A39E] font-bold">The Sanctuary</h4>
            <ul className="space-y-2 text-xs text-[#D8E0DA] font-light">
              <li>
                <button onClick={() => { setActiveTab('therapy'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors cursor-pointer">
                  Therapy & Somatic Rituals
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('wellness'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors cursor-pointer">
                  Burnout & Vitality Reset
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('spa'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors cursor-pointer">
                  Botanical Hydrotherapy
                </button>
              </li>
              <li>
                <button onClick={onOpenBreathe} className="hover:text-white transition-colors cursor-pointer text-[#D4A39E]">
                  Somatic Breath Tool
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBooking()} className="hover:text-white transition-colors cursor-pointer">
                  Book Private Session
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-label uppercase tracking-widest text-[#D4A39E] font-bold">Initiatives & House</h4>
            <ul className="space-y-2 text-xs text-[#D8E0DA] font-light">
              <li>
                <button onClick={() => { setActiveTab('book'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors cursor-pointer">
                  "SHE TOO CAN." Book
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('founder'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors cursor-pointer">
                  Merit Nene Chuks (Founder)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('initiative'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors cursor-pointer">
                  Youth Circle Ally Fund
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('journal'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors cursor-pointer">
                  Journal & Essays
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors cursor-pointer">
                  Speaking & Keynotes
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-label uppercase tracking-widest text-[#D4A39E] font-bold">The Weekly Essay</h4>
            <p className="text-xs text-[#D8E0DA] font-light">
              Subscribe to receive Merit Nene Chuks’ private letters on stillness, leadership, and emotional sovereignty.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address..."
                  className="w-full p-2.5 bg-[#222D24] border border-[#3A4A3E] text-xs text-white placeholder-[#888888] rounded-xl focus:outline-none focus:border-[#D4A39E]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 bg-[#D4A39E] text-[#2D3A2F] rounded-lg hover:bg-[#C28B86] transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <span className="text-[10px] text-[#D4A39E] font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Welcome to the Collective Journal.
                </span>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Legal & CRM Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#C0C9C2] font-light">
          <div>
            © {new Date().getFullYear()} Soulsysta Collective. All rights reserved. London • Zurich • Global Chambers.
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onOpenAdmin} className="hover:text-white flex items-center gap-1 cursor-pointer">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4A39E]" /> Admin CRM
            </button>
            <span className="text-[#3A4A3E]">•</span>
            <span>Privacy Policy</span>
            <span className="text-[#3A4A3E]">•</span>
            <span>Terms of Care</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
