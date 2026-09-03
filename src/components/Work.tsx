import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const projects = [
  { title: 'Café Website', category: 'Food & Beverage', description: 'A warm, inviting website for a local café.', url: 'https://cafe.kravinestudios.com/', screenshot: '/screenshots/cafe-kravine.png' },
  { title: 'Builder & Developer Site', category: 'Real Estate', description: 'Showcasing developments, floor plans, and completed builds.', url: 'https://real-state-b.kravinestudios.com/', screenshot: '/screenshots/builder-kravine.png' },
  { title: 'Veg Restaurant', category: 'Food & Beverage', description: 'Menu, story, and reservations for a vegetarian dining experience.', url: 'https://veg-rest.kravinestudios.com/', screenshot: '/screenshots/rest-kravine.png' },
  { title: 'Gaming Café', category: 'Entertainment', description: 'Bold site for a gaming café — pricing, stations, and booking.', url: 'https://gaming-cafe.kravinestudios.com/', screenshot: '/screenshots/game-kravine.png' },
  { title: 'Real Estate Agency Site', category: 'Real Estate', description: 'Property listings, agent profiles, and lead capture built to convert.', url: 'https://real-estate-a.kravinestudios.com/', screenshot: '/screenshots/estate-kravine.png' },
  { title: 'Jewellery Store', category: 'E-Commerce', description: 'Elegant jewellery brand — product showcase and shopping experience.', url: 'https://nacre-jewellery.kravinestudios.com/', screenshot: '/screenshots/jewellery-kravine.png' },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function Work() {
  const { ref, visible } = useReveal();

  return (
    <section id="work" style={{ padding: '96px 0', background: '#ffffff', borderTop: '1px solid #e2e8f4' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: '56px' }}>
          <p className="eyebrow" style={{ marginBottom: '14px' }}>Our work</p>
          <h2 className="section-heading" style={{ marginBottom: '12px' }}>Websites we've built</h2>
        </div>

        <div ref={ref} style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f4' }}>
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`reveal${visible ? ' in' : ''}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                borderTop: i === 0 ? 'none' : '1px solid #e2e8f4',
                textDecoration: 'none',
                background: '#ffffff',
                transitionDelay: `${i * 60}ms`,
                transition: 'opacity 0.5s ease, transform 0.5s ease, background 0.15s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#f4f7ff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#ffffff'; }}
            >
              <div style={{ borderRight: '1px solid #e2e8f4', overflow: 'hidden', background: '#f4f7ff' }}>
                <img
                  src={project.screenshot}
                  alt={project.title}
                  loading="lazy"
                  style={{ width: '100%', height: '280px', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                />
              </div>
              <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
                <span className="card-meta" style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2563eb' }}>
                  {project.category}
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
                  {project.title}
                </h3>
                <p className="card-meta" style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.65, margin: 0 }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#2563eb', fontWeight: 500, marginTop: '4px' }}>
                  View live site <ArrowUpRight size={13} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          #work a { grid-template-columns: 1fr !important; }
          #work a img { height: 200px !important; }
          #work .card-meta { display: none !important; }
        }
      `}</style>
    </section>
  );
}
