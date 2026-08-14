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
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '64px',
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

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 56px', width: '100%' }}>
        {/* Headline */}
        <h1 className="display" style={{ maxWidth: '780px', marginBottom: '28px' }}>
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
            }}
          >
            {words[wordIndex]}
          </span>
          <br />into work that gets results.
        </h1>

        {/* Subhead */}
        <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '520px', lineHeight: 1.65, marginBottom: '40px', fontWeight: 300 }}>
          Video editing, web development, cyber safety, and digital marketing, all under one roof and built for local businesses that want to grow.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '72px' }}>
          <a href="#services" className="btn btn-fill">
            See what we do
            <ArrowRight size={15} />
          </a>
          <a href="#portfolio" className="btn btn-outline">
            View our work
          </a>
        </div>


      </div>
    </section>
  );
}
