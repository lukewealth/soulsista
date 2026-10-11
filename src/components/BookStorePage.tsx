import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, Star, BookOpen, Heart } from 'lucide-react';
import { CONTACT } from '../shared/constants';
import { BOOKS, FEATURED_BOOK } from '../data/mockData';
import { useCurrency } from '../shared/currency';

interface BookStorePageProps {
  onOpenBooking: () => void;
}

export const BookStorePage: React.FC<BookStorePageProps> = ({ onOpenBooking }) => {
  const { format, currency, symbol } = useCurrency();

  const handleWhatsApp = (bookTitle?: string) => {
    const title = bookTitle ?? FEATURED_BOOK.title;
    const message = `Hello Soulsysta! I would like to purchase a copy of "${title}".`;
    window.open(
      `https://wa.me/${CONTACT.WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const featuredPrice = format(
    FEATURED_BOOK.priceHardcover,
    FEATURED_BOOK.priceHardcoverNGN
  );

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
              The Soulsysta Library
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-forest mt-4 mb-6">
              The Books that Built the Collective.
            </h1>
            <p className="text-lg text-forest/70 max-w-2xl mx-auto">
              Every volume in the Soulsysta library is a working manual for wholeness. Written by Merit Nene Chuks, they are the texts we teach, prescribe, and live by.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest/5 text-forest/70 text-xs font-semibold uppercase tracking-widest">
              <span>Showing prices in</span>
              <span className="text-gold font-bold">
                {currency === 'NGN' ? '🇳🇬 Nigerian Naira (₦)' : '🌐 US Dollars ($)'}
              </span>
            </div>

            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
              <button
                onClick={() => handleWhatsApp()}
                className="px-10 py-5 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-xl"
              >
                Buy Now — {symbol}
                {featuredPrice.replace(/[₦$]/g, '')}
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById('library');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 text-forest font-semibold"
              >
                <span className="border border-forest/20 p-2 rounded-full">
                  <BookOpen className="w-5 h-5" />
                </span>
                Browse the Library
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Book Library Grid */}
      <section id="library" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              The Library
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mt-4">
              Every Title, One Sanctuary.
            </h2>
            <p className="text-forest/70 mt-4 max-w-2xl mx-auto">
              From foundational manifestos to financial reclamation — the books that anchor the work of the Collective.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {BOOKS.map((book, idx) => {
              const priceLabel = format(book.priceHardcover, book.priceHardcoverNGN);
              return (
                <motion.article
                  key={book.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06, duration: 0.5 }}
                  className="group bg-ivory-elevated rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col border border-forest/10"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-surface-container">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    {book.badge && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 bg-gold text-forest text-xs font-bold px-3 py-1 rounded-full">
                          {book.badge}
                        </span>
                      </div>
                    )}
                    {book.category && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-forest/90 backdrop-blur text-ivory text-xs font-semibold px-3 py-1 rounded-full">
                          {book.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif text-2xl font-bold text-forest mb-2 line-clamp-2 group-hover:text-gold transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-forest/60 mb-3">by {book.author}</p>
                    <p className="text-forest/75 text-sm mb-4 line-clamp-3 flex-1">
                      {book.shortDescription ?? book.synopsis}
                    </p>
                    <div className="flex items-end justify-between pt-4 border-t border-forest/10">
                      <div>
                        <p className="text-xs text-forest/60 uppercase tracking-widest font-semibold">
                          Hardcover
                        </p>
                        <p className="font-serif text-2xl font-bold text-forest mt-1">
                          {priceLabel}
                        </p>
                      </div>
                      <button
                        onClick={() => handleWhatsApp(book.title)}
                        className="px-4 py-2.5 bg-forest text-ivory text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-forest/90 transition-all shadow-sm inline-flex items-center gap-1.5"
                      >
                        Order
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Book Section */}
      <section className="py-20 px-6 bg-surface-container">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={FEATURED_BOOK.coverImage}
                  alt={FEATURED_BOOK.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gold text-forest rounded-full w-32 h-32 flex items-center justify-center text-center p-4 rotate-12 hidden lg:flex shadow-xl">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest">Best Seller</p>
                  <p className="font-serif text-lg font-bold leading-tight mt-1">{featuredPrice}</p>
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
                The Founder's Manifesto
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest">
                {FEATURED_BOOK.title}
              </h2>
              <p className="text-xl text-forest/70 italic">{FEATURED_BOOK.subtitle}</p>
              <p className="text-forest/70 leading-relaxed">{FEATURED_BOOK.synopsis}</p>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-ivory-elevated border border-forest/10">
                  <p className="text-xs text-forest/60 uppercase tracking-widest font-semibold">Pages</p>
                  <p className="font-serif text-2xl font-bold text-forest mt-1">{FEATURED_BOOK.specifications?.pages}</p>
                </div>
                <div className="p-4 rounded-xl bg-ivory-elevated border border-forest/10">
                  <p className="text-xs text-forest/60 uppercase tracking-widest font-semibold">Format</p>
                  <p className="font-serif text-lg font-bold text-forest mt-1">Hardcover / Digital</p>
                </div>
                <div className="p-4 rounded-xl bg-ivory-elevated border border-forest/10">
                  <p className="text-xs text-forest/60 uppercase tracking-widest font-semibold">Language</p>
                  <p className="font-serif text-lg font-bold text-forest mt-1">English</p>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-sm text-forest/60 font-semibold uppercase tracking-widest mb-2">
                  Available now for
                </p>
                <p className="font-serif text-4xl font-bold text-gold">{featuredPrice}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => handleWhatsApp()}
                  className="px-8 py-4 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-xl inline-flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Order Your Copy
                </button>
                <button
                  onClick={onOpenBooking}
                  className="px-8 py-4 bg-gold text-forest font-semibold rounded-full hover:bg-gold/90 transition-all shadow-xl inline-flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Book a Session Instead
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Voices of the Library
            </span>
            <h2 className="font-serif text-4xl font-bold text-forest mt-4">
              What Readers Are Saying
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {(FEATURED_BOOK.testimonials ?? []).map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-ivory-elevated p-8 rounded-2xl shadow-lg space-y-4 border border-forest/10"
              >
                <div className="flex gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold" />
                  ))}
                </div>
                <p className="text-forest italic text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="pt-4 border-t border-forest/10">
                  <p className="font-bold text-forest">{testimonial.author}</p>
                  <p className="text-xs text-forest/60 uppercase tracking-widest">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Author Note */}
      <section className="py-20 px-6 bg-forest text-ivory">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">
            A Note from the Author
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
            "Every book in this library is a piece of the work. Read them slowly. Read them again. They were written to be lived with, not finished."
          </h2>
          <div className="pt-2">
            <p className="font-serif text-xl text-gold italic">Merit Nene Chuks</p>
            <p className="text-xs text-ivory/60 uppercase tracking-widest mt-1">
              Founder, Soulsysta Collective
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mb-6">
              Begin with the first volume.
            </h2>
            <p className="text-lg text-forest/70 mb-10">
              Or pair a book with a private session and accelerate the work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleWhatsApp()}
                className="px-10 py-4 bg-gold text-forest font-semibold rounded-full hover:bg-gold/90 transition-all shadow-xl inline-flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Order "{FEATURED_BOOK.title}" — {featuredPrice}
              </button>
              <button
                onClick={onOpenBooking}
                className="px-10 py-4 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-xl inline-flex items-center justify-center gap-2"
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
