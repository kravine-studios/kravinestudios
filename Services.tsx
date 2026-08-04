import { Film, Shield, Wrench, Globe, Megaphone, BarChart3 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const services = [
  {
    icon: Film,
    title: 'Video Editing',
    description: 'Professional video editing with stunning effects, color grading, and post-production. From raw footage to cinematic masterpieces.',
    color: 'from-red-500 to-orange-500',
    iconColor: 'text-red-400',
    features: ['Color Grading', 'VFX & Motion', 'Sound Design', '4K Editing'],
  },
  {
    icon: Shield,
    title: 'Cyber Safety',
    description: 'Protect your digital assets with enterprise-grade security solutions, vulnerability assessments, and 24/7 monitoring.',
    color: 'from-green-500 to-emerald-500',
    iconColor: 'text-green-400',
    features: ['Firewall Setup', 'Threat Detection', 'Data Protection', 'Security Audit'],
  },
  {
    icon: Wrench,
    title: 'IT Consultant',
    description: 'Expert hardware and software troubleshooting, system maintenance, network setup, and technical support for all devices.',
    color: 'from-blue-500 to-cyan-500',
    iconColor: 'text-blue-400',
    features: ['Hardware Repair', 'Software Setup', 'Network Config', 'System Recovery'],
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Beautiful, responsive websites for shops, businesses, and schools. Custom designs that convert visitors into customers.',
    color: 'from-purple-500 to-pink-500',
    iconColor: 'text-purple-400',
    features: ['Custom Design', 'E-Commerce', 'SEO Optimized', 'Mobile First'],
  },
  {
    icon: Megaphone,
    title: 'Social Media Marketing',
    description: 'Grow your brand with strategic social media campaigns, content creation, audience engagement, and analytics.',
    color: 'from-yellow-500 to-amber-500',
    iconColor: 'text-yellow-400',
    features: ['Content Strategy', 'Ad Campaigns', 'Analytics', 'Brand Growth'],
  },
  {
    icon: BarChart3,
    title: 'Business Analytics',
    description: 'Data-driven insights to optimize your business. From data analysis to actionable strategies for growth and efficiency.',
    color: 'from-teal-500 to-green-500',
    iconColor: 'text-teal-400',
    features: ['Data Analysis', 'Reports', 'KPI Tracking', 'Growth Strategy'],
  },
];

function ServiceCard({ service, index, isVisible }: { service: typeof services[0]; index: number; isVisible: boolean }) {
  return (
    <div
      className={`group relative p-6 sm:p-8 rounded-2xl bg-dark-card border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/10 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

      <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <service.icon className="w-7 h-7 text-white" />
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
        {service.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        {service.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {service.features.map((feature, i) => (
          <span key={i} className="px-3 py-1 text-xs text-gray-400 bg-white/5 rounded-full border border-white/5">
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20" ref={ref}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            What We <span className="gradient-text">Offer</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            Comprehensive IT solutions tailored to your needs. From creative video production to robust cybersecurity, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
