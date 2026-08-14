import { useState } from 'react';
import { Lock, Eye, EyeOff, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function AdminAuthModal({ isOpen, onClose, onLogin }: AdminAuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setIsSubmitting(false);
    if (signInError) { setError('Invalid credentials. Please try again.'); return; }
    onLogin();
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} onClick={onClose} />
      <div style={{
        position: 'relative', width: '100%', maxWidth: '380px',
        background: '#0f1729', border: '1px solid #1e2d4a', borderRadius: '10px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
      }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #1e2d4a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', background: 'rgba(47,128,237,0.12)', border: '1px solid rgba(47,128,237,0.2)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={14} color="#2F80ED" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0f4ff' }}>Admin access</div>
              <div style={{ fontSize: '12px', color: '#3a4a6a' }}>Sign in to edit content</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3a4a6a', padding: '4px', display: 'flex' }}>
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: '#7a8aaa', marginBottom: '6px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Email</label>
            <input type="email" required value={email} placeholder="admin@example.com"
              onChange={e => { setEmail(e.target.value); setError(''); }}
              className="field" />
          </div>
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: '#7a8aaa', marginBottom: '6px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Password</label>
            <input type={showPassword ? 'text' : 'password'} required value={password} placeholder="••••••••"
              onChange={e => { setPassword(e.target.value); setError(''); }}
              className="field" style={{ paddingRight: '44px' }} />
            <button type="button" onClick={() => setShowPassword(v => !v)}
              style={{ position: 'absolute', right: '12px', bottom: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#3a4a6a', display: 'flex' }}>
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {error && (
            <div style={{ padding: '10px 14px', borderRadius: '6px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', fontSize: '13px', color: '#fca5a5' }}>
              {error}
            </div>
          )}
          <button type="submit" disabled={isSubmitting} className="btn btn-fill"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
            <Lock size={14} />
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
