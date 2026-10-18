import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, User, ArrowRight, Calendar, Tag, X, BookOpen, 
  Image, Video, Palette, 
  Search, 
  Filter, 
  Loader2, 
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  authorName: string;
  authorRole: string;
  publishedDate: string;
  readTimeMinutes: number;
  coverImage: string;
  content: string;
  tags: string[];
  featured?: boolean;
  video?: string;
}

interface BlogSectionProps {
  initialCategory?: 'all' | 'Therapy' | 'Wellness' | 'Youth' | 'Books';
}

export const BlogSection: React.FC<BlogSectionProps> = ({ initialCategory = 'all' }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Therapy' | 'Wellness' | 'Youth' | 'Books'>(initialCategory);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Use mocked data - in production this would fetch from CMS
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    // Initialize with all posts sorted by date (most recent first)
    const allPosts = [
      {
        id: '1',
        title: 'The Neuroscience of Somatic Healing: How Body-Based Therapy Rewires Trauma',
        subtitle: 'Discover how somatic therapy engages the nervous system to release stored trauma and promote deep healing at the cellular level.',
        category: 'Therapy',
        authorName: 'Dr. Julian Vance',
        authorRole: 'Senior Clinical Psychologist',
        authorAvatar: '/images/founder/merit-portrait.png',
        publishedDate: '2024-01-15',
        readTimeMinutes: 8,
        coverImage: '/images/services/therapy-session.png',
        content: 'Full article content here...',
        tags: ['Neuroscience', 'Somatic Therapy', 'Trauma Recovery', 'PTSD Treatment', 'Nervous System Regulation', 'Body-Based Therapy', 'Healing'],
        featured: false,
      },
      {
        id: '2',
        title: 'Breaking Generational Patterns: A Guide for Modern Women',
        subtitle: 'Learn practical strategies to identify and transform inherited behavioral patterns that no longer serve your highest good.',
        category: 'Wellness',
        authorName: 'Merit Nene Chuks',
        authorRole: 'Founder & Lead Psychotherapist',
        authorAvatar: '/images/founder/merit-portrait.png',
        publishedDate: '2024-01-10',
        readTimeMinutes: 6,
        coverImage: '/images/founder/merit-portrait.png',
        content: 'Full article content here...',
        tags: ['Women Empowerment', 'Generational Healing', 'Inner Child Work', 'Family Patterns', 'Self-Discovery', 'Personal Growth', 'Therapy'],
        featured: false,
      },
      {
        id: '3',
        title: 'Youth Circle Success Stories: Empowering the Next Generation',
        subtitle: 'Real stories from young women who found their voice, built confidence, and discovered their purpose through our mentorship program.',
        category: 'Youth',
        authorName: 'Elena Rodriguez',
        authorRole: 'Program Director',
        authorAvatar: '/images/brand/brand-04.jpg',
        publishedDate: '2024-01-05',
        readTimeMinutes: 5,
        coverImage: '/images/brand/brand-04.jpg',
        content: 'Full article content here...',
        tags: ['Youth Mentorship', 'Teen Empowerment', 'Leadership Development', 'Community Building', 'Young Women', 'Mental Health', 'Purpose'],
        featured: false,
      },
      {
        id: '4',
        title: 'The Art of Stillness: Finding Peace in a Chaotic World',
        subtitle: 'Explore ancient wisdom and modern practices for cultivating inner stillness amidst life\'s constant demands and distractions.',
        category: 'Wellness',
        authorName: 'Merit Nene Chuks',
        authorRole: 'Founder & Lead Psychotherapist',
        authorAvatar: '/images/founder/merit-portrait.png',
        publishedDate: '2023-12-28',
        readTimeMinutes: 7,
        coverImage: '/images/brand/brand-03.jpg',
        content: 'Full article content here...',
        tags: ['Mindfulness', 'Meditation', 'Stress Relief', 'Inner Peace', 'Self-Care', 'Mental Wellness', 'Spiritual Practice'],
        featured: false,
      },
      {
        id: '5',
        title: 'From "She Too Can" to Real Change: Book Impact Report',
        subtitle: 'A comprehensive look at how "She Too Can" has transformed lives across communities and the movement it has sparked.',
        category: 'Books',
        authorName: 'Merit Nene Chuks',
        authorRole: 'Founder & Lead Psychotherapist',
        authorAvatar: '/images/founder/merit-portrait.png',
        publishedDate: '2023-12-20',
        readTimeMinutes: 10,
        coverImage: '/images/brand/brand-05.jpg',
        content: 'Full article content here...',
        tags: ['Women Empowerment', 'Self-Help Books', 'Transformation', 'Community Impact', 'Personal Development', 'Leadership', 'Inspiration'],
        featured: false,
      },
      {
        id: '6',
        title: 'Understanding Burnout: Recognition, Prevention, and Recovery',
        subtitle: 'A deep dive into the science of burnout, early warning signs, and evidence-based strategies for prevention and recovery.',
        category: 'Therapy',
        authorName: 'Dr. Julian Vance',
        authorRole: 'Senior Clinical Psychologist',
        authorAvatar: '/images/founder/merit-portrait.png',
        publishedDate: '2023-12-15',
        readTimeMinutes: 9,
        coverImage: '/images/brand/brand-02.jpg',
        content: 'Full article content here...',
        tags: ['Burnout Recovery', 'Executive Burnout', 'Stress Management', 'Mental Health', 'Work-Life Balance', 'Self-Care', 'Therapy'],
        featured: false,
      },
    ];

    // Sort by date most recent first
    const sortedPosts = allPosts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    setBlogPosts(sortedPosts);
    setTotalPosts(sortedPosts.length);
    setHasMore(sortedPosts.length > 0);
  }, []);

  const categories = ['all', 'Therapy', 'Wellness', 'Youth', 'Books'];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Skeleton component for loading
  const SkeletonPost = ({ index }: { index: number }) => {
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md/20 hover:transform transition-all duration-300 group cursor-pointer"
      >
        <div className="relative h-48 md:h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-forest/10 via-transparent to-forest/10" />
          <div className="absolute top-4 left-4">
            <span className="bg-gold text-forest text-xs font-bold px-3 py-1 rounded-full">
              {categories[index % categories.length]}
            </span>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-3 text-xs text-forest/60 mb-3 line-clamp-1">
            <span>
              <Calendar className="w-3 h-3" /> {formatDate('2024-01-01')}
            </span>
            <span>
              <Clock className="w-3 h-3" /> {Math.floor(Math.random() * 10) + 5} min read
            </span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-forest mt-3 mb-3 line-clamp-2">
            Post {index + 1}
          </h3>
          <p className="text-forest/70 text-sm mb-4 line-clamp-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {['Tag1', 'Tag2', 'Tag3'].map((tag, i) => (
              <span key={i} className="text-xs text-forest/60 bg-forest/5 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-forest/10">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-forest/60" />
              <span className="text-xs text-forest/70 font-medium">Author Name</span>
            </div>
            <span className="text-gold text-sm font-semibold flex items-center gap-1">
              Read Full Article
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

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
            Journal
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mt-4">
            Insights & Wisdom
          </h2>
          <p className="text-forest/70 mt-6 max-w-2xl mx-auto">
            Explore our collection of articles on therapy, wellness, personal growth, and community impact
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as any)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-gold/50 ${
                selectedCategory === category
                  ? 'bg-forest text-ivory'
                  : 'bg-white text-forest/70 hover:bg-forest/10'
              }`}
            >
              {category === 'all' ? 'All Posts' : category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hasMore && !isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {blogPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md/20 hover:transform transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  {/* Image with play button for video */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={post.coverImage}
      alt={post.title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {post.video && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <Video className="w-8 h-8 text-gold" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gold text-forest text-xs font-bold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-forest/60 mb-3 line-clamp-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.publishedDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTimeMinutes} min read
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-forest mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-forest/70 text-sm mb-4 line-clamp-3">
                      {post.subtitle}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-forest/60 bg-forest/5 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Author & Read More */}
                    <div className="flex items-center justify-between pt-4 border-t border-forest/10">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-forest/60" />
                        <span className="text-xs text-forest/70 font-medium">
                          {post.authorName}
                        </span>
                      </div>
                      <span className="text-gold text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read Full Article
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : selectedCategory !== 'all' && hasMore && !isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md/20 hover:transform transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={post.coverImage}
      alt={post.title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {post.video && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <Video className="w-8 h-8 text-gold" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gold text-forest text-xs font-bold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-3 text-xs text-forest/60 mb-3 line-clamp-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.publishedDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTimeMinutes} min read
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-forest mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-forest/70 text-sm mb-4 line-clamp-3">
                      {post.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-forest/60 bg-forest/5 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-forest/10">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-forest/60" />
                        <span className="text-xs text-forest/70 font-medium">
                          {post.authorName}
                        </span>
                      </div>
                      <span className="text-gold text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read Full Article
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            // Loading skeletons or empty state
            filteredPosts.length === 0 ? (
              <div className="text-center py-12 text-forest/60">
                <Loader2 className="w-8 h-8 mx-auto mb-4" />
                <p>No posts found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(6).fill(0).map((_, idx) => (
                  <SkeletonPost index={idx} key={idx} />
                ))}
              </div>
            )
          )}
        </div>

        {/* Load More / No Posts */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-forest/60">
            <Loader2 className="w-8 h-8 mx-auto mb-4" />
            <p>No posts found in this category.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-8 py-3 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-lg inline-flex items-center gap-2"
            >
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Blog Post Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-forest/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-ivory rounded-2xl max-w-4xl w-full my-8 overflow-hidden shadow-2xl border transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="relative h-64 sm:h-80 bg-forest/20">
                  {selectedPost.video ? (
                    <video
                      src={selectedPost.video}
                      autoPlay
                      loop
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
<img
                        src={selectedPost.coverImage}
                        alt={selectedPost.title}
                        className="w-full h-full object-cover"
                      />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/40 to-transparent" />
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="bg-gold text-forest text-xs font-bold px-3 py-1 rounded-full">
                      {selectedPost.category}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-4 leading-tight">
                      {selectedPost.title}
                    </h2>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-8">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-forest/60 mb-6 pb-6 border-b border-forest/10">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{selectedPost.authorName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(selectedPost.publishedDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{selectedPost.readTimeMinutes}</span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="prose prose-lg max-w-none my-8">
                    <div className="whitespace-pre-line text-forest/80 leading-relaxed">
                      {selectedPost.content}
                    </div>
                  </div>

                  {/* Video Section - if post has video */}
                  {selectedPost.video && (
                    <div className="mb-8">
                      <video
                        src={selectedPost.video}
                        autoPlay
                        loop
                        muted
                        className="w-full rounded-lg overflow-hidden"
                        style={{ aspectRatio: '16/9' }}
                      />
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-forest/10">
                    {selectedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm text-forest/70 bg-forest/5 px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-8 pt-6 border-t border-forest/10 text-center">
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="px-8 py-3 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-lg inline-flex items-center gap-2"
                    >
                      Close Article
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};