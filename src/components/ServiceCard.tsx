import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Clock, DollarSign, CheckCircle2, Heart } from 'lucide-react';
import { Service } from '../data/services';

interface ServiceCardProps {
  service: Service;
  onBook: (serviceId: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsApp = () => {
    const message = `Hello Soulsysta! I'm interested in booking the ${service.title} service.`;
    window.open(
      `https://wa.me/2348068679674?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-surface-container">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-gold text-forest px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          {service.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title & Subtitle */}
        <h3 className="font-serif text-2xl font-bold text-forest mb-2 group-hover:text-gold transition-colors">
          {service.title}
        </h3>
        <p className="text-gold font-semibold mb-4">{service.subtitle}</p>

        {/* Description */}
        <p className="text-forest/70 mb-4 leading-relaxed line-clamp-3">
          {service.description}
        </p>

        {/* Duration & Price */}
        <div className="flex items-center gap-6 mb-4 text-sm text-forest/60">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{service.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>${service.price}</span>
          </div>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-forest hover:bg-forest/90 text-white hover:text-white rounded-xl transition-all duration-300 group"
        >
          <span className="text-white font-semibold">
            {isExpanded ? 'Show Less' : 'Learn More'}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-white group-hover:text-white transition-colors" />
          </motion.div>
        </button>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-6 space-y-6">
                {/* Benefits Section */}
                <div>
                  <h4 className="font-serif text-lg font-bold text-forest mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-gold" />
                    Benefits
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-forest/5 hover:bg-forest hover:text-white rounded-lg transition-all duration-300 group"
                      >
                        <span className="text-2xl group-hover:brightness-0 group-hover:invert">{benefit.icon}</span>
                        <span className="text-sm text-forest/80 group-hover:text-white font-medium transition-colors">
                          {benefit.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* What to Expect Section */}
                <div>
                  <h4 className="font-serif text-lg font-bold text-forest mb-3">
                    What to Expect
                  </h4>
                  <div className="space-y-3">
                    {service.whatToExpect.map((expectation, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-3 p-4 bg-surface-container hover:bg-forest rounded-xl transition-all duration-300 group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-gold text-forest group-hover:bg-white group-hover:text-forest rounded-full flex items-center justify-center font-bold transition-colors">
                          {index + 1}
                        </div>
                        <div>
                          <h5 className="font-semibold text-forest group-hover:text-white mb-1 transition-colors">
                            {expectation.title}
                          </h5>
                          <p className="text-sm text-forest/70 group-hover:text-white/90 transition-colors">
                            {expectation.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Perfect For Section */}
                <div>
                  <h4 className="font-serif text-lg font-bold text-forest mb-3">
                    Perfect For
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.perfectFor.map((item, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-4 py-2 bg-gold/10 hover:bg-forest text-forest hover:text-white rounded-full text-sm font-medium transition-all duration-300 cursor-default"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="pt-4 border-t border-forest/10">
                  <p className="text-forest/70 italic mb-4 text-center">
                    {service.cta}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleWhatsApp}
                      className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Book via WhatsApp
                    </button>
                    <button
                      onClick={() => onBook(service.id)}
                      className="flex-1 py-3 bg-forest hover:bg-forest/90 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
