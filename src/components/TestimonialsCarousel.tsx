import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
}

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Executive Director, Global Impact Fund',
      quote: 'Soulsysta transformed my approach to leadership. The somatic therapy sessions helped me release years of tension and find clarity I never thought possible. Merit\'s guidance is nothing short of life-changing.',
      rating: 5,
      image: '/images/brand/brand-01.jpg',
    },
    {
      id: 2,
      name: 'Dr. Amina Mansoor',
      role: 'Psychologist & Wellness Advocate',
      quote: 'As a mental health professional, I\'m incredibly selective about who I trust with my own healing. Soulsysta exceeded all expectations. The integration of clinical precision with spiritual wisdom is masterful.',
      rating: 5,
      image: '/images/brand/brand-02.jpg',
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Youth Circle Participant, Age 19',
      quote: 'The Youth Circle gave me tools to navigate anxiety and self-doubt that I use every single day. I feel empowered to speak my truth and set boundaries. This program changed my life.',
      rating: 5,
      image: '/images/brand/brand-04.jpg',
    },
    {
      id: 4,
      name: 'Chidimma Nwosu',
      role: 'Book Reader & Community Member',
      quote: '"She Too Can" arrived at the perfect moment in my journey. Merit\'s words resonated deeply with my experiences and gave me the courage to pursue my dreams. A must-read for every woman.',
      rating: 5,
      image: '/images/brand/brand-05.jpg',
    },
    {
      id: 5,
      name: 'Dr. Julian Vance',
      role: 'Neuroscience Researcher',
      quote: 'The evidence-based approach at Soulsysta is impressive. They\'ve successfully bridged the gap between traditional therapy and holistic wellness, creating something truly innovative and effective.',
      rating: 5,
      image: '/images/brand/brand-06.jpg',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-ivory overflow-hidden">
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
            Testimonials
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-forest mt-4">
            Voices of Transformation
          </h2>
          <p className="text-forest/70 mt-6 max-w-2xl mx-auto">
            Hear from those who have experienced the profound impact of Soulsysta Collective
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentTestimonial.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gold/20 shadow-lg">
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <Quote className="w-10 h-10 text-gold/30 mb-4 mx-auto md:mx-0" />
                  
                  {/* Rating */}
                  <div className="flex gap-1 justify-center md:justify-start mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-forest/80 text-lg leading-relaxed mb-6 italic">
                    "{currentTestimonial.quote}"
                  </p>

                  {/* Author */}
                  <div>
                    <h4 className="font-serif text-xl font-bold text-forest">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-sm text-forest/60 mt-1">
                      {currentTestimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-forest hover:text-ivory transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-forest hover:text-ivory transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'w-8 bg-gold' : 'w-2 bg-forest/20'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
