import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Shop Owner - Mira Road',
    role: 'Retail Business',
    content: 'Kravine Studios transformed our online presence completely. Our website looks amazing and sales have increased by 40% since launch. Highly recommended!',
    rating: 5,
    initials: 'SO',
    gradient: 'from-purple-500 to-blue-500',
  },
  {
    name: 'Mira Road School',
    role: 'Education',
    content: 'Their cyber safety implementation gave us complete peace of mind. Professional, thorough, and incredibly supportive throughout the entire process.',
    rating: 5,
    initials: 'MS',
    gradient: 'from-green-500 to-teal-500',
  },
  {
    name: 'Local Restaurant',
    role: 'Food & Beverage',
    content: 'The video they created for our grand opening went viral on social media! Our foot traffic doubled within the first week. Absolutely incredible work.',
    rating: 5,
    initials: 'LR',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    name: 'Tech Startup',
    role: 'Technology',
    content: 'Their social media strategy helped us grow from 500 to 10,000 followers in just 3 months. The content quality and engagement strategy is top-notch.',
    rating: 5,
    initials: 'TS',
    gradient: 'from-yellow-500 to-amber-500',
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-lighter/50"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" ref={ref}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-2xl transition-all duration-500 ${
                activeIndex === index
                  ? 'bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 scale-105'
                  : 'bg-dark-card border border-white/5'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setActiveIndex(index)}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-purple-500/30 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-xs">{testimonial.initials}</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-gray-500 text-xs">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'w-8 bg-purple-500' : 'w-2 bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
