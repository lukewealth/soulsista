import { Service, Practitioner, BookItem, Article } from '../types';

export const PRACTITIONERS: Practitioner[] = [
  {
    id: 'merit-nene-chuks',
    name: 'Merit Nene Chuks',
    title: 'Founder & Lead Psychotherapist',
    role: 'Somatic Healing & Executive Mindset Specialist',
    bio: 'Visionary behind Soulsysta Collective with over a decade of experience guiding women and youth into emotional liberation and authentic wholeness.',
    fullBio: 'Merit Nene Chuks is an author, psychotherapist, and transformational speaker dedicated to deconstructing systemic burnout and restoring inner sovereignty. Combining clinical depth psychology with somatic breathwork and ancestral wisdom traditions, Merit has facilitated healing for thousands of executives, creative directors, and young emerging leaders globally.',
    specialties: ['Identity Integration', 'Burnout Recovery', 'Somatic Breathwork', 'Leadership Wholeness'],
    imageUrl: '/images/founder/merit-portrait.png',
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
    rating: 5.0,
    reviewCount: 142,
    location: 'London Sanctuary & Global Online Studio',
  },
  {
    id: 'dr-julian-vance',
    name: 'Dr. Julian Vance',
    title: 'Senior Clinical Psychologist',
    role: 'Trauma Integration & Neuroscience Lead',
    bio: 'Clinical psychologist specializing in nervous system regulation, cognitive restructuring, and relational depth work.',
    fullBio: 'Dr. Vance holds a Ph.D. in Clinical Neuropsychology from Oxford and has spent 12 years studying the biological markers of chronic stress and emotional resilience. His approach blends compassionate inquiry with neuro-somatic regulation.',
    specialties: ['Nervous System Reset', 'Trauma Recovery', 'Relational Dynamics', 'Mindfulness Science'],
    imageUrl: '/images/brand/brand-02.jpg',
    availableDays: ['Wednesday', 'Friday', 'Saturday'],
    rating: 4.9,
    reviewCount: 98,
    location: 'Zurich Studio & Virtual Chamber',
  },
  {
    id: 'elena-solis',
    name: 'Elena Solis',
    title: 'Master Somatic Practitioner',
    role: 'Apothecary & Breathwork Facilitator',
    bio: 'Herbalist, sound alchemist, and breathwork guide crafting sensory journeys for visceral tension release.',
    fullBio: 'Elena brings 14 years of botanical study from Costa Rica and Japan into Soulsysta. She curates our signature botanical infusions and leads immersive thermal and auditory sensory chambers.',
    specialties: ['Pranayama & Breath', 'Botanical Hydrotherapy', 'Vibrational Sound', 'Body Armor Release'],
    imageUrl: '/images/brand/brand-03.jpg',
    availableDays: ['Tuesday', 'Wednesday', 'Sunday'],
    rating: 5.0,
    reviewCount: 112,
    location: 'Cotswolds Retreat & Virtual Studio',
  },
];

export const SERVICES: Service[] = [
  {
    id: 'somatic-psychotherapy',
    category: 'therapy',
    title: 'Somatic Psychotherapy & Wholeness',
    subtitle: 'Deep psychological healing & spiritual redirection',
    shortDescription: 'A private 1-on-1 sanctuary session integrating somatic inquiry, cognitive processing, and emotional release for high-impact women.',
    fullDescription: 'Designed for women carrying heavy executive or personal responsibility, this signature session moves beyond traditional talk therapy. By addressing how emotional trauma lives in the body\'s fascia and nervous system, we systematically untangle internalized pressure, perfectionism, and grief.',
    durationMinutes: 75,
    priceUSD: 240,
    imageUrl: '/images/services/therapy-session.png',
    benefits: [
      'Immediate reduction in physiological fight-or-flight activation',
      'Clarity on core narrative blocks and subconscious patterns',
      'Personalized nervous system regulation toolkit',
      'Post-session integration guide & audio breath track'
    ],
    recommendedFor: [
      'Executives & Founders facing chronic exhaustion',
      'Women navigating major life transitions or grief',
      'Leaders seeking emotional alignment and authentic power'
    ],
    journeySteps: [
      { title: 'Grounding & Intention', description: 'Begin with botanical inhalation and bio-feedback body scan.' },
      { title: 'Somatic Exploration', description: 'Guided gentle inquiry into bodily tension points and underlying narratives.' },
      { title: 'Integration & Closure', description: 'Restorative sound pulse and personalized grounding protocol formulation.' }
    ],
    practitionerIds: ['merit-nene-chuks', 'dr-julian-vance'],
    faqs: [
      { question: 'Is this session conducted online or in person?', answer: 'We offer both. In-person sessions take place in our serene London & Zurich sanctuaries. Virtual sessions occur via our encrypted private HD video portal.' },
      { question: 'How should I prepare for my session?', answer: 'We recommend arriving 10 minutes early in a quiet, dimly lit space with comfortable clothing and a glass of warm water.' }
    ]
  },
  {
    id: 'burnout-recovery-immersion',
    category: 'wellness',
    title: 'Burnout Recovery & Vitality Reset',
    subtitle: 'Restorative mobility, circadian regulation & biochemistry',
    shortDescription: 'Comprehensive restorative protocol combining targeted breathwork, thermal contrast theory, and nutritional biochemistry.',
    fullDescription: 'When burnout strikes, willpower alone is insufficient. This immersion targets the adrenal-cortisol axis, restoring restful sleep, cellular energy, and mental acuity through precision movement and stillness practices.',
    durationMinutes: 90,
    priceUSD: 210,
    imageUrl: '/images/brand/healing.jpg',
    benefits: [
      'Deeper slow-wave sleep within 48 hours',
      'Restoration of mental clarity and executive stamina',
      'Customized circadian light and movement schedule',
      'Infusion of botanical adaptogens and restorative teas'
    ],
    recommendedFor: [
      'Individuals suffering from brain fog and fatigue',
      'High-performers who find it impossible to quiet their mind',
      'Anyone recovering from prolonged illness or stress'
    ],
    journeySteps: [
      { title: 'Circadian Assessment', description: 'Evaluating daily cortisol drivers and light exposure.' },
      { title: 'Pranayama & Vagal Reset', description: 'Synchronized diaphragmatic breathing to stimulate the vagus nerve.' },
      { title: 'Restorative Immersion', description: 'Deep stillness accompanied by weighted thermal blankets and sound.' }
    ],
    practitionerIds: ['elena-solis', 'merit-nene-chuks'],
    faqs: [
      { question: 'Can I do this if I am completely exhausted?', answer: 'Absolutely. This ritual requires zero physical strain; it is engineered specifically to rebuild depleted energy.' }
    ]
  },
  {
    id: 'botanical-sensory-apothecary',
    category: 'spa',
    title: 'Botanical Apothecary & Sensory Journey',
    subtitle: 'Restorative sensory chambers & thermal botanical infusion',
    shortDescription: 'Custom herbal steam infusion, facial reflexology, and botanical body wrapping for profound sensory restoration.',
    fullDescription: 'Immerse your body in raw botanical essences harvested from sustainable ethical farms. Our sensory journey uses wild lavender, frankincense, sandalwood, and organic rose hydrosols to soothe skin and nervous tissue simultaneously.',
    durationMinutes: 120,
    priceUSD: 280,
    imageUrl: '/images/services/massage-session.png',
    benefits: [
      'Silky, deeply nourished skin barrier restoration',
      'Release of jaw, neck, and cranial bone tightness',
      'Sustained state of alpha-wave relaxation',
      'Bespoke apothecary blend to take home'
    ],
    recommendedFor: [
      'Sensory overload and urban noise fatigue',
      'Skin tension and stress-induced inflammation',
      'Anyone seeking deep pampering grounded in clinical care'
    ],
    journeySteps: [
      { title: 'Apothecary Formulation', description: 'Custom blending of essential botanicals based on scent affinity.' },
      { title: 'Hydro-Thermal Cocoon', description: 'Warm herbal compresses applied along lymphatic pathways.' },
      { title: 'Cranial Facial Reflexology', description: 'Precision acupressure release of facial tension.' }
    ],
    practitionerIds: ['elena-solis'],
    faqs: [
      { question: 'Are the products organic and allergy-safe?', answer: 'Yes. All formulations are 100% wildcrafted, vegan, cold-pressed, and free from synthetic fragrances.' }
    ]
  },
  {
    id: 'youth-circle-mentorship',
    category: 'youth',
    title: 'Youth Circle: Purpose & Leadership Lab',
    subtitle: 'Empowering young women (ages 14-22) to lead with authority',
    shortDescription: 'A transformative mentorship workshop and private coaching space building emotional intelligence, self-worth, and leadership.',
    fullDescription: 'Young women today face unprecedented digital noise, social pressure, and identity fragmentation. Youth Circle provides a safe, sacred space where young women learn emotional regulation, assertive boundary setting, and authentic self-expression.',
    durationMinutes: 60,
    priceUSD: 120,
    imageUrl: '/images/brand/brand-04.jpg',
    benefits: [
      'Unshakeable core confidence independent of social media approval',
      'Practical tools to manage academic anxiety and peer pressure',
      'Mentorship network of inspiring female leaders',
      'Access to Soulsysta Youth Journal & digital resources'
    ],
    recommendedFor: [
      'Young women ages 14 to 22 navigating identity and career decisions',
      'Parents seeking holistic guidance for their daughters'
    ],
    journeySteps: [
      { title: 'Identity Mapping', description: 'Uncovering unique values, strengths, and personal voice.' },
      { title: 'Boundary Lab', description: 'Interactive roleplay on setting firm, compassionate limits.' },
      { title: 'Vision & Purpose', description: 'Creating an actionable personal roadmap for growth.' }
    ],
    practitionerIds: ['merit-nene-chuks', 'dr-julian-vance'],
    faqs: [
      { question: 'Can parents sponsor a young woman through the Initiative?', answer: 'Yes! You can book directly or sponsor a spot via our Soulsysta Initiative fund.' }
    ]
  },
  {
    id: 'keynote-transformational-speaking',
    category: 'speaking',
    title: 'Keynote & Executive Leadership Retreats',
    subtitle: 'Institutional keynotes, panels & corporate wellness intensives',
    shortDescription: 'Merit Nene Chuks brings keynotes on "Wholeness as the New High Performance" to global organizations, summits, and universities.',
    fullDescription: 'Elevate your organization or retreat with captivating, research-backed keynotes. Merit addresses global executive audiences on topics including deconstructing toxic productivity, building resilient human-first cultures, and somatic leadership.',
    durationMinutes: 120,
    priceUSD: 1500,
    imageUrl: '/images/events/public-speaking.png',
    benefits: [
      'Customized institutional presentation tailored to your organization',
      'Engaging interactive Q&A and group somatic calibration',
      'Executive takeaway guides for leadership teams'
    ],
    recommendedFor: [
      'Corporate leadership summits & wellness weeks',
      'International women in leadership conferences',
      'University keynote addresses and retreat programs'
    ],
    journeySteps: [
      { title: 'Pre-Event Briefing', description: 'Aligning message with organizational goals and culture.' },
      { title: 'Keynote Execution', description: 'Inspiring, high-impact keynote delivery with visual presentation.' },
      { title: 'Executive Debrief', description: 'Post-event recommendations for sustained workplace impact.' }
    ],
    practitionerIds: ['merit-nene-chuks'],
    faqs: [
      { question: 'How far in advance should we book speaking engagements?', answer: 'We recommend booking 6 to 12 weeks prior to your event date to ensure availability.' }
    ]
  }
];

export const FEATURED_BOOK: BookItem = {
  id: 'she-too-can',
  title: 'SHE TOO CAN.',
  subtitle: 'Break Limits. Reclaim Your Authentic Power. Become Whole.',
  author: 'Merit Nene Chuks',
  priceHardcover: 29.99,
  priceDigital: 14.99,
  priceBundle: 45.00,
  priceHardcoverNGN: 20000,
  priceDigitalNGN: 10000,
  priceBundleNGN: 30000,
  coverImage: '/images/services/she-too-can-book.jpg',
  synopsis: 'A groundbreaking literary masterwork and guided manifesto for women navigating the invisible constraints of modern life. Merit Nene Chuks draws from clinical psychology, ancestral wisdom, and personal triumph to offer a roadmap from survival mode into unshakeable wholeness.',
  shortDescription: 'A groundbreaking literary masterwork and guided manifesto for women navigating the invisible constraints of modern life.',
  fullDescription: 'A groundbreaking literary masterwork and guided manifesto for women navigating the invisible constraints of modern life. Merit Nene Chuks draws from clinical psychology, ancestral wisdom, and personal triumph to offer a roadmap from survival mode into unshakeable wholeness. A foundational text for women ready to lead without sacrificing their souls.',
  category: 'Empowerment',
  badge: 'Best Seller',
  specifications: {
    pages: 342,
    language: 'English',
    publisher: 'Soulsysta Press',
    isbn: '978-1-954321-00-8'
  },
  testimonials: [
    {
      author: 'Amina Al-Mansoor',
      role: 'Managing Director, Global Impact Fund',
      quote: '"She Too Can." is not merely a book—it is a spiritual sanctuary in print. Reading it restored parts of myself I thought I had lost forever.'
    },
    {
      author: 'Dr. Sarah Jenkins',
      role: 'Professor of Psychology, King\'s College',
      quote: 'Merit blends clinical rigor with poetic grace. This manifesto should be required reading for every woman aspiring to lead without sacrificing her soul.'
    },
    {
      author: 'Chidimma Nwosu',
      role: 'Youth Initiative Fellow',
      quote: 'At 19, this book gave me the courage to say NO to societal expectations and YES to my true voice.'
    }
  ],
  previewChapters: [
    {
      number: 1,
      title: 'The Architecture of Stillness',
      excerpt: 'We have been taught that motion is life, that rest is earned only after exhaustion. But true creation begins not in frantic motion, but in the silent fertile dark of stillness...',
      fullContent: `CHAPTER ONE: THE ARCHITECTURE OF STILLNESS

We have been taught that motion is life, that rest is earned only after exhaustion. But true creation begins not in frantic motion, but in the silent fertile dark of stillness.

When a woman pauses long enough to hear her own pulse beneath the noise of expectations, something radical shifts. She stops asking for permission to occupy space. She ceases bargaining with her peace.

In this chapter, we deconstruct the illusion of performative busyness. We examine how the nervous system learns to equate safety with constant output, and we begin the delicate work of returning to baseline.

Key Reflection Questions:
1. What part of your life is currently powered by fear of being forgotten?
2. How does your body physically alert you before you reach burnout?
3. What is one boundary you can put in place today to safeguard 20 minutes of absolute silence?`
    },
    {
      number: 2,
      title: 'Deconstructing the Invisible Cage',
      excerpt: 'The cages that restrict women most effectively are rarely made of iron bars; they are woven from expectations, unspoken rules, and internalized guilt...',
      fullContent: `CHAPTER TWO: DECONSTRUCTING THE INVISIBLE CAGE

The cages that restrict women most effectively are rarely made of iron bars; they are woven from expectations, unspoken rules, and internalized guilt.

From a young age, girls are socialized to be palatable, agreeable, and accommodating. We absorb the subtle message that to be loved is to be low-maintenance. We learn to minimize our anger, mute our ambition, and apologize for our boundaries.

To step into wholeness, we must first name the bars of our cage. Is it the fear of being labeled "too much"? Is it the dread of disappointing others? When we see the cage clearly, we realize the key has been in our hands all along.`
    },
    {
      number: 3,
      title: 'The Alchemy of Fear',
      excerpt: 'Fear is not an indicator that you are on the wrong path; it is often proof that you are approaching the perimeter of your old comfort zone...',
      fullContent: `CHAPTER THREE: THE ALCHEMY OF FEAR

Fear is not an indicator that you are on the wrong path; it is often proof that you are approaching the perimeter of your old comfort zone.

In Western culture, fear is treated as an enemy to be suppressed or eliminated. In somatic healing, fear is simply unintegrated energy seeking direction. When we meet fear with curious presence rather than resistance, it transforms into focused authority.`
    }
  ]
};

export const BOOKS: BookItem[] = [
  FEATURED_BOOK,
  {
    id: 'moral-decadence-among-the-youth',
    title: 'Moral Decadence Among the Youth',
    subtitle: 'A wake-up call for parents, educators, and a generation in search of its soul',
    author: 'Merit Nene Chuks',
    priceHardcover: 13.99,
    priceDigital: 6.99,
    priceBundle: 19.99,
    priceHardcoverNGN: 10000,
    priceDigitalNGN: 5000,
    priceBundleNGN: 14000,
    coverImage: '/images/books/moral-decadence-among-the-youth.jpeg',
    category: 'Youth',
    shortDescription:
      'A frank, compassionate examination of the moral currents pulling at today\'s young people — and the practical scaffolding parents and educators can offer.',
    fullDescription:
      'Moral Decadence Among the Youth is a frank, compassionate examination of the moral currents pulling at today\'s young people. Drawing on clinical insight, cultural observation, and lived experience, Merit Nene Chuks offers parents, educators, and mentors a clear-eyed framework for guiding the next generation back to character, discernment, and inner authority — without shaming the very youth we are trying to reach.',
    synopsis:
      'Moral Decadence Among the Youth is a frank, compassionate examination of the moral currents pulling at today\'s young people.',
    specifications: {
      pages: 218,
      language: 'English',
      publisher: 'Soulsysta Press',
      isbn: '978-1-954321-01-5',
    },
    testimonials: [
      {
        author: 'Pastor Tunde Bakare',
        role: 'Youth Mentor, Lagos',
        quote:
          'A clear-eyed, unsentimental book. Merit writes with the authority of a clinician and the tenderness of an aunt who refuses to give up on a generation.',
      },
      {
        author: 'Mrs. Adaeze Okafor',
        role: 'Secondary School Principal',
        quote:
          'I have placed this book in our library. Every form teacher should read it. It has changed how I speak to my students.',
      },
    ],
    previewChapters: [
      {
        number: 1,
        title: 'The Crisis No One Will Name',
        excerpt:
          'Every generation accuses the next of moral decline. This time, the accusation is correct — and the reasons are not what most adults assume.',
        fullContent: `CHAPTER ONE: THE CRISIS NO ONE WILL NAME

Every generation accuses the next of moral decline. This time, the accusation is correct — and the reasons are not what most adults assume.

The youth are not broken. They are responding rationally to a system that has stopped offering them a coherent story about who they are and what they are for. When a society cannot transmit meaning, it transmits despair. The visible moral collapse is downstream of the invisible collapse of meaning.`
      },
    ],
  },
  {
    id: 'delilahs-traits',
    title: "Delilah's Traits",
    subtitle: 'Recognizing the patterns that disarm, distort, and derail a woman\'s purpose',
    author: 'Merit Nene Chuks',
    priceHardcover: 29.99,
    priceDigital: 14.99,
    priceBundle: 45.00,
    priceHardcoverNGN: 20000,
    priceDigitalNGN: 10000,
    priceBundleNGN: 30000,
    coverImage: '/images/books/delilahs-traits.jpeg',
    category: 'Empowerment',
    shortDescription:
      'A clinical, biblical, and deeply personal exploration of the seven subtle patterns that quietly dismantle a woman\'s authority.',
    fullDescription:
      'Delilah\'s Traits is a clinical, biblical, and deeply personal exploration of the seven subtle patterns that quietly dismantle a woman\'s authority. From seduction disguised as softness to approval as a substitute for self, Merit names what most books tiptoe around — and offers the reader a step-by-step path back to their own center.',
    synopsis:
      'A clinical, biblical, and deeply personal exploration of the seven subtle patterns that quietly dismantle a woman\'s authority.',
    specifications: {
      pages: 286,
      language: 'English',
      publisher: 'Soulsysta Press',
      isbn: '978-1-954321-02-2',
    },
    testimonials: [
      {
        author: 'Bishop Nkechi Obi',
        role: 'Author & Conference Speaker',
        quote:
          'I have been waiting for a book that names the patterns without condemning the women caught in them. This is that book.',
      },
    ],
    previewChapters: [
      {
        number: 1,
        title: 'The Woman Behind the Story',
        excerpt:
          'Delilah is not a character study. She is a mirror. Every woman who reads this book will recognize at least three of her own traits in these pages.',
        fullContent: `CHAPTER ONE: THE WOMAN BEHIND THE STORY

Delilah is not a character study. She is a mirror. Every woman who reads this book will recognize at least three of her own traits in these pages.

The danger is not in seeing her. The danger is in calling her wisdom strength.`
      },
    ],
  },
  {
    id: 'the-breadwinners-shoes',
    title: "The Breadwinner's Shoes",
    subtitle: 'A woman\'s field guide to carrying provision without losing herself',
    author: 'Merit Nene Chuks',
    priceHardcover: 29.99,
    priceDigital: 14.99,
    priceBundle: 45.00,
    priceHardcoverNGN: 20000,
    priceDigitalNGN: 10000,
    priceBundleNGN: 30000,
    coverImage: '/images/books/the-breadwinners-shoes.jpeg',
    category: 'Empowerment',
    badge: 'New',
    shortDescription:
      'A field guide for the woman who carries provision — for her family, her team, her community — without losing her own soul in the process.',
    fullDescription:
      'The Breadwinner\'s Shoes is a field guide for the woman who carries provision — for her family, her team, her community — without losing her own soul in the process. With clinical precision and pastoral warmth, Merit offers the financial, emotional, and relational architecture required to lead provision without collapsing under its weight.',
    synopsis:
      'A field guide for the woman who carries provision — for her family, her team, her community — without losing her own soul.',
    specifications: {
      pages: 312,
      language: 'English',
      publisher: 'Soulsysta Press',
      isbn: '978-1-954321-03-9',
    },
    testimonials: [
      {
        author: 'Tara Fela-Durotoye',
        role: 'Founder, House of Tara',
        quote:
          'Every woman who carries a household, a payroll, or a vision should read this. It is a masterclass in sustainable provision.',
      },
    ],
    previewChapters: [
      {
        number: 1,
        title: 'The Shoes Are Not The Woman',
        excerpt:
          'Provision is a calling. It is also a weight. The mistake is not in carrying it; the mistake is in believing the shoes are you.',
        fullContent: `CHAPTER ONE: THE SHOES ARE NOT THE WOMAN

Provision is a calling. It is also a weight. The mistake is not in carrying it; the mistake is in believing the shoes are you.`
      },
    ],
  },
  {
    id: 'parting-gifts',
    title: 'Parting Gifts',
    subtitle: 'What the women who raised us never got to say',
    author: 'Merit Nene Chuks',
    priceHardcover: 24.99,
    priceDigital: 12.99,
    priceBundle: 36.99,
    priceHardcoverNGN: 17000,
    priceDigitalNGN: 8500,
    priceBundleNGN: 25000,
    coverImage: '/images/books/parting-gifts.jpeg',
    category: 'Memoir',
    shortDescription:
      'A tender, lyrical collection of letters to the women whose love shaped us — and whose unfinished words we still carry.',
    fullDescription:
      'Parting Gifts is a tender, lyrical collection of letters to the women whose love shaped us — mothers, grandmothers, aunties, mentors — and whose unfinished words we still carry. A book to be read in one sitting and revisited for a lifetime.',
    synopsis:
      'A tender, lyrical collection of letters to the women whose love shaped us — and whose unfinished words we still carry.',
    specifications: {
      pages: 184,
      language: 'English',
      publisher: 'Soulsysta Press',
      isbn: '978-1-954321-04-6',
    },
    testimonials: [
      {
        author: 'Lola Shoneyin',
        role: 'Author & Literary Curator',
        quote: 'A small, devastating book. I cried on the train. Then I read it again.',
      },
    ],
    previewChapters: [
      {
        number: 1,
        title: 'For the Mother Who Stayed',
        excerpt:
          'I understand now. The silence was not absence. It was a different language of presence I was too young to translate.',
        fullContent: `FOR THE MOTHER WHO STAYED

I understand now. The silence was not absence. It was a different language of presence I was too young to translate.`
      },
    ],
  },
  {
    id: 'above-30-and-broke',
    title: 'Above 30 and Broke',
    subtitle: 'A financial and emotional reclamation manual for women who started late',
    author: 'Merit Nene Chuks',
    priceHardcover: 22.99,
    priceDigital: 11.99,
    priceBundle: 33.99,
    priceHardcoverNGN: 15000,
    priceDigitalNGN: 7500,
    priceBundleNGN: 22000,
    coverImage: '/images/books/above-30-and-broke.jpeg',
    category: 'Finance',
    shortDescription:
      'A financial and emotional reclamation manual for women who started late — without shame, hustle-culture, or the word "broke" as an identity.',
    fullDescription:
      'Above 30 and Broke is a financial and emotional reclamation manual for women who started late. With zero shame and a healthy disdain for hustle-culture, Merit walks the reader through a 12-month path from scarcity consciousness to sustainable wealth — beginning with the inner architecture of money before the outer mechanics.',
    synopsis:
      'A financial and emotional reclamation manual for women who started late — without shame or hustle-culture.',
    specifications: {
      pages: 256,
      language: 'English',
      publisher: 'Soulsysta Press',
      isbn: '978-1-954321-05-3',
    },
    testimonials: [
      {
        author: 'Nimi Akinkugbe',
        role: 'Personal Finance Expert',
        quote:
          'The first money book I have recommended to my daughters. It does the inner work first, which is where every lasting change begins.',
      },
    ],
    previewChapters: [
      {
        number: 1,
        title: 'Broke Is a Story, Not a Salary',
        excerpt:
          'You do not have a money problem. You have a story about money that was written by people who never intended for you to read it.',
        fullContent: `CHAPTER ONE: BROKE IS A STORY, NOT A SALARY

You do not have a money problem. You have a story about money that was written by people who never intended for you to read it.`
      },
    ],
  },
];

export const ARTICLES: Article[] = [
  {
    id: 'somatic-restoration-science',
    title: 'The Neuroscience of Nervous System Calibration in Modern High-Performers',
    subtitle: 'Why traditional productivity models fail without somatic grounding',
    category: 'Healing',
    authorName: 'Merit Nene Chuks',
    authorRole: 'Founder & Lead Psychotherapist',
    authorAvatar: '/images/founder/merit-portrait.png',
    publishedDate: 'October 14, 2024',
    readTimeMinutes: 6,
    coverImage: '/images/brand/healing.jpg',
    featured: true,
    tags: ['Nervous System', 'Somatic Therapy', 'Burnout Recovery', 'Leadership'],
    content: `
### The Myth of Endless Resilience

For decades, leadership discourse has glorified cognitive grit—the ability to push through exhaustion, sleep deprivation, and psychological strain. However, modern neurobiology reveals a stark truth: **the human nervous system was never designed for perpetual alertness.**

When chronic sympathetic activation (fight-or-flight) becomes baseline, the prefrontal cortex begins to down-regulate. Strategic vision diminishes, emotional reactivity increases, and cellular inflammation rises.

### What is Somatic Regulation?

Somatic regulation is the intentional act of bringing the autonomic nervous system back into parasympathetic dominance (rest and digest). It goes far beyond passive relaxation.

Key practices include:
1. **Extended Exhalation Breathing**: Increasing the ratio of exhale to inhale (e.g., 4s inhale, 7s exhale) signals safety directly to the vagus nerve.
2. **Proprioceptive Grounding**: Bringing conscious tactile awareness to contact points between feet and earth.
3. **Thermal Calibration**: Using targeted temperature shifts to alter blood flow and reset neuro-receptors.

### Integrating Wholeness into Daily Practice

Wholeness is not something achieved at the end of a 10-year career; it is the prerequisite for sustainable impact today. When leaders operate from a calibrated nervous system, decisions become crisp, relationships deepen, and creativity flourishes effortlessly.
`
  },
  {
    id: 'reclaiming-silence-digital-age',
    title: 'Reclaiming Silence: Creating Spaces of Uninterrupted Presence',
    subtitle: 'Practical rituals to safeguard your cognitive bandwidth',
    category: 'Stillness',
    authorName: 'Elena Solis',
    authorRole: 'Master Somatic Practitioner',
    authorAvatar: '/images/brand/brand-03.jpg',
    publishedDate: 'November 02, 2024',
    readTimeMinutes: 5,
    coverImage: '/images/brand/brand-06.jpg',
    tags: ['Digital Detox', 'Mindfulness', 'Rituals', 'Inner Peace'],
    content: `
### The Currency of Attention

In our hyper-connected ecosystem, human attention has become the most contested commodity on Earth. Notifications, algorithms, and artificial urgency constantly fragment our mental field.

### Establishing the Morning Sanctuary

The first 30 minutes of waking dictate your nervous system state for the entire day. By withholding digital inputs during this sacred window, you allow your brain to transition naturally through theta and alpha brainwave states.

- Keep devices out of the sleeping chamber.
- Hydrate with warm herbal infusion before checking emails.
- Step outdoors to receive natural sunlight into the retina.
`
  },
  {
    id: 'youth-circle-manifesto',
    title: 'Youth Circle: Why Emotional Intelligence is the Greatest Asset for the Next Generation',
    subtitle: 'Nurturing confidence, boundaries, and purpose in young women',
    category: 'Youth Mentorship',
    authorName: 'Dr. Julian Vance',
    authorRole: 'Senior Clinical Psychologist',
    authorAvatar: '/images/brand/brand-02.jpg',
    publishedDate: 'November 20, 2024',
    readTimeMinutes: 7,
    coverImage: '/images/brand/brand-04.jpg',
    tags: ['Youth Mentorship', 'Emotional Intelligence', 'Self-Worth'],
    content: `
### Navigating the Modern Landscape for Young Women

The challenges facing young women today are fundamentally different from previous generations. Social media amplifies social comparison 24/7, while academic and career pressures mount earlier than ever.

### The Three Pillars of Youth Wholeness

1. **Self-Sovereignty**: Learning that one's worth is intrinsic, not derived from external approval.
2. **Boundary Literacy**: The vocabulary and confidence to say 'no' clearly and without guilt.
3. **Collective Support**: Surrounding oneself with mentors and peers who champion authentic expression.
`
  }
];

export const HERO_SLIDES = [
  {
    id: 1,
    title: 'Become Whole.\nLive Free.',
    subtitle: 'A luxury sanctuary for therapy, somatic wellness, literature, and transformational lifestyle for women and youth.',
    badge: 'EDITORIAL ZEN COLLECTION',
    imageUrl: '/images/brand/brand-02.jpg',
    ctaPrimary: 'Explore Rituals',
    ctaSecondary: 'Book Therapy Session',
    targetCategory: 'therapy'
  },
  {
    id: 2,
    title: 'SHE TOO CAN.',
    subtitle: 'The best-selling literary manifesto by Merit Nene Chuks. Break limits. Reclaim your power.',
    badge: 'PUBLISHING HOUSE',
    imageUrl: '/images/brand/brand-05.jpg',
    ctaPrimary: 'Order Hardcover',
    ctaSecondary: 'Read Preview Chapter',
    targetCategory: 'book'
  },
  {
    id: 3,
    title: 'Youth Circle Initiative',
    subtitle: 'Empowering young women (ages 14-22) with emotional intelligence, purpose, and unshakeable self-worth.',
    badge: 'SOCIAL IMPACT & MENTORSHIP',
    imageUrl: '/images/brand/brand-04.jpg',
    ctaPrimary: 'Join Youth Circle',
    ctaSecondary: 'Sponsor a Youth',
    targetCategory: 'youth'
  },
  {
    id: 4,
    title: 'Botanical Apothecary',
    subtitle: 'Restorative sensory chambers, organic hydrotherapy, and custom botanical infusions for visceral tension release.',
    badge: 'SPA & SENSORY LAB',
    imageUrl: '/images/services/massage-session.png',
    ctaPrimary: 'Reserve Sensory Chamber',
    ctaSecondary: 'Apothecary Products',
    targetCategory: 'spa'
  }
];

export const FOUNDER_TIMELINE = [
  { year: '2014', title: 'Clinical Foundations', description: 'Merit begins clinical practice in London, focusing on women navigating trauma, identity crisis, and executive burnout.' },
  { year: '2017', title: 'Somatic Integration', description: 'Pioneered the Soulsysta Somatic Method, combining cognitive depth psychology with ancestral breathwork.' },
  { year: '2020', title: 'Publishing "She Too Can."', description: 'Released the landmark manifesto, empowering over 50,000 women globally to break systemic limitations.' },
  { year: '2022', title: 'Youth Circle Foundation', description: 'Launched non-profit youth mentorship programs delivering free workshops in schools and rural communities.' },
  { year: '2025', title: 'Global Sanctuary Launch', description: 'Established state-of-the-art physical and virtual sanctuaries in London, Zurich, and digital chambers.' }
];

export const IMPACT_STATS = [
  { label: 'Lives Restored Annually', value: '12,500+' },
  { label: 'Youth Circle Fellows', value: '1,200+' },
  { label: 'Books Donated to Schools', value: '2,500+' },
  { label: 'Global Sanctuary Guests', value: '98.8%' }
];
