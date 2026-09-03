import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Work from './components/Work';
import Clients from './components/Clients';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
  instagram: 'https://www.instagram.com/kravine.studios',
  linkedin: 'https://www.linkedin.com/company/kravine-studios/',
};
export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Work />
      <Clients />
      <Team team={defaultTeam} />
      <Contact />
      <Footer socialLinks={defaultSocialLinks} />
    </div>
  );
}
