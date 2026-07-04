import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import MenuSection from './components/MenuSection';
import TasteMatchmaker from './components/TasteMatchmaker';
import ReservationSection from './components/ReservationSection';
import Footer from './components/Footer';
import { Sparkles, Star, ShieldAlert, Heart, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Trigger smooth scroll to Booking section
  const handleScrollToBooking = () => {
    const element = document.getElementById('reservation');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Trigger smooth scroll to Menu section
  const handleScrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Intersection observer for scrollspy active link highlights
  useEffect(() => {
    const sections = ['story', 'menu', 'matchmaker', 'zones', 'reservation'];
    
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setActiveSection(id);
          }
        });
      }, {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '-80px 0px -20% 0px' // adjust for nav height
      });

      observer.observe(el);
      return { observer, el };
    });

    const handleScrollAtTop = () => {
      if (window.scrollY < 200) {
        setActiveSection('hero');
      }
    };
    window.addEventListener('scroll', handleScrollAtTop);

    return () => {
      observers.forEach(obs => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
      window.removeEventListener('scroll', handleScrollAtTop);
    };
  }, []);

  return (
    <div className="bg-[#090a0f] text-gray-100 min-h-screen selection:bg-gold-500 selection:text-black">
      {/* Premium Navbar */}
      <Navbar 
        onReserveClick={handleScrollToBooking} 
        activeSection={activeSection} 
      />

      {/* Hero Banner */}
      <Hero 
        onReserveClick={handleScrollToBooking} 
        onExploreMenuClick={handleScrollToMenu} 
      />

      {/* Master Heritage Story Section */}
      <StorySection />

      {/* Culinary Tabbed Menu section */}
      <MenuSection />

      {/* Palate quiz matchmaker engine */}
      <TasteMatchmaker onReserveClick={handleScrollToBooking} />

      {/* Static Visual Section explaining spatial areas */}
      <section id="zones" className="py-24 bg-[#090a0f] text-white scroll-mt-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-500 block mb-2">
              Bespoke Dining Atmospheres
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4">
              Explore Our Chambers
            </h2>
            <div className="w-12 h-[1px] bg-gold-500/60 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Zone 1 */}
            <div className="bg-[#12141c]/40 border border-white/5 rounded-xs p-8 flex flex-col justify-between group hover:border-gold-500/20 transition-all">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-gold-400 block mb-2">Imperial Opulence</span>
                <h3 className="font-serif text-xl font-semibold text-white mb-4">Royal Heritage Hall</h3>
                <p className="text-gray-400 text-xs font-sans font-light leading-relaxed mb-6">
                  Adorned with gold-trimmed masonry, hand-beaten Indian brass arches, and plush emerald velvet loungers, this main saloon radiates traditional colonial luxury.
                </p>
                <ul className="text-xs font-sans text-gray-500 space-y-2">
                  <li>• High-end chandeliers & warm lighting</li>
                  <li>• Bespoke royal table styling</li>
                  <li>• Traditional sitar melodies (soft bg)</li>
                </ul>
              </div>
              <button
                onClick={handleScrollToBooking}
                className="mt-8 text-xs font-mono uppercase tracking-wider text-gold-400 group-hover:text-gold-300 flex items-center gap-1 cursor-pointer"
              >
                Book Hall Table →
              </button>
            </div>

            {/* Zone 2 */}
            <div className="bg-[#12141c]/40 border border-white/5 rounded-xs p-8 flex flex-col justify-between group hover:border-gold-500/20 transition-all">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-gold-400 block mb-2">Nature Sanctuary</span>
                <h3 className="font-serif text-xl font-semibold text-white mb-4">The Monsoon Sanctuary</h3>
                <p className="text-gray-400 text-xs font-sans font-light leading-relaxed mb-6">
                  An open-air lush garden deck walled by organic jasmine screens, stardust lighting, and stone fountains, under a climate-adaptive glass canopy.
                </p>
                <ul className="text-xs font-sans text-gray-500 space-y-2">
                  <li>• Jasmine-infused outdoor atmosphere</li>
                  <li>• Flowing tranquil waters sounds</li>
                  <li>• Retractable glass rain shield</li>
                </ul>
              </div>
              <button
                onClick={handleScrollToBooking}
                className="mt-8 text-xs font-mono uppercase tracking-wider text-gold-400 group-hover:text-gold-300 flex items-center gap-1 cursor-pointer"
              >
                Book Terrace Table →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Booking Table wizard */}
      <ReservationSection />

      {/* Premium Footer with review slider coordinates */}
      <Footer />
    </div>
  );
                                                }
                                                
