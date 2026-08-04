import { 
  Film, Shield, Globe, Megaphone, BarChart3, 
  ArrowUpRight, Mail, MapPin
} from 'lucide-react';

// Custom Social Media SVG Icons
const SocialIcons = {
  Instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
    </svg>
  ),
  Youtube: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
};

interface SocialLinks {
  instagram: string;
  linkedin: string;
}

interface FooterProps {
  socialLinks?: SocialLinks;
}

export default function Footer({ socialLinks = { instagram: '', linkedin: '' } }: FooterProps) {
  const services = [
    { name: 'Video Editing', icon: Film },
    { name: 'Cyber Safety', icon: Shield },
    { name: 'Web Development', icon: Globe },
    { name: 'Social Media', icon: Megaphone },
    { name: 'Business Analytics', icon: BarChart3 },
  ];

  const quickLinks = ['Home', 'Services', 'About', 'Portfolio', 'Team', 'Contact'];
  const targetAudience = ['Shops', 'Schools', 'Offices', 'Businesses'];

  const socials = [
    { icon: SocialIcons.Instagram, href: socialLinks.instagram || '#', label: 'Instagram', active: !!socialLinks.instagram },
    { icon: SocialIcons.Twitter, href: '#', label: 'Twitter', active: false },
    { icon: SocialIcons.Youtube, href: '#', label: 'YouTube', active: false },
    { icon: SocialIcons.Facebook, href: '#', label: 'Facebook', active: false },
    { icon: SocialIcons.LinkedIn, href: socialLinks.linkedin || '#', label: 'LinkedIn', active: !!socialLinks.linkedin },
  ];

  return (
    <footer className="relative bg-dark-card border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-8 -ml-6">
              <img 
                src="/kravine-logo-new.png" 
                alt="Kravine Studios Logo" 
                className="h-20 w-auto object-contain transform scale-[2.5] origin-left" 
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your one-stop IT solution for video editing, web development, cyber safety, and digital marketing. Based in Mira Road, serving clients across Maharashtra.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                Mira Road, Maharashtra, India
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                kravinestudios@gmail.com
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-5">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a href="#services" className="flex items-center gap-2 text-gray-400 text-sm hover:text-purple-400 transition-colors">
                    <service.icon className="w-4 h-4 flex-shrink-0" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="flex items-center gap-2 text-gray-400 text-sm hover:text-purple-400 transition-colors">
                    <ArrowUpRight className="w-3 h-3" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Who We Serve */}
          <div>
            <h3 className="text-white font-semibold mb-5">Who We Serve</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {targetAudience.map((audience) => (
                <span key={audience} className="px-3 py-1.5 rounded-full bg-white/5 text-gray-400 text-xs border border-white/5">
                  {audience}
                </span>
              ))}
            </div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {socials.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.active ? '_blank' : undefined}
                    rel={social.active ? 'noopener noreferrer' : undefined}
                    className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 ${
                      social.active
                        ? 'text-purple-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10'
                        : 'text-gray-600 hover:text-gray-400'
                    }`}
                    aria-label={social.label}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Kravine Studios. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-500 text-sm hover:text-purple-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 text-sm hover:text-purple-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
