import { useEffect, useRef, useState } from 'react';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const values = [
  "We scope projects honestly and don't upsell what you don't need.",
  'Every service comes with a dedicated point of contact — not a ticket queue.',
  "We're based in Mira Road. You can walk in, call, or message us.",
];

export default function About() {
  const { ref, visible } = useReveal();

  return (
    <section id="about" style={{ padding: '96px 0', background: '#f4f7ff', borderTop: '1px solid #e2e8f4' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div ref={ref} style={{ maxWidth: '620px' }}>
          <div className={`reveal${visible ? ' in' : ''}`}>
            <p className="eyebrow" style={{ marginBottom: '14px' }}>About Kravine Studios</p>
            <h2 className="section-heading" style={{ marginBottom: '24px' }}>
              A local studio that delivers like a bigger agency
            </h2>
            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.75, marginBottom: '16px' }}>
              We're a full-service IT studio based in Mira Road, Maharashtra. We work with shops, schools, offices, and growing businesses who need professional digital work without enterprise-level complexity or pricing.
            </p>
            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.75, marginBottom: '36px' }}>
              Our team brings video production, web development, cybersecurity, and marketing together in one place, so you don't have to manage four different agencies.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {values.map((v, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#2563eb', marginTop: '3px', flexShrink: 0, fontSize: '16px', lineHeight: 1 }}>—</span>
                  <span style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
