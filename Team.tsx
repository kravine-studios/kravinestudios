import { useEffect, useRef, useState } from 'react';
import { Video, Shield, Code, PenTool, Camera, BarChart, Globe, Wrench } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Video,
  Shield,
  Code,
  PenTool,
  Camera,
  BarChart,
  Globe,
  Wrench,
};

interface TeamMember {
  name: string;
  role: string;
  description: string;
  icon: string;
  gradient: string;
}

interface TeamProps {
  team: TeamMember[];
}

export default function Team({ team }: TeamProps) {
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

  if (team.length === 0) return null;

  return (
    <section id="team" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" ref={ref}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            Our Team
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            Meet The <span className="gradient-text">Experts</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            Our talented team of professionals brings diverse skills and creative energy to every project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => {
            const IconComponent = iconMap[member.icon] || Code;
            return (
              <div
                key={member.name + index}
                className={`group relative p-6 rounded-2xl bg-dark-card border border-white/5 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2 text-center ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} mx-auto mb-5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-purple-400 font-medium mb-3">{member.role}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{member.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
