import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Clients from './components/Clients';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminAuthModal from './components/AdminAuthModal';
import EditModeMenu from './components/EditModeMenu';
import TeamEditor from './components/TeamEditor';
import StatsEditor from './components/StatsEditor';
import SocialLinksEditor from './components/SocialLinksEditor';
import { Loader2 } from 'lucide-react';
import { fetchContent, saveContent, supabase } from './lib/supabase';

const defaultTeam = [
  { name: 'Abdurrahman Shaikh', role: 'Marketing Strategist', description: '', icon: 'BarChart', gradient: '' },
  { name: 'Amr Shaikh', role: 'Software Engineer', description: '', icon: 'Code', gradient: '' },
  { name: 'Fawzaan Shaikh', role: 'Video Director', description: '', icon: 'Video', gradient: '' },
  { name: 'Rehan Ansari', role: 'Growth Manager', description: '', icon: 'Megaphone', gradient: '' },
  { name: 'Talha Chougle', role: 'Security Specialist', description: '', icon: 'Shield', gradient: '' },
  { name: 'Uzair Karedia', role: 'IT Consultant', description: '', icon: 'Wrench', gradient: '' },
];

const defaultStats = [
  { number: '50+', label: 'Projects Done' },
  { number: '30+', label: 'Happy Clients' },
  { number: '6', label: 'Services' },
  { number: '24/7', label: 'Support' },
];

const defaultSocialLinks = {
  instagram: '',
  linkedin: '',
};

export default function App() {
  // Admin panel is temporarily disabled. Kept commented out for easy re-enabling later.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [showAuthModal, setShowAuthModal] = useState(false);
  // const [showEditMenu, setShowEditMenu] = useState(false);
  const [showTeamEditor, setShowTeamEditor] = useState(false);
  const [showStatsEditor, setShowStatsEditor] = useState(false);
  const [showSocialEditor, setShowSocialEditor] = useState(false);

  const [team, setTeam] = useState(defaultTeam);
  const [stats, setStats] = useState(defaultStats);
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks);
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  // Load all site content from Supabase on first mount so every visitor
  // sees the same, admin-edited content (not just the person who edited it).
  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      // Set a timeout to stop loading after 3 seconds even if Supabase fails
      const timeoutId = setTimeout(() => {
        if (cancelled) return;
        setIsLoadingContent(false);
      }, 3000);

      const [loadedTeam, loadedStats, loadedSocial] = await Promise.all([
        fetchContent('team', defaultTeam),
        fetchContent('stats', defaultStats),
        fetchContent('social', defaultSocialLinks),
      ]);

      clearTimeout(timeoutId);
      if (cancelled) return;
      setTeam(loadedTeam);
      setStats(loadedStats);
      setSocialLinks(loadedSocial);
      setIsLoadingContent(false);
    }

    loadAll();
    return () => {
      cancelled = true;
    };
  }, []);

  // Wrapped setters: update local state immediately (so the admin sees the
  // change right away) and persist to Supabase so everyone else gets it too.
  const handleSaveTeam = async (next: typeof defaultTeam) => {
    setTeam(next);
    await saveContent('team', next);
  };
  const handleSaveStats = async (next: typeof defaultStats) => {
    setStats(next);
    await saveContent('stats', next);
  };
  const handleSaveSocial = async (next: typeof defaultSocialLinks) => {
    setSocialLinks(next);
    await saveContent('social', next);
  };

  // Admin auth flow is temporarily disabled.
  // useEffect(() => {
  //   // Restore session on load, and stay in sync if it expires/changes.
  //   supabase.auth.getSession().then(({ data }) => {
  //     setIsAuthenticated(!!data.session);
  //   });

  //   const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setIsAuthenticated(!!session);
  //   });

  //   return () => listener.subscription.unsubscribe();
  // }, []);

  // const handleLogin = () => {
  //   setIsAuthenticated(true);
  //   setShowAuthModal(false);
  // };

  // const handleLogout = async () => {
  //   setShowEditMenu(false);
  //   await supabase.auth.signOut();
  // };

  if (isLoadingContent) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff' }}>
        <Loader2 style={{ width: '24px', height: '24px', color: '#2563eb', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div>

      <Navbar isAuthenticated={false} onToggleEdit={() => undefined} />
      <Hero />
      <Services />
      <About />
      <Clients />
      <Team team={team} />
      {/* <Testimonials /> */}
      <Contact />
      <Footer socialLinks={socialLinks} />

      {/* Admin features are disabled for now.
      {!isAuthenticated && (
        <button
          onClick={() => setShowAuthModal(true)}
          style={{
            position: 'fixed', bottom: '24px', right: '24px', zIndex: 50,
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 14px', background: '#ffffff',
            border: '1px solid #c7d4ed', borderRadius: '6px',
            color: '#0f172a', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
          }}
          aria-label="Admin"
        >
          <Settings size={14} />
          <span>Admin</span>
        </button>
      )}

      {isAuthenticated && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ padding: '6px 12px', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.2)', borderRadius: '6px', fontSize: '12px', fontWeight: 500, color: '#2563eb' }}>
            ✏️ Edit Mode
          </span>
          <button
            onClick={() => setShowEditMenu(true)}
            style={{ width: '38px', height: '38px', background: '#ffffff', border: '1px solid #c7d4ed', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', cursor: 'pointer' }}
            aria-label="Edit Menu"
          >
            <Settings size={16} />
          </button>
        </div>
      )}

      <AdminAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
      <EditModeMenu
        isOpen={showEditMenu}
        onClose={() => setShowEditMenu(false)}
        onManageTeam={() => { setShowEditMenu(false); setShowTeamEditor(true); }}
        onManageStats={() => { setShowEditMenu(false); setShowStatsEditor(true); }}
        onManageSocial={() => { setShowEditMenu(false); setShowSocialEditor(true); }}
        onLogout={handleLogout}
      />
      */}
      <TeamEditor
        isOpen={showTeamEditor}
        onClose={() => setShowTeamEditor(false)}
        team={team}
        onSave={handleSaveTeam}
      />
      <StatsEditor
        isOpen={showStatsEditor}
        onClose={() => setShowStatsEditor(false)}
        stats={stats}
        onSave={handleSaveStats}
      />
      <SocialLinksEditor
        isOpen={showSocialEditor}
        onClose={() => setShowSocialEditor(false)}
        links={socialLinks}
        onSave={handleSaveSocial}
      />
    </div>
  );
}
