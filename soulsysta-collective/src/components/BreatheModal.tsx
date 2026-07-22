import React, { useState, useEffect } from 'react';
import { Wind, X, Play, Pause, RotateCcw, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BreatheModalProps {
  onClose: () => void;
}

export const BreatheModal: React.FC<BreatheModalProps> = ({ onClose }) => {
  const [isActive, setIsActive] = useState(true);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [seconds, setSeconds] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let timer: any;
    if (isActive) {
      timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            if (phase === 'inhale') {
              setPhase('hold');
              return 7;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return 8;
            } else {
              setPhase('inhale');
              setCycleCount((c) => c + 1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phase]);

  const getPhaseText = () => {
    if (phase === 'inhale') return 'Inhale Deeply into Abdomen';
    if (phase === 'hold') return 'Hold & Allow Energy to Expand';
    return 'Exhale Slowly & Release All Tension';
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D3A2F]/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#2D3A2F] text-[#FDFCFB] w-full max-w-lg rounded-3xl p-8 shadow-2xl border border-[#D4A39E]/30 text-center relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6 relative z-10">
          <div>
            <span className="text-[10px] font-label uppercase tracking-[0.25em] text-[#D4A39E] font-bold block">
              SOMATIC GROUNDING CIRCLE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
              4-7-8 Diaphragmatic Breath
            </h3>
            <p className="text-xs text-[#D8E0DA] mt-1 font-light">
              Down-regulates the sympathetic nervous system and lowers heart rate within 120 seconds.
            </p>
          </div>

          {/* Animated Pulsating Breath Circle */}
          <div className="py-8 flex flex-col items-center justify-center relative">
            <motion.div
              animate={{
                scale: phase === 'inhale' ? 1.4 : phase === 'hold' ? 1.4 : 0.8,
              }}
              transition={{
                duration: phase === 'inhale' ? 4 : phase === 'hold' ? 0.1 : 8,
                ease: 'easeInOut',
              }}
              className="w-44 h-44 rounded-full border-4 border-[#D4A39E] bg-[#222D24]/80 flex flex-col items-center justify-center shadow-2xl backdrop-blur-md relative"
            >
              <Wind className="w-8 h-8 text-[#D4A39E] mb-1" />
              <span className="text-3xl font-extrabold font-mono text-white">{seconds}s</span>
              <span className="text-[10px] font-label uppercase text-[#D4A39E] font-bold mt-1">{phase}</span>
            </motion.div>
          </div>

          {/* Phase Guidance Text */}
          <div className="p-4 bg-[#222D24] rounded-2xl border border-[#D4A39E]/20">
            <h4 className="font-serif text-base font-bold text-[#D4A39E]">{getPhaseText()}</h4>
            <span className="text-[10px] text-[#D8E0DA]/70 block mt-0.5">Completed Cycles: {cycleCount}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className="px-6 py-3 bg-[#D4A39E] text-[#2D3A2F] hover:bg-[#C28B86] rounded-full text-xs font-label uppercase font-bold tracking-widest flex items-center gap-2 cursor-pointer transition-all"
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isActive ? 'Pause' : 'Resume'}</span>
            </button>

            <button
              onClick={() => {
                setPhase('inhale');
                setSeconds(4);
                setCycleCount(0);
              }}
              className="p-3 border border-white/20 rounded-full text-white hover:bg-white/10 cursor-pointer"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
