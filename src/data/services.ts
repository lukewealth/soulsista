export interface ServiceBenefit {
  icon: string;
  text: string;
}

export interface ServiceExpectation {
  title: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  duration: string;
  price: number;
  category: string;
  benefits: ServiceBenefit[];
  whatToExpect: ServiceExpectation[];
  perfectFor: string[];
  cta: string;
}

export const services: Service[] = [
  {
    id: 'aromatherapy-nervous-system-rest',
    title: 'Aromatherapy & Nervous System Rest',
    subtitle: 'Find Calm. Restore Balance. Feel Like Yourself Again.',
    description: 'Slow down and give your body the deep rest it deserves. Our Aromatherapy & Nervous System Rest sessions combine carefully selected essential oils with gentle relaxation techniques to help calm the mind, reduce stress, and restore emotional balance.',
    image: '/images/services/aromatherapy-nervous-system-rest.jpg',
    duration: '60-90 Minutes',
    price: 120,
    category: 'Wellness',
    benefits: [
      { icon: '🌿', text: 'Reduces stress and anxiety' },
      { icon: '💆', text: 'Promotes deep relaxation' },
      { icon: '😴', text: 'Improves sleep quality' },
      { icon: '💖', text: 'Supports emotional wellbeing' },
      { icon: '🧠', text: 'Helps restore mental clarity' },
      { icon: '✨', text: 'Encourages overall wellness' }
    ],
    whatToExpect: [
      {
        title: 'Consultation',
        description: 'Your session begins with a brief consultation to understand your needs.'
      },
      {
        title: 'Personalized Blend',
        description: 'A personalized blend of therapeutic essential oils is carefully selected for you.'
      },
      {
        title: 'Calming Experience',
        description: 'Enjoy a calming relaxation experience throughout your session.'
      },
      {
        title: 'Renewal',
        description: 'Leave feeling refreshed, grounded, and renewed.'
      }
    ],
    perfectFor: [
      'Professionals experiencing burnout',
      'Parents and caregivers',
      'Students under pressure',
      'Anyone seeking emotional balance',
      'Those needing restorative self-care'
    ],
    cta: 'Take the first step toward restoring your peace of mind.'
  },
  {
    id: 'youth-circle-purpose-leadership',
    title: 'Youth Circle: Purpose & Leadership Lab',
    subtitle: 'Empowering Young People to Lead with Purpose',
    description: 'The Youth Circle is a transformational leadership and personal development experience created to help young people discover purpose, build confidence, and develop practical leadership skills for life.',
    image: '/images/services/youth-circle-purpose-leadership.jpg',
    duration: 'Ongoing Program',
    price: 80,
    category: 'Youth',
    benefits: [
      { icon: '🎯', text: 'Leadership development' },
      { icon: '🔍', text: 'Purpose discovery' },
      { icon: '💪', text: 'Self-confidence building' },
      { icon: '🗣️', text: 'Communication skills' },
      { icon: '🎯', text: 'Goal setting and personal growth' },
      { icon: '🤝', text: 'Community building and networking' }
    ],
    whatToExpect: [
      {
        title: 'Interactive Workshops',
        description: 'Engage in dynamic, hands-on learning experiences.'
      },
      {
        title: 'Mentorship Sessions',
        description: 'Receive guidance from experienced leaders and mentors.'
      },
      {
        title: 'Group Discussions',
        description: 'Share insights and learn from peer perspectives.'
      },
      {
        title: 'Practical Activities',
        description: 'Apply leadership skills in real-world scenarios.'
      }
    ],
    perfectFor: [
      'Young adults seeking direction',
      'Students and graduates',
      'Emerging entrepreneurs',
      'Anyone passionate about personal growth',
      'Future community leaders'
    ],
    cta: 'Build the Leader Within. Join the Next Youth Circle.'
  },
  {
    id: 'postpartum-recovery-womb-rest',
    title: 'Postpartum Recovery & Womb Rest',
    subtitle: 'Gentle Healing for Mothers After Birth',
    description: 'Motherhood begins with recovery. Our Postpartum Recovery & Womb Rest service provides compassionate support for mothers during the weeks and months following childbirth. Every session is thoughtfully designed to encourage physical recovery, emotional wellbeing, and deep rest.',
    image: '/images/services/postpartum-recovery-womb-rest.jpg',
    duration: '90 Minutes',
    price: 150,
    category: 'Wellness',
    benefits: [
      { icon: '🌸', text: 'Supports postpartum healing' },
      { icon: '😌', text: 'Encourages deep relaxation' },
      { icon: '💆', text: 'Relieves physical tension' },
      { icon: '💖', text: 'Promotes emotional wellbeing' },
      { icon: '🌺', text: 'Supports gentle womb recovery' },
      { icon: '⏰', text: 'Provides dedicated time for self-care' }
    ],
    whatToExpect: [
      {
        title: 'Relaxation Therapies',
        description: 'Gentle techniques designed for postpartum bodies.'
      },
      {
        title: 'Comfort-Focused Care',
        description: 'Every aspect prioritizes your comfort and healing.'
      },
      {
        title: 'Aromatherapy Support',
        description: 'Carefully selected oils to support recovery.'
      },
      {
        title: 'Guided Breathing',
        description: 'Mindfulness and breathing techniques for restoration.'
      }
    ],
    perfectFor: [
      'New mothers in first weeks postpartum',
      'Mothers seeking holistic recovery',
      'Those needing intentional rest',
      'Mothers experiencing postpartum challenges',
      'Anyone in the postpartum journey'
    ],
    cta: 'Give Yourself the Care You Deserve. Schedule Your Recovery Session Today.'
  },
  {
    id: 'she-too-can-book',
    title: 'She Too Can',
    subtitle: 'A Guide to Breaking Limits & Reclaiming Power',
    description: 'An empowering guide for women ready to break through limitations, reclaim their authentic power, and step into their fullest potential. This transformative book combines personal stories, practical exercises, and spiritual wisdom.',
    image: '/images/services/she-too-can-book.jpg',
    duration: 'Self-Paced',
    price: 25,
    category: 'Books',
    benefits: [
      { icon: '📖', text: 'Transformative insights' },
      { icon: '💡', text: 'Practical exercises' },
      { icon: '🌟', text: 'Personal stories' },
      { icon: '🔑', text: 'Breaking limitations' },
      { icon: '💪', text: 'Reclaiming power' },
      { icon: '✨', text: 'Spiritual wisdom' }
    ],
    whatToExpect: [
      {
        title: 'Personal Stories',
        description: 'Real experiences from women who have transformed their lives.'
      },
      {
        title: 'Practical Exercises',
        description: 'Actionable steps to implement in your daily life.'
      },
      {
        title: 'Spiritual Wisdom',
        description: 'Deep insights to guide your journey.'
      },
      {
        title: 'Community Support',
        description: 'Connect with other women on similar paths.'
      }
    ],
    perfectFor: [
      'Women seeking transformation',
      'Those feeling stuck or limited',
      'Anyone ready to reclaim their power',
      'Women in transition',
      'Seekers of spiritual growth'
    ],
    cta: 'Begin Your Transformation Journey Today.'
  }
];

export const serviceCategories = [
  { id: 'all', label: 'All Services', icon: '✨' },
  { id: 'Wellness', label: 'Wellness', icon: '🌿' },
  { id: 'Youth', label: 'Youth', icon: '🌟' },
  { id: 'Books', label: 'Books', icon: '📚' }
];
