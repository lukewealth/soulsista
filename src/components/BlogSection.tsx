import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, User, ArrowRight, Calendar, Tag } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export const BlogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Neuroscience of Somatic Healing: How Body-Based Therapy Rewires Trauma',
      excerpt: 'Discover how somatic therapy engages the nervous system to release stored trauma and promote deep healing at the cellular level.',
      category: 'Therapy',
      author: 'Dr. Julian Vance',
      date: '2024-01-15',
      readTime: '8 min read',
      image: '/images/services/therapy-session.png',
      tags: ['Neuroscience', 'Somatic', 'Trauma'],
    },
    {
      id: '2',
      title: 'Breaking Generational Patterns: A Guide for Modern Women',
      excerpt: 'Learn practical strategies to identify and transform inherited behavioral patterns that no longer serve your highest good.',
      category: 'Wellness',
      author: 'Merit Nene Chuks',
      date: '2024-01-10',
      readTime: '6 min read',
      image: '/images/founder/merit-portrait.png',
      tags: ['Women', 'Healing', 'Growth'],
    },
    {
      id: '3',
      title: 'Youth Circle Success Stories: Empowering the Next Generation',
      excerpt: 'Real stories from young women who found their voice, built confidence, and discovered their purpose through our mentorship program.',
      category: 'Youth',
      author: 'Elena Rodriguez',
      date: '2024-01-05',
      readTime: '5 min read',
      image: '/images/brand/brand-04.jpg',
      tags: ['Youth', 'Mentorship', 'Empowerment'],
    },
    {
      id: '4',
      title: 'The Art of Stillness: Finding Peace in a Chaotic World',
      excerpt: 'Explore ancient wisdom and modern practices for cultivating inner stillness amidst life\'s constant demands and distractions.',
      category: 'Wellness',
      author: 'Merit Nene Chuks',
      date: '2023-12-28',
      readTime: '7 min read',
      image: '/images/brand/brand-03.jpg',
      tags: ['Mindfulness', 'Peace', 'Meditation'],
    },
    {
      id: '5',
      title: 'From "She Too Can" to Real Change: Book Impact Report',
      excerpt: 'A comprehensive look at how "She Too Can" has transformed lives across communities and the movement it has sparked.',
      category: 'Books',
      author: 'Merit Nene Chuks',
      date: '2023-12-20',
      readTime: '10 min read',
      image: '/images/brand/brand-05.jpg',
      tags: ['Books', 'Impact', 'Community'],
    },
    {
      id: '6',
      title: 'Understanding Burnout: Recognition, Prevention, and Recovery',
      excerpt: 'A deep dive into the science of burnout, early warning signs, and evidence-based strategies for prevention and recovery.',
      category: 'Therapy',
      author: 'Dr. Julian Vance',
      date: '2023-12-15',
      readTime: '9 min read',
      image: '/images/brand/brand-02.jpg',
      tags: ['Burnout', 'Mental Health', 'Recovery'],
    },
  ];

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

  return (
    <section className="py-20 bg-surface-container">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gold text-forest text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-forest/60 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-forest mb-3 group-hover:text-gold transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-forest/70 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
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
                      {post.author}
                    </span>
                  </div>
                  <span className="text-gold text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-lg inline-flex items-center gap-2">
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
