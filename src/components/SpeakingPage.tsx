import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MessageCircle, ArrowRight, Mic, Users, Award, BookOpen } from 'lucide-react';
import { CONTACT } from '../shared/constants';

interface SpeakingPageProps {
  onOpenBooking: () => void;
}

export const SpeakingPage: React.FC<SpeakingPageProps> = ({ onOpenBooking }) => {
  const handleWhatsApp = () => {
    const message = 'Hello Soulsysta! I would like to inquire about booking Merit Nene Chuks for a speaking engagement.';
    window.open(
      `https://wa.me/${CONTACT.WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const keynotes = [
    {
      icon: Mic,
      title: 'The Architecture of Stillness',
      description: 'A transformative session on designing internal landscapes that withstand external chaos. Merit explores sensory environmentalism and mental vitality.',
    },
    {
      icon: Users,
      title: 'Radical Presence',
      description: 'Moving beyond mindfulness into active awareness. How high-performance leaders can utilize somatic wisdom to make more resonant decisions.',
    },
    {
      icon: Award,
      title: 'The Future of Communal Healing',
      description: 'Reimagining togetherness. Merit discusses the shift from individual optimization to collective sanctuary in professional and private spheres.',
    },
  ];

  const engagements = [
    {
      title: 'Global Summit',
      image: '/images/events/public-speaking.png',
      span: 'col-span-1 md:col-span-8 row-span-2',
    },
    {
      title: 'Healing Circle',
      image: '/images/brand/brand-02.jpg',
      span: 'col-span-1 md:col-span-4 row-span-1',
    },
    {
      title: 'Keynote Event',
      image: '/images/brand/brand-03.jpg',
      span: 'col-span-1 md:col-span-4 row-span-2',
    },
    {
      title: 'Apothecary Event',
      image: '/images/brand/brand-04.jpg',
      span: 'col-span-1 md:col-span-4 row-span-1',
    },
    {
      title: 'Lecture Hall',
      image: '/images/brand/brand-05.jpg',
      span: 'col-span-2 md:col-span-4 row-span-1',
    },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-end overflow-hidden px-6 pb-12">
        <div className="absolute inset-0">
          <img
            src="/images/founder/merit-portrait.png"
            alt="Merit Nene Chuks"
            className="w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              Speaking & Engagements
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-forest mb-8 leading-tight">
              The Voice of<br/>Wholeness
            </h1>
            <button
              onClick={handleWhatsApp}
              className="px-10 py-5 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-xl"
            >
              REQUEST FOR ENGAGEMENT
            </button>
          </motion.div>
        </div>
      </section>

      {/* Keynotes Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-serif text-4xl sm:text-5xl font-bold text-forest max-w-md"
            >
              Signature Keynotes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-forest/70 max-w-sm"
            >
              Architecting stillness in a world of constant motion. Exploring the intersection of luxury wellness and radical communal presence.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keynotes.map((keynote, idx) => {
              const Icon = keynote.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-gold mb-6" />
                  <h3 className="font-serif text-2xl font-bold text-forest mb-4">
                    {keynote.title}
                  </h3>
                  <p className="text-forest/70 leading-relaxed">
                    {keynote.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engagements Gallery */}
      <section className="py-20 px-6 bg-surface-container">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-5xl font-bold text-forest mb-12"
          >
            Global Presence
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-12 grid-rows-3 gap-4 h-[600px] md:h-[800px]">
            {engagements.map((engagement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className={`${engagement.span} relative overflow-hidden group rounded-2xl`}
              >
                <img
                  src={engagement.image}
                  alt={engagement.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-forest/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-ivory font-semibold uppercase tracking-widest">
                    {engagement.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mb-4">
              The Inquiry Concierge
            </h2>
            <p className="text-lg text-forest/70 italic">
              Initiate a dialogue for your next signature event.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={(e) => {
              e.preventDefault();
              handleWhatsApp();
            }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-forest/60 uppercase tracking-widest mb-2">
                  Event Name
                </label>
                <input
                  type="text"
                  placeholder="A Vision for 2025"
                  className="w-full bg-transparent border-0 border-b-2 border-forest/20 focus:border-gold transition-all py-3 px-0 text-forest placeholder:text-forest/40"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-forest/60 uppercase tracking-widest mb-2">
                  Requested Date
                </label>
                <input
                  type="text"
                  placeholder="MM / DD / YYYY"
                  className="w-full bg-transparent border-0 border-b-2 border-forest/20 focus:border-gold transition-all py-3 px-0 text-forest placeholder:text-forest/40"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-forest/60 uppercase tracking-widest mb-2">
                  Audience Size
                </label>
                <input
                  type="text"
                  placeholder="Approximate number"
                  className="w-full bg-transparent border-0 border-b-2 border-forest/20 focus:border-gold transition-all py-3 px-0 text-forest placeholder:text-forest/40"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-forest/60 uppercase tracking-widest mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City or Digital"
                  className="w-full bg-transparent border-0 border-b-2 border-forest/20 focus:border-gold transition-all py-3 px-0 text-forest placeholder:text-forest/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-forest/60 uppercase tracking-widest mb-2">
                The Intent
              </label>
              <textarea
                rows={4}
                placeholder="Describe the desired emotional and intellectual resonance of this engagement..."
                className="w-full bg-transparent border-0 border-b-2 border-forest/20 focus:border-gold transition-all py-3 px-0 text-forest placeholder:text-forest/40 resize-none"
              />
            </div>

            <div className="flex justify-center pt-8">
              <button
                type="submit"
                className="px-12 py-5 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-xl"
              >
                SEND PROPOSAL
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-surface-container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mb-8">
              Ready to Inspire?
            </h2>
            <p className="text-lg text-forest/70 mb-12">
              Let Merit bring transformative wisdom to your next event.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleWhatsApp}
                className="px-10 py-4 bg-gold text-forest font-semibold rounded-full hover:bg-gold/90 transition-all shadow-xl inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Contact via WhatsApp
              </button>
              <button
                onClick={onOpenBooking}
                className="px-10 py-4 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-xl inline-flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book a Session
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
