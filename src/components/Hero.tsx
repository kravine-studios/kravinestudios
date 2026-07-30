import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, ArrowRight } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
}

const PALETTE = ['#7c3aed', '#6366f1', '#3b82f6', '#14b8a6', '#8b5cf6', '#38bdf8'];

function randomColor(): string {
  return PALETTE[Math.floor(Math.random() * PALETTE.length)];
}

interface HeroProps {
  stats: { number: string; label: string }[];
}

export default function Hero({ stats }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);

  const words = ['Videos', 'Websites', 'Brands', 'Businesses', 'Dreams'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX;
    const y = e.clientY;
    mouseRef.current = { x, y };

    if (!hasInteracted) setHasInteracted(true);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTilt({ x: rotateX, y: rotateY });
  }, [hasInteracted]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    window.addEventListener('mousemove', handleMouseMove);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = [];
      const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 10000));
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          color: randomColor(),
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const animate = () => {
      time += 0.01;
      ctx.fillStyle = 'rgba(10, 10, 15, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const connectionDistance = 120;
      const mouseDistance = 250;

      // Breathing Core
      const coreRadius = 300 + Math.sin(time * 2) * 50;
      const coreGrad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, coreRadius);
      coreGrad.addColorStop(0, 'rgba(124, 58, 237, 0.15)');
      coreGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.05)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseDistance - distance) / mouseDistance;
          p.vx += forceDirectionX * force * 0.5;
          p.vy += forceDirectionY * force * 0.5;
        } else {
          p.vx += (p.baseX - p.x) * 0.0005;
          p.vy += (p.baseY - p.y) * 0.0005;
        }

        p.vx *= 0.95;
        p.vy *= 0.95;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distX = p.x - p2.x;
          const distY = p.y - p2.y;
          const dist = Math.sqrt(distX * distX + distY * distY);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124, 58, 237, ${1 - dist / connectionDistance})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        if (distance < mouseDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance / mouseDistance})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      if (mouse.x > 0) {
        const cursorGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 150);
        cursorGrad.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        cursorGrad.addColorStop(0.2, 'rgba(124, 58, 237, 0.15)');
        cursorGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = cursorGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 150, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [handleMouseMove]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#0a0a0f]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ cursor: 'none' }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0f_100%)] pointer-events-none z-10"></div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>

      <div
        ref={containerRef}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center perspective-1000"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
        >
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 relative">
          <span className="block text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">We Transform</span>
          <span className="block mt-2 relative">
            <span className="gradient-text animate-gradient">{words[currentWord]}</span>
          </span>
          <span className="block text-white mt-1 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Into Digital Art</span>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full animate-pulse"></div>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed drop-shadow-md">
          From <span className="text-white font-semibold">video editing</span> to
          <span className="text-white font-semibold"> cyber safety</span>,
          <span className="text-white font-semibold"> web development</span> to
          <span className="text-white font-semibold"> social media marketing</span> —
          we bring your vision to life with cutting-edge technology.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#services"
            className="group btn-primary px-8 py-4 rounded-2xl text-white font-semibold text-lg flex items-center gap-2 shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] transition-all duration-300"
          >
            Explore Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#portfolio"
            className="group px-8 py-4 rounded-2xl border border-gray-700 bg-white/5 backdrop-blur-sm text-gray-300 hover:text-white hover:border-purple-500/50 hover:bg-white/10 font-semibold text-lg flex items-center gap-2 transition-all duration-300 hover:-translate-y-1"
          >
            <Play className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
            View Our Work
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group cursor-default">
              <div className="text-3xl sm:text-4xl font-black gradient-text group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]">{stat.number}</div>
              <div className="text-sm text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {!hasInteracted && (
          <div className="mt-16 flex flex-col items-center justify-center gap-2 text-purple-400/60 animate-pulse">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
              <path d="M5 3l14 8-5 1-3 5-6-14z" />
            </svg>
            <span className="text-xs tracking-[0.2em] uppercase">Move cursor to interact</span>
          </div>
        )}
      </div>
    </section>
  );
}
