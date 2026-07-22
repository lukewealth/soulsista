import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, Users, ArrowRight, Play, Mic, Award, BookOpen } from 'lucide-react';
import { CONTACT } from '../shared/constants';

interface SpeakingPageProps {
  onOpenBooking: () => void;
}

export const SpeakingPage: React.FC<SpeakingPageProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const speakingTopics = [
    {
      id: '1',
      title: 'The Neuroscience of Somatic Healing',
      description: 'Explore how body-based therapy rewires trauma at the cellular level and promotes deep healing.',
      duration: '60-90 min',
      audience: 'Healthcare professionals, therapists, wellness practitioners',
      icon: Mic,
    },
    {
      id: '2',
      title: 'Breaking Generational Patterns',
      description: 'Practical strategies for identifying and transforming inherited behavioral patterns.',
      duration: '60 min',
      audience: 'Women\'s groups, corporate wellness, personal development',
      icon: Award,
    },
    {
      id: '3',
      title: 'From "She Too Can" to Real Change',
      description: 'How literature and storytelling can spark transformation in communities.',
      duration: '45-60 min',
      audience: 'Book clubs, literary events, educational institutions',
      icon: BookOpen,
    },
    {
      id: '4',
      title: 'Youth Empowerment in the Digital Age',
      description: 'Navigating mental health, identity, and purpose in an era of social media.',
      duration: '60 min',
      audience: 'Schools, youth organizations, parent groups',
      icon: Users,
    },
  ];

  const pastEvents = [
    {
      id: '1',
      title: 'Global Wellness Summit 2024',
      location: 'London, UK',
      date: 'March 2024',
      audience: '2,500+ attendees',
      image: '/images/events/public-speaking.png',
    },
    {
      id: '2',
      title: 'Women in Leadership Conference',
      location: 'New York, USA',
      date: 'January 2024',
      audience: '800+ attendees',
      image: '/images/brand/brand-02.jpg',
    },
    {
      id: '3',
      title: 'Youth Empowerment Summit',
      location: 'Lagos, Nigeria',
      date: 'November 2023',
      audience: '1,200+ attendees',
      image: '/images/brand/brand-04.jpg',
    },
  ];

  const handleBooking = () => {
    const message = 'Hello Soulsysta! I would like to inquire about booking Merit Nene Chuks for a speaking engagement.';
    window.open(
      `https://wa.me/${CONTACT.WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/events/public-speaking.png"
            alt="Speaking engagement"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/50 to-ivory" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Speaking & Events
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mt-4 mb-6">
              Inspire Transformation at Scale
            </h1>
            <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto">
              Book Merit Nene Chuks for your next conference, corporate event, or retreat
            </p>
          </motion.div>
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Keynote Topics
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mt-4">
              Transformative Presentations
            </h2>
            <p className="text-forest/70 mt-6 max-w-2xl mx-auto">
              Each presentation is customized to your audience and goals, combining research, 
              personal stories, and practical tools for lasting impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {speakingTopics.map((topic, idx) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-forest mb-3">
                    {topic.title}
                  </h3>
                  <p className="text-forest/70 mb-6">{topic.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-forest/60">
                      <Clock className="w-4 h-4" />
                      <span>{topic.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-forest/60">
                      <Users className="w-4 h-4" />
                      <span>{topic.audience}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    className="text-gold font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Book This Topic
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 px-6 bg-surface-container">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Past Engagements
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mt-4">
              Global Impact
            </h2>
            <p className="text-forest/70 mt-6 max-w-2xl mx-auto">
              Merit has spoken at major conferences and events worldwide, inspiring thousands 
              to embrace transformation and wholeness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-xl font-bold mb-2">{event.title}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-forest/60">
                    <Users className="w-4 h-4" />
                    <span>{event.audience}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-forest text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-gold mb-2">50+</div>
              <div className="text-sm text-white/70 uppercase tracking-wide">Speaking Engagements</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-gold mb-2">15+</div>
              <div className="text-sm text-white/70 uppercase tracking-wide">Countries</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-gold mb-2">10k+</div>
              <div className="text-sm text-white/70 uppercase tracking-wide">Lives Impacted</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-gold mb-2">98%</div>
              <div className="text-sm text-white/70 uppercase tracking-wide">Satisfaction Rate</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mb-6">
              Ready to Book?
            </h2>
            <p className="text-forest/70 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how Merit can inspire and transform your audience. 
              Contact us directly via WhatsApp to explore speaking opportunities.
            </p>
            <button
              onClick={handleBooking}
              className="px-10 py-4 bg-gold text-forest font-semibold rounded-full hover:bg-gold/90 transition-all shadow-xl inline-flex items-center gap-3 text-lg"
            >
              <Mic className="w-5 h-5" />
              Book Speaking Engagement
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
