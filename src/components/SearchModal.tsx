import React, { useState, useEffect } from 'react';
import { SERVICES, PRACTITIONERS, FEATURED_BOOK, ARTICLES } from '../data/mockData';
import { Service, Article } from '../types';
import { Search, X, BookOpen, Calendar, ArrowRight, User } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (service: Service) => void;
  onSelectArticle: (article: Article) => void;
  onOpenBookStore: () => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectService,
  onSelectArticle,
  onOpenBookStore,
  onOpenBooking,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredServices = query.trim()
    ? SERVICES.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
          s.category.toLowerCase().includes(query.toLowerCase())
      )
    : SERVICES.slice(0, 3);

  const filteredArticles = query.trim()
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : ARTICLES.slice(0, 2);

  const matchedBook =
    query.trim() &&
    (FEATURED_BOOK.title.toLowerCase().includes(query.toLowerCase()) ||
      FEATURED_BOOK.synopsis.toLowerCase().includes(query.toLowerCase()))
      ? FEATURED_BOOK
      : null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2D3A2F]/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div className="bg-[#FDFCFB] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#EAE2D8] overflow-hidden relative">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#EAE2D8] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#B88A85]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rituals, books, guides, or articles..."
            className="w-full text-base font-semibold text-[#1A1A1A] placeholder-[#888888] bg-transparent focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-2 text-[#555555] hover:text-[#1A1A1A] rounded-full hover:bg-[#FAF7F2] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          
          {/* Services Matches */}
          <div>
            <h4 className="text-xs font-label uppercase tracking-widest text-[#888888] font-bold mb-3">
              Rituals & Services ({filteredServices.length})
            </h4>
            <div className="space-y-2">
              {filteredServices.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    onClose();
                    onSelectService(s);
                  }}
                  className="p-3 bg-white rounded-2xl border border-[#EAE2D8] hover:border-[#2D3A2F] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <img src={s.imageUrl} alt={s.title} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <span className="font-bold text-xs text-[#2D3A2F] group-hover:text-[#B88A85] block">{s.title}</span>
                      <span className="text-[10px] text-[#888888] uppercase font-label">{s.category} • ${s.priceUSD}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#B88A85]" />
                </div>
              ))}
            </div>
          </div>

          {/* Book Match */}
          {matchedBook && (
            <div>
              <h4 className="text-xs font-label uppercase tracking-widest text-[#888888] font-bold mb-3">
                Publishing House
              </h4>
              <div
                onClick={() => {
                  onClose();
                  onOpenBookStore();
                }}
                className="p-3 bg-white rounded-2xl border border-[#EAE2D8] hover:border-[#2D3A2F] transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-[#B88A85]" />
                  <div>
                    <span className="font-bold text-xs text-[#2D3A2F] block">{matchedBook.title}</span>
                    <span className="text-[10px] text-[#888888]">By {matchedBook.author} — Hardcover $29.99</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B88A85]" />
              </div>
            </div>
          )}

          {/* Articles Matches */}
          <div>
            <h4 className="text-xs font-label uppercase tracking-widest text-[#888888] font-bold mb-3">
              Journal Essays ({filteredArticles.length})
            </h4>
            <div className="space-y-2">
              {filteredArticles.map((a) => (
                <div
                  key={a.id}
                  onClick={() => {
                    onClose();
                    onSelectArticle(a);
                  }}
                  className="p-3 bg-white rounded-2xl border border-[#EAE2D8] hover:border-[#2D3A2F] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <img src={a.coverImage} alt={a.title} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <span className="font-bold text-xs text-[#2D3A2F] group-hover:text-[#B88A85] block">{a.title}</span>
                      <span className="text-[10px] text-[#888888]">{a.category} • {a.readTimeMinutes} min read</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#B88A85]" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
