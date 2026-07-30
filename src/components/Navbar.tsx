import { useState, useEffect } from 'react';
import { Menu, X, ChevronUp } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  isAuthenticated?: boolean;
  onToggleEdit?: () => void;
}

export default function Navbar({ isAuthenticated, onToggleEdit }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-2xl shadow-purple-900/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#home" className="group">
              <Logo size="lg" className="group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_25px_rgba(59,165,246,0.5)]" />
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="ml-4 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Get Started
              </a>
              {isAuthenticated && (
                <button
                  onClick={onToggleEdit}
                  className="ml-2 px-4 py-2.5 bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-semibold rounded-xl hover:bg-green-500/30 transition-all duration-300"
                >
                  ✏️ Edit Mode
                </button>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-2 mx-4 glass rounded-2xl p-4 animate-slide-down">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block mt-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center font-semibold rounded-xl"
            >
              Get Started
            </a>
          </div>
        )}
      </nav>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/25 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </>
  );
}
