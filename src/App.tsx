import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminAuthModal from './components/AdminAuthModal';
import EditModeMenu from './components/EditModeMenu';
import ProjectsEditor from './components/ProjectsEditor';
import TeamEditor from './components/TeamEditor';
import StatsEditor from './components/StatsEditor';
import SocialLinksEditor from './components/SocialLinksEditor';
import { Settings, Loader2 } from 'lucide-react';
import { fetchContent, saveContent, supabase } from './lib/supabase';

// Default data
const defaultProjects = [
  {
    title: 'Cinematic Wedding Film',
    category: 'Video Editing',
    description: 'A breathtaking wedding video with cinematic color grading and emotional storytelling.',
    tag: 'Video',
    icon: 'Film',
    color: 'from-red-500/20 to-orange-500/20',
    iconColor: 'text-red-400',
  },
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Full-stack online store with payment integration and inventory management.',
    tag: 'Web',
    icon: 'Globe',
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
  {
    title: 'School Security System',
    category: 'Cyber Safety',
    description: 'Complete cybersecurity infrastructure for an educational institution.',
    tag: 'Security',
    icon: 'Shield',
    color: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
  },
  {
    title: 'Brand Social Campaign',
    category: 'Social Media',
    description: 'Viral social media campaign that increased engagement by 300%.',
    tag: 'Marketing',
    icon: 'Megaphone',
    color: 'from-yellow-500/20 to-amber-500/20',
    iconColor: 'text-yellow-400',
  },
  {
    title: 'Product Launch Video',
    category: 'Video Editing',
    description: 'Dynamic product showcase with motion graphics and 3D animations.',
    tag: 'Video',
    icon: 'Film',
    color: 'from-red-500/20 to-orange-500/20',
    iconColor: 'text-red-400',
  },
  {
    title: 'Restaurant Website',
    category: 'Web Development',
    description: 'Beautiful website with online ordering and table reservation system.',
    tag: 'Web',
    icon: 'Globe',
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
];

const defaultTeam = [
  { name: 'Rawo', role: 'Video Editing Lead', description: 'Master of cinematic storytelling and post-production wizardry.', icon: 'Video', gradient: 'from-red-500 to-orange-500' },
  { name: 'Talhew', role: 'Cyber Safety Expert', description: 'Guardian of digital security and threat prevention specialist.', icon: 'Shield', gradient: 'from-green-500 to-emerald-500' },
  { name: 'Uzains', role: 'IT Consultant', description: 'Hardware and software troubleshooting maestro.', icon: 'Code', gradient: 'from-blue-500 to-cyan-500' },
  { name: 'Abi', role: 'Web Developer', description: 'Crafting beautiful, responsive websites that convert.', icon: 'PenTool', gradient: 'from-purple-500 to-pink-500' },
  { name: 'Rehan', role: 'Web Developer', description: 'Full-stack developer with a passion for e-commerce solutions.', icon: 'Code', gradient: 'from-violet-500 to-purple-500' },
  { name: 'Few', role: 'Social Media Manager', description: 'Strategic content creator and brand growth specialist.', icon: 'Camera', gradient: 'from-yellow-500 to-amber-500' },
  { name: 'Ari', role: 'Marketing Strategist', description: 'Creative campaign designer with viral marketing expertise.', icon: 'BarChart', gradient: 'from-teal-500 to-green-500' },
  { name: 'Faz', role: 'Content Creator', description: 'Visual storyteller with a keen eye for engaging content.', icon: 'Camera', gradient: 'from-pink-500 to-rose-500' },
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showProjectsEditor, setShowProjectsEditor] = useState(false);
  const [showTeamEditor, setShowTeamEditor] = useState(false);
  const [showStatsEditor, setShowStatsEditor] = useState(false);
  const [showSocialEditor, setShowSocialEditor] = useState(false);

  const [projects, setProjects] = useState(defaultProjects);
  const [team, setTeam] = useState(defaultTeam);
  const [stats, setStats] = useState(defaultStats);
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks);
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  // Load all site content from Supabase on first mount so every visitor
  // sees the same, admin-edited content (not just the person who edited it).
  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      const [loadedProjects, loadedTeam, loadedStats, loadedSocial] = await Promise.all([
        fetchContent('projects', defaultProjects),
        fetchContent('team', defaultTeam),
        fetchContent('stats', defaultStats),
        fetchContent('social', defaultSocialLinks),
      ]);

      if (cancelled) return;
      setProjects(loadedProjects);
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
  const handleSaveProjects = async (next: typeof defaultProjects) => {
    setProjects(next);
    await saveContent('projects', next);
  };
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

  useEffect(() => {
    // Restore session on load, and stay in sync if it expires/changes.
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = async () => {
    setShowEditMenu(false);
    await supabase.auth.signOut();
  };

  if (isLoadingContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="noise-overlay"></div>

      <Navbar isAuthenticated={isAuthenticated} onToggleEdit={() => setShowEditMenu(!showEditMenu)} />
      <Hero stats={stats} />
      <Services />
      <About />
      <Portfolio projects={projects} />
      <Team team={team} />
      <Contact />
      <Footer socialLinks={socialLinks} />

      {!isAuthenticated && (
        <button
          onClick={() => setShowAuthModal(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-[#12121a] border border-purple-500/30 text-purple-400 hover:text-white hover:border-purple-500/60 hover:bg-[#1a1a2e] transition-all duration-300 shadow-lg shadow-purple-900/30 hover:shadow-purple-500/20 group"
          aria-label="Admin Settings"
        >
          <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
          <span className="text-sm font-medium hidden sm:inline">Admin</span>
        </button>
      )}

      {isAuthenticated && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          <span className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium">
            ✏️ Edit Mode
          </span>
          <button
            onClick={() => setShowEditMenu(true)}
            className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:-translate-y-0.5"
            aria-label="Edit Menu"
          >
            <Settings className="w-7 h-7" />
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
        onManageProjects={() => { setShowEditMenu(false); setShowProjectsEditor(true); }}
        onManageTeam={() => { setShowEditMenu(false); setShowTeamEditor(true); }}
        onManageStats={() => { setShowEditMenu(false); setShowStatsEditor(true); }}
        onManageSocial={() => { setShowEditMenu(false); setShowSocialEditor(true); }}
        onLogout={handleLogout}
      />
      <ProjectsEditor
        isOpen={showProjectsEditor}
        onClose={() => setShowProjectsEditor(false)}
        projects={projects}
        onSave={handleSaveProjects}
      />
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
