import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, CreditCard, Search, Loader2, X } from 'lucide-react';

interface BookStoreCardProps {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  price: number;
  coverImage: string;
  badge?: string;
}

interface BookStoresGridProps {
  books: BookStoreCard[];
  onBookSelect?: (bookId: string) => void;
  onViewAll?: () => void;
}

export const BookStoresGrid: React.FC<BookStoresGridProps> = ({ books, onBookSelect, onViewAll }) => {
  return (
    <section className="py-24 bg-[var(--color-ivory)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">
            Bookstore
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mt-4">
            Book Sales
          </h2>
          <p className="text-forest/70 mt-6 max-w-2xl mx-auto">
            Discover our curated collection of transformative books for personal growth and healing
          </p>
        </motion.div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: books.indexOf(book) * 0.05, duration: 0.6 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
            >
              {/* Cover Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {book.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-forest text-xs font-bold px-3 py-1 rounded-full">
                      {book.badge}
                    </span>
                  </div>
                )}
                {book.onSelect && (
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3">
                    <BookOpen className="w-5 h-5 text-gold mb-1" />
                    <span className="text-xs text-forest font-medium">Read Sample</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gold text-forest text-xs font-bold px-2 py-1 rounded">
                    {book.category}
                  </span>
                  <span className="text-forest/60 text-xs capitalize">{book.author}</span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-forest mb-2 line-clamp-2">
                  {book.title}
                </h3>

                <p className="text-forest/70 text-sm mb-4 line-clamp-2">
                  {book.subtitle}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-forest/10">
                  <div className="flex items-center gap-2">
                    <span className="text-gold text-xl font-bold">${book.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {onBookSelect && (
                      <button
                        onClick={() => onBookSelect(book.id)}
                        className="px-3 py-1.5 bg-forest text-ivory font-semibold rounded-lg hover:bg-forest/90 transition-all text-sm"
                      >
                        Order
                      </button>
                    )}
                    <Search className="w-4 h-4 text-forest/40 hover:text-gold transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        {onViewAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <button
              onClick={onViewAll}
              className="px-8 py-3 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-lg inline-flex items-center gap-2"
            >
              View All Books
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};