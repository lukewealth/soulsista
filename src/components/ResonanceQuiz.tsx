import React, { useState } from 'react';
import { SERVICES, PRACTITIONERS } from '../data/mockData';
import { Service } from '../types';
import { Sparkles, ArrowRight, Check, RefreshCw, Calendar, Heart } from 'lucide-react';

interface ResonanceQuizProps {
  onOpenBooking: (serviceId: string) => void;
  onOpenDetailModal: (service: Service) => void;
}

export const ResonanceQuiz: React.FC<ResonanceQuizProps> = ({
  onOpenBooking,
  onOpenDetailModal,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ intention?: string; stressType?: string; mode?: string }>({});
  const [recommendedService, setRecommendedService] = useState<Service | null>(null);

  const questions = [
    {
      title: 'What is your primary intention for seeking sanctuary today?',
      options: [
        { label: 'Deep Emotional Healing & Trauma Integration', serviceId: 'somatic-psychotherapy' },
        { label: 'Overcoming Chronic Exhaustion & Brain Fog', serviceId: 'burnout-recovery-immersion' },
        { label: 'Sensory Relaxation & Botanical Hydrotherapy', serviceId: 'botanical-sensory-apothecary' },
        { label: 'Empowering a Young Woman / Daughter', serviceId: 'youth-circle-mentorship' },
      ],
    },
    {
      title: 'How does stress or pressure currently manifest in your body?',
      options: [
        { label: 'Tension in chest, shallow breathing, and racing thoughts' },
        { label: 'Digestive discomfort, insomnia, and heavy fatigue' },
        { label: 'Physical muscle tightness in jaw, shoulders, and neck' },
        { label: 'Feeling disconnected from purpose and intuition' },
      ],
    },
    {
      title: 'What environment allows you to feel safest?',
      options: [
        { label: 'A private, quiet space in my own home (Digital Chamber)' },
        { label: 'An immersive, physical sanctuary room with thermal aromatherapy' },
      ],
    },
  ];

  const handleSelectOption = (option: { label: string; serviceId?: string }) => {
    if (currentQuestion === 0 && option.serviceId) {
      const match = SERVICES.find((s) => s.id === option.serviceId);
      if (match) setRecommendedService(match);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Finished
      if (!recommendedService) {
        setRecommendedService(SERVICES[0]);
      }
      setCurrentQuestion(questions.length); // Results view
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setRecommendedService(null);
  };

  return (
    <section className="py-20 bg-[#2D3A2F] text-[#FDFCFB] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-[#222D24] rounded-3xl p-8 sm:p-12 border border-[#D4A39E]/20 shadow-2xl space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4A39E] text-[#2D3A2F] text-[10px] font-label font-bold uppercase tracking-widest rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> RESONANCE QUIZ
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white">
              Discover Your Ideal Ritual of Care
            </h2>
            <p className="text-xs sm:text-sm text-[#D8E0DA] font-light">
              Answer 3 brief questions to receive a personalized recommendation from our clinical team.
            </p>
          </div>

          {/* Quiz Body */}
          {currentQuestion < questions.length ? (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between text-xs font-label uppercase text-[#D4A39E] font-bold">
                <span>Question 0{currentQuestion + 1} of 0{questions.length}</span>
                <div className="flex gap-1">
                  {questions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        currentQuestion >= idx ? 'w-6 bg-[#D4A39E]' : 'w-2 bg-[#3A4A3E]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="font-serif text-lg sm:text-2xl font-bold text-white text-center">
                {questions[currentQuestion].title}
              </h3>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(opt)}
                    className="w-full p-4 bg-[#2D3A2F] hover:bg-[#D4A39E] text-[#D8E0DA] hover:text-[#2D3A2F] border border-[#3A4A3E] hover:border-[#D4A39E] rounded-2xl text-xs sm:text-sm font-semibold transition-all text-left flex items-center justify-between cursor-pointer group"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#D4A39E] group-hover:text-[#2D3A2F]" />
                  </button>
                ))}
              </div>

            </div>
          ) : (
            /* Results View */
            recommendedService && (
              <div className="text-center space-y-6 py-4">
                <div className="w-12 h-12 bg-[#D4A39E] text-[#2D3A2F] rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-xs font-label uppercase tracking-widest text-[#D4A39E] font-bold block">
                    RECOMMENDED SANCTUARY RITUAL
                  </span>
                  <h3 className="font-serif text-3xl font-extrabold text-white mt-1">
                    {recommendedService.title}
                  </h3>
                  <p className="text-xs text-[#D8E0DA] mt-1 max-w-xl mx-auto font-light">
                    {recommendedService.shortDescription}
                  </p>
                </div>

                <div className="p-4 bg-[#2D3A2F] rounded-2xl border border-[#3A4A3E] max-w-md mx-auto text-left text-xs text-[#D8E0DA] space-y-1">
                  <div>✦ <strong className="text-white">Duration:</strong> {recommendedService.durationMinutes} Minutes</div>
                  <div>✦ <strong className="text-white">Investment:</strong> ${recommendedService.priceUSD} USD</div>
                  <div>✦ <strong className="text-white">Includes:</strong> Personalized nervous system integration protocol</div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => onOpenBooking(recommendedService.id)}
                    className="px-8 py-3.5 bg-[#D4A39E] text-[#2D3A2F] text-xs font-label uppercase tracking-widest font-bold rounded-full hover:bg-[#C28B86] transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Recommended Ritual</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-6 py-3.5 border border-[#D4A39E]/40 text-white text-xs font-label uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retake Assessment</span>
                  </button>
                </div>
              </div>
            )
          )}

        </div>

      </div>
    </section>
  );
};
