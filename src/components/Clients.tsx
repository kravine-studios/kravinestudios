const clients = [
  { name: 'Client One', logo: '/client-logo1.png' },
  { name: 'Client Two', logo: '/client-logo2.png' },
  { name: 'Client Three', logo: '/client-logo3.png' },
];

export default function Clients() {
  return (
    <section id="portfolio" style={{ padding: '96px 0', background: '#f4f7ff', borderTop: '1px solid #e2e8f4' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: '56px' }}>
          <p className="eyebrow" style={{ marginBottom: '14px' }}>Clients</p>
          <h2 className="section-heading">Businesses we've worked with</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1px',
          background: '#e2e8f4',
          borderRadius: '10px',
          overflow: 'hidden',
        }}>
          {clients.map((client, i) => (
            <div
              key={i}
              style={{
                background: '#ffffff',
                height: '280px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px 64px',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f8fbff')}
              onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
            >
              <img
                src={client.logo}
                alt={client.name}
                style={{
                  maxHeight: '160px',
                  maxWidth: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                  opacity: 0.75,
                  transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.75')}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
