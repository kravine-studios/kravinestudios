import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Work from './components/Work';
import Clients from './components/Clients';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
      <Products />
      <Contact />
      <Footer socialLinks={defaultSocialLinks} />
    </div>
  );
}
