import React from 'react';
import { Service, Practitioner } from '../types';
import { X, Clock, DollarSign, Sparkles, CheckCircle2, ChevronRight, Calendar, UserCheck } from 'lucide-react';

interface ServiceDetailModalProps {
  service: Service | null;
  practitioners: Practitioner[];
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  practitioners,
  onClose,
  onBookService,
}) => {
  if (!service) return null;

  const assignedPractitioners = practitioners.filter((p) =>
    service.practitionerIds.includes(p.id)
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#2D3A2F]/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FDFCFB] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-[#EAE2D8] relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-[#2D3A2F]/80 hover:bg-[#222D24] text-white rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D3A2F] via-[#2D3A2F]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-[#FDFCFB]">
            <span className="inline-block px-3 py-1 bg-[#D4A39E] text-[#2D3A2F] text-[10px] font-label font-bold uppercase tracking-widest rounded-full mb-2">
              {service.category.toUpperCase()} RITUAL
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
              {service.title}
            </h2>
            <p className="text-sm text-[#D8E0DA] font-light mt-1">
              {service.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-[#FAF7F2] rounded-2xl border border-[#EAE2D8]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white rounded-xl text-[#2D3A2F] shadow-xs">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] font-label uppercase tracking-widest text-[#888888]">Duration</span>
                <span className="font-semibold text-sm text-[#2D3A2F]">{service.durationMinutes} Minutes</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white rounded-xl text-[#2D3A2F] shadow-xs">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] font-label uppercase tracking-widest text-[#888888]">Investment</span>
                <span className="font-semibold text-sm text-[#2D3A2F]">${service.priceUSD} USD</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
              <div className="p-2.5 bg-white rounded-xl text-[#2D3A2F] shadow-xs">
                <Sparkles className="w-5 h-5 text-[#B88A85]" />
              </div>
              <div>
                <span className="block text-[10px] font-label uppercase tracking-widest text-[#888888]">Format</span>
                <span className="font-semibold text-sm text-[#2D3A2F]">In-Person or Digital</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-2">Overview</h3>
            <p className="text-sm text-[#555555] leading-relaxed font-light">
              {service.fullDescription}
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-3">Expected Benefits & Outcomes</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-[#EAE2D8]">
                  <CheckCircle2 className="w-4 h-4 text-[#B88A85] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#555555] leading-snug">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Journey Steps */}
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-3">Session Journey Architecture</h3>
            <div className="space-y-3">
              {service.journeySteps.map((step, idx) => (
                <div key={idx} className="p-4 bg-white rounded-2xl border border-[#EAE2D8] flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#2D3A2F] text-[#D4A39E] text-xs font-bold font-label flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-[#2D3A2F]">{step.title}</h4>
                    <p className="text-xs text-[#555555] mt-0.5 font-light">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practitioners */}
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-3">Guiding Practitioners</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {assignedPractitioners.map((p) => (
                <div key={p.id} className="p-4 bg-white rounded-2xl border border-[#EAE2D8] flex items-center gap-3">
                  <img src={p.imageUrl} alt={p.name} className="w-14 h-14 rounded-full object-cover border border-[#EAE2D8]" />
                  <div>
                    <div className="font-bold text-sm text-[#2D3A2F] flex items-center gap-1">
                      <span>{p.name}</span>
                      <UserCheck className="w-3.5 h-3.5 text-[#B88A85]" />
                    </div>
                    <div className="text-[11px] text-[#555555]">{p.title}</div>
                    <div className="text-[10px] text-[#B88A85] font-medium mt-1">Available: {p.availableDays.join(', ')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-3">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EAE2D8]">
                    <div className="font-bold text-xs text-[#2D3A2F] mb-1">Q: {faq.question}</div>
                    <div className="text-xs text-[#555555] font-light">A: {faq.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sticky CTA Bottom Bar */}
          <div className="pt-4 border-t border-[#EAE2D8] flex items-center justify-between">
            <div>
              <span className="block text-[10px] font-label uppercase text-[#888888]">Total Session Investment</span>
              <span className="text-xl font-bold text-[#2D3A2F]">${service.priceUSD} USD</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookService(service.id);
              }}
              className="px-8 py-3.5 bg-[#2D3A2F] hover:bg-[#222D24] text-[#FDFCFB] text-xs font-label uppercase tracking-widest font-bold rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#D4A39E]" />
              <span>Book This Ritual</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
