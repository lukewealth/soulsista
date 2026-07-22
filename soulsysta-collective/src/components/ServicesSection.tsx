import React, { useState } from 'react';
import { SERVICES, PRACTITIONERS } from '../data/mockData';
import { Service, ServiceCategory } from '../types';
import { Clock, ArrowRight, Eye, Calendar, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onOpenDetailModal: (service: Service) => void;
  onOpenBooking: (serviceId?: string) => void;
  selectedCategoryFilter?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenDetailModal,
  onOpenBooking,
  selectedCategoryFilter = 'all',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategoryFilter);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Rituals' },
    { id: 'therapy', label: 'Therapy & Somatic' },
    { id: 'wellness', label: 'Vitality & Reset' },
    { id: 'spa', label: 'Botanical Spa' },
    { id: 'youth', label: 'Youth Circle' },
    { id: 'speaking', label: 'Speaking & Retreats' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services-section" className="py-20 lg:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest/10 text-forest text-[11px] font-label font-bold tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            RITUALS OF CARE & TRANSFORMATION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-forest tracking-tight">
            Curated Passages into Wholeness
          </h2>
          <p className="text-base text-forest/70 font-sans leading-relaxed">
            Every session is a sacred contract with your well-being. Designed for high-impact women, leaders, and emerging youth.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-label uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-forest text-gold font-bold shadow-md'
                  : 'bg-surface-container text-forest/70 hover:bg-sage/30 hover:text-forest border border-forest/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const assignedPractitioners = PRACTITIONERS.filter((p) =>
              service.practitionerIds.includes(p.id)
            );

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl overflow-hidden border border-forest/10 hover:border-forest transition-all duration-300 hover:shadow-xl group flex flex-col justify-between"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-60 overflow-hidden bg-forest">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                    <div className="absolute top-4 left-4 bg-forest/90 backdrop-blur-md text-gold px-3 py-1 rounded-full text-[10px] font-label uppercase tracking-widest border border-gold/30 font-bold">
                      {service.category}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-forest px-3 py-1 rounded-full text-xs font-bold font-label flex items-center gap-1 shadow-xs border border-forest/10">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      <span>{service.durationMinutes} min</span>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl font-bold text-forest group-hover:text-gold transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gold font-label font-bold uppercase tracking-wider">
                      {service.subtitle}
                    </p>
                    <p className="text-xs text-forest/70 line-clamp-3 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Guiding Practitioner Thumbnails */}
                    <div className="pt-2 flex items-center gap-2 border-t border-surface-container">
                      <span className="text-[10px] font-label uppercase text-forest/50">Guided by:</span>
                      <div className="flex -space-x-2">
                        {assignedPractitioners.map((p) => (
                          <img
                            key={p.id}
                            src={p.imageUrl}
                            alt={p.name}
                            title={p.name}
                            className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-xs"
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-medium text-forest truncate">
                        {assignedPractitioners.map((p) => p.name.split(' ')[0]).join(' & ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 border-t border-surface-container mt-4 flex items-center justify-between gap-2">
                  <div>
                    <span className="block text-[10px] font-label uppercase text-forest/50">Investment</span>
                    <span className="text-base font-extrabold text-forest">${service.priceUSD}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenDetailModal(service)}
                      className="p-2.5 rounded-full border border-forest/10 text-forest hover:bg-surface-container transition-colors cursor-pointer"
                      title="View Details & Journey"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onOpenBooking(service.id)}
                      className="px-4 py-2.5 bg-forest hover:bg-forest/90 text-ivory text-[11px] font-label font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>Book</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
