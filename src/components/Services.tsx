import { Film, Shield, Wrench, Globe, Megaphone, BarChart3 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const services = [
  {
    icon: Film,
    title: 'Video Editing',
    description: 'Color grading, motion graphics, and post-production that make your footage look like it cost ten times more.',
    features: ['Color Grading', 'VFX & Motion', 'Sound Design', '4K Editing'],
  },
  {
    icon: Shield,
    title: 'Cyber Safety',
    description: 'Firewalls, audits, and threat monitoring so your business stays protected without you thinking about it.',
    features: ['Firewall Setup', 'Threat Detection', 'Data Protection', 'Security Audit'],
  },
  {
    icon: Wrench,
    title: 'IT Consultant',
    description: 'Hardware, software, networks — we fix it, set it up, and keep it running so you can focus on your work.',
    features: ['Hardware Repair', 'Software Setup', 'Network Config', 'System Recovery'],
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Fast, clean websites built for shops, schools, and businesses. Designed to convert visitors into customers.',
    features: ['Custom Design', 'E-Commerce', 'SEO Optimised', 'Mobile First'],
  },
  {
    icon: Megaphone,
    title: 'Social Media',
    description: 'Content and campaigns that build an audience over time — not just likes, but real business results.',
    features: ['Content Strategy', 'Ad Campaigns', 'Analytics', 'Brand Growth'],
  },
  {
    icon: BarChart3,
    title: 'Business Analytics',
    description: 'Straightforward data analysis that tells you what\'s working, what isn\'t, and what to do next.',
    features: ['Data Analysis', 'Reports', 'KPI Tracking', 'Growth Strategy'],
  },
];

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

export default function Services() {
  const { ref, visible } = useReveal();

  return (
    <section id="services" style={{ padding: '96px 0', background: '#ffffff' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div ref={ref} style={{ marginBottom: '56px', maxWidth: '520px' }}>
          <p className="eyebrow" style={{ marginBottom: '14px' }}>What we do</p>
          <h2 className="section-heading">
            Six ways we can help your business
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1px',
            background: '#e2e8f4',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className={`reveal${visible ? ' in' : ''}`}
                style={{
                  background: '#f4f7ff',
                  padding: '32px 28px',
                  position: 'relative',
                  overflow: 'hidden',
                  transitionDelay: `${i * 55}ms`,
                  cursor: 'default',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#edf4ff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#f4f7ff'; }}
              >
                {/* Background number — the signature */}
                <span
                  aria-hidden
                  style={{
                    position: 'absolute', bottom: '-8px', right: '16px',
                    fontSize: '96px', fontWeight: 700, lineHeight: 1,
                    color: '#dfeafc', userSelect: 'none', fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div style={{ position: 'relative' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <Icon size={22} color="#2563eb" />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#0f172a', marginBottom: '10px', letterSpacing: '-0.01em' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65, marginBottom: '20px' }}>
                    {service.description}
                  </p>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
