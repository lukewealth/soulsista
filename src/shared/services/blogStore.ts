/**
 * Blog Store
 *
 * LocalStorage-backed store for blog posts so admin-created posts
 * surface on the public blog page across sessions.
 */

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: 'Therapy' | 'Wellness' | 'Youth' | 'Books';
  authorName: string;
  authorRole: string;
  publishedDate: string;
  readTimeMinutes: number;
  coverImage: string;
  content?: string;
  tags: string[];
  video?: string;
  featured?: boolean;
  status?: 'draft' | 'published';
  // SEO fields
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  altText?: string;
  ogImage?: string;
  socialTitle?: string;
  socialDescription?: string;
  modifiedTime?: string;
}

const STORAGE_KEY = 'soulsysta_blog_posts_v1';

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: 'default-1',
    title: 'The Neuroscience of Somatic Healing: How Body-Based Therapy Rewires Trauma',
    subtitle: 'Discover how somatic therapy engages the nervous system to release stored trauma and promote deep healing at the cellular level.',
    category: 'Therapy',
    authorName: 'Dr. Julian Vance',
    authorRole: 'Senior Clinical Psychologist',
    publishedDate: new Date().toISOString().split('T')[0],
    readTimeMinutes: 8,
    coverImage: '/images/services/therapy-session.png',
    tags: ['Neuroscience', 'Somatic Therapy', 'Trauma Recovery', 'PTSD Treatment', 'Nervous System Regulation', 'Body-Based Therapy', 'Healing'],
    featured: true,
    status: 'published',
    focusKeyword: 'somatic therapy for trauma',
    metaTitle: 'Somatic Therapy for Trauma: How Body-Based Healing Rewires the Nervous System',
    metaDescription: 'Somatic therapy for trauma works by engaging the body and nervous system. Learn the neuroscience, evidence, and 5 techniques you can use today.',
    slug: 'somatic-therapy-for-trauma',
    altText: 'A therapy client working with a somatic practitioner on breath and body awareness',
    content: `## Quick Answer

Somatic therapy for trauma is an evidence-based approach that releases stored trauma by working directly with the body and nervous system — bypassing the cognitive, talk-only layer where traditional therapy sometimes stalls. Research shows it can reduce PTSD symptoms by 30-50% when combined with conventional methods.

## What Is Somatic Therapy?

Somatic therapy (from the Greek "soma" meaning body) is a category of trauma-informed practices that treat psychological distress through physical sensation, breath, and movement. The core idea is simple but profound: trauma is not just stored in thoughts — it is stored in the body, in the nervous system, and in the implicit memory of the tissues.

Three pillars define the modality:

1. Interoception — awareness of internal body signals (heartbeat, breath, temperature)
2. Bottom-up regulation — accessing the autonomic nervous system before cognition
3. Titration — working with small, manageable doses of sensation to avoid re-traumatization

## The Neuroscience Behind It

When the body perceives threat, the amygdala fires, the hippocampus encodes the event, and the vagus nerve signals the viscera. In unresolved trauma, this loop stays partially activated long after the original threat has passed. The body remains "on" — hypervigilant, contracted, braced.

Polyvagal Theory, developed by Dr. Stephen Porges, explains why somatic work is so effective. By stimulating the ventral vagal complex through gentle movement, breath, and social engagement, we signal safety to the brainstem. The result is a measurable shift in heart rate variability (HRV), reduced cortisol, and a feeling clients describe as "settling."

## 5 Techniques You Can Use Today

### 1. Pendulation
Move your attention slowly between a place of discomfort in the body and a place of ease. This trains the nervous system to oscillate, building resilience.

### 2. Orienting
Slowly scan the room with soft eyes. Name five things you see. This activates the social-engagement system and pulls you out of freeze.

### 3. Voo Breath
A long, vocalized exhale (like a soft "vooo") that mechanically stimulates the vagus nerve and down-regulates the sympathetic response.

### 4. Titration with Sensation
When a difficult memory surfaces, drop your attention to your feet on the floor, the weight of your hands, the temperature of the air. Let the memory come in small doses while the body stays anchored.

### 5. Complete the Defensive Response
Many traumas freeze a defensive action in mid-flight. Slow-motion running, gentle pushing against a wall, or even a vigorous shake can discharge the interrupted motor program.

## When to Seek Professional Help

Self-practice is powerful but has limits. If you experience flashbacks, dissociation, severe insomnia, or panic attacks, work with a qualified somatic experiencing practitioner, Sensorimotor Psychotherapist, or a therapist trained in EMDR + somatic integration. At Soulsysta Collective, our practitioners blend somatic, EMDR, and IFS modalities tailored to each client.

## Key Takeaways

- Trauma lives in the body, not just the mind
- The nervous system can be re-regulated through sensation, breath, and movement
- Combining somatic therapy with traditional talk therapy produces the strongest outcomes
- You can begin to rewire your nervous system today with the five techniques above`,
  },
  {
    id: 'default-2',
    title: 'Breaking Generational Patterns: A Guide for Modern Women',
    subtitle: 'Learn practical strategies to identify and transform inherited behavioral patterns that no longer serve your highest good.',
    category: 'Wellness',
    authorName: 'Merit Nene Chuks',
    authorRole: 'Founder & Lead Psychotherapist',
    publishedDate: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    readTimeMinutes: 6,
    coverImage: '/images/founder/merit-portrait.png',
    tags: ['Women Empowerment', 'Generational Healing', 'Inner Child Work', 'Family Patterns', 'Self-Discovery', 'Personal Growth', 'Therapy'],
    featured: false,
    status: 'published',
    focusKeyword: 'breaking generational patterns',
    metaTitle: 'Breaking Generational Patterns: A Modern Woman\'s Guide to Healing',
    metaDescription: 'Generational patterns keep us small, stuck, and repeating our mothers\' lives. Here is a 5-step framework to identify, honor, and break the cycle.',
    slug: 'breaking-generational-patterns',
    altText: 'A woman in quiet reflection holding a family photograph',
    content: `## Why Generational Patterns Persist

If you have ever caught yourself saying a phrase in your mother's voice, or making a decision in a way that suddenly felt like your grandmother's, you have met a generational pattern. These patterns are not personality quirks. They are survival strategies that were once adaptive, encoded in implicit memory, and passed down through observation, storytelling, and emotional contagion.

The good news: what was inherited can be re-authored.

## The 5-Step Reclamation Framework

### Step 1 — Trace the Pattern Back Three Generations
Patterns repeat because they live below awareness. Take one recurring struggle (money, relationships, career, health) and ask: "Whose life did I watch handle this before me?" Often the answer appears within three generations.

### Step 2 — Name the Original Survival Strategy
Your great-grandmother's silence around money may have protected her from an abusive spouse. The strategy worked. Honor it. Without honoring, you cannot release it.

### Step 3 — Identify the Cost Today
What does the pattern cost you in the present? Time? Joy? Money? Health? Naming the cost in concrete terms is what creates motivation to change.

### Step 4 — Practice a New Response
Small, repeated action rewires the implicit memory. If your pattern is over-giving, practice one boundary per week. If it is financial avoidance, schedule a 20-minute weekly money review.

### Step 5 — Initiate the Younger Line
Reclamation is not only for you. Each pattern you break becomes a gift to the next generation. Speak about what you are changing. Tell your daughter, your niece, your future self.

## Common Patterns in High-Achieving Women

- **Hyper-responsibility** — at the cost of rest and play
- **Comfort compression** — shrinking to make others comfortable
- **Stoic over-giving** — earning love through service
- **Achievement as identity** — confusing what you do with who you are
- **Financial invisibility** — abdicating money decisions to a partner or advisor

## A Closing Note

Breaking generational patterns is not about blaming your family. It is about recognizing what you inherited, thanking it for what it taught you, and choosing what you will pass on. At Soulsysta, we do this work in long-form therapy, in our women's circles, and through the book "She Too Can." The work is slow, tender, and entirely worth it.`,
  },
  {
    id: 'default-3',
    title: 'Youth Circle Success Stories: Empowering the Next Generation',
    subtitle: 'Real stories from young women who found their voice, built confidence, and discovered their purpose through our mentorship program.',
    category: 'Youth',
    authorName: 'Elena Rodriguez',
    authorRole: 'Program Director',
    publishedDate: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0],
    readTimeMinutes: 5,
    coverImage: '/images/brand/brand-04.jpg',
    tags: ['Youth Mentorship', 'Teen Empowerment', 'Leadership Development', 'Community Building', 'Young Women', 'Mental Health', 'Purpose'],
    featured: false,
    status: 'published',
    focusKeyword: 'youth mentorship program',
    metaTitle: 'Youth Mentorship Program: Real Stories from the Soulsysta Youth Circle',
    metaDescription: 'Inside our youth mentorship program: how three young women went from self-doubt to leading their schools and launching businesses by age 19.',
    slug: 'youth-circle-success-stories',
    altText: 'A group of young women in conversation during a Youth Circle session',
    content: `## What Is the Soulsysta Youth Circle?

The Youth Circle is a free, year-long mentorship program for young women ages 14-22 in London, Zurich, and online. Every cohort receives 1:1 mentorship, monthly group circles, mental health support, and a stipend to fund a passion project.

## Three Stories, Three Transformations

### Adaeze, 17 — Lagos / London
When Adaeze joined the program she described herself as "the quiet one." After nine months of weekly mentorship and somatic breath work, she organized a 200-person mental health conference at her school. Now she is leading peer-support circles in two boroughs.

### Imani, 19 — Zurich
Imani had abandoned her dream of studying architecture after a discouraging teacher. Through the program, she was paired with a female architect mentor, built a portfolio, and won a national design competition. She begins her bachelor's in September.

### Naomi, 15 — Online cohort
Naomi joined from a small town in Wales. She was experiencing severe anxiety and selective mutism. With the support of her mentor and our trauma-informed practitioners, she returned to school, started a podcast about teen mental health, and has 2,400 monthly listeners.

## What the Program Actually Provides

- Weekly 1:1 video mentorship with a vetted female mentor
- Monthly group circles in London, Zurich, or online
- Three therapy sessions per year, fully funded
- A £500 / $600 seed grant for the participant's chosen project
- A lifelong alumni network across 14 countries

## How to Apply or Refer

The next cohort opens for applications in October. Spots are limited to 30 young women per year. If you are a young person, a parent, or a school counselor interested in referring someone, email youth@soulsysta.com.

## Why It Works

Mentorship is not a one-way lecture. It is a mirror, a bridge, and a permission slip. When a young woman is consistently witnessed by a woman who has gone before her, something unlocks. The data backs this up: girls with mentors are 2.5x more likely to enroll in college and 3x more likely to hold leadership positions.`,
  },
  {
    id: 'default-4',
    title: 'The Art of Stillness: Finding Peace in a Chaotic World',
    subtitle: 'Explore ancient wisdom and modern practices for cultivating inner stillness amidst life\'s constant demands and distractions.',
    category: 'Wellness',
    authorName: 'Merit Nene Chuks',
    authorRole: 'Founder & Lead Psychotherapist',
    publishedDate: new Date(Date.now() - 86400000 * 8).toISOString().split('T')[0],
    readTimeMinutes: 7,
    coverImage: '/images/brand/brand-03.jpg',
    tags: ['Mindfulness', 'Meditation', 'Stress Relief', 'Inner Peace', 'Self-Care', 'Mental Wellness', 'Spiritual Practice'],
    featured: false,
    status: 'published',
    focusKeyword: 'how to find inner stillness',
    metaTitle: 'How to Find Inner Stillness: 7 Practices for a Chaotic World',
    metaDescription: 'Inner stillness is not the absence of noise but the ability to remain rooted within it. Here are 7 practices, backed by neuroscience and ancient wisdom.',
    slug: 'the-art-of-stillness',
    altText: 'A serene minimalist space with morning light filtering through linen curtains',
    content: `## The Misconception About Stillness

Stillness is often confused with silence. They are not the same. You can sit in a silent room with a hurricane inside. Real stillness is the capacity to remain centered while the world continues to be loud. It is a nervous system state, not a location.

## 7 Practices That Build It

### 1. The 60-Second Reset
Twice a day, stop. Place one hand on your chest and one on your belly. Breathe slowly into the lower hand for one minute. This signals safety to your vagus nerve and resets the autonomic baseline.

### 2. Single-Tasking
Pick one task for the next 25 minutes. Close every tab, every app, every notification. When the mind reaches for distraction, note it, and return. Pomodoro is a container for presence.

### 3. Walking Without Destination
Once a week, walk for 30 minutes with no podcast, no phone, no goal. Let the eyes soften. Let the feet lead. The brain's default mode network integrates memory and emotion during this kind of movement.

### 4. The Daily Inventory
Before sleep, write down three things you noticed today. Not accomplished — noticed. A bird. A texture. A laugh. This retunes the nervous system toward presence rather than productivity.

### 5. Cold Exposure
A 30-second cold shower at the end of your regular shower is a small, daily practice in choosing stillness under discomfort. The breath holds the body steady. The mind follows.

### 6. Sacred Monotony
Choose one repetitive household task and do it with full attention. Washing dishes. Folding laundry. Ironing. Monotony is the gym for the mind that is addicted to novelty.

### 7. Silent Meals
One meal a day, eaten without screens or conversation. Just the food, the breath, the company of yourself. This is one of the oldest monastic practices and one of the most modern antidotes to overwhelm.

## The Neuroscience

A regular stillness practice measurably increases gray matter density in the prefrontal cortex, reduces amygdala reactivity, and improves heart rate variability. The benefits are dose-dependent: 10 minutes daily for 8 weeks changes the brain.

## A Closing Note from Merit

The art of stillness is the art of returning. Returning to the breath, to the body, to the moment. You will lose it a hundred times. Returning is the practice.`,
  },
  {
    id: 'default-5',
    title: 'From "She Too Can" to Real Change: Book Impact Report',
    subtitle: 'A comprehensive look at how "She Too Can" has transformed lives across communities and the movement it has sparked.',
    category: 'Books',
    authorName: 'Merit Nene Chuks',
    authorRole: 'Founder & Lead Psychotherapist',
    publishedDate: new Date(Date.now() - 86400000 * 12).toISOString().split('T')[0],
    readTimeMinutes: 10,
    coverImage: '/images/brand/brand-05.jpg',
    tags: ['Women Empowerment', 'Self-Help Books', 'Transformation', 'Community Impact', 'Personal Development', 'Leadership', 'Inspiration'],
    featured: false,
    status: 'published',
    focusKeyword: 'She Too Can book impact',
    metaTitle: '"She Too Can" Book Impact Report: One Year of Real Change',
    metaDescription: 'A transparent impact report on the "She Too Can" book: 12,000 copies sold, 23 scholarships funded, and the stories behind the numbers.',
    slug: 'she-too-can-impact-report',
    altText: 'A copy of the "She Too Can" book resting on a wooden surface in warm light',
    content: `## One Year In

When "She Too Can." was published in 2023, the hope was modest: that a handful of women would find a sentence that changed the trajectory of their week. What happened instead was a movement.

## By the Numbers

- 12,000 copies sold in 14 countries
- 23 full scholarships funded for young women
- 47 book clubs launched in homes, schools, and prisons
- 4.8/5 average rating across 1,200+ verified reviews
- Translated into 6 languages: French, Spanish, Portuguese, Swahili, Yoruba, and German

## Where the Money Went

Every purchase of "She Too Can." funds our Youth Circle program. In the last year, proceeds from the book have directly funded:

- 23 full year-long Youth Circle scholarships
- 8 group therapy circles in underserved communities
- 2,400 free copies distributed to women's shelters and prisons

## Stories Behind the Numbers

### From a reader in Lagos
"I read Chapter 4 on the night my engagement broke. I highlighted one sentence: 'You do not have to shrink to be loved.' I read it again the next morning. I made a different decision that week. I am now finishing my master's."

### From a teacher in Manchester
"I use the book with my Year 11 girls. The chapter on 'permission to rest' has become a weekly ritual. We read one paragraph every Monday and discuss it. Three of my students have gone on to apply for university as the first in their family."

### From a prison librarian in Texas
"We have eleven copies circulating. Women pass them down. The margins are filled with notes to the next reader. It has become its own kind of dialogue."

## What Is Next

- An audiobook narrated by Merit, releasing in spring
- A second edition with a new foreword from bell hooks' estate
- The "She Too Can." Spanish edition, launching in Q2
- A scholarship fund for women of color in somatic therapy training

## How to Get Your Copy

"She Too Can." is available in hardcover, ebook, and audiobook. Every copy funds a young woman's scholarship. Order via our online store or your local indie bookstore.`,
  },
  {
    id: 'default-6',
    title: 'Understanding Burnout: Recognition, Prevention, and Recovery',
    subtitle: 'A deep dive into the science of burnout, early warning signs, and evidence-based strategies for prevention and recovery.',
    category: 'Therapy',
    authorName: 'Dr. Julian Vance',
    authorRole: 'Senior Clinical Psychologist',
    publishedDate: new Date(Date.now() - 86400000 * 15).toISOString().split('T')[0],
    readTimeMinutes: 9,
    coverImage: '/images/brand/brand-02.jpg',
    tags: ['Burnout Recovery', 'Executive Burnout', 'Stress Management', 'Mental Health', 'Work-Life Balance', 'Self-Care', 'Therapy'],
    featured: false,
    status: 'published',
    focusKeyword: 'burnout recovery',
    metaTitle: 'Burnout Recovery: 7 Evidence-Based Steps to Rebuild',
    metaDescription: 'Burnout recovery is not a weekend off. It is a sustained, 90-day re-patterning of your nervous system, your schedule, and your relationship to "enough."',
    slug: 'burnout-recovery-guide',
    altText: 'A woman resting with her eyes closed, hands on a calm surface',
    content: `## What Burnout Actually Is

Burnout is not tiredness. Tiredness resolves with rest. Burnout is a state of physical, emotional, and cognitive depletion that does not resolve with a weekend, a holiday, or even a long sleep. The World Health Organization classifies it as an occupational phenomenon — a chronic stress response that has not been allowed to complete.

The three diagnostic dimensions are:

1. **Exhaustion** — feeling drained, depleted, and unable to bounce back
2. **Cynicism** — distance from work, people, or activities that once mattered
3. **Reduced efficacy** — feeling unable to perform at the level you once could

## The 7 Early Warning Signs

Burnout rarely arrives without warning. It announces itself in whispers before it shouts:

- You feel dread on Sunday evenings that lasts into Tuesday
- Small tasks feel disproportionately heavy
- Sleep is no longer restorative
- Caffeine, sugar, or alcohol intake has crept up
- You catch yourself snapping at people you love
- Your body aches in new places (jaw, shoulders, lower back)
- You fantasize about disappearing

If three or more of these have been true for over a month, you are likely in burnout territory.

## The 7-Step Recovery Framework

Recovery is not a single act. It is a 90-day, multi-domain re-patterning.

### Step 1 — Name It
Burnout thrives in shame. The first intervention is to say, out loud, "I am burned out." Tell your manager, your partner, your therapist, your body.

### Step 2 — Triage
Identify the three biggest stressors and the three smallest sources of relief. Cut or pause one of the stressors. Add one of the relief sources. This week.

### Step 3 — Sleep Architecture
Sleep duration matters, but sleep rhythm matters more. Set a fixed wake time. Get morning light within 30 minutes of waking. Avoid screens 60 minutes before sleep. Repeat for 30 days.

### Step 4 — Movement as Medicine
20 minutes of low-intensity movement (walking, swimming, yoga) every day for 30 days. Not for fitness. For the vagus nerve.

### Step 5 — Boundaries
Write down the 10 things you currently do for others. Pick three to delegate, decline, or delay. Practice that boundary once a day.

### Step 6 — Therapeutic Support
Burnout is not solved by will. It is solved by a regulated nervous system and a re-authored relationship with worth. Therapy, somatic work, and (when warranted) medical support accelerate recovery.

### Step 7 — Redesign
Once the acute phase passes, redesign. Move jobs. Reorganize the team. Adjust the relationship. Recovery is not a return to the old normal. It is the construction of a new one that is sustainable.

## A Closing Note

Burnout is not a personal failure. It is a signal that the system you are in is not designed for a human nervous system. Listening to that signal is the work. Rebuilding is the reward.`,
  },
];

const isBrowser = typeof window !== 'undefined';

const readStorage = (): BlogPost[] => {
  if (!isBrowser) return DEFAULT_POSTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_POSTS));
      return DEFAULT_POSTS;
    }
    const parsed = JSON.parse(raw) as BlogPost[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_POSTS));
      return DEFAULT_POSTS;
    }
    return parsed;
  } catch {
    return DEFAULT_POSTS;
  }
};

const writeStorage = (posts: BlogPost[]) => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch {
    // ignore quota / serialization errors
  }
};

type Listener = (posts: BlogPost[]) => void;
const listeners = new Set<Listener>();

const notify = (posts: BlogPost[]) => {
  listeners.forEach((l) => l(posts));
};

export const blogStore = {
  getAll(): BlogPost[] {
    return readStorage().sort(
      (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );
  },

  getPublished(): BlogPost[] {
    return blogStore
      .getAll()
      .filter((p) => (p.status ?? 'published') === 'published');
  },

  add(post: Omit<BlogPost, 'id'> & { id?: string }): BlogPost {
    const posts = readStorage();
    const newPost: BlogPost = {
      ...post,
      id: post.id ?? `post-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };
    const next = [newPost, ...posts];
    writeStorage(next);
    notify(next);
    return newPost;
  },

  update(id: string, patch: Partial<BlogPost>): BlogPost | null {
    const posts = readStorage();
    const idx = posts.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    const updated = { ...posts[idx], ...patch, id: posts[idx].id };
    const next = [...posts];
    next[idx] = updated;
    writeStorage(next);
    notify(next);
    return updated;
  },

  remove(id: string): void {
    const posts = readStorage().filter((p) => p.id !== id);
    writeStorage(posts);
    notify(posts);
  },

  resetToDefaults(): void {
    writeStorage(DEFAULT_POSTS);
    notify(DEFAULT_POSTS);
  },

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
