import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  isAuthenticated?: boolean;
  onToggleEdit?: () => void;
}

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ isAuthenticated, onToggleEdit }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(15, 23, 42, 0.92)' : '#0f172a',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(194, 214, 247, 0.18)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#home" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img
              src="/kravine-logo-new.png"
              alt="Kravine Studios"
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '4px' }}>
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  padding: '6px 14px',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#cbd5e1',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '12px' }}>
            {isAuthenticated && (
              <button
                onClick={onToggleEdit}
                style={{
                  padding: '6px 14px', fontSize: '13px', fontWeight: 500,
                  color: '#dbeafe', background: 'rgba(37, 99, 235, 0.12)',
                  border: '1px solid rgba(147, 197, 253, 0.4)', borderRadius: '6px', cursor: 'pointer',
                }}
              >
                ✏️ Edit
              </button>
            )}
            <a href="#contact" className="btn btn-fill" style={{ padding: '9px 20px', fontSize: '14px' }}>
              Get Started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(v => !v)}
            className="lg:hidden"
            style={{ background: 'none', border: 'none', color: '#e2e8f0', cursor: 'pointer', padding: '6px' }}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden slide-down"
          style={{
            background: '#0f172a',
            borderTop: '1px solid rgba(194, 214, 247, 0.18)',
            padding: '12px 24px 20px',
          }}
        >
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                display: 'block', padding: '11px 0', fontSize: '15px',
                color: '#cbd5e1', borderBottom: '1px solid rgba(194, 214, 247, 0.12)', textDecoration: 'none',
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="btn btn-fill"
            style={{ display: 'block', textAlign: 'center', marginTop: '16px', width: '100%', justifyContent: 'center' }}
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}
