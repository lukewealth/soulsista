import React, { useState } from 'react';
import { AllyDonation } from '../types';
import { Heart, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, DollarSign, Users, Award, BookOpen } from 'lucide-react';

interface InitiativeSectionProps {
  onDonationComplete: (donation: AllyDonation) => void;
}

export const InitiativeSection: React.FC<InitiativeSectionProps> = ({
  onDonationComplete,
}) => {
  const [frequency, setFrequency] = useState<'one_time' | 'monthly'>('monthly');
  const [selectedTier, setSelectedTier] = useState<string>('cultivate');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastDonation, setLastDonation] = useState<AllyDonation | null>(null);

  const tiers = [
    {
      id: 'seed',
      name: 'Sow a Seed',
      amountOneTime: 50,
      amountMonthly: 15,
      impact: 'Provides 1 month of group therapy & workbook materials for a young woman.',
    },
    {
      id: 'cultivate',
      name: 'Cultivate Change',
      amountOneTime: 150,
      amountMonthly: 45,
      impact: 'Sponsors a full 1-on-1 somatic therapy grant & book bundle for a youth fellow.',
    },
    {
      id: 'legacy',
      name: 'Legacy of Wholeness',
      amountOneTime: 500,
      amountMonthly: 100,
      impact: 'Funds a quarterly Youth Circle workshop in an under-resourced community.',
    },
  ];

  const getActiveAmount = () => {
    if (customAmount) return parseFloat(customAmount) || 0;
    const tier = tiers.find((t) => t.id === selectedTier);
    if (!tier) return 50;
    return frequency === 'one_time' ? tier.amountOneTime : tier.amountMonthly;
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorEmail) return;

    const donation: AllyDonation = {
      id: `ALY-${Math.floor(100000 + Math.random() * 900000)}`,
      tierName: selectedTier,
      amountUSD: getActiveAmount(),
      frequency,
      donorName,
      donorEmail,
      createdAt: new Date().toISOString(),
    };

    setLastDonation(donation);
    onDonationComplete(donation);
    setShowReceipt(true);
  };

  return (
    <section id="initiative-section" className="py-20 lg:py-28 bg-[#2D3A2F] text-[#FDFCFB] relative overflow-hidden">
      
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#3A4A3E] rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4A39E] text-[#2D3A2F] text-[11px] font-label font-bold tracking-[0.2em] uppercase">
            <Heart className="w-3.5 h-3.5 text-[#2D3A2F]" />
            SOULSYSTA INITIATIVE & ALLY FUND
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Investing in Collective Wholeness
          </h2>
          <p className="text-base text-[#D8E0DA] font-sans leading-relaxed font-light">
            We believe mental healthcare, literacy, and leadership mentorship are fundamental human rights. 100% of ally donations fund therapy grants and Youth Circle workshops.
          </p>
        </div>

        {/* Impact Numbers Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[#222D24] rounded-3xl border border-[#D4A39E]/20">
          <div className="text-center p-3">
            <Users className="w-6 h-6 text-[#D4A39E] mx-auto mb-1" />
            <span className="text-2xl font-extrabold font-label text-white block">1,200+</span>
            <span className="text-[10px] font-label uppercase text-[#C0C9C2]">Youth Fellows Funded</span>
          </div>

          <div className="text-center p-3">
            <BookOpen className="w-6 h-6 text-[#D4A39E] mx-auto mb-1" />
            <span className="text-2xl font-extrabold font-label text-white block">2,500+</span>
            <span className="text-[10px] font-label uppercase text-[#C0C9C2]">Books Donated to Schools</span>
          </div>

          <div className="text-center p-3">
            <Award className="w-6 h-6 text-[#D4A39E] mx-auto mb-1" />
            <span className="text-2xl font-extrabold font-label text-white block">50+</span>
            <span className="text-[10px] font-label uppercase text-[#C0C9C2]">Community Workshops</span>
          </div>

          <div className="text-center p-3">
            <Sparkles className="w-6 h-6 text-[#D4A39E] mx-auto mb-1" />
            <span className="text-2xl font-extrabold font-label text-white block">100%</span>
            <span className="text-[10px] font-label uppercase text-[#C0C9C2]">Direct Grant Transparency</span>
          </div>
        </div>

        {/* Main Ally Donation Form Grid */}
        <div className="mt-14 grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Tiers & Impact Allocation */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Frequency Toggle */}
            <div className="flex items-center justify-center sm:justify-start gap-2 bg-[#222D24] p-1.5 rounded-full border border-[#3A4A3E] w-fit">
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`px-5 py-2 rounded-full text-xs font-label uppercase tracking-widest font-bold transition-all cursor-pointer ${
                  frequency === 'monthly'
                    ? 'bg-[#D4A39E] text-[#2D3A2F] shadow-xs'
                    : 'text-[#D8E0DA] hover:text-white'
                }`}
              >
                Monthly Ally
              </button>
              <button
                type="button"
                onClick={() => setFrequency('one_time')}
                className={`px-5 py-2 rounded-full text-xs font-label uppercase tracking-widest font-bold transition-all cursor-pointer ${
                  frequency === 'one_time'
                    ? 'bg-[#D4A39E] text-[#2D3A2F] shadow-xs'
                    : 'text-[#D8E0DA] hover:text-white'
                }`}
              >
                One-Time Gift
              </button>
            </div>

            {/* Tier Cards */}
            <div className="space-y-4">
              {tiers.map((tier) => {
                const isSelected = selectedTier === tier.id && !customAmount;
                const price = frequency === 'one_time' ? tier.amountOneTime : tier.amountMonthly;

                return (
                  <div
                    key={tier.id}
                    onClick={() => {
                      setSelectedTier(tier.id);
                      setCustomAmount('');
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#222D24] border-[#D4A39E] shadow-lg'
                        : 'bg-[#222D24]/60 border-[#3A4A3E] hover:border-[#D4A39E]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-lg text-white">{tier.name}</h4>
                      <span className="text-lg font-extrabold font-label text-[#D4A39E]">
                        ${price} <span className="text-[10px] font-normal uppercase">{frequency === 'monthly' ? '/ mo' : ''}</span>
                      </span>
                    </div>
                    <p className="text-xs text-[#D8E0DA] mt-2 leading-relaxed font-light">{tier.impact}</p>
                  </div>
                );
              })}
            </div>

            {/* Allocation Progress Bars */}
            <div className="p-6 bg-[#222D24] rounded-2xl border border-[#3A4A3E] space-y-4">
              <h4 className="font-serif font-bold text-sm text-white">How Your Contribution is Allocated:</h4>
              
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-[#D8E0DA] mb-1">
                    <span>Therapy Grants for Under-Resourced Women</span>
                    <span className="font-bold text-[#D4A39E]">45%</span>
                  </div>
                  <div className="w-full bg-[#2D3A2F] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#D4A39E] h-full w-[45%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#D8E0DA] mb-1">
                    <span>Youth Circle Workshops & Books</span>
                    <span className="font-bold text-[#D4A39E]">30%</span>
                  </div>
                  <div className="w-full bg-[#2D3A2F] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#D4A39E] h-full w-[30%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#D8E0DA] mb-1">
                    <span>Rural Sanctuary Pop-Ups & Operations</span>
                    <span className="font-bold text-[#D4A39E]">25%</span>
                  </div>
                  <div className="w-full bg-[#2D3A2F] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#D4A39E] h-full w-[25%]" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Ally Payment Form */}
          <div className="lg:col-span-5 bg-white text-[#1A1A1A] rounded-3xl p-6 sm:p-8 border border-[#EAE2D8] shadow-2xl">
            <h3 className="font-serif text-2xl font-bold mb-1">Become a Soulsysta Ally</h3>
            <p className="text-xs text-[#555555] mb-6">
              Your gift directly impacts lives. Secure, instant tax-deductible contribution.
            </p>

            <form onSubmit={handleDonate} className="space-y-4">
              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold mb-1">
                  Ally Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Elena Vance"
                  className="w-full p-3.5 bg-[#FAF7F2] border border-[#EAE2D8] rounded-2xl text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#2D3A2F]"
                />
              </div>

              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="elena@example.com"
                  className="w-full p-3.5 bg-[#FAF7F2] border border-[#EAE2D8] rounded-2xl text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#2D3A2F]"
                />
              </div>

              <div>
                <label className="block text-xs font-label uppercase tracking-widest text-[#2D3A2F] font-bold mb-1">
                  Custom Gift Amount ($ USD)
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-[#B88A85] absolute left-3.5 top-3.5" />
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder={`Or enter amount (default: $${getActiveAmount()})`}
                    className="w-full pl-9 p-3.5 bg-[#FAF7F2] border border-[#EAE2D8] rounded-2xl text-xs font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#2D3A2F]"
                  />
                </div>
              </div>

              {/* Payment Method Simulator */}
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EAE2D8] space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#2D3A2F]">
                  <span>Total Contribution:</span>
                  <span className="text-base text-[#B88A85]">${getActiveAmount()} USD {frequency === 'monthly' ? '/ mo' : ''}</span>
                </div>
                <p className="text-[10px] text-[#888888]">
                  🔒 Secured with 256-Bit SSL Encryption. Instant receipt sent to email.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#2D3A2F] hover:bg-[#222D24] text-[#FDFCFB] text-xs font-label uppercase tracking-widest font-bold rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-[#D4A39E]" />
                <span>Confirm Gift of ${getActiveAmount()}</span>
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Receipt Modal */}
      {showReceipt && lastDonation && (
        <div className="fixed inset-0 z-50 bg-[#2D3A2F]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#FDFCFB] text-[#1A1A1A] w-full max-w-md rounded-3xl p-8 shadow-2xl text-center space-y-4 border border-[#EAE2D8]">
            <div className="w-16 h-16 bg-[#2D3A2F] text-[#D4A39E] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold">Thank You, {lastDonation.donorName}!</h3>
            <p className="text-xs text-[#555555]">
              Your generous contribution of <span className="font-bold text-[#2D3A2F]">${lastDonation.amountUSD} USD</span> ({lastDonation.frequency}) has been processed successfully.
            </p>

            <div className="p-4 bg-[#FAF7F2] rounded-2xl text-left text-xs space-y-1 border border-[#EAE2D8]">
              <div>Receipt ID: <span className="font-mono font-bold">{lastDonation.id}</span></div>
              <div>Date: {new Date(lastDonation.createdAt).toLocaleDateString()}</div>
              <div>Donor Email: {lastDonation.donorEmail}</div>
            </div>

            <button
              onClick={() => setShowReceipt(false)}
              className="w-full py-3 bg-[#2D3A2F] text-white rounded-full text-xs font-label uppercase font-bold tracking-widest cursor-pointer"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
