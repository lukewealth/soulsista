import React from 'react';
import { PRACTITIONERS, FOUNDER_TIMELINE } from '../data/mockData';
import { Quote, Sparkles, Award, Compass, Heart, ArrowRight } from 'lucide-react';

interface FounderSectionProps {
  onOpenContact: () => void;
  onOpenBooking: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({
  onOpenContact,
  onOpenBooking,
}) => {
  const founder = PRACTITIONERS[0]; // Merit Nene Chuks

  const pillars = [
    { title: 'Spirit', icon: Compass, description: 'Reconnecting with your transcendent purpose and ancestral intuition.' },
    { title: 'Soul', icon: Heart, description: 'Unburdening emotional grief, trauma, and societal conditioning.' },
    { title: 'Soma (Body)', icon: Sparkles, description: 'Calibrating the nervous system and reclaiming physical vitality.' },
    { title: 'Sovereignty', icon: Award, description: 'Living with unshakeable personal authority and clear boundaries.' },
  ];

  return (
    <section id="founder-section" className="py-20 lg:py-28 bg-forest text-ivory relative overflow-hidden">
      
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold rounded-full blur-3xl opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Badge */}
        <div className="flex items-center gap-2 text-gold text-xs font-label font-bold uppercase tracking-[0.25em] mb-4">
          <Sparkles className="w-4 h-4" />
          <span>THE VISIONARY BEHIND THE STILLNESS</span>
        </div>

        {/* Main Founder Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-gold/30 shadow-2xl group">
              <img
                src={founder.imageUrl}
                alt={founder.name}
                className="w-full h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-forest/90 backdrop-blur-md rounded-2xl border border-gold/20">
                <span className="text-xs font-label uppercase tracking-widest text-gold font-bold block">
                  {founder.title}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {founder.name}
                </h3>
                <p className="text-xs text-ivory/70 mt-0.5">
                  Author of "She Too Can." & Founder of Soulsysta
                </p>
              </div>
            </div>
          </div>

          {/* Bio & Story Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quote Block */}
            <div className="relative p-6 rounded-2xl bg-primary-container border border-gold/20">
              <Quote className="w-8 h-8 text-gold/40 absolute top-4 left-4 -z-0" />
              <blockquote className="font-serif text-xl sm:text-2xl text-gold italic relative z-10 leading-relaxed">
                "Wholeness is not something you perform for the world; it is the quiet, unshakeable sovereignty you return to when the performance ends."
              </blockquote>
            </div>

            {/* Editorial Bio */}
            <div className="space-y-4 text-sm sm:text-base text-ivory/80 leading-relaxed font-sans font-light">
              <p>
                {founder.fullBio}
              </p>
              <p>
                Having worked across international healthcare systems, corporate leadership rooms, and community circles, Merit recognized that modern women are being offered survival hacks instead of true sanctuary. Soulsysta Collective was born to bridge clinical excellence with soul-aligned liberation.
              </p>
            </div>

            {/* Philosophy Pillars */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {pillars.map((p, idx) => {
                const IconComp = p.icon;
                return (
                  <div key={idx} className="p-3.5 bg-primary-container rounded-xl border border-gold/20 text-center">
                    <IconComp className="w-5 h-5 text-gold mx-auto mb-1.5" />
                    <span className="font-bold text-xs text-white block">{p.title}</span>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-3 bg-gold hover:bg-gold/90 text-forest text-xs font-label uppercase tracking-widest font-bold rounded-full transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Book Session with Merit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenContact}
                className="px-6 py-3 border border-gold/40 hover:bg-gold/10 text-ivory text-xs font-label uppercase tracking-widest font-semibold rounded-full transition-all cursor-pointer"
              >
                Request Keynote / Speaking
              </button>
            </div>

          </div>
        </div>

        {/* 10-Year Career Timeline */}
        <div className="mt-20 pt-16 border-t border-primary-container">
          <div className="text-center mb-12">
            <span className="text-xs font-label uppercase tracking-widest text-gold font-bold">A DECADE OF IMPACT</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              The Evolution of Soulsysta
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {FOUNDER_TIMELINE.map((item, idx) => (
              <div key={idx} className="p-5 bg-primary-container rounded-2xl border border-primary-container space-y-2 relative">
                <span className="text-xl font-extrabold font-label text-gold block">{item.year}</span>
                <h4 className="font-serif font-bold text-sm text-white">{item.title}</h4>
                <p className="text-xs text-ivory/70 leading-relaxed font-light">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
