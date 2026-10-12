import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX, Play, Pause, SkipBack, SkipForward, Heart, Share2, Clock, Calendar, User, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { blogStore, BlogPost } from '../../../shared/services/blogStore';
import { useLanguage } from '../../../shared/i18n/LanguageContext';
import { useTheme } from '../../../shared/theme';

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

interface BlogPostPageProps {
  onOpenBooking: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ onOpenBooking }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { resolved } = useTheme();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Get table of contents from post content
  const getTableOfContents = (content: string): { id: string; title: string; level: number }[] => {
    const lines = content.split('\n');
    const toc: { id: string; title: string; level: number }[] = [];
    
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ')) {
        toc.push({ id: `h1-${toc.length}`, title: trimmed.substring(2), level: 1 });
      } else if (trimmed.startsWith('## ')) {
        toc.push({ id: `h2-${toc.length}`, title: trimmed.substring(3), level: 2 });
      } else if (trimmed.startsWith('### ')) {
        toc.push({ id: `h3-${toc.length}`, title: trimmed.substring(4), level: 3 });
      }
    });
    
    return toc;
  };

  const toc = post ? getTableOfContents(post.content || '') : [];

  // Fetch post by slug
  const fetchPost = useCallback(() => {
    if (!slug) return;
    
    const allPosts = blogStore.getPublished();
    const foundPost = allPosts.find(p => {
      // Use the slug from the post if available, otherwise generate it
      const postSlug = (post as any).slug as string | undefined || p.slug || p.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      return postSlug === slug;
    });
    
    setPost(foundPost || null);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    fetchPost();
    
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      speechRef.current = new SpeechSynthesisUtterance();
      speechRef.current.onboundary = (event) => {
        if (event.name === 'word') {
          // Highlight the current word in the content
          const words = event.text.split(' ');
          const wordIndex = event.charIndex / event.text.length * words.length;
          const wordNumber = Math.floor(wordIndex);
          
          if (contentRef.current && wordNumber >= 0 && wordNumber < words.length) {
            const content = contentRef.current;
            const allWords = content.textContent?.split(' ') || [];
            if (wordNumber < allWords.length) {
              // Remove previous highlights
              content.querySelectorAll('.word-highlight').forEach(el => el.classList.remove('word-highlight'));
              
              // Highlight current word
              const startPos = content.textContent?.substring(0, content.textContent.indexOf(allWords[wordNumber])).length || 0;
              const wordSpan = document.createRange();
              wordSpan.setStart(content, startPos);
              wordSpan.setEnd(content, startPos + allWords[wordNumber].length);
              
              const highlightSpan = document.createElement('span');
              highlightSpan.className = 'word-highlight bg-gold/30 rounded px-0.5 py-0.5';
              wordSpan.surroundContents(highlightSpan);
            }
          }
        }
      };
      
      speechRef.current.onend = () => {
        setIsPlaying(false);
        // Remove highlights after speaking
        contentRef.current?.querySelectorAll('.word-highlight').forEach(el => el.classList.remove('word-highlight'));
      };
    }

    return () => {
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }
    };
  }, [fetchPost]);

  // Speech controls
  const toggleSpeech = () => {
    if (!post?.content) return;
    
    if (isPlaying) {
      speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (speechRef.current) {
        speechRef.current.text = post.content;
        speechSynthesis.resume();
        speechSynthesis.speak(speechRef.current);
        setIsPlaying(true);
      }
    }
  };

  const handleTheme = (event: SpeechSynthesisEvent) => {
    if (speechRef.current) {
      // Apply theme-specific styling for speech
      const resolved = (event as any).detail?.theme || resolved;
      speechRef.current.lang = resolved === 'dark' ? 'en-GB' : 'en-US';
    }
  };

  // Scroll to table of contents item
  const scrollToToc = (item: any) => {
    if (contentRef.current) {
      const element = contentRef.current.querySelector(`#${item.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Share post
  const sharePost = async () => {
    if (!post) return;
    
    const url = `${window.location.origin}/blog/${slug}`;
    const title = post.title;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: post.subtitle,
          url,
        });
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url);
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  // Toggle favorite
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, you would save this to backend
  };

  // Change font size
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-forest/70">Loading article...</p>
        </motion.div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <h1 className="font-serif text-3xl font-bold text-forest mb-4">Article Not Found</h1>
          <p className="text-forest/70 mb-8">The blog post you're looking for doesn't exist or may have been moved.</p>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-forest text-ivory rounded-full hover:bg-forest/90 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Journal
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-forest/10" style={{ backgroundColor: 'color-mix(in srgb, var(--color-ivory) 95%, transparent)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 text-forest/80 hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Journal</span>
            </button>
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-red-500' : 'text-forest/60 hover:text-red-500'}`}
              >
                <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
              
              <button
                onClick={sharePost}
                className="p-2 text-forest/60 hover:text-gold transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-6 bg-gradient-to-b from-forest to-forest/95 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gold text-forest text-xs font-bold px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-white/70 text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedDate)}
              </span>
              <span className="text-white/70 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTimeMinutes} min read
              </span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-8">
              {post.subtitle}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="block font-semibold text-white">{post.authorName}</span>
                  <span className="text-xs text-white/60">{post.authorRole}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Audio Player Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="sticky bottom-0 z-30 bg-ivory border-t border-forest/10 shadow-lg backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={toggleSpeech}
                className={`p-3 rounded-full transition-all transform hover:scale-105 ${isPlaying
                  ? 'bg-gold text-forest shadow-lg'
                  : 'bg-forest text-white hover:bg-forest/90'
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="text-xs text-forest/60 mb-1">Text to Speech</div>
                <div className="text-sm font-medium text-forest truncate">
                  {isPlaying ? 'Reading...' : 'Ready to read'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <span className="text-xs text-forest/60">Font:</span>
              <button
                onClick={decreaseFontSize}
                className="w-8 h-8 rounded bg-forest/10 hover:bg-forest/20 text-forest transition-colors"
              >
                A-
              </button>
              <span className="w-12 text-center text-sm font-medium text-forest/70">
                {fontSize}px
              </span>
              <button
                onClick={increaseFontSize}
                className="w-8 h-8 rounded bg-forest/10 hover:bg-forest/20 text-forest transition-colors"
              >
                A+
              </button>
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <button className="p-2 text-forest/60 hover:text-gold transition-all hover-lift-enhanced">
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowToc(!showToc)}
                className="p-2 text-forest/60 hover:text-gold transition-all hover-lift-enhanced flex items-center gap-1"
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-xs hidden sm:inline">TOC</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="relative px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Table of Contents - Desktop */}
            <aside className="hidden lg:block lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="sticky top-32"
              >
                <h3 className="font-serif text-lg font-bold text-forest mb-4">Table of Contents</h3>
                <nav className="space-y-2">
                  {toc.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToToc(item)}
                      className={`block text-left w-full text-sm transition-all hover-lift-enhanced ${item.level === 1
                        ? 'text-forest font-semibold hover:text-gold pl-0'
                        : item.level === 2
                          ? 'text-forest/70 hover-text-gold pl-4'
                          : 'text-forest/60 hover-text-gold pl-6 text-xs'
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>
              </motion.div>
            </aside>

            {/* Article Content */}
            <article className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div
                  ref={contentRef}
                  className="prose prose-lg max-w-none mb-12"
                  style={{ fontSize: `${fontSize}px` }}
                  dangerouslySetInnerHTML={{ __html: sanitizeContentForHtml(post.content || '') }}
                />
              </motion.div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-forest/10"
                >
                   {post.tags.map((tag) => (
                     <span
                       key={tag}
                       className="inline-flex items-center gap-1 text-sm text-forest/80 bg-forest/5 px-3 py-1.5 rounded-full hover:bg-forest/10 hover:text-gold transition-all hover-lift-enhanced cursor-pointer"
                     >
                       #{tag}
                     </span>
                   ))}
                </motion.div>
              )}

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-forest/5 rounded-2xl p-8 lg:p-12 text-center"
              >
                <h3 className="font-serif text-2xl font-bold text-forest mb-4">
                  Ready to transform your life?
                </h3>
                <p className="text-forest/70 mb-8 max-w-2xl mx-auto">
                  Put these insights into practice with our team of expert practitioners. Your journey to wellness starts here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => onOpenBooking()}
                    className="px-8 py-4 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-lg inline-flex items-center gap-2 hover:scale-105 hover-lift-enhanced"
                  >
                    <Calendar className="w-5 h-5" />
                    Book a Session
                  </button>
                  <button
                    onClick={() => sharePost()}
                    className="px-8 py-4 bg-white border border-forest/20 text-forest font-semibold rounded-full hover:bg-forest/5 transition-all inline-flex items-center gap-2 hover-lift-enhanced"
                  >
                    <Share2 className="w-5 h-5" />
                    Share Article
                  </button>
                </div>
              </motion.div>
            </article>
          </div>

          {/* Table of Contents - Mobile */}
          <AnimatePresence>
            {showToc && (
              <motion.aside
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden mt-8 bg-white rounded-2xl p-6 shadow-lg overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg font-bold text-forest">Table of Contents</h3>
                  <button
                    onClick={() => setShowToc(false)}
                    className="p-2 text-forest/60 hover:text-forest"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-2 max-h-64 overflow-y-auto">
                  {toc.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        scrollToToc(item);
                        setShowToc(false);
                      }}
                      className={`block text-left w-full text-sm transition-all hover-lift-enhanced ${item.level === 1
                        ? 'text-forest font-semibold hover:text-gold pl-0'
                        : item.level === 2
                          ? 'text-forest/70 hover-text-gold pl-4'
                          : 'text-forest/60 hover-text-gold pl-6 text-xs'
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
