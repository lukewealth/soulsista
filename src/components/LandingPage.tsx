import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MessageCircle, ArrowRight, Sparkles, Heart, BookOpen, Users } from 'lucide-react';
import { SERVICES, FEATURED_BOOK } from '../data/mockData';
import { CONTACT } from '../shared/constants';

interface LandingPageProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenBooking }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: 'Become Whole.\nLive Free.',
      subtitle: 'A luxury sanctuary for therapy, wellness, and transformational guidance.',
      image: '/images/brand/brand-02.jpg',
    },
    {
      title: 'She Too Can.',
      subtitle: 'Break limits. Reclaim your authentic power.',
      image: '/images/brand/brand-05.jpg',
    },
  ];

  const handleWhatsApp = (service?: string) => {
    const message = service
      ? `Hello Soulsysta! I'm interested in booking a ${service} session.`
      : 'Hello Soulsysta! I would like to book a session.';
    window.open(`https://wa.me/${CONTACT.WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/40 to-forest/80" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 whitespace-pre-line leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              {heroSlides[currentSlide].subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onOpenBooking()}
                className="px-8 py-4 bg-gold text-forest font-semibold rounded-full hover:bg-gold/90 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Session
              </button>
              <button
                onClick={() => handleWhatsApp()}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </button>
            </div>
          </motion.div>

          {/* Slide Indicators */}
          <div className="absolute bottom-12 flex gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  currentSlide === idx ? 'w-10 bg-gold' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              The Rituals
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mt-4">
              An Ecosystem of Alignment
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.slice(0, 4).map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer"
                onClick={() => onOpenBooking(service.id)}
              >
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-serif text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-white/80 mb-4">{service.shortDescription}</p>
                  <span className="inline-flex items-center gap-2 text-gold text-sm font-semibold">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-forest text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/founder/merit-portrait.png"
                alt="Merit Nene Chuks"
                className="w-full rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                The Visionary
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold">
                Merit Nene Chuks
              </h2>
              <p className="text-xl text-gold italic">
                "Soulsysta is a sanctuary where the modern soul finds its way back to wholeness."
              </p>
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  Merit is a transformational guide with over a decade of dedicated practice in psychotherapy 
                  and holistic wellness. Her work bridges the gap between technical clinical precision and the 
                  sensory elegance of luxury healing.
                </p>
                <p>
                  She founded the Collective with a singular focus: to create an intentional space for the 
                  high-performing woman and the emerging youth to realign spirit, soul, and body.
                </p>
              </div>
              <button
                onClick={() => handleWhatsApp('session with Merit')}
                className="px-8 py-4 bg-gold text-forest font-semibold rounded-full hover:bg-gold/90 transition-all shadow-xl flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Connect on WhatsApp
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Book Section */}
      <section className="py-20 px-6 bg-surface-container">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative group cursor-pointer">
                <div className="w-64 h-96 bg-forest rounded-r-lg shadow-2xl transition-transform duration-500 group-hover:-rotate-2 group-hover:scale-105 relative overflow-hidden">
                  <img
                    src={FEATURED_BOOK.coverImage}
                    alt={FEATURED_BOOK.title}
                    className="w-full h-full object-cover mix-blend-multiply opacity-90"
                  />
                  <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-gold">
                        Soulsysta Press
                      </span>
                      <h3 className="font-serif text-3xl font-bold mt-2 text-gold">
                        {FEATURED_BOOK.title}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                      By {FEATURED_BOOK.author}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                The Library
              </span>
              <h2 className="font-serif text-4xl font-bold text-forest">
                Break Limits. Rediscover Your Authentic Power.
              </h2>
              <p className="text-forest/70 leading-relaxed">
                {FEATURED_BOOK.synopsis}
              </p>
              <div className="flex items-center gap-4 py-4 border-y border-forest/10">
                <Sparkles className="w-8 h-8 text-gold" />
                <p className="text-forest font-semibold italic">
                  Best-selling guide for transformational leadership and soul-care.
                </p>
              </div>
              <button
                onClick={() => handleWhatsApp('purchasing the book')}
                className="px-8 py-4 bg-forest text-white font-semibold rounded-full hover:bg-forest/90 transition-all shadow-xl flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Order via WhatsApp
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Initiative Section */}
      <section className="py-20 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Social Impact
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mt-4">
              The Soulsysta Initiative
            </h2>
            <p className="text-forest/70 mt-4 max-w-2xl mx-auto">
              Empowering the next generation through mentorship, education, and community support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg"
            >
              <Users className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold text-forest mb-2">Youth Circle</h3>
              <p className="text-forest/70">
                Mentorship programs empowering young women ages 14-22.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg"
            >
              <Heart className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold text-forest mb-2">Community Support</h3>
              <p className="text-forest/70">
                Providing resources and support to underserved communities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg"
            >
              <BookOpen className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold text-forest mb-2">Education</h3>
              <p className="text-forest/70">
                Books and educational materials donated to schools.
              </p>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => handleWhatsApp('supporting the Initiative')}
              className="px-8 py-4 bg-gold text-forest font-semibold rounded-full hover:bg-gold/90 transition-all shadow-xl flex items-center gap-2 mx-auto"
            >
              <Heart className="w-5 h-5" />
              Support the Initiative
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-forest text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-8">
              Your transformation is waiting.
            </h2>
            <p className="text-xl text-white/80 mb-12">
              Begin your journey to wholeness today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onOpenBooking()}
                className="px-10 py-5 bg-gold text-forest font-semibold rounded-full hover:bg-gold/90 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Your Session
              </button>
              <button
                onClick={() => handleWhatsApp()}
                className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Contact on WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
