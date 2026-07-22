import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../data/mockData';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSliderProps {
  onOpenBooking: (serviceId?: string) => void;
  onSelectCategory: (category: string) => void;
  onOpenBookStore: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onOpenBooking,
  onSelectCategory,
  onOpenBookStore,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const handleCta = (slideIndex: number, isPrimary: boolean) => {
    if (slideIndex === 0) {
      if (isPrimary) onSelectCategory('therapy');
      else onOpenBooking();
    } else if (slideIndex === 1) {
      onOpenBookStore();
    } else if (slideIndex === 2) {
      onSelectCategory('youth');
    } else if (slideIndex === 3) {
      onSelectCategory('spa');
    }
  };

  return (
    <div className="relative min-h-[85vh] lg:min-h-[90vh] bg-forest overflow-hidden flex items-center justify-center">
      {/* Animated Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />
          {/* Subtle gradient overlay for editorial readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-transparent to-forest/40" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-6"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest/80 border border-gold/40 text-gold text-[10px] font-label tracking-[0.25em] uppercase backdrop-blur-md font-bold">
                <Sparkles className="w-3 h-3 text-gold" />
                <span>{slide.badge}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-ivory tracking-tight leading-[1.08] whitespace-pre-line">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-ivory/80 font-light leading-relaxed max-w-2xl font-sans">
                {slide.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleCta(currentSlide, true)}
                  className="px-7 py-3.5 bg-gold hover:bg-gold/90 text-forest text-xs font-label uppercase tracking-widest font-bold rounded-full transition-all shadow-xl shadow-forest/20 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
                >
                  <span>{slide.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleCta(currentSlide, false)}
                  className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-ivory border border-white/20 text-xs font-label uppercase tracking-widest font-semibold rounded-full transition-all backdrop-blur-md cursor-pointer"
                >
                  {slide.ctaSecondary}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Trust Card */}
      <div className="hidden lg:flex absolute bottom-12 right-12 z-20 glass-panel-dark p-5 rounded-2xl border border-gold/20 text-ivory max-w-xs shadow-2xl items-start gap-3">
        <div className="p-2.5 bg-gold/10 rounded-xl border border-gold/30 text-gold">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-label uppercase tracking-wider text-gold font-bold">Guaranteed Privacy</div>
          <p className="text-[11px] text-ivory/70 mt-1 leading-normal font-light">
            No mandatory account creation. Encrypted guest scheduling & private digital chambers.
          </p>
        </div>
      </div>

      {/* Slider Controls & Progress */}
      <div className="absolute bottom-8 left-4 sm:left-8 lg:left-12 z-20 flex items-center gap-6">
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
                currentSlide === idx ? 'w-10 bg-gold' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="p-2 rounded-full bg-black/30 hover:bg-black/60 text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="p-2 rounded-full bg-black/30 hover:bg-black/60 text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
