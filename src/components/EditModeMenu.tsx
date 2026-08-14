import { Users, BarChart3, Link2, LogOut, X, ChevronRight } from 'lucide-react';

interface EditModeMenuProps {
  isOpen: boolean; onClose: () => void;
  onManageTeam: () => void;
  onManageStats: () => void; onManageSocial: () => void; onLogout: () => void;
}

export default function EditModeMenu({ isOpen, onClose, onManageTeam, onManageStats, onManageSocial, onLogout }: EditModeMenuProps) {
  if (!isOpen) return null;

  const items = [
    { label: 'Team', icon: Users, color: '#2F80ED', onClick: onManageTeam },
    { label: 'Stats', icon: BarChart3, color: '#2F80ED', onClick: onManageStats },
    { label: 'Social links', icon: Link2, color: '#2F80ED', onClick: onManageSocial },
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '16px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} onClick={onClose} />
      <div style={{
        position: 'relative', width: '100%', maxWidth: '280px',
        background: '#0f1729', border: '1px solid #1e2d4a', borderRadius: '10px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #1e2d4a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#f0f4ff' }}>Edit content</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3a4a6a', display: 'flex' }}>
            <X size={15} />
          </button>
        </div>

        <div style={{ padding: '8px' }}>
          {items.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.label} onClick={item.onClick} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '6px', border: 'none', background: 'none',
                cursor: 'pointer', textAlign: 'left',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                <div style={{ width: '30px', height: '30px', background: 'rgba(47,128,237,0.1)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={14} color={item.color} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#f0f4ff', flex: 1 }}>{item.label}</span>
                <ChevronRight size={13} color="#3a4a6a" />
              </button>
            );
          })}
        </div>

        <div style={{ borderTop: '1px solid #1e2d4a', padding: '8px' }}>
          <button onClick={onLogout} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 12px', borderRadius: '6px', border: 'none', background: 'none', cursor: 'pointer',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.06)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            <div style={{ width: '30px', height: '30px', background: 'rgba(239,68,68,0.08)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <LogOut size={14} color="#ef4444" />
            </div>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#ef4444' }}>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
