import { useEffect, useRef, useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsSending(true);

  const formPayload = {
    access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'd08575c4-b240-4f7b-849e-1d733620cf2d',
    subject: `New Contact from ${formData.name} - Kravine Studios`,
    from_name: formData.name,
    email: formData.email,
    phone: formData.phone || 'Not provided',
    service: formData.service || 'Not specified',
    message: formData.message,
    replyto: formData.email,
  };

  console.log('🚀 Submitting form with payload:', formPayload);

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formPayload),
    });

    console.log('📡 Response status:', response.status, response.statusText);
    
    const result = await response.json();
    console.log('📨 Response data:', result);

    if (response.ok && result.success) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
      console.log('✅ Form submitted successfully!');
    } else {
      const errorMsg = result.message || 'Failed to send message. Please try again.';
      setError(errorMsg);
      console.error('❌ Form submission failed:', result);
    }
  } catch (err) {
    setError('Network error. Please check your connection and try again.');
    console.error('❌ Fetch error:', err);
  } finally {
    setIsSending(false);
  }
};

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" ref={ref}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            Let's <span className="gradient-text">Talk</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-dark-card border border-white/5">
            {isSubmitted && (
              <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Message sent successfully! We'll get back to you soon.
              </div>
            )}{error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-medium">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-medium">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-medium">Phone (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2 font-medium">Service Needed</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all duration-300"
                >
                  <option value="" className="bg-dark">Select a service</option>
                  <option value="video" className="bg-dark">Video Editing</option>
                  <option value="cyber" className="bg-dark">Cyber Safety</option>
                  <option value="tech" className="bg-dark">IT Consultant</option>
                  <option value="web" className="bg-dark">Web Development</option>
                  <option value="social" className="bg-dark">Social Media Marketing</option>
                  <option value="analytics" className="bg-dark">Business Analytics</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2 font-medium">Message *</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your project..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all duration-300 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full btn-primary py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
