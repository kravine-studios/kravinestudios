import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';

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

export default function Contact() {
  const { ref, visible } = useReveal();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(trimmed)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailToValidate = formData.email.trim();
    const nextEmailError = validateEmail(emailToValidate);
    setEmailError(nextEmailError);

    if (nextEmailError) {
      return;
    }

    setIsSending(true);
    const payload = {
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'd08575c4-b240-4f7b-849e-1d733620cf2d',
      subject: `New contact from ${formData.name} – Kravine Studios`,
      from_name: formData.name,
      email: emailToValidate,
      phone: formData.phone || 'Not provided',
      service: formData.service || 'Not specified',
      message: formData.message,
      replyto: emailToValidate,
    };
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Check your connection and try again.');
    } finally {
      setIsSending(false);
    }
  };

  const label = (text: string) => (
    <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#64748b', marginBottom: '7px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
      {text}
    </label>
  );

  return (
    <section id="contact" style={{ padding: '96px 0', background: '#f4f7ff', borderTop: '1px solid #e2e8f4' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
        <div ref={ref} style={{ marginBottom: '48px' }}>
          <p className="eyebrow" style={{ marginBottom: '14px' }}>Start a project</p>
          <h2 className="section-heading" style={{ marginBottom: '16px' }}>
            Tell us what you need
          </h2>
          <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.65 }}>
            Send us a message and we'll follow up within 24 hours with a clear plan and honest pricing.
          </p>
        </div>

        <div className={`reveal${visible ? ' in' : ''}`}>
          <form
            onSubmit={handleSubmit}
            style={{ background: '#ffffff', border: '1px solid #e2e8f4', borderRadius: '10px', padding: '40px' }}
          >
            {isSubmitted && (
              <div style={{ marginBottom: '24px', padding: '14px 16px', borderRadius: '6px', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.2)', fontSize: '14px', color: '#1d4ed8' }}>
                Message sent. We'll be in touch soon.
              </div>
            )}
            {error && (
              <div style={{ marginBottom: '24px', padding: '14px 16px', borderRadius: '6px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', fontSize: '14px', color: '#b91c1c' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="form-row">
              <div>
                {label('Full Name *')}
                <input type="text" required value={formData.name} placeholder="Your name"
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="field" />
              </div>
              <div>
                {label('Email *')}
                <input
                  type="email"
                  required
                  value={formData.email}
                  placeholder="you@email.com"
                  onChange={e => {
                    const value = e.target.value;
                    setFormData({ ...formData, email: value });
                    setEmailError(validateEmail(value));
                  }}
                  onBlur={() => setEmailError(validateEmail(formData.email))}
                  className="field"
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? 'email-error' : undefined}
                />
                {emailError && (
                  <div id="email-error" style={{ marginTop: '8px', fontSize: '12px', color: '#b91c1c' }}>
                    {emailError}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="form-row">
              <div>
                {label('Phone')}
                <input type="tel" value={formData.phone} placeholder="+91 XXXXX XXXXX"
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="field" />
              </div>
              <div>
                {label('Service')}
                <select value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })} className="field">
                  <option value="">Select a service</option>
                  <option value="video">Video Editing</option>
                  <option value="cyber">Cyber Safety</option>
                  <option value="tech">IT Consultant</option>
                  <option value="web">Web Development</option>
                  <option value="social">Social Media</option>
                  <option value="analytics">Business Analytics</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '28px' }}>
              {label('Message *')}
              <textarea required rows={5} value={formData.message} placeholder="Tell us about your project…"
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="field" style={{ resize: 'none' }} />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="btn btn-fill"
              style={{ width: '100%', justifyContent: 'center', padding: '14px 24px', fontSize: '15px', opacity: isSending ? 0.6 : 1, cursor: isSending ? 'not-allowed' : 'pointer' }}
            >
              <Send size={15} />
              {isSending ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
