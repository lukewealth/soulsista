import React, { useState } from 'react';
import { ContactEnquiry } from '../types';
import { X, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
  onSubmitEnquiry: (enquiry: ContactEnquiry) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  onClose,
  onSubmitEnquiry,
}) => {
  const [type, setType] = useState<'general' | 'speaking' | 'volunteer' | 'partnership' | 'therapy'>('speaking');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const enquiry: ContactEnquiry = {
      id: `ENQ-${Math.floor(100000 + Math.random() * 900000)}`,
      type,
      name,
      email,
      organization,
      message,
      createdAt: new Date().toISOString(),
    };

    onSubmitEnquiry(enquiry);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D3A2F]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FDFCFB] text-[#1A1A1A] w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EAE2D8] relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#2D3A2F] text-white rounded-full hover:bg-[#222D24] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-label uppercase tracking-[0.25em] text-[#B88A85] font-bold block">
                CONNECT WITH SOULSYSTA
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">Contact & Speaking Inquiries</h3>
              <p className="text-xs text-[#555555] mt-1 font-light">
                Reach our executive team, request Merit Nene Chuks for keynotes, or explore institutional partnerships.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold mb-1">
                  Inquiry Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full p-3 bg-white border border-[#EAE2D8] rounded-2xl text-xs font-bold text-[#1A1A1A]"
                >
                  <option value="speaking">Keynote & Speaking Engagement</option>
                  <option value="partnership">Institutional Partnership</option>
                  <option value="volunteer">Volunteer with Youth Circle</option>
                  <option value="therapy">Therapy & Private Inquiry</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Amina Vance"
                  className="w-full p-3 bg-white border border-[#EAE2D8] rounded-2xl text-xs font-semibold text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="amina@organization.com"
                  className="w-full p-3 bg-white border border-[#EAE2D8] rounded-2xl text-xs font-semibold text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold mb-1">
                  Organization / University (Optional)
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Global Women Leadership Summit"
                  className="w-full p-3 bg-white border border-[#EAE2D8] rounded-2xl text-xs font-semibold text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details regarding dates, audience size, or specific goals..."
                  className="w-full p-3 bg-white border border-[#EAE2D8] rounded-2xl text-xs text-[#1A1A1A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#2D3A2F] hover:bg-[#222D24] text-[#FDFCFB] text-xs font-label uppercase font-bold tracking-widest rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4 text-[#D4A39E]" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-[#2D3A2F] text-[#D4A39E] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">Message Received</h3>
            <p className="text-xs text-[#555555]">
              Thank you, {name}. Our executive team will review your inquiry and respond within 24 business hours.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#2D3A2F] text-white rounded-full text-xs font-label uppercase font-bold cursor-pointer hover:bg-[#222D24]"
            >
              Return to Sanctuary
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
