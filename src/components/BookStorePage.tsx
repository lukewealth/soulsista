import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MessageCircle, ArrowRight, Star, BookOpen, Check } from 'lucide-react';
import { CONTACT } from '../shared/constants';

interface BookStorePageProps {
  onOpenBooking: () => void;
}

export const BookStorePage: React.FC<BookStorePageProps> = ({ onOpenBooking }) => {
  const handleWhatsApp = () => {
    const message = 'Hello Soulsysta! I would like to purchase a copy of "She Too Can".';
    window.open(
      `https://wa.me/${CONTACT.WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const chapters = [
    {
      number: '01',
      title: 'The Path to Stillness',
      description: 'Discover how silence becomes the loudest tool for self-reclamation in a noisy world.',
    },
    {
      number: '02',
      title: 'Deconstructing Old Patterns',
      description: 'Identifying the inherited scripts that dictate your decisions and learning to rewrite them.',
    },
    {
      number: '03',
      title: 'The Alchemy of Fear',
      description: 'Transforming hesitation into momentum through the understanding of your own triggers.',
    },
    {
      number: '04',
      title: 'Authentic Power',
      description: 'Power that doesn\'t scream, but stands firm. Defining leadership on your own terms.',
    },
    {
      number: '05',
      title: 'Collective Resonance',
      description: 'The strength found in sisterhood and the power of shared narratives in healing.',
    },
    {
      number: '06',
      title: 'Living in Wholeness',
      description: 'The integration of self, spirit, and career into a single, cohesive way of being.',
    },
  ];

  const testimonials = [
    {
      quote: 'This book found me exactly when I needed it. It\'s a mirror for the parts of me I\'ve ignored for far too long.',
      author: 'Alexandra Vance',
      role: 'CREATIVE DIRECTOR',
      image: '/images/brand/brand-01.jpg',
    },
    {
      quote: 'Merit\'s words carry a weight of truth that is rare. I\'ve bought copies for every woman in my family.',
      author: 'Dr. Elena Rossi',
      role: 'PSYCHOLOGIST',
      image: '/images/brand/brand-02.jpg',
    },
    {
      quote: 'Practical, spiritual, and beautifully written. It\'s the manual I wish I had in my early twenties.',
      author: 'Sasha Kim',
      role: 'TECH FOUNDER',
      image: '/images/brand/brand-03.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-20 overflow-hidden px-6">
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              A Guiding Manual for Wholeness
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-forest mt-4 mb-6">
              Break Limits. Rediscover Your Authentic Power.
            </h1>
            <p className="text-lg text-forest/70 max-w-2xl mx-auto">
              'She Too Can' is the manifesto for the modern woman who refuses to settle. Journey through a cinematic exploration of self-discovery and spiritual depth.
            </p>

            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
              <button
                onClick={handleWhatsApp}
                className="px-10 py-5 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-xl"
              >
                Buy Now — $29.99
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('chapters');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 text-forest font-semibold"
              >
                <span className="border border-forest/20 p-2 rounded-full">
                  <BookOpen className="w-5 h-5" />
                </span>
                Watch the Trailer
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-20 relative w-full max-w-5xl mx-auto"
        >
          <div className="relative aspect-[16/9] bg-surface-container rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/services/she-too-can-book.jpg"
              alt="She Too Can book cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent"></div>
          </div>
        </motion.div>
      </section>

      {/* The Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="/images/founder/merit-portrait.png"
                alt="Merit Nene Chuks"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gold rounded-full flex items-center justify-center p-8 text-center rotate-12 hidden lg:flex">
              <p className="text-xs font-semibold text-forest uppercase tracking-widest">
                THE ESSENTIAL MODERN MANIFESTO
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-6 lg:offset-1 mt-12 lg:mt-0 space-y-8"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              The Narrative
            </span>
            <h2 className="font-serif text-4xl font-bold text-forest leading-tight">
              A Guiding Manual for the Modern Woman seeking Wholeness.
            </h2>
            <div className="space-y-6 text-forest/70 text-lg leading-relaxed">
              <p>
                In a world that demands constant performance, Merit Nene Chuks invites you to a space of radical stillness. 'She Too Can' is not just a book; it is a meticulously crafted path toward your most authentic self.
              </p>
              <p>
                Through layered storytelling and actionable insights, the author deconstructs the societal myths that keep women playing small. This is an invitation to inhabit your space fully, with the quiet confidence of someone who knows their worth is inherent, not earned.
              </p>
            </div>
            <ul className="space-y-4 pt-4">
              {[
                'Reclaiming your voice in a crowded room',
                'The architecture of meaningful boundaries',
                'Cultivating spiritual and emotional resilience',
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <Star className="w-5 h-5 text-gold fill-gold" />
                  <span className="text-forest font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* 3D Showcase Section */}
      <section className="py-20 px-6 bg-forest text-ivory relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-serif text-4xl font-bold mb-12"
          >
            Experience the Craftsmanship
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full max-w-3xl aspect-square flex items-center justify-center"
          >
            <div className="relative z-10 w-64 h-96 bg-ivory shadow-2xl transform hover:rotate-y-12 transition-transform duration-700 rounded-lg overflow-hidden">
              <img
                src="/images/services/she-too-can-book.jpg"
                alt="She Too Can book"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute top-1/4 -left-10 md:-left-20 bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 text-left max-w-[200px] hidden md:block">
              <p className="text-xs opacity-60 mb-2 uppercase">PRINT QUALITY</p>
              <p className="text-sm">Museum-grade archival paper with silk-touch finish.</p>
            </div>

            <div className="absolute bottom-1/4 -right-10 md:-right-20 bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 text-left max-w-[200px] hidden md:block">
              <p className="text-xs opacity-60 mb-2 uppercase">DESIGN</p>
              <p className="text-sm">Minimalist aesthetic designed to sit beautifully on your shelf.</p>
            </div>
          </motion.div>

          <p className="text-ivory/60 mt-12 text-lg italic">
            Click and drag to explore the details
          </p>
        </div>
      </section>

      {/* Chapter Preview Section */}
      <section id="chapters" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                The Roadmap
              </span>
              <h2 className="font-serif text-4xl font-bold text-forest mt-4">
                Journey into the Depth of Yourself.
              </h2>
            </motion.div>
            <button className="text-forest font-semibold flex items-center gap-2 border-b border-forest/20 pb-2 hover:border-gold transition-all">
              Download Sample Chapter
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chapters.map((chapter, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group p-6 border-b border-forest/10 hover:bg-surface-container transition-all duration-500 cursor-pointer rounded-lg"
              >
                <p className="text-gold text-sm font-semibold mb-4">{chapter.number}</p>
                <h3 className="font-serif text-2xl font-bold text-forest mb-4 group-hover:translate-x-2 transition-transform">
                  {chapter.title}
                </h3>
                <p className="text-forest/70 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">
                  {chapter.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-surface-container">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Voices of the Collective
            </span>
            <h2 className="font-serif text-4xl font-bold text-forest mt-4">
              Transformed Lives
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-2xl shadow-lg space-y-6"
              >
                <div className="flex gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold" />
                  ))}
                </div>
                <p className="text-forest italic text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-forest/10">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-forest">{testimonial.author}</p>
                    <p className="text-xs text-forest/60 uppercase tracking-widest">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Author Note Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 items-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-8 order-2 lg:order-1"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              The Visionary
            </span>
            <h2 className="font-serif text-4xl font-bold text-forest">
              A Message from Merit Nene Chuks
            </h2>
            <div className="text-lg text-forest/70 space-y-6 leading-relaxed">
              <p>
                "I wrote this book because I saw too many brilliant women shrinking to fit into spaces that were never meant for them. My mission is to give you the tools to expand, to take up space, and to do so with a sense of internal peace that cannot be shaken by external circumstances."
              </p>
              <p>
                "This isn't about doing more; it's about being more. More present, more intentional, and more aligned with the person you were always meant to be."
              </p>
            </div>
            <div className="pt-8">
              <p className="font-serif text-xl text-gold italic">Merit Nene Chuks</p>
              <p className="text-sm text-forest mt-2 uppercase tracking-widest">
                AUTHOR & FOUNDER OF SOULSYSTA
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:offset-1 order-1 lg:order-2"
          >
            <div className="relative">
              <div className="aspect-[4/6] bg-forest rounded-2xl overflow-hidden">
                <img
                  src="/images/founder/merit-editorial.png"
                  alt="Merit Nene Chuks"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 border border-gold/20 rounded-full hidden lg:block"></div>
            </div>
          </motion.div>
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
              Ready to Begin Your Journey?
            </h2>
            <p className="text-lg text-forest/70 mb-12">
              Get your copy of "She Too Can" today and start your transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleWhatsApp}
                className="px-10 py-4 bg-gold text-forest font-semibold rounded-full hover:bg-gold/90 transition-all shadow-xl inline-flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Purchase Copy — $29.99
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
