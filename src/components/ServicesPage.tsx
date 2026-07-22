import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MessageCircle, ArrowRight, Sparkles, Heart, BookOpen, Users, Check } from 'lucide-react';
import { CONTACT } from '../shared/constants';

interface ServicesPageProps {
  onOpenBooking: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  const handleWhatsApp = (service?: string) => {
    const message = service
      ? `Hello Soulsysta! I'm interested in learning more about ${service}.`
      : 'Hello Soulsysta! I would like to learn more about your services.';
    window.open(
      `https://wa.me/${CONTACT.WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const services = [
    {
      number: '01',
      title: 'Therapy',
      intent: 'Deep emotional restoration and cognitive alignment through trauma-informed dialogue and neurological grounding techniques.',
      image: '/images/services/therapy-session.png',
      offerings: [
        'Somatic Integration Therapy',
        'Executive Burnout Recovery',
        'Narrative Architecture',
      ],
    },
    {
      number: '02',
      title: 'Wellness',
      intent: 'Holistic vitality realized through the technical mastery of breathwork, intentional movement, and metabolic optimization.',
      image: '/images/services/wellness-session.jpg',
      offerings: [
        'Breath Control Mastery',
        'Adaptive Mobility Flow',
        'Nutritional Biochemistry',
      ],
    },
    {
      number: '03',
      title: 'Spa Rituals',
      intent: 'Sensory journeys that engage the skin as the body\'s largest organ for restoration, utilizing bespoke apothecary infusions.',
      image: '/images/services/massage-session.png',
      offerings: [
        'Thermal Contrast Therapy',
        'Botanical Skin Infusion',
        'Lymphatic Drainage Ritual',
      ],
    },
    {
      number: '04',
      title: 'Youth Circle',
      intent: 'Proactive mentorship and collective community building designed to ground the next generation in resilience and self-possession.',
      image: '/images/services/youth-circle-purpose-leadership.jpg',
      offerings: [
        'Emotional Intelligence Lab',
        'Purpose-Led Mentorship',
        'Creative Expression Studio',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0">
          <img
            src="/images/brand/brand-02.jpg"
            alt="Misty forest"
            className="w-full h-full object-cover brightness-75"
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              The Soulsysta Collective
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mt-4 mb-6">
              The Rituals of Alignment
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto italic">
              A holistic orchestration of spirit, soul, and body integration. We provide the technical precision required for profound human restoration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-5"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              The Ethos
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mt-4 mb-6">
              The Technical Precision of Healing
            </h2>
            <p className="text-lg text-forest/70 mb-8 leading-relaxed">
              Healing is not merely an emotional state—it is a physiological recalibration. At Soulsysta, we merge ancient apothecary wisdom with the technical rigor of modern performance science. Every ritual is a measured step toward your highest vital state.
            </p>
            <button
              onClick={() => handleWhatsApp()}
              className="text-forest font-semibold inline-flex items-center gap-2 border-b-2 border-forest hover:text-gold hover:border-gold transition-all"
            >
              EXPLORE OUR SCIENCE
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-6 md:col-start-7 relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="/images/services/aromatherapy-nervous-system-rest.jpg"
                alt="Apothecary ingredients"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-2xl max-w-[280px] hidden md:block">
              <p className="text-forest italic text-lg leading-relaxed">
                "Silence is the ultimate luxury, and precision is the ultimate care."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Catalog */}
      <section className="py-20 px-6 bg-surface-container">
        <div className="max-w-7xl mx-auto space-y-24">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`grid md:grid-cols-12 gap-8 items-center ${
                idx % 2 === 0 ? '' : 'md:grid-flow-dense'
              }`}
            >
              <div className={`md:col-span-7 ${idx % 2 === 0 ? '' : 'md:col-start-6'}`}>
                <div className="relative group cursor-pointer rounded-2xl overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-forest/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleWhatsApp(service.title)}
                      className="px-6 py-3 bg-forest text-ivory rounded-full font-semibold"
                    >
                      BOOK SESSION
                    </button>
                  </div>
                </div>
              </div>

              <div className={`md:col-span-5 ${idx % 2 === 0 ? '' : 'md:col-start-1 md:row-start-1'}`}>
                <span className="text-5xl font-bold text-forest/10 mb-2 block">
                  {service.number}
                </span>
                <h3 className="font-serif text-4xl font-bold text-forest mb-4 italic">
                  {service.title}
                </h3>
                <p className="text-forest/70 mb-6 leading-relaxed">
                  <strong className="text-forest">Intent:</strong> {service.intent}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.offerings.map((offering, i) => (
                    <li key={i} className="flex items-center gap-3 text-forest/70">
                      <Check className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>{offering}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onOpenBooking}
                  className="px-8 py-3 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-lg inline-flex items-center gap-2"
                >
                  BEGIN JOURNEY
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Practitioners Section */}
      <section className="py-20 px-6 bg-forest text-ivory">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              World-Class Mastery
            </h2>
            <p className="text-lg text-ivory/80 max-w-2xl mx-auto mb-16 italic">
              Every ritual is conducted by clinicians and masters who have dedicated their lives to the technical precision of human wellness.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: 'Clinical Therapy', image: '/images/brand/brand-01.jpg' },
              { title: 'Performance Wellness', image: '/images/brand/brand-02.jpg' },
              { title: 'Apothecary Spa', image: '/images/brand/brand-03.jpg' },
              { title: 'Youth Mentorship', image: '/images/brand/brand-04.jpg' },
            ].map((practitioner, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gold/30">
                  <img
                    src={practitioner.image}
                    alt={practitioner.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-semibold uppercase tracking-widest">
                  {practitioner.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mb-8">
              Ready to Begin?
            </h2>
            <p className="text-lg text-forest/70 mb-12">
              Take the first step toward your transformation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={onOpenBooking}
                className="px-10 py-4 bg-gold text-forest font-semibold rounded-full hover:bg-gold/90 transition-all shadow-xl inline-flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Your Session
              </button>
              <button
                onClick={() => handleWhatsApp()}
                className="px-10 py-4 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-xl inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
