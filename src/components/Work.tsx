import { ArrowUpRight, Building2, Coffee, Gamepad2, Gem, House, Utensils } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const projects = [
  { title: 'Café Website', icon: Coffee, description: 'A warm, inviting website for a local café.', url: 'https://cafe.kravinestudios.com/', screenshot: '/screenshots/cafe-kravine.png' },
  { title: 'Builder & Developer Site', icon: Building2, description: 'Showcasing developments, floor plans, and completed builds.', url: 'https://real-state-b.kravinestudios.com/', screenshot: '/screenshots/builder-kravine.png' },
  { title: 'Veg Restaurant Website', icon: Utensils, description: 'Menu, story, and reservations for a vegetarian dining experience.', url: 'https://veg-rest.kravinestudios.com/', screenshot: '/screenshots/rest-kravine.png' },
  { title: 'Gaming Café Website', icon: Gamepad2, description: 'Bold site for a gaming café — pricing, stations, and booking.', url: 'https://gaming-cafe.kravinestudios.com/', screenshot: '/screenshots/game-kravine.png' },
  { title: 'Real Estate Agency Site', icon: House, description: 'Property listings, agent profiles, and lead capture built to convert.', url: 'https://real-estate-a.kravinestudios.com/', screenshot: '/screenshots/estate-kravine.png' },
  { title: 'Jewellery Store', icon: Gem, description: 'Elegant jewellery brand — product showcase and shopping experience.', url: 'https://nacre-jewellery.kravinestudios.com/', screenshot: '/screenshots/jewellery-kravine.png' },
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
    <section id="portfolio" style={{ padding: '96px 0', background: '#ffffff', borderTop: '1px solid #e2e8f4' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: '56px' }}>
          <p className="eyebrow" style={{ marginBottom: '14px' }}>Our work</p>
          <h2 className="section-heading" style={{ marginBottom: '12px' }}>Websites we've built</h2>
        </div>

        <div ref={ref} className="work-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px' }}>
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`reveal${visible ? ' in' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #e2e8f4',
                borderRadius: '8px',
                overflow: 'hidden',
                textDecoration: 'none',
                background: '#ffffff',
                transitionDelay: `${i * 60}ms`,
                transition: 'opacity 0.5s ease, transform 0.5s ease, background 0.15s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#f4f7ff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#ffffff'; }}
            >
              <div style={{ height: '240px', overflow: 'hidden', background: '#f4f7ff' }}>
                <img
                  src={project.screenshot}
                  alt={project.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                />
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                  <project.icon size={19} color="#2563eb" aria-hidden="true" />
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
                    {project.title}
                  </h3>
                </div>
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
        @media (max-width: 600px) {
          #portfolio .work-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
