import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Film, Globe, Shield, Megaphone } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Film,
  Globe,
  Shield,
  Megaphone,
};

interface Project {
  title: string;
  category: string;
  description: string;
  tag: string;
  icon: string;
  color: string;
  iconColor: string;
}

interface PortfolioProps {
  projects: Project[];
}

export default function Portfolio({ projects }: PortfolioProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', ...Array.from(new Set(projects.map(p => p.tag)))];

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

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tag === activeFilter);

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dark-lighter/50"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" ref={ref}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            Our Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            Take a look at some of our finest work. Every project tells a unique story.
          </p>
        </div>

        {filters.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <Film className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No projects yet. Start adding some!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const IconComponent = iconMap[project.icon] || Film;
              return (
                <div
                  key={project.title + index}
                  className={`group relative rounded-2xl overflow-hidden bg-dark-card border border-white/5 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`relative h-48 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                    <IconComponent className={`w-16 h-16 ${project.iconColor} opacity-50 group-hover:scale-125 transition-transform duration-500`} />
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <ExternalLink className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white font-medium">
                      {project.tag}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-xs text-purple-400 font-medium mb-2">{project.category}</div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
