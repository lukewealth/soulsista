import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, User, ArrowRight, Calendar, Tag, X, BookOpen } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export const BlogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Neuroscience of Somatic Healing: How Body-Based Therapy Rewires Trauma',
      excerpt: 'Discover how somatic therapy engages the nervous system to release stored trauma and promote deep healing at the cellular level.',
      content: `Somatic healing represents a paradigm shift in how we understand and treat trauma. Unlike traditional talk therapy, which primarily engages the cognitive mind, somatic approaches recognize that trauma is stored not just in our memories, but in our very cells, our nervous system, and our body's tissues.

## The Science Behind Somatic Healing

When we experience trauma, our nervous system can become stuck in a state of hyperarousal (fight or flight) or hypoarousal (freeze or shutdown). This dysregulation affects every aspect of our being—from our ability to sleep and digest food, to our capacity for emotional regulation and meaningful connection.

Somatic therapy works directly with the body's wisdom to release these stored patterns. Through gentle movement, breathwork, and mindful awareness, we can help the nervous system return to a state of balance and resilience.

## How It Works in Practice

During a somatic healing session, you might be guided to:

- Notice physical sensations without judgment
- Track the movement of energy through your body
- Complete incomplete survival responses
- Release tension held in muscles and fascia
- Reconnect with your body's natural rhythm

The beauty of this approach is that it doesn't require you to relive traumatic memories. Instead, it works with the body's innate intelligence to process and integrate experiences at a cellular level.

## The Research

Studies in neuroscience have shown that somatic approaches can:
- Reduce symptoms of PTSD by up to 70%
- Improve emotional regulation and resilience
- Enhance immune function and overall health
- Create lasting changes in brain structure and function

At Soulsysta Collective, we integrate somatic healing into our therapeutic offerings because we believe true transformation happens when we honor the wisdom of the whole being—mind, body, and spirit.`,
      category: 'Therapy',
      author: 'Dr. Julian Vance',
      date: '2024-01-15',
      readTime: '8 min read',
      image: '/images/services/therapy-session.png',
      tags: ['Neuroscience', 'Somatic Therapy', 'Trauma Recovery', 'PTSD Treatment', 'Nervous System Regulation', 'Body-Based Therapy', 'Healing'],
    },
    {
      id: '2',
      title: 'Breaking Generational Patterns: A Guide for Modern Women',
      excerpt: 'Learn practical strategies to identify and transform inherited behavioral patterns that no longer serve your highest good.',
      content: `Generational patterns are the invisible threads that weave through our families, shaping our beliefs, behaviors, and relationships in ways we often don't consciously recognize. As modern women, we have the unique opportunity to become aware of these patterns and consciously choose which ones to keep and which ones to release.

## Understanding Generational Patterns

These patterns often manifest as:
- Repeated relationship dynamics
- Similar career choices or limitations
- Consistent financial struggles or abundance blocks
- Recurring health issues
- Emotional responses that feel disproportionate to the situation

## The Process of Breaking Free

### 1. Awareness
The first step is simply noticing. Start by asking yourself:
- What patterns do I see repeating in my life?
- What did I learn about [love/money/success] from my family?
- What beliefs do I hold that might not actually be mine?

### 2. Compassionate Inquiry
Rather than judging these patterns, approach them with curiosity and compassion. Ask:
- How did this pattern serve my ancestors?
- What was the positive intention behind it?
- What would it feel like to release it?

### 3. Conscious Choice
Once you're aware of a pattern, you can make a conscious choice about it. This might look like:
- Setting new boundaries
- Practicing different responses
- Creating new rituals and traditions
- Seeking support through therapy or coaching

### 4. Integration
Breaking patterns isn't about rejection—it's about integration. Honor the wisdom in your lineage while choosing what serves your highest good now.

## Practical Tools

- **Journaling**: Write letters to your ancestors, thanking them for their wisdom and releasing what no longer serves you
- **Ritual**: Create ceremonies to mark the end of old patterns and the beginning of new ones
- **Therapy**: Work with a therapist who understands generational trauma
- **Community**: Connect with other women doing this work

Remember, you are not just healing yourself—you are healing your entire lineage. Every pattern you break creates space for new possibilities for generations to come.`,
      category: 'Wellness',
      author: 'Merit Nene Chuks',
      date: '2024-01-10',
      readTime: '6 min read',
      image: '/images/founder/merit-portrait.png',
      tags: ['Women Empowerment', 'Generational Healing', 'Inner Child Work', 'Family Patterns', 'Self-Discovery', 'Personal Growth', 'Therapy'],
    },
    {
      id: '3',
      title: 'Youth Circle Success Stories: Empowering the Next Generation',
      excerpt: 'Real stories from young women who found their voice, built confidence, and discovered their purpose through our mentorship program.',
      content: `The Youth Circle program has been transforming lives since its inception, and the stories of our participants speak volumes about the power of community, mentorship, and intentional personal development.

## Amara's Journey: From Silence to Leadership

When Amara joined Youth Circle at 16, she could barely speak above a whisper in group settings. "I always felt like my voice didn't matter," she shares. "I was invisible."

Through our program, Amara discovered her passion for environmental activism. With the support of her mentors and peers, she launched a community garden project that now feeds over 50 families in her neighborhood.

" Youth Circle didn't just teach me skills—it taught me that I have something valuable to offer the world. That changed everything."

Today, Amara is studying environmental science at university and leads workshops for other young activists.

## Priya's Story: Breaking the Cycle

Priya came to Youth Circle carrying the weight of generational trauma. "My mother and grandmother both told me to keep my head down, not to make waves," she explains. "I was living a life that wasn't mine."

Through our mentorship program, Priya learned to set boundaries, honor her own dreams, and build healthy relationships. She started a podcast about young women's mental health that now has over 10,000 listeners.

"I learned that I can honor my family while still choosing my own path. That's the greatest gift Youth Circle gave me."

## The Impact of Community

What makes Youth Circle special is the community it creates. These young women support each other, challenge each other, and grow together. They're not just learning skills—they're building a sisterhood that will last a lifetime.

## Join the Movement

If you know a young woman who could benefit from Youth Circle, or if you'd like to support our mission, visit our Initiative page to learn more about how you can get involved.

Every young woman deserves to know her worth, find her voice, and step into her power. Together, we're making that possible.`,
      category: 'Youth',
      author: 'Elena Rodriguez',
      date: '2024-01-05',
      readTime: '5 min read',
      image: '/images/brand/brand-04.jpg',
      tags: ['Youth Mentorship', 'Teen Empowerment', 'Leadership Development', 'Community Building', 'Young Women', 'Mental Health', 'Purpose'],
    },
    {
      id: '4',
      title: 'The Art of Stillness: Finding Peace in a Chaotic World',
      excerpt: 'Explore ancient wisdom and modern practices for cultivating inner stillness amidst life\'s constant demands and distractions.',
      content: `In a world that glorifies busyness and constant motion, stillness has become a radical act of self-care and spiritual practice. Yet, throughout history, wisdom traditions have recognized that true clarity, creativity, and connection emerge from moments of profound stillness.

## What Stillness Really Means

Stillness is not about stopping or achieving a blank mind. It's about creating space—space between stimulus and response, space to hear your own inner wisdom, space to reconnect with your essential nature.

As the poet Rumi wrote: "Silence is the language of God, all else is poor translation."

## The Science of Stillness

Modern neuroscience confirms what ancient practitioners have known for millennia: regular periods of stillness and silence actually rewire our brains for:
- Improved focus and concentration
- Enhanced emotional regulation
- Greater creativity and problem-solving
- Reduced stress and anxiety
- Better sleep quality

## Practical Practices for Cultivating Stillness

### 1. Morning Silence
Before reaching for your phone, take 5-10 minutes of pure silence. Sit comfortably, breathe naturally, and simply be. This sets the tone for your entire day.

### 2. Digital Sabbaths
Choose one day per week (or even one hour per day) to disconnect completely from all digital devices. Use this time for walking in nature, reading physical books, or simply being present.

### 3. Mindful Transitions
Create moments of stillness between activities. Before starting a new task, pause for three conscious breaths. This simple practice can transform your entire day.

### 4. Nature Immersion
Spend time in natural settings without agenda. Let the rhythms of nature—wind, water, trees—remind you of a deeper, more ancient pace of being.

### 5. Evening Reflection
End your day with 10 minutes of quiet reflection. Review your day without judgment, express gratitude, and set intentions for tomorrow.

## Overcoming Resistance

Many of us feel uncomfortable with stillness because it brings up everything we've been avoiding. This is natural. Start small, be gentle with yourself, and remember that discomfort is often a sign of growth.

## The Gift of Stillness

In stillness, we discover that we are not our thoughts, our roles, or our achievements. We are the awareness in which all of these arise and pass away. This realization is the foundation of true peace and freedom.

As you cultivate stillness in your life, you'll find that it doesn't just benefit you—it radiates outward, touching everyone you encounter. In a chaotic world, your stillness becomes a gift to all.`,
      category: 'Wellness',
      author: 'Merit Nene Chuks',
      date: '2023-12-28',
      readTime: '7 min read',
      image: '/images/brand/brand-03.jpg',
      tags: ['Mindfulness', 'Meditation', 'Stress Relief', 'Inner Peace', 'Self-Care', 'Mental Wellness', 'Spiritual Practice'],
    },
    {
      id: '5',
      title: 'From "She Too Can" to Real Change: Book Impact Report',
      excerpt: 'A comprehensive look at how "She Too Can" has transformed lives across communities and the movement it has sparked.',
      content: `When "She Too Can" was first published, it was born from a simple yet powerful intention: to remind women everywhere of their inherent worth, strength, and capacity for transformation. What began as a personal message has grown into a global movement.

## The Numbers Tell a Story

Since its release, "She Too Can" has:
- Sold over 50,000 copies worldwide
- Been translated into 12 languages
- Inspired reading circles in 30+ countries
- Been featured in major publications including Vogue, Harper's Bazaar, and The Guardian

But numbers only tell part of the story.

## Real Women, Real Transformation

### Sarah's Story: From Burnout to Breakthrough

Sarah, a corporate executive in London, was on the verge of quitting everything when she picked up "She Too Can." "I felt like I was living someone else's life," she shares. "The book gave me permission to pause, to listen to myself, and to make choices that honored my truth."

Today, Sarah has left her corporate job to start a wellness coaching practice. "The book didn't just change my career—it changed my entire relationship with myself."

### Maria's Story: Healing Generational Wounds

Maria discovered "She Too Can" through her daughter, who gave it to her as a birthday gift. "I'd never done any inner work," Maria explains. "I was carrying so much from my own mother, my grandmother. This book helped me see those patterns and begin to heal them."

Maria now facilitates women's circles in her community, using the book as a foundation for discussion and healing.

### Aisha's Story: Finding Her Voice

At 22, Aisha felt invisible and unheard. "She Too Can" became her companion during a difficult period of self-discovery. "Every chapter felt like it was written just for me," she says. "It helped me find my voice, set boundaries, and step into my power."

Aisha is now studying to become a therapist, inspired by the healing she experienced through the book.

## The Movement Grows

What makes "She Too Can" special is not just the words on the page, but the community it has created. Women are forming reading groups, hosting workshops, and supporting each other in their journeys of transformation.

## Looking Forward

The impact of "She Too Can" continues to grow. We're working on:
- A companion workbook for deeper exploration
- Online courses and workshops
- Community events and retreats
- Partnerships with organizations supporting women's empowerment

## Thank You

To every woman who has read "She Too Can," shared it with a friend, or used it as a catalyst for change: thank you. You are the reason this book exists, and you are the reason its message continues to spread.

Remember: She too can. And so can you.`,
      category: 'Books',
      author: 'Merit Nene Chuks',
      date: '2023-12-20',
      readTime: '10 min read',
      image: '/images/brand/brand-05.jpg',
      tags: ['Women Empowerment', 'Self-Help Books', 'Transformation', 'Community Impact', 'Personal Development', 'Leadership', 'Inspiration'],
    },
    {
      id: '6',
      title: 'Understanding Burnout: Recognition, Prevention, and Recovery',
      excerpt: 'A deep dive into the science of burnout, early warning signs, and evidence-based strategies for prevention and recovery.',
      content: `Burnout is not just feeling tired or stressed—it's a state of complete physical, emotional, and mental exhaustion that can have profound effects on your health, relationships, and quality of life. Understanding burnout is the first step toward preventing and recovering from it.

## What Burnout Actually Is

The World Health Organization defines burnout as "a syndrome conceptualized as resulting from chronic workplace stress that has not been successfully managed." It's characterized by three dimensions:

1. **Exhaustion**: Feeling drained, depleted, and unable to cope
2. **Cynicism**: Increased mental distance from your job, or feelings of negativism
3. **Reduced efficacy**: Feeling ineffective and lacking accomplishment

But burnout isn't limited to work. It can affect parents, caregivers, students, and anyone carrying chronic stress without adequate support or recovery.

## The Science of Burnout

When we experience chronic stress, our bodies remain in a state of high alert. The stress hormone cortisol stays elevated, which can lead to:
- Weakened immune system
- Digestive issues
- Sleep disturbances
- Memory and concentration problems
- Increased risk of heart disease and depression

Over time, this constant state of activation depletes our resources and leaves us feeling empty and disconnected.

## Early Warning Signs

Recognizing burnout early is crucial. Watch for:
- Chronic fatigue, even after rest
- Insomnia or disrupted sleep
- Forgetfulness and difficulty concentrating
- Increased irritability or cynicism
- Loss of motivation or enthusiasm
- Physical symptoms (headaches, stomach issues)
- Feeling trapped or helpless
- Withdrawing from responsibilities or relationships

## Prevention Strategies

### 1. Set Boundaries
Learn to say no. Protect your time and energy. This isn't selfish—it's necessary for sustainable performance.

### 2. Prioritize Recovery
Schedule regular rest and recovery periods. This includes:
- Adequate sleep (7-9 hours)
- Regular breaks throughout the day
- Time for activities that recharge you
- Vacations and time off

### 3. Build Support Systems
Don't try to do everything alone. Cultivate relationships with people who:
- Listen without judgment
- Offer practical help
- Encourage your well-being
- Celebrate your successes

### 4. Practice Self-Care
Self-care isn't just bubble baths—it's the daily practices that sustain you:
- Regular movement and exercise
- Nourishing food
- Mindfulness or meditation
- Creative expression
- Time in nature

### 5. Align with Your Values
Burnout often occurs when we're living out of alignment with our core values. Regularly check in:
- Does my work reflect what matters to me?
- Am I honoring my needs and boundaries?
- Do I feel purpose and meaning?

## Recovery Pathways

If you're already experiencing burnout, recovery is possible. Here's how:

### 1. Acknowledge and Accept
The first step is admitting you're burned out. This isn't weakness—it's awareness.

### 2. Rest and Restore
Give yourself permission to truly rest. This might mean:
- Taking time off work
- Reducing commitments
- Prioritizing sleep and relaxation
- Saying no to additional demands

### 3. Seek Professional Support
Consider working with:
- A therapist who understands burnout
- A coach who can help you create sustainable practices
- A medical professional to address physical symptoms

### 4. Rebuild Gradually
Recovery isn't linear. Start small:
- Add one self-care practice at a time
- Gradually increase your commitments
- Celebrate small wins
- Be patient with yourself

### 5. Create Sustainable Systems
Once you're recovering, build systems that prevent future burnout:
- Regular check-ins with yourself
- Ongoing boundary-setting
- Consistent self-care practices
- A support network you can rely on

## The Path Forward

Burnout is not a life sentence. With awareness, support, and intentional practices, you can recover and build a more sustainable, fulfilling life.

At Soulsysta Collective, we offer specialized programs for burnout recovery, combining somatic therapy, wellness coaching, and community support. If you're struggling, you don't have to do it alone.

Remember: Recovery is not just about getting back to where you were—it's about creating something new, something more aligned with who you truly are.`,
      category: 'Therapy',
      author: 'Dr. Julian Vance',
      date: '2023-12-15',
      readTime: '9 min read',
      image: '/images/brand/brand-02.jpg',
      tags: ['Burnout Recovery', 'Executive Burnout', 'Stress Management', 'Mental Health', 'Work-Life Balance', 'Self-Care', 'Therapy'],
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
              onClick={() => setSelectedPost(post)}
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
                    Read Full Article
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
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-ivory rounded-2xl max-w-4xl w-full my-8 overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="relative h-64 sm:h-80">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
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
                      <span className="font-medium">{selectedPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(selectedPost.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{selectedPost.readTime}</span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="prose prose-lg max-w-none">
                    <div className="whitespace-pre-line text-forest/80 leading-relaxed">
                      {selectedPost.content}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-forest/10">
                    <Tag className="w-4 h-4 text-forest/60" />
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
