import { useEffect, useRef, useState } from 'react';
import { BarChart3, CalendarDays, ContactRound, Package, Pill, ShieldCheck, Store, Workflow } from 'lucide-react';

const products = [
  {
    name: 'BakeTrack',
    category: 'Bakery POS',
    icon: Store,
    accent: '#d97706',
    purpose: 'Tracks bakery sales, daily revenue, profit, and products from one point-of-sale dashboard.',
    preview: 'bakery',
    image: '/screenshots/saas/bake-track.png',
  },
  {
    name: 'MedTrack',
    category: 'Pharmacy management',
    icon: Pill,
    accent: '#0891b2',
    purpose: 'Manages pharmacy sales, medicine batches, stock levels, and expiry alerts in one system.',
    preview: 'pharmacy',
    image: '/screenshots/saas/medtrack.png',
  },
  {
    name: 'QuickStock',
    category: 'Retail & wholesale POS',
    icon: Package,
    accent: '#79513c',
    purpose: 'Supports retail and wholesale checkout with product lookup, cart management, and discounts.',
    preview: 'pos',
    image: '/screenshots/saas/quick-stock.png',
  },
  {
    name: 'ShieldDesk',
    category: 'Security monitoring',
    icon: ShieldCheck,
    accent: '#15803d',
    purpose: 'Surfaces device health and account security alerts in a single dashboard.',
    preview: 'security',
  },
  {
    name: 'SignalBoard',
    category: 'Business analytics',
    icon: BarChart3,
    accent: '#0369a1',
    purpose: 'Turns everyday sales and operations data into easy-to-read business reports.',
    preview: 'analytics',
  },
  {
    name: 'ClientLoop',
    category: 'Customer relationship management',
    icon: ContactRound,
    accent: '#7c3aed',
    purpose: 'Organizes customer details, conversations, and follow-up tasks in one workspace.',
    preview: 'crm',
  },
];

function ProductPreview({ kind, accent, image, name }: { kind: string; accent: string; image?: string; name: string }) {
  const muted = '#94a3b8';
  const line = '#e2e8f0';
  const cell: React.CSSProperties = { background: '#ffffff', border: `1px solid ${line}`, borderRadius: '5px' };

  if (image) {
    return (
      <div role="img" aria-label={`${name} product screenshot`} style={{ aspectRatio: '2.2', background: '#f8fafc', overflow: 'hidden' }}>
        <img src={image} alt={name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
      </div>
    );
  }

  return (
    <div aria-label="Sample product interface preview" role="img" style={{ aspectRatio: '1.65', background: '#f8fafc', padding: '12px', overflow: 'hidden' }}>
      <div style={{ height: '100%', background: '#ffffff', border: `1px solid ${line}`, borderRadius: '6px', overflow: 'hidden' }}>
        <div style={{ height: '24px', borderBottom: `1px solid ${line}`, display: 'flex', alignItems: 'center', gap: '4px', padding: '0 9px' }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#fca5a5' }} />
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#fcd34d' }} />
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#86efac' }} />
          <span style={{ marginLeft: '8px', width: '32%', height: '6px', borderRadius: '4px', background: '#edf2f7' }} />
        </div>
        <div style={{ padding: '12px', height: 'calc(100% - 24px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ width: '28%', height: '7px', borderRadius: '4px', background: '#334155' }} />
            <span style={{ width: '12%', height: '13px', borderRadius: '4px', background: `${accent}20` }} />
          </div>

          {kind === 'automation' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: '5px', alignItems: 'center', height: '65%' }}>
              {['New lead', 'Assign', 'Follow-up'].map((item, index) => (
                <div key={item} style={{ ...cell, minWidth: 0, padding: '6px 4px', textAlign: 'center' }}>
                  <div style={{ width: '12px', height: '12px', margin: '0 auto 5px', borderRadius: '4px', background: `${accent}20` }} />
                  <span style={{ color: muted, fontSize: '7px', whiteSpace: 'nowrap' }}>{item}</span>
                  {index < 0 && <span />}
                </div>
              ))}
              <span style={{ color: accent, fontSize: '10px', textAlign: 'center' }}>›</span>
              <span style={{ color: accent, fontSize: '10px', textAlign: 'center' }}>›</span>
            </div>
          )}

          {kind === 'inventory' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
              {['In stock', 'Low stock', 'On order'].map((item, index) => (
                <div key={item} style={{ ...cell, padding: '6px' }}>
                  <div style={{ width: '55%', height: '5px', background: '#e2e8f0', borderRadius: '3px', marginBottom: '5px' }} />
                  <div style={{ color: index === 1 ? '#c2410c' : accent, fontSize: '8px', fontWeight: 600 }}>{['128', '06', '14'][index]} <span style={{ color: muted, fontWeight: 400 }}>{item}</span></div>
                </div>
              ))}
              <div style={{ gridColumn: '1 / -1', marginTop: '2px' }}>
                {[0, 1].map(row => <div key={row} style={{ height: '5px', width: row === 0 ? '85%' : '68%', background: '#e2e8f0', borderRadius: '4px', marginTop: '5px' }} />)}
              </div>
            </div>
          )}

          {kind === 'schedule' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '8px', height: '68%' }}>
              <div style={{ ...cell, padding: '6px', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px' }}>
                {Array.from({ length: 21 }, (_, index) => <span key={index} style={{ borderRadius: '2px', background: index === 9 || index === 15 ? `${accent}35` : '#f1f5f9' }} />)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center' }}>
                {[0, 1, 2].map(row => <div key={row} style={{ ...cell, height: '15px', display: 'flex', alignItems: 'center', padding: '0 5px', gap: '4px' }}><span style={{ width: '4px', height: '7px', background: accent, borderRadius: '3px' }} /><span style={{ width: '48%', height: '4px', background: '#e2e8f0', borderRadius: '3px' }} /></div>)}
              </div>
            </div>
          )}

          {kind === 'security' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
              {['Devices protected', 'Accounts checked', 'Updates current', 'Open alerts'].map((item, index) => (
                <div key={item} style={{ ...cell, padding: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '15px', height: '15px', borderRadius: '4px', background: index === 3 ? '#fff7ed' : `${accent}18`, flexShrink: 0 }} />
                  <span style={{ minWidth: 0, color: muted, fontSize: '7px' }}>{item}<br /><b style={{ color: index === 3 ? '#c2410c' : '#334155', fontSize: '8px' }}>{['24 / 24', '18 / 18', 'Up to date', '2 to review'][index]}</b></span>
                </div>
              ))}
            </div>
          )}

          {kind === 'analytics' && (
            <div style={{ ...cell, height: '70%', padding: '8px 10px 5px', display: 'flex', alignItems: 'end', gap: '7px' }}>
              {[35, 55, 43, 78, 62, 92, 70, 84].map((height, index) => <span key={index} style={{ height: `${height}%`, flex: 1, background: index === 5 ? accent : `${accent}55`, borderRadius: '3px 3px 0 0' }} />)}
            </div>
          )}

          {kind === 'crm' && (
            <div style={{ display: 'grid', gap: '5px' }}>
              {['A. Patel', 'M. Khan', 'S. Dsouza'].map((name, index) => (
                <div key={name} style={{ ...cell, minHeight: '22px', padding: '4px 7px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: `${accent}${index === 0 ? '35' : '18'}` }} />
                  <span style={{ color: '#475569', fontSize: '7px', flex: 1 }}>{name}</span>
                  <span style={{ width: '24%', height: '5px', borderRadius: '3px', background: '#e2e8f0' }} />
                  <span style={{ color: accent, fontSize: '7px' }}>{index === 0 ? 'Today' : 'Open'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

export default function Products() {
  const { ref, visible } = useReveal();

  return (
    <section id="products" style={{ padding: '96px 0', background: '#ffffff', borderTop: '1px solid #e2e8f4' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div ref={ref} style={{ maxWidth: '620px', marginBottom: '48px' }}>
          <p className="eyebrow" style={{ marginBottom: '14px' }}>Product concepts</p>
          <h2 className="section-heading" style={{ marginBottom: '14px' }}>Software built for everyday business</h2>
        </div>

        <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px' }}>
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <article
                key={product.name}
                className={`reveal${visible ? ' in' : ''}`}
                style={{ background: '#f4f7ff', border: '1px solid #e2e8f4', borderRadius: '8px', overflow: 'hidden', transitionDelay: `${index * 45}ms` }}
              >
                <div style={{ position: 'relative' }}>
                  <ProductPreview kind={product.preview} accent={product.accent} image={product.image} name={product.name} />
                  <span style={{ position: 'absolute', right: '20px', bottom: '20px', background: 'rgba(255,255,255,0.94)', border: '1px solid #e2e8f4', borderRadius: '4px', padding: '4px 7px', color: '#64748b', fontSize: '10px' }}>
                    Sample preview
                  </span>
                </div>

                <div style={{ padding: '22px 22px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '8px' }}>
                    <span style={{ width: '30px', height: '30px', borderRadius: '6px', background: `${product.accent}12`, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                      <Icon size={16} color={product.accent} />
                    </span>
                    <div>
                      <h3 style={{ margin: 0, color: '#0f172a', fontSize: '16px', fontWeight: 650 }}>{product.name}</h3>
                      <span style={{ color: product.accent, fontSize: '11px' }}>{product.category}</span>
                    </div>
                  </div>
                  <p style={{ color: '#475569', fontSize: '13px', lineHeight: 1.6, margin: '12px 0 0' }}>{product.purpose}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          #products .products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}