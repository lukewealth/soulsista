import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'logo' | 'tagline' | 'complete'>('logo');

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const phaseTimer1 = setTimeout(() => setPhase('tagline'), 800);
    const phaseTimer2 = setTimeout(() => setPhase('complete'), 2000);
    const completeTimer = setTimeout(() => onComplete(), 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(phaseTimer1);
      clearTimeout(phaseTimer2);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[100] bg-ivory flex flex-col items-center justify-center"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.05 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="#001F11" />
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#grid)" />
            </svg>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-6">
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center"
          >
            {/* Decorative Element */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
              className="w-16 h-16 mb-6"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#001F11"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
                <motion.text
                  x="50"
                  y="55"
                  textAnchor="middle"
                  className="text-forest"
                  style={{ fontSize: '24px', fontFamily: 'Playfair Display' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  ✦
                </motion.text>
              </svg>
            </motion.div>

            {/* Brand Name */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-serif text-4xl sm:text-5xl font-bold text-forest tracking-tight text-center"
            >
              SOULSYSTA
            </motion.h1>
            
            <motion.span
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-[10px] font-label tracking-[0.3em] text-gold uppercase mt-2"
            >
              COLLECTIVE
            </motion.span>
          </motion.div>

          {/* Tagline */}
          <AnimatePresence mode="wait">
            {phase === 'tagline' && (
              <motion.div
                key="tagline"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <p className="font-serif text-lg sm:text-xl text-forest/80 italic">
                  Become Whole. Live Free.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="w-48 sm:w-64">
            <div className="h-px bg-forest/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full bg-forest"
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-[10px] font-label tracking-widest text-forest/50 text-center mt-3"
            >
              PREPARING YOUR SANCTUARY
            </motion.p>
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex items-center gap-2 text-[10px] font-label tracking-widest text-forest/40 uppercase">
            <span>London</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>Zurich</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>Global</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
