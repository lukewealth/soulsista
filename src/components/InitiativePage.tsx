import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Check, Users, BookOpen, TreePine, Sparkles, MessageCircle } from 'lucide-react';
import { CONTACT } from '../shared/constants';

interface InitiativePageProps {
  onOpenBooking: () => void;
}

export const InitiativePage: React.FC<InitiativePageProps> = ({ onOpenBooking }) => {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedTier, setSelectedTier] = useState<string>('cultivate');

  const tiers = [
    {
      id: 'seed',
      name: 'Sow a Seed',
      icon: TreePine,
      oneTime: '$50',
      monthly: '$15/mo',
      description: 'Entry-level support for communal growth.',
      benefits: [
        'Provides 2 mentorship sessions',
        'Access to digital wellness kits',
      ],
    },
    {
      id: 'cultivate',
      name: 'Cultivate Change',
      icon: Heart,
      oneTime: '$150',
      monthly: '$45/mo',
      description: 'Deepening the roots of community wellness.',
      benefits: [
        '5 Private therapy sessions',
        'Community garden allocation',
        'Journaling workshops',
      ],
      highlighted: true,
    },
    {
      id: 'legacy',
      name: 'Legacy of Wholeness',
      icon: Sparkles,
      oneTime: '$500+',
      monthly: '$100+/mo',
      description: 'Strategic investment in sustainable vitality.',
      benefits: [
        'Full rural wellness pop-up event',
        '1-year scholarship for a youth member',
        'Name engraved in The Collective hall',
      ],
    },
  ];

  const impactStats = [
    { label: 'THERAPY & MENTORSHIP', percentage: 45 },
    { label: 'RESOURCES & KITS', percentage: 30 },
    { label: 'COMMUNITY SPACES', percentage: 25 },
  ];

  const handleDonate = (tierName: string) => {
    const tier = tiers.find(t => t.id === tierName);
    const amount = frequency === 'one-time' ? tier?.oneTime : tier?.monthly;
    
    const message = `Hello Soulsysta! I would like to make a ${frequency} donation of ${amount} to support the ${tierName} initiative.`;
    window.open(
      `https://wa.me/${CONTACT.WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/brand/brand-03.jpg"
            alt="Community gathering"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/40 to-ivory" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              The Initiative
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mt-4 mb-6 leading-tight">
              Investing in Collective Wholeness
            </h1>
            <div className="flex justify-center mt-8">
              <div className="w-px h-24 bg-white/40"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-forest leading-tight">
              Our mission is to democratize high-end wellness. Your contributions fuel{' '}
              <span className="italic font-normal">The Youth Circle</span> and{' '}
              <span className="italic font-normal">Rural Wellness</span> programs, providing premium mental health and physical vitality resources to underserved communities.
            </p>
            <div className="mt-12 flex justify-center gap-4">
              <span className="w-2 h-2 rounded-full bg-gold"></span>
              <span className="w-2 h-2 rounded-full bg-forest"></span>
              <span className="w-2 h-2 rounded-full bg-sage"></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="py-20 px-6 bg-surface-container">
        <div className="max-w-7xl mx-auto">
          {/* Frequency Toggle */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex p-1 bg-white rounded-full border border-forest/10 shadow-sm">
              <button
                onClick={() => setFrequency('one-time')}
                className={`px-8 py-2 rounded-full text-sm font-semibold transition-all ${
                  frequency === 'one-time'
                    ? 'bg-forest text-ivory'
                    : 'text-forest/70 hover:text-forest'
                }`}
              >
                ONE-TIME
              </button>
              <button
                onClick={() => setFrequency('monthly')}
                className={`px-8 py-2 rounded-full text-sm font-semibold transition-all ${
                  frequency === 'monthly'
                    ? 'bg-forest text-ivory'
                    : 'text-forest/70 hover:text-forest'
                }`}
              >
                MONTHLY
              </button>
            </div>
          </div>

          {/* Tiers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, idx) => {
              const Icon = tier.icon;
              const isSelected = selectedTier === tier.id;
              
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                    isSelected ? 'ring-2 ring-gold scale-105' : ''
                  }`}
                >
                  {tier.highlighted && (
                    <div className="bg-gold text-forest text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
                      MOST IMPACTFUL
                    </div>
                  )}

                  <div className="text-center">
                    <Icon className="w-12 h-12 text-gold mx-auto mb-6" />
                    <h3 className="font-serif text-2xl font-bold text-forest mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-forest/70 text-sm mb-8 h-12">
                      {tier.description}
                    </p>
                    <div className="text-3xl font-bold text-forest mb-8">
                      {frequency === 'one-time' ? tier.oneTime : tier.monthly}
                    </div>

                    <ul className="text-left space-y-3 mb-8 border-t border-forest/10 pt-6">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-forest/70">
                          <Check className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDonate(tier.id);
                      }}
                      className="w-full py-3 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-lg"
                    >
                      Choose Impact
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Transparency */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mb-8">
                Transparency in Every Breath
              </h2>
              <p className="text-forest/70 text-lg mb-12 leading-relaxed">
                We believe in radical stewardship. Every dollar is filtered through our intention of sustainable equity. Here is how your investment is allocated.
              </p>

              <div className="space-y-8">
                {impactStats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-semibold text-forest">
                        {stat.label}
                      </span>
                      <span className="text-lg font-bold text-gold">
                        {stat.percentage}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-forest/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.percentage}%` }}
                        transition={{ duration: 1, delay: idx * 0.2 }}
                        viewport={{ once: true }}
                        className="h-full bg-gold rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/images/brand/brand-04.jpg"
                alt="Community impact"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-2xl max-w-[240px]">
                <p className="text-3xl font-bold text-forest mb-1">12k+</p>
                <p className="text-sm font-semibold text-forest/70 uppercase">
                  Lives Restored Annually
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
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
              Our Programs
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mt-4">
              Where Your Impact Goes
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <Users className="w-12 h-12 text-gold mb-6" />
              <h3 className="font-serif text-2xl font-bold text-forest mb-4">
                Youth Circle
              </h3>
              <p className="text-forest/70 leading-relaxed">
                Empowering young women ages 14-22 through mentorship, leadership development, and community building.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <Heart className="w-12 h-12 text-gold mb-6" />
              <h3 className="font-serif text-2xl font-bold text-forest mb-4">
                Rural Wellness
              </h3>
              <p className="text-forest/70 leading-relaxed">
                Bringing premium mental health and wellness resources to underserved rural communities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <BookOpen className="w-12 h-12 text-gold mb-6" />
              <h3 className="font-serif text-2xl font-bold text-forest mb-4">
                Education & Books
              </h3>
              <p className="text-forest/70 leading-relaxed">
                Donating books and educational materials to schools and community centers worldwide.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mb-8">
              Ready to Make a Difference?
            </h2>
            <p className="text-forest/70 text-lg mb-12">
              Join us in creating a world where wellness is accessible to all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleDonate(selectedTier)}
                className="px-10 py-4 bg-gold text-forest font-semibold rounded-full hover:bg-gold/90 transition-all shadow-xl inline-flex items-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Donate via WhatsApp
              </button>
              <button
                onClick={onOpenBooking}
                className="px-10 py-4 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all shadow-xl inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
