import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MessageCircle, Star, Award, BookOpen, Users, Heart, ArrowRight } from 'lucide-react';
import { CONTACT } from '../shared/constants';

interface FounderPageProps {
  onOpenBooking: () => void;
}

export const FounderPage: React.FC<FounderPageProps> = ({ onOpenBooking }) => {
  const handleWhatsApp = () => {
    const message = 'Hello Soulsysta! I would like to learn more about working with Merit Nene Chuks.';
    window.open(
      `https://wa.me/${CONTACT.WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const timeline = [
    {
      year: '2014',
      title: 'The Awakening',
      description: 'Founded on the principles of clinical psychotherapy, Merit began her journey understanding the intricate maps of the human mind.',
      image: '/images/brand/brand-01.jpg',
    },
    {
      year: '2018',
      title: 'The Expansion',
      description: 'Transitioning from clinical practice to holistic mentorship, Soulsysta Collective was born as a global hub for soul-aligned growth.',
      image: '/images/brand/brand-02.jpg',
    },
    {
      year: '2023',
      title: 'The Legacy',
      description: 'With the launch of "She Too Can", Merit cemented her role as a thought leader in the space of female empowerment and healing.',
      image: '/images/brand/brand-05.jpg',
    },
  ];

  const philosophy = [
    {
      icon: Star,
      title: 'The Spirit',
      description: 'The core essence that transcends the physical, providing the "why" behind every breath and action.',
    },
    {
      icon: Heart,
      title: 'The Soul',
      description: 'The seat of your emotions and intellect, requiring gentle tending and radical honesty to flourish.',
    },
    {
      icon: Users,
      title: 'The Body',
      description: 'The vessel through which we experience the world, requiring somatic care and respectful listening.',
    },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Founder & Visionary
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-forest leading-tight">
              The Visionary <br/>
              <span className="italic font-light">Behind the Stillness.</span>
            </h1>
            <div className="h-1 w-24 bg-gold mt-8 mb-6"></div>
            <p className="text-lg text-forest/70 max-w-lg leading-relaxed">
              Merit Nene Chuks is the heart of Soulsysta Collective—a sanctuary for the discerning soul seeking transformational growth through quiet confidence and grounded wisdom.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full max-w-[500px] aspect-[4/5] mx-auto">
              <img
                src="/images/founder/merit-portrait.png"
                alt="Merit Nene Chuks"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-[280px] hidden md:block">
                <p className="font-serif italic text-forest text-lg leading-relaxed">
                  "Healing is not a destination, but a return to your original rhythm."
                </p>
                <div className="mt-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Calling Section */}
      <section className="py-20 px-6 bg-surface-container">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-80 rounded-2xl overflow-hidden">
                  <img
                    src="/images/brand/brand-03.jpg"
                    alt="Meditation space"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-64 rounded-2xl overflow-hidden">
                  <img
                    src="/images/brand/brand-04.jpg"
                    alt="Ceramic tea"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="pt-12">
                <div className="h-96 rounded-2xl overflow-hidden">
                  <img
                    src="/images/brand/brand-02.jpg"
                    alt="Forest at dawn"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-8"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Section 01 / The Calling
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest">
              A Decade of Transformational Guidance
            </h2>
            <p className="text-lg text-forest/70 leading-relaxed">
              With over ten years of experience at the intersection of psychotherapy and holistic wellness, Merit has pioneered a methodology that honors the complexities of the modern woman. Her work is not about fixing what is broken, but about uncovering the latent strength within.
            </p>
            <p className="text-forest/70 leading-relaxed">
              From high-stakes boardrooms to intimate healing retreats, she has guided hundreds of individuals toward a life of alignment, where professional success and personal peace are no longer at odds.
            </p>
            <button
              onClick={handleWhatsApp}
              className="px-8 py-4 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-lg inline-flex items-center gap-2"
            >
              Discover Her Method
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mb-4">
              The Philosophy
            </h2>
            <p className="text-lg text-forest/70 max-w-2xl mx-auto">
              Three pillars of alignment to guide the soul toward wholeness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophy.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`p-12 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                    idx === 1 ? 'bg-forest text-ivory' : 'bg-white'
                  }`}
                >
                  <Icon className={`w-12 h-12 mb-6 ${idx === 1 ? 'text-gold' : 'text-gold'}`} />
                  <h3 className="font-serif text-2xl font-bold mb-4">
                    {pillar.title}
                  </h3>
                  <p className={`leading-relaxed ${idx === 1 ? 'text-ivory/80' : 'text-forest/70'}`}>
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-surface-container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest">
              The Journey
            </h2>
          </motion.div>

          <div className="space-y-24 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-forest/10 hidden md:block"></div>

            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-12 ${
                  idx % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                    {item.year} — {item.title.toUpperCase()}
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-forest mt-2">
                    {item.title}
                  </h4>
                  <p className="text-forest/70 mt-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="w-4 h-4 rounded-full bg-gold z-10 hidden md:block"></div>

                <div className="w-full md:w-1/2">
                  <div className="h-48 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
              <h2 className="font-serif text-4xl font-bold text-forest">
                Voices of Transition
              </h2>
              <p className="text-forest/70 mt-4">
                Notes from those who have walked the path of stillness with Merit.
              </p>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="p-8 border-l-4 border-gold italic text-lg text-forest bg-surface-container rounded-r-2xl"
              >
                "Merit has a way of seeing through the noise. Her sessions are a masterclass in returning to oneself."
                <cite className="block not-italic text-sm text-forest/60 mt-6 uppercase tracking-widest font-semibold">
                  — Julianne R., Creative Director
                </cite>
              </motion.blockquote>

              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-8 border-l-4 border-gold italic text-lg text-forest bg-surface-container rounded-r-2xl"
              >
                "The most profound shift I've experienced in a decade of self-work happened in just one weekend with her."
                <cite className="block not-italic text-sm text-forest/60 mt-6 uppercase tracking-widest font-semibold">
                  — Sarah L., Executive Lead
                </cite>
              </motion.blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/brand/brand-06.jpg"
            alt="Coastal retreat"
            className="w-full h-full object-cover brightness-50"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md p-16 rounded-2xl border border-white/20"
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-8">
              Begin Your Journey
            </h2>
            <p className="text-lg text-white/80 mb-12">
              Whether you seek a private intensive or a keynote for your next gathering, allow Merit to guide the conversation toward alignment.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 bg-gold text-forest font-semibold rounded-full hover:bg-gold/90 transition-all shadow-xl inline-flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book a Private Session
              </button>
              <button
                onClick={handleWhatsApp}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full hover:bg-white/20 transition-all inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Invite to Speak
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
