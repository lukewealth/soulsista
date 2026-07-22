import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Check, ArrowRight, Sparkles, Users, BookOpen, TreePine } from 'lucide-react';
import { CONTACT } from '../shared/constants';

interface DonationSectionProps {
  onOpenBooking: () => void;
}

export const DonationSection: React.FC<DonationSectionProps> = ({ onOpenBooking }) => {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');

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
      highlighted: false,
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
      highlighted: false,
    },
  ];

  const impactStats = [
    { label: 'THERAPY & MENTORSHIP', percentage: 45 },
    { label: 'RESOURCES & KITS', percentage: 30 },
    { label: 'COMMUNITY SPACES', percentage: 25 },
  ];

  const handleDonate = (tierName: string) => {
    const amount = frequency === 'one-time' 
      ? tiers.find(t => t.id === tierName)?.oneTime 
      : tiers.find(t => t.id === tierName)?.monthly;
    
    const message = `Hello Soulsysta! I would like to make a ${frequency} donation of ${amount} to support the ${tierName} initiative.`;
    window.open(
      `https://wa.me/${CONTACT.WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
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
            The Initiative
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mt-4">
            Investing in Collective Wholeness
          </h2>
          <p className="text-forest/70 mt-6 max-w-3xl mx-auto text-lg">
            Our mission is to democratize high-end wellness. Your contributions fuel{' '}
            <span className="italic">The Youth Circle</span> and{' '}
            <span className="italic">Rural Wellness</span> programs, providing premium mental 
            health and physical vitality resources to underserved communities.
          </p>
        </motion.div>

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

        {/* Donation Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {tiers.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  tier.highlighted ? 'ring-2 ring-gold/30' : ''
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-forest text-xs font-bold px-4 py-1 rounded-full">
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
                    onClick={() => handleDonate(tier.id)}
                    className="w-full py-3 bg-forest text-ivory font-semibold rounded-full hover:bg-forest/90 transition-all flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Choose Impact
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Impact Transparency */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-serif text-3xl font-bold text-forest mb-6">
                Transparency in Every Breath
              </h3>
              <p className="text-forest/70 mb-8 leading-relaxed">
                We believe in radical stewardship. Every dollar is filtered through our intention 
                of sustainable equity. Here is how your investment is allocated.
              </p>

              <div className="space-y-6">
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
            </div>

            <div className="relative">
              <img
                src="/images/brand/brand-03.jpg"
                alt="Community impact"
                className="w-full rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg max-w-[200px]">
                <p className="text-3xl font-bold text-forest mb-1">12k+</p>
                <p className="text-xs font-semibold text-forest/70 uppercase">
                  Lives Restored Annually
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-forest/70 mb-6">
            Ready to make a difference? Connect with us directly.
          </p>
          <button
            onClick={() => handleDonate('custom')}
            className="px-8 py-4 bg-gold text-forest font-semibold rounded-full hover:bg-gold/90 transition-all shadow-xl inline-flex items-center gap-2"
          >
            <Heart className="w-5 h-5" />
            Support via WhatsApp
          </button>
        </motion.div>
      </div>
    </section>
  );
};
