import { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    name: 'Shop Owner',
    role: 'Retail · Mira Road',
    content: 'Kravine Studios transformed our online presence completely. Our website looks amazing and sales have increased by 40% since launch.',
    initials: 'SO',
  },
  {
    name: 'Mira Road School',
    role: 'Education',
    content: 'Their cyber safety implementation gave us complete peace of mind. Professional, thorough, and incredibly supportive throughout.',
    initials: 'MS',
  },
  {
    name: 'Local Restaurant',
    role: 'Food & Beverage',
    content: 'The video they created for our grand opening went viral. Our foot traffic doubled within the first week.',
    initials: 'LR',
  },
  {
    name: 'Tech Startup',
    role: 'Technology',
    content: 'Their social media strategy helped us grow from 500 to 10,000 followers in three months. Real, measurable results.',
    initials: 'TS',
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function Testimonials() {
  const { ref, visible } = useReveal();

  return (
    <section style={{ padding: '96px 0', background: '#0a0f1e', borderTop: '1px solid #1e2d4a' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div ref={ref} style={{ marginBottom: '48px' }}>
          <p className="eyebrow" style={{ marginBottom: '14px' }}>Client results</p>
          <h2 className="section-heading">What clients say</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`reveal${visible ? ' in' : ''}`}
              style={{
                background: '#0f1729',
                border: '1px solid #1e2d4a',
                borderRadius: '10px',
                padding: '28px 24px',
                transitionDelay: `${i * 55}ms`,
                transition: 'border-color 0.2s ease, transform 0.2s ease, opacity 0.5s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = '#2a3f62';
                el.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = '#1e2d4a';
                el.style.transform = 'translateY(0)';
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                {Array.from({ length: 5 }).map((_, si) => (
                  <svg key={si} width="12" height="12" viewBox="0 0 24 24" fill="#2F80ED">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              <p style={{ fontSize: '14px', color: '#7a8aaa', lineHeight: 1.7, marginBottom: '24px' }}>
                "{t.content}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px', height: '32px', background: '#1e2d4a',
                  borderRadius: '6px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0,
                }}>
                  <span style={{ color: '#7a8aaa', fontWeight: 600, fontSize: '11px' }}>{t.initials}</span>
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f4ff' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: '#3a4a6a' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
