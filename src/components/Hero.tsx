import { ArrowRight, Star, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onReserveClick: () => void;
  onExploreMenuClick: () => void;
}

export default function Hero({ onReserveClick, onExploreMenuClick }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fdfcf8] pt-28 pb-16">
      {/* Decorative vertical editorial line accents */}
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-stone-100 hidden lg:block" />
      <div className="absolute right-10 top-0 bottom-0 w-[1px] bg-stone-100 hidden lg:block" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
        {/* Fine intro badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 border border-stone-200 bg-white/80 backdrop-blur-md mb-6 shadow-xs"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-stone-700">
            Reservations Open • The Grandstand, Bhilwara
          </span>
        </motion.div>

        {/* Majestic Title in Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#1c1917] leading-tight mb-8"
        >
          Sensory Dining <br />
          <span className="font-serif italic font-light text-gold-600 block md:inline md:ml-3">
            Reinvented.
          </span>
        </motion.h1>



        {/* Atmospheric philosophy text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-stone-700 font-sans text-sm md:text-base max-w-xl px-4 mb-10 leading-relaxed font-light"
        >
          Discover <span className="text-gold-600 font-medium font-serif">The Ora Cafe</span>, where centuries-old slow cooking, aromatic royal spices, and contemporary culinary theater unite to create an extraordinary modern Indian feast.
        </motion.p>

        {/* CTA Button Pairs (Square, elegant, high font weighting) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-book-cta"
            onClick={onReserveClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#1c1917] text-white font-bold text-[10px] uppercase tracking-[0.25em] rounded-none hover:bg-gold-600 transition-all duration-300 shadow-md cursor-pointer"
          >
            Secure An Experience
          </button>
          
          <button
            id="hero-explore-cta"
            onClick={onExploreMenuClick}
            className="w-full sm:w-auto px-8 py-3.5 border border-[#1c1917] bg-transparent text-[#1c1917] font-bold text-[10px] uppercase tracking-[0.25em] rounded-none hover:bg-stone-50 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Read Our Menu</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Quick summary specs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-3 gap-6 lg:gap-12 border-t border-stone-200 pt-10 mt-16 max-w-3xl w-full"
        >
          <div className="text-center font-sans border-r border-stone-100 last:border-0">
            <div className="font-serif text-2xl lg:text-3xl font-semibold text-gold-600">4.9 ★</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-stone-500 mt-2">Michelin Star Quality</div>
          </div>
          <div className="text-center font-sans border-r border-stone-100 last:border-0 font-sans">
            <div className="font-serif text-2xl lg:text-3xl font-semibold text-gold-600 font-serif">24hr</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-stone-500 mt-2">Slow Cooked Dal Ora</div>
          </div>
          <div className="text-center font-sans">
            <div className="font-serif text-2xl lg:text-3xl font-semibold text-gold-600">100%</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-stone-500 mt-2">Organic Artisanal Paneer</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
