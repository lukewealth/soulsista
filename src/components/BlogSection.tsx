import React, { useState } from 'react';
import { ARTICLES } from '../data/mockData';
import { Article } from '../types';
import { BookOpen, Clock, ArrowRight, X, Share2, Tag, Sparkles } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeTag, setActiveTag] = useState<string>('all');

  const tags = ['all', 'Healing', 'Stillness', 'Youth Mentorship'];

  const filteredArticles = activeTag === 'all'
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeTag || a.tags.includes(activeTag));

  return (
    <section id="blog-section" className="py-20 lg:py-28 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2D3A2F]/10 text-[#2D3A2F] text-[11px] font-label font-bold tracking-[0.2em] uppercase">
            <BookOpen className="w-3.5 h-3.5 text-[#B88A85]" />
            VOICES OF THE COLLECTIVE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1A1A1A] tracking-tight">
            The Journal & Essays
          </h2>
          <p className="text-base text-[#555555] font-sans font-light">
            Reflections on neuroscience, somatic regulation, leadership, and emotional liberation.
          </p>
        </div>

        {/* Tags Bar */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`px-4 py-2 rounded-full text-xs font-label uppercase tracking-wider transition-all cursor-pointer ${
                activeTag === t
                  ? 'bg-[#2D3A2F] text-[#D4A39E] font-bold'
                  : 'bg-[#FAF7F2] border border-[#EAE2D8] text-[#555555] hover:bg-[#EAE2D8]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Article Cards Grid */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white rounded-3xl overflow-hidden border border-[#EAE2D8] hover:border-[#2D3A2F] transition-all hover:shadow-xl cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-52 overflow-hidden bg-[#2D3A2F]">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#2D3A2F]/90 text-[#D4A39E] px-3 py-1 rounded-full text-[10px] font-label font-bold uppercase tracking-widest border border-[#D4A39E]/30">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-label uppercase text-[#888888]">
                    <Clock className="w-3.5 h-3.5 text-[#B88A85]" />
                    <span>{article.readTimeMinutes} min read</span>
                    <span>•</span>
                    <span>{article.publishedDate}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1A1A1A] group-hover:text-[#B88A85] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#555555] line-clamp-2 font-light">
                    {article.subtitle}
                  </p>
                </div>
              </div>

              {/* Author Footer */}
              <div className="p-6 pt-0 border-t border-[#EAE2D8] mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={article.authorAvatar}
                    alt={article.authorName}
                    className="w-8 h-8 rounded-full object-cover border border-[#EAE2D8]"
                  />
                  <div>
                    <span className="font-bold text-xs text-[#2D3A2F] block">{article.authorName}</span>
                    <span className="text-[10px] text-[#888888] block">{article.authorRole}</span>
                  </div>
                </div>

                <div className="p-2 bg-[#FAF7F2] rounded-full text-[#2D3A2F] group-hover:bg-[#2D3A2F] group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-[#2D3A2F]/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FDFCFB] w-full max-w-3xl rounded-3xl shadow-2xl border border-[#EAE2D8] overflow-hidden relative my-8">
            
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-20 p-2.5 bg-[#2D3A2F] text-white rounded-full hover:bg-[#222D24] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Banner */}
            <div className="relative h-64 sm:h-80 w-full">
              <img
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D3A2F] via-[#2D3A2F]/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3 py-1 bg-[#D4A39E] text-[#2D3A2F] text-[10px] font-label font-bold uppercase tracking-widest rounded-full">
                  {selectedArticle.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-2">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-10 space-y-6">
              
              {/* Author Meta */}
              <div className="flex items-center justify-between pb-6 border-b border-[#EAE2D8]">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedArticle.authorAvatar}
                    alt={selectedArticle.authorName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#2D3A2F]"
                  />
                  <div>
                    <span className="font-bold text-sm text-[#2D3A2F] block">{selectedArticle.authorName}</span>
                    <span className="text-xs text-[#888888] block">{selectedArticle.authorRole}</span>
                  </div>
                </div>

                <div className="text-right text-xs text-[#888888]">
                  <div>{selectedArticle.publishedDate}</div>
                  <div className="font-bold text-[#B88A85]">{selectedArticle.readTimeMinutes} min read</div>
                </div>
              </div>

              {/* Main Text */}
              <div className="prose text-sm text-[#555555] leading-relaxed whitespace-pre-line font-sans font-light">
                {selectedArticle.content}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-[#EAE2D8] flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#B88A85]" />
                {selectedArticle.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-[#FAF7F2] rounded-full text-[11px] text-[#2D3A2F] font-medium border border-[#EAE2D8]">
                    #{tag}
                  </span>
                ))}
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
