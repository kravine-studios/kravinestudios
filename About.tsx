import { useEffect, useRef, useState } from 'react';
import { Target, Award, Users, Zap } from 'lucide-react';

export default function About() {
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

  const stats = [
    { icon: Target, value: '100+', label: 'Projects Completed' },
    { icon: Award, value: '98%', label: 'Client Satisfaction' },
    { icon: Users, value: '50+', label: 'Active Clients' },
    { icon: Zap, value: '24/7', label: 'Support Available' },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div
            ref={ref}
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
              About Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
              Crafting Digital <br />
              <span className="gradient-text">Excellence</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              <span className="text-white font-semibold">Kravine Studios</span> is a full-service IT company based in 
              Mira Road, dedicated to helping businesses, shops, schools, and offices transform their digital presence.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Founded with a vision to make professional IT services accessible to everyone, we combine creativity with 
              technical expertise to deliver solutions that make a real difference. From stunning video productions to 
              bulletproof cybersecurity, our team of skilled professionals works tirelessly to exceed your expectations.
            </p>

            {/* Values */}
            <div className="space-y-4 mb-8">
              {[
                'Innovation-driven approach to every project',
                'Dedicated team of certified professionals',
                'Client-first philosophy with transparent communication',
              ].map((value, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats Grid */}
          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-dark-card border border-white/5 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-3xl font-black gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}

            {/* Decorative Card */}
            <div className="col-span-2 p-6 rounded-2xl bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20">
              <p className="text-gray-300 italic text-sm leading-relaxed">
                "We don't just build websites or edit videos — we craft digital experiences that leave lasting impressions 
                and drive real business results."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">KS</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Kravine Studios</div>
                  <div className="text-gray-500 text-xs">Mira Road, Maharashtra</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
