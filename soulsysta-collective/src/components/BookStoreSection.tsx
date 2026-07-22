import React, { useState } from 'react';
import { FEATURED_BOOK } from '../data/mockData';
import { BookOpen, Star, ShoppingBag, Check, ArrowRight, X, Download, ShieldCheck } from 'lucide-react';

interface BookStoreSectionProps {
  onAddToCart: (item: { id: string; format: 'hardcover' | 'digital' | 'bundle'; price: number; title: string }) => void;
  onInstantBuy: (item: { id: string; format: 'hardcover' | 'digital' | 'bundle'; price: number; title: string }) => void;
}

export const BookStoreSection: React.FC<BookStoreSectionProps> = ({
  onAddToCart,
  onInstantBuy,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'hardcover' | 'digital' | 'bundle'>('hardcover');
  const [previewChapterIndex, setPreviewChapterIndex] = useState<number | null>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const getFormatPrice = () => {
    if (selectedFormat === 'hardcover') return FEATURED_BOOK.priceHardcover;
    if (selectedFormat === 'digital') return FEATURED_BOOK.priceDigital;
    return FEATURED_BOOK.priceBundle;
  };

  const handleAddToCart = () => {
    onAddToCart({
      id: FEATURED_BOOK.id,
      format: selectedFormat,
      price: getFormatPrice(),
      title: `${FEATURED_BOOK.title} (${selectedFormat.toUpperCase()})`,
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const currentPreviewChapter = previewChapterIndex !== null ? FEATURED_BOOK.previewChapters[previewChapterIndex] : null;

  return (
    <section id="book-section" className="py-20 lg:py-28 bg-surface-container relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Badge */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest text-gold text-[11px] font-label font-bold tracking-[0.2em] uppercase">
            <BookOpen className="w-3.5 h-3.5 text-gold" />
            SOULSYSTA PUBLISHING HOUSE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-forest tracking-tight">
            The Best-Selling Literary Manifesto
          </h2>
          <p className="text-base text-forest/70 font-sans">
            A guide for women ready to dismantle limitations, heal trauma, and reclaim authentic authority.
          </p>
        </div>

        {/* Book Showcase Grid */}
        <div className="mt-14 grid lg:grid-cols-12 gap-12 items-center bg-white rounded-3xl p-6 sm:p-10 border border-forest/10 shadow-xl">
          
          {/* Left Column: 3D Hardcover Book Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group cursor-pointer" onClick={() => setPreviewChapterIndex(0)}>
              <div className="w-64 sm:w-72 h-96 sm:h-[420px] rounded-r-2xl rounded-l-xs bg-forest shadow-2xl transition-transform duration-500 group-hover:rotate-1 group-hover:scale-105 relative overflow-hidden border-r-8 border-b-8 border-forest">
                
                <img
                  src={FEATURED_BOOK.coverImage}
                  alt={FEATURED_BOOK.title}
                  className="w-full h-full object-cover mix-blend-multiply opacity-90"
                />

                <div className="absolute inset-0 p-8 flex flex-col justify-between text-ivory">
                  <div>
                    <span className="text-[10px] font-label uppercase tracking-[0.3em] text-gold block font-bold">
                      SOULSYSTA PRESS
                    </span>
                    <h3 className="font-serif text-3xl font-extrabold tracking-tight mt-2 text-gold">
                      SHE TOO CAN.
                    </h3>
                    <p className="text-xs text-ivory/80 mt-1 font-sans">
                      Break Limits. Become Whole.
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-label tracking-widest text-gold uppercase block font-semibold">
                      BY MERIT NENE CHUKS
                    </span>
                  </div>
                </div>

                {/* Foil Gold Accent Badge */}
                <div className="absolute top-4 right-4 bg-gold text-forest text-[9px] font-label uppercase tracking-widest font-bold px-2.5 py-1 rounded-md shadow-xs">
                  FOIL EDITION
                </div>
              </div>

              {/* Book Shadow Effect */}
              <div className="w-56 h-4 bg-black/15 blur-md rounded-full mt-4 mx-auto" />
            </div>

            {/* Read Preview Button */}
            <button
              onClick={() => setPreviewChapterIndex(0)}
              className="mt-6 inline-flex items-center gap-2 text-xs font-label uppercase tracking-widest text-forest font-bold hover:text-gold transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-gold" />
              <span>Read Chapter 1 Excerpt</span>
            </button>
          </div>

          {/* Right Column: Book Details & Format Selection */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title & Author */}
            <div>
              <div className="flex items-center gap-1 text-gold mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-bold text-forest ml-2">5.0 (480+ Global Reviews)</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-forest">
                {FEATURED_BOOK.title}
              </h3>
              <p className="text-sm font-semibold text-gold mt-1">
                {FEATURED_BOOK.subtitle}
              </p>
            </div>

            {/* Synopsis */}
            <p className="text-sm text-forest/70 leading-relaxed">
              {FEATURED_BOOK.synopsis}
            </p>

            {/* Format Selection Cards */}
            <div className="space-y-3">
              <label className="block text-xs font-label uppercase tracking-widest text-forest/70 font-bold">
                Select Your Edition & Format:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Hardcover */}
                <button
                  type="button"
                  onClick={() => setSelectedFormat('hardcover')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    selectedFormat === 'hardcover'
                      ? 'border-forest bg-surface-container shadow-xs'
                      : 'border-forest/10 bg-ivory hover:border-forest'
                  }`}
                >
                  <span className="text-xs font-bold text-forest block">Hardcover Edition</span>
                  <span className="text-[10px] text-forest/50 block mt-0.5">Embossed Gold Foil</span>
                  <span className="text-base font-extrabold text-forest block mt-2">${FEATURED_BOOK.priceHardcover}</span>
                  {selectedFormat === 'hardcover' && (
                    <span className="absolute top-3 right-3 text-forest"><Check className="w-4 h-4" /></span>
                  )}
                </button>

                {/* Digital eBook */}
                <button
                  type="button"
                  onClick={() => setSelectedFormat('digital')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    selectedFormat === 'digital'
                      ? 'border-forest bg-surface-container shadow-xs'
                      : 'border-forest/10 bg-ivory hover:border-forest'
                  }`}
                >
                  <span className="text-xs font-bold text-forest block">Digital eBook</span>
                  <span className="text-[10px] text-forest/50 block mt-0.5">Instant PDF / ePub</span>
                  <span className="text-base font-extrabold text-forest block mt-2">${FEATURED_BOOK.priceDigital}</span>
                  {selectedFormat === 'digital' && (
                    <span className="absolute top-3 right-3 text-forest"><Check className="w-4 h-4" /></span>
                  )}
                </button>

                {/* Complete Bundle */}
                <button
                  type="button"
                  onClick={() => setSelectedFormat('bundle')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    selectedFormat === 'bundle'
                      ? 'border-gold bg-surface-container shadow-xs'
                      : 'border-forest/10 bg-ivory hover:border-gold'
                  }`}
                >
                  <span className="text-xs font-bold text-gold block">Deluxe Bundle</span>
                  <span className="text-[10px] text-forest/50 block mt-0.5">Hardcover + Journal</span>
                  <span className="text-base font-extrabold text-forest block mt-2">${FEATURED_BOOK.priceBundle}</span>
                  {selectedFormat === 'bundle' && (
                    <span className="absolute top-3 right-3 text-gold"><Check className="w-4 h-4" /></span>
                  )}
                </button>

              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-forest hover:bg-forest/90 text-ivory text-xs font-label uppercase tracking-widest font-bold rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-gold" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-gold" />
                    <span>Add to Bag (${getFormatPrice()})</span>
                  </>
                )}
              </button>

              <button
                onClick={() =>
                  onInstantBuy({
                    id: FEATURED_BOOK.id,
                    format: selectedFormat,
                    price: getFormatPrice(),
                    title: `${FEATURED_BOOK.title} (${selectedFormat.toUpperCase()})`,
                  })
                }
                className="px-6 py-3.5 bg-gold hover:bg-gold/90 text-forest text-xs font-label uppercase tracking-widest font-bold rounded-full transition-all cursor-pointer shadow-sm"
              >
                Guest Checkout
              </button>
            </div>

            {/* Guarantees */}
            <div className="flex items-center gap-6 pt-2 text-[11px] text-forest/70">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-forest" /> Worldwide Shipping
              </span>
              <span className="flex items-center gap-1">
                <Download className="w-4 h-4 text-forest" /> Instant Digital Access
              </span>
            </div>

          </div>
        </div>

        {/* Reader Testimonials Grid */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl font-bold text-forest">Reader Reflections</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED_BOOK.testimonials.map((t, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border border-forest/10 space-y-3">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-forest/70 italic leading-relaxed">{t.quote}</p>
                <div>
                  <span className="font-bold text-xs text-forest block">{t.author}</span>
                  <span className="text-[10px] text-forest/50 block">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Chapter Reader Excerpt Modal */}
      {currentPreviewChapter && (
        <div className="fixed inset-0 z-50 bg-forest/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-ivory w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-forest/10 relative max-h-[85vh] overflow-y-auto">
            
            <button
              onClick={() => setPreviewChapterIndex(null)}
              className="absolute top-4 right-4 p-2 bg-forest text-white rounded-full hover:bg-forest/90 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="text-xs font-label uppercase tracking-widest text-gold font-bold">
                CHAPTER 0{currentPreviewChapter.number} PREVIEW
              </span>
              
              <h3 className="font-serif text-2xl font-bold text-forest">
                {currentPreviewChapter.title}
              </h3>

              <div className="prose text-sm text-forest/70 leading-relaxed whitespace-pre-line font-serif border-t border-b border-forest/10 py-4">
                {currentPreviewChapter.fullContent}
              </div>

              {/* Navigation between preview chapters */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={previewChapterIndex === 0}
                  onClick={() => setPreviewChapterIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
                  className="px-4 py-2 border border-forest/10 rounded-full text-xs font-label uppercase disabled:opacity-40 cursor-pointer text-forest"
                >
                  Previous
                </button>

                <span className="text-xs text-forest/50">
                  {previewChapterIndex! + 1} of {FEATURED_BOOK.previewChapters.length}
                </span>

                <button
                  disabled={previewChapterIndex === FEATURED_BOOK.previewChapters.length - 1}
                  onClick={() => setPreviewChapterIndex((prev) => (prev !== null && prev < FEATURED_BOOK.previewChapters.length - 1 ? prev + 1 : prev))}
                  className="px-4 py-2 bg-forest text-white rounded-full text-xs font-label uppercase disabled:opacity-40 cursor-pointer"
                >
                  Next Chapter
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
