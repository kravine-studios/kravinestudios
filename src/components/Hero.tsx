import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const words = ['Videos', 'Websites', 'Brands', 'Businesses'];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % words.length);
        setFading(false);
      }, 250);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'clamp(82px, 10vw, 108px)',
        paddingBottom: 'clamp(28px, 5vw, 44px)',
        position: 'relative',
        overflow: 'hidden',
        background: '#ffffff',
      }}
    >
      {/* Subtle grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      {/* Accent glow — top left, quiet */}
      <div
        aria-hidden
        style={{
          position: 'absolute', top: '-120px', left: '-80px',
          width: '480px', height: '480px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="hero-content" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 24px)', width: '100%' }}>
        {/* Headline */}
        <h1 className="display hero-title" style={{ maxWidth: '760px', marginBottom: 'clamp(18px, 2vw, 24px)', lineHeight: 1.05 }}>
          We turn your{' '}
          <span
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#2563eb',
              display: 'inline-block',
              opacity: fading ? 0 : 1,
              transform: fading ? 'translateY(6px)' : 'translateY(0)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {words[wordIndex]}
          </span>{' '}
          into work that gets results.
        </h1>

        {/* Subhead */}
        <p style={{ fontSize: 'clamp(1rem, 1.7vw, 1.125rem)', color: '#64748b', maxWidth: '560px', lineHeight: 1.65, marginBottom: 'clamp(22px, 3vw, 36px)', fontWeight: 300 }}>
          Video editing, web development, cyber safety, and digital marketing, all under one roof and built for local businesses that want to grow.
        </p>

        {/* CTAs */}
        <div className="hero-cta" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <a href="#services" className="btn btn-fill" style={{ minWidth: 0 }}>
            See what we do
            <ArrowRight size={15} />
          </a>
          <a href="#portfolio" className="btn btn-outline" style={{ minWidth: 0 }}>
            View our work
          </a>
        </div>
      </div>

      <style>{`
        .hero-cta { display: flex; flex-wrap: wrap; gap: 12px; }
        .hero-cta .btn { min-width: 0; }
        @media (max-width: 520px) {
          .hero-cta { flex-direction: column; }
          .hero-cta .btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
