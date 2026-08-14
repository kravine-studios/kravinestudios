import { Film, Shield, Globe, Megaphone, BarChart3, Mail, MapPin } from 'lucide-react';

const SocialIcons = {
  Instagram: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733-16z"/>
      <path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772"/>
    </svg>
  ),
  Youtube: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
    </svg>
  ),
};

interface SocialLinks { instagram: string; linkedin: string; }
interface FooterProps { socialLinks?: SocialLinks; }

export default function Footer({ socialLinks = { instagram: '', linkedin: '' } }: FooterProps) {
  const services = [
    { name: 'Video Editing', icon: Film },
    { name: 'Cyber Safety', icon: Shield },
    { name: 'Web Development', icon: Globe },
    { name: 'Social Media', icon: Megaphone },
    { name: 'Business Analytics', icon: BarChart3 },
  ];
  const quickLinks = ['Home', 'Services', 'About', 'Portfolio', 'Team', 'Contact'];
  const socials = [
    { Icon: SocialIcons.Instagram, href: socialLinks.instagram || '#', label: 'Instagram', active: !!socialLinks.instagram },
    { Icon: SocialIcons.LinkedIn, href: socialLinks.linkedin || '#', label: 'LinkedIn', active: !!socialLinks.linkedin },
  ];

  const colHead = (text: string) => (
    <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#cbd5e1', marginBottom: '20px' }}>
      {text}
    </div>
  );

  return (
    <footer style={{ background: '#0f172a', borderTop: '1px solid rgba(194, 214, 247, 0.18)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px' }} className="footer-grid">

          {/* Brand */}
          <div>
            <img src="/kravine-logo-new.png" alt="Kravine Studios" style={{ height: '34px', width: 'auto', objectFit: 'contain', marginBottom: '20px', display: 'block' }} />
            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '24px', maxWidth: '280px' }}>
              Full-service IT studio based in Mira Road. Video, web, security, and marketing for local businesses.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1' }}>
                <MapPin size={13} color="#60a5fa" />
                Mira Road, Maharashtra
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#cbd5e1' }}>
                <Mail size={13} color="#60a5fa" />
                kravinestudios@gmail.com
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            {colHead('Services')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {services.map(s => (
                <a key={s.name} href="#services" style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '13px', color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}
                >
                  <s.icon size={12} color="#60a5fa" />
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            {colHead('Navigation')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quickLinks.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: '13px', color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            {colHead('Follow')}
            <div style={{ display: 'flex', gap: '8px' }}>
              {socials.map(({ Icon, href, label, active }) => (
                <a key={label} href={href}
                  target={active ? '_blank' : undefined}
                  rel={active ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  style={{
                    width: '32px', height: '32px', borderRadius: '6px',
                    border: '1px solid rgba(194, 214, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: active ? '#60a5fa' : '#cbd5e1', textDecoration: 'none',
                    transition: 'border-color 0.15s ease, color 0.15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#93c5fd'; e.currentTarget.style.color = '#bfdbfe'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(194, 214, 247, 0.2)'; e.currentTarget.style.color = active ? '#60a5fa' : '#cbd5e1'; }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(194, 214, 247, 0.18)', marginTop: '48px', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '12px', color: '#cbd5e1' }}>
            © {new Date().getFullYear()} Kravine Studios. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" style={{ fontSize: '12px', color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.15s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
