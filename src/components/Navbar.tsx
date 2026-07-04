import { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onReserveClick: () => void;
  activeSection: string;
}

export default function Navbar({ onReserveClick, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
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

  const navLinks = [
    { name: 'Heritage Story', id: 'story' },
    { name: 'The Culinary Menu', id: 'menu' },
    { name: 'Flavor Matchmaker', id: 'matchmaker' },
    { name: 'Dining Experiences', id: 'zones' },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#fdfcf8]/95 backdrop-blur-md py-4 shadow-xs border-b border-stone-200'
          : 'bg-[#fdfcf8]/60 backdrop-blur-xs py-6 border-b border-stone-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[#1c1917]/20 overflow-hidden bg-stone-100">
            <UtensilsCrossed className="w-5 h-5 text-gold-500 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gold-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div>
            <span className="block font-serif text-xl lg:text-2xl font-bold tracking-widest text-[#1c1917] leading-none">
              THE ORA CAFE
            </span>
            <span className="block text-[9px] uppercase tracking-[0.3em] font-mono text-stone-500 mt-1">
              • Modern Indian •
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`nav-link-${link.id}`}
              onClick={() => scrollToSection(link.id)}
              className={`relative font-sans text-xs uppercase tracking-[0.15em] font-bold transition-colors duration-300 hover:text-gold-500 py-2 focus:outline-none cursor-pointer ${
                activeSection === link.id ? 'text-gold-500' : 'text-[#1c1917]'
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold-500"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:+919460351156"
            className="flex items-center gap-2 text-xs font-mono font-medium text-[#1c1917]/80 hover:text-gold-600 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-gold-500" />
            <span>+91 94603 51156</span>
          </a>
          <button
            id="nav-cta-reserve"
            onClick={onReserveClick}
            className="border border-[#1c1917] px-6 py-2.5 text-[10px] tracking-widest uppercase hover:bg-[#1c1917] hover:text-white transition-colors duration-300 rounded-none font-bold text-[#1c1917] bg-transparent cursor-pointer"
          >
            Book Table
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={onReserveClick}
            className="p-2 rounded-full border border-stone-200 bg-[#fdfcf8] text-gold-500"
            title="Book a table"
          >
            <Calendar className="w-4 h-4" />
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-stone-100 border border-stone-200 rounded-none text-stone-800 focus:outline-none focus:border-gold-500"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#fdfcf8] border-b border-stone-200 shadow-xl overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left font-serif text-base py-1 border-b border-stone-150 transition-colors uppercase tracking-wider ${
                    activeSection === link.id ? 'text-gold-500' : 'text-stone-800'
                  }`}
                >
                  {link.name}
                </button>
              ))}

              <div className="pt-4 flex flex-col gap-4 border-t border-stone-200">
                <a
                  href="tel:+919460351156"
                  className="flex items-center gap-3 text-sm font-mono text-stone-700 py-1"
                >
                  <Phone className="w-4 h-4 text-gold-500" />
                  <span>+91 94603 51156</span>
                </a>
                <button
                  id="mobile-reserve-cta"
                  onClick={() => {
                    setIsOpen(false);
                    onReserveClick();
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-gold-600 to-gold-500 text-black text-xs font-bold tracking-widest uppercase rounded-none flex items-center justify-center gap-2 shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  Reserve A Table
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
