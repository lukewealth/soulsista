import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  User,
  ArrowRight,
  Calendar,
  Tag,
  X,
  Video,
  Search,
  Loader2,
  Sparkles,
  Share2,
  Check,
} from 'lucide-react';
import { blogStore, BlogPost } from '../shared/services/blogStore';
import { useSEO, SITE } from '../shared/hooks/useSEO';
import {
  buildArticleJsonLd,
  buildBlogListJsonLd,
  buildBreadcrumbJsonLd,
  buildCanonical,
  buildFaqJsonLdFromContent,
  buildMetaDescription,
  buildMetaTitle,
  sanitizeContentForHtml,
  buildArticleUrl,
} from '../shared/services/blogSeo';

const CATEGORIES: ('all' | 'Therapy' | 'Wellness' | 'Youth' | 'Books')[] = [
  'all',
  'Therapy',
  'Wellness',
  'Youth',
  'Books',
];

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

interface BlogPageProps {
  onOpenBooking: () => void;
}

const buildSeoForListing = (count: number) => ({
  title: `Journal - Therapy, Wellness & Somatic Healing Insights | ${SITE.name}`,
  description: `Read ${count}+ evidence-based articles on therapy, somatic healing, trauma recovery, burnout, women's wellness, and the work of ${SITE.name}. Updated daily by Merit Nene Chuks and our practitioner team.`,
  canonical: `${SITE.url}/blog`,
  type: 'website' as const,
  image: '/images/brand/brand-02.jpg',
  imageAlt: 'Soulsysta Collective Journal - therapy, wellness and somatic healing articles',
  keywords: [
    'therapy blog',
    'somatic healing articles',
    'wellness journal',
    'trauma recovery insights',
    'women empowerment blog',
    'burnout recovery',
    'luxury therapy insights',
    'Merit Nene Chuks',
  ],
});

const buildSeoForArticle = (post: BlogPost) => {
  const faqLd = buildFaqJsonLdFromContent(post.content || '');
  const jsonLd: Record<string, any>[] = [
    buildArticleJsonLd(post),
    buildBreadcrumbJsonLd([
      { name: 'Home', url: SITE.url },
      { name: 'Journal', url: `${SITE.url}/blog` },
      { name: post.title, url: buildCanonical(post) },
    ]),
  ];
  if (faqLd) jsonLd.push(faqLd);

  return {
    title: buildMetaTitle(post),
    description: buildMetaDescription(post),
    canonical: buildCanonical(post),
    type: 'article' as const,
    image: ((post as any).ogImage as string | undefined) || post.coverImage || SITE.logo,
    imageAlt:
      ((post as any).altText as string | undefined) || `${post.title} - cover image`,
    author: post.authorName,
    publishedTime: post.publishedDate,
    modifiedTime: (post as any).modifiedTime || post.publishedDate,
    section: post.category,
    tags: post.tags,
    keywords: (post as any).focusKeyword
      ? [
          (post as any).focusKeyword,
          post.category.toLowerCase(),
          'somatic healing',
          'therapy blog',
          'wellness',
          ...post.tags,
        ]
      : undefined,
    jsonLd,
  };
};

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenBooking }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => blogStore.getPublished());
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'Therapy' | 'Wellness' | 'Youth' | 'Books'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    const unsubscribe = blogStore.subscribe((next) => {
      setPosts(
        next
          .filter((p) => (p.status ?? 'published') === 'published')
          .sort(
            (a, b) =>
              new Date(b.publishedDate).getTime() -
              new Date(a.publishedDate).getTime()
          )
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'all' || post.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.subtitle.toLowerCase().includes(q) ||
        post.authorName.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(
    () => posts.find((p) => p.featured) ?? posts[0] ?? null,
    [posts]
  );

  // When a post is open, push history state so the URL is indexable / shareable
  useEffect(() => {
    if (selectedPost) {
      const url = buildArticleUrl(selectedPost);
      window.history.pushState({ postId: selectedPost.id }, '', url);
    } else if (window.location.pathname.startsWith('/blog/')) {
      window.history.pushState({}, '', `${SITE.url}/blog`);
    }
  }, [selectedPost]);

  // Apply SEO (both listing and article)
  useSEO(
    selectedPost
      ? buildSeoForArticle(selectedPost)
      : buildSeoForListing(posts.length)
  );

  // Inject Blog + ItemList structured data once for the listing
  useEffect(() => {
    if (selectedPost) return;
    const id = 'blog-list-structured-data';
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.text = JSON.stringify(buildBlogListJsonLd(posts));
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [posts, selectedPost]);

  const handleShare = async (post: BlogPost) => {
    const url = buildArticleUrl(post);
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.subtitle,
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      // user cancelled
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="relative pt-24 pb-16 px-6 bg-gradient-to-b from-forest to-forest/90 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gold text-sm font-semibold uppercase tracking-widest"
          >
            Journal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-serif text-5xl sm:text-6xl font-bold mt-4"
          >
            Insights &amp; Wisdom
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/85 mt-6 max-w-2xl mx-auto text-lg"
          >
            Daily articles on therapy, wellness, personal growth, books, and
            the work of our community. Written for high-performing women and
            the practitioners who serve them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 max-w-2xl mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-forest/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, authors, tags..."
              className="w-full pl-12 pr-4 py-4 rounded-full bg-white text-forest placeholder-forest/50 focus:outline-none focus:ring-2 focus:ring-gold/60 shadow-xl"
              aria-label="Search articles"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      {featuredPost && searchQuery === '' && selectedCategory === 'all' && (
        <section className="px-6 -mt-12 relative z-10" aria-label="Featured article">
          <div className="max-w-6xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <button
                onClick={() => setSelectedPost(featuredPost)}
                className="block w-full bg-white rounded-3xl overflow-hidden shadow-2xl group text-left"
                aria-label={`Read featured article: ${featuredPost.title}`}
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-full overflow-hidden">
                    <img
                      src={featuredPost.coverImage}
                      alt={
                        ((featuredPost as any).altText as string | undefined) ||
                        featuredPost.title
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="eager"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 bg-gold text-forest text-xs font-bold px-3 py-1.5 rounded-full">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="bg-forest/10 text-forest text-xs font-semibold px-3 py-1 rounded-full self-start">
                      {featuredPost.category}
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest mt-4 leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-forest/75 mt-4 leading-relaxed line-clamp-3">
                      {featuredPost.subtitle}
                    </p>
                    <div className="flex items-center gap-4 mt-6 text-xs text-forest/65">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {featuredPost.authorName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <time dateTime={featuredPost.publishedDate}>
                          {formatDate(featuredPost.publishedDate)}
                        </time>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {featuredPost.readTimeMinutes} min read
                      </span>
                    </div>
                    <span className="mt-6 text-gold font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read Full Article
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </button>
            </motion.article>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section
        className="px-6 pt-16 pb-8"
        aria-label="Filter articles by category"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className="flex flex-wrap justify-center gap-2 mb-4"
            role="tablist"
            aria-label="Article categories"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                role="tab"
                aria-selected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-gold/60 ${
                  selectedCategory === category
                    ? 'bg-forest text-ivory shadow-lg scale-105'
                    : 'bg-white text-forest/80 hover:bg-forest/10 shadow'
                }`}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
          <p className="text-center text-forest/70 text-sm font-medium" aria-live="polite">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            {selectedCategory !== 'all' ? ` in ${selectedCategory}` : ''}
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="px-6 pb-24" aria-label="All articles">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <Loader2 className="w-10 h-10 mx-auto mb-4 text-forest/40" />
              <h3 className="font-serif text-2xl font-bold text-forest mb-2">
                No articles found
              </h3>
              <p className="text-forest/70">
                {searchQuery
                  ? `Nothing matches "${searchQuery}". Try a different search.`
                  : 'Check back soon for new posts in this category.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts
                .filter(
                  (p) =>
                    p.id !== featuredPost?.id ||
                    searchQuery ||
                    selectedCategory !== 'all'
                )
                .map((post) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col border border-forest/5"
                  >
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="text-left flex flex-col flex-1"
                      aria-label={`Read: ${post.title}`}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={
                            ((post as any).altText as string | undefined) ||
                            post.title
                          }
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {post.video && (
                          <div
                            className="absolute inset-0 flex items-center justify-center bg-black/40"
                            aria-label="Includes video"
                          >
                            <Video className="w-10 h-10 text-gold" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="bg-gold text-forest text-xs font-bold px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-xs text-forest/65 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <time dateTime={post.publishedDate}>
                              {formatDate(post.publishedDate)}
                            </time>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTimeMinutes} min
                          </span>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-forest mb-3 line-clamp-2 group-hover:text-gold transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-forest/75 text-sm mb-4 line-clamp-3 flex-1">
                          {post.subtitle}
                        </p>
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs text-forest/70 bg-forest/5 px-2 py-1 rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-4 border-t border-forest/10">
                          <div className="flex items-center gap-2 min-w-0">
                            <User className="w-4 h-4 text-forest/60 flex-shrink-0" />
                            <span className="text-xs text-forest/75 font-medium truncate">
                              {post.authorName}
                            </span>
                          </div>
                          <span className="text-gold text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all flex-shrink-0">
                            Read
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </button>
                  </motion.article>
                ))}
            </div>
          )}

          {/* CTA */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-20">
              <div className="bg-forest text-white rounded-3xl p-12 max-w-3xl mx-auto">
                <Sparkles className="w-10 h-10 text-gold mx-auto mb-4" />
                <h3 className="font-serif text-3xl font-bold mb-3">
                  Your transformation is waiting.
                </h3>
                <p className="text-white/85 mb-6">
                  Book a session and put these insights into practice with our
                  team of practitioners.
                </p>
                <button
                  onClick={onOpenBooking}
                  className="px-8 py-4 bg-gold text-forest font-semibold rounded-full hover:bg-gold/90 transition-all shadow-xl inline-flex items-center gap-2"
                >
                  Book a Session
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-forest/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedPost(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedPost.title}
          >
            <motion.article
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-ivory rounded-2xl max-w-4xl w-full my-8 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              <div className="relative h-64 sm:h-80 bg-forest/20">
                {selectedPost.video ? (
                  <video
                    src={selectedPost.video}
                    autoPlay
                    loop
                    muted
                    controls
                    className="w-full h-full object-cover"
                    aria-label={`${selectedPost.title} video`}
                  />
                ) : (
                  <img
                    src={selectedPost.coverImage}
                    alt={
                      ((selectedPost as any).altText as string | undefined) ||
                      selectedPost.title
                    }
                    className="w-full h-full object-cover"
                    itemProp="image"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/40 to-transparent" />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all"
                  aria-label="Close article"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-gold text-forest text-xs font-bold px-3 py-1 rounded-full">
                    <span itemProp="articleSection">{selectedPost.category}</span>
                  </span>
                  <h1
                    className="font-serif text-2xl sm:text-3xl font-bold mt-4 leading-tight"
                    itemProp="headline"
                  >
                    {selectedPost.title}
                  </h1>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-4 text-sm text-forest/70 mb-6 pb-6 border-b border-forest/10">
                  <div
                    className="flex items-center gap-2"
                    itemProp="author"
                    itemScope
                    itemType="https://schema.org/Person"
                  >
                    <User className="w-4 h-4" />
                    <div>
                      <span
                        className="font-semibold text-forest block"
                        itemProp="name"
                      >
                        {selectedPost.authorName}
                      </span>
                      {selectedPost.authorRole && (
                        <span
                          className="text-xs text-forest/60"
                          itemProp="jobTitle"
                        >
                          {selectedPost.authorRole}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time
                      dateTime={selectedPost.publishedDate}
                      itemProp="datePublished"
                    >
                      {formatDate(selectedPost.publishedDate)}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span itemProp="timeRequired">
                      {selectedPost.readTimeMinutes} min read
                    </span>
                  </div>
                </div>

                <p
                  className="text-xl text-forest/85 italic leading-relaxed mb-6 font-serif"
                  itemProp="description"
                >
                  {selectedPost.subtitle}
                </p>

                {selectedPost.content ? (
                  <div
                    className="prose prose-lg max-w-none mb-8 text-forest/85 leading-relaxed"
                    itemProp="articleBody"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeContentForHtml(selectedPost.content),
                    }}
                  />
                ) : (
                  <p className="text-forest/65 italic mb-8">
                    Full article content coming soon.
                  </p>
                )}

                {selectedPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6 pt-6 border-t border-forest/10">
                    {selectedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-sm text-forest/80 bg-forest/5 px-3 py-1.5 rounded-full"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-6 border-t border-forest/10 flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <button
                    onClick={() => handleShare(selectedPost)}
                    className="px-5 py-3 bg-forest/5 text-forest font-medium rounded-full hover:bg-forest/10 transition-all inline-flex items-center gap-2"
                  >
                    {shareCopied ? (
                      <>
                        <Check className="w-4 h-4 text-green-700" />
                        Link copied
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        Share article
                      </>
                    )}
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="px-6 py-3 bg-forest/5 text-forest font-medium rounded-full hover:bg-forest/10 transition-all"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPost(null);
                        onOpenBooking();
                      }}
                      className="px-8 py-3 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-lg inline-flex items-center gap-2"
                    >
                      Book a Session
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
