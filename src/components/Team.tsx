import { useEffect, useRef, useState } from 'react';
import { Video, Shield, Code, PenTool, Camera, BarChart, Globe, Wrench, Megaphone } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Video, Shield, Code, PenTool, Camera, BarChart, Globe, Wrench, Megaphone,
};

interface TeamMember {
  name: string; role: string; description: string; icon: string; gradient: string;
}
interface TeamProps { team: TeamMember[]; }

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

export default function Team({ team }: TeamProps) {
  const { ref, visible } = useReveal();
  if (team.length === 0) return null;

  const sortedTeam = [...team].sort((a, b) => a.name.localeCompare(b.name));
  const roleIconMap: Record<string, string> = {
    'Marketing Strategist': 'BarChart',
    'Software Engineer': 'Code',
    'Video Director': 'Video',
    'Growth Manager': 'Megaphone',
    'Security Specialist': 'Shield',
    'IT Consultant': 'Wrench',
  };

  return (
    <section id="team" style={{ padding: '96px 0', background: '#ffffff', borderTop: '1px solid #e2e8f4' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div ref={ref} style={{ marginBottom: '48px' }}>
          <p className="eyebrow" style={{ marginBottom: '14px' }}>Who we are</p>
          <h2 className="section-heading">The people behind the work</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '10px',
        }}>
          {sortedTeam.slice(0, 6).map((member, i) => {
            const iconKey = member.icon || roleIconMap[member.role] || 'Code';
            const Icon = iconMap[iconKey] || Code;
            return (
              <div
                key={member.name + i}
                className={`reveal${visible ? ' in' : ''}`}
                style={{
                  background: '#f4f7ff',
                  border: '1px solid #e2e8f4',
                  borderRadius: '10px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transitionDelay: `${i * 40}ms`,
                  transition: 'border-color 0.15s ease, transform 0.15s ease, opacity 0.5s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#c7d4ed';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#e2e8f4';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: '40px', height: '40px', flexShrink: 0,
                  background: 'rgba(37, 99, 235, 0.08)',
                  border: '1px solid rgba(37, 99, 235, 0.15)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color="#2563eb" />
                </div>

                {/* Name + role */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {member.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {member.role}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
