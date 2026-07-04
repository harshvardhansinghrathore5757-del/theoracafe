import { useState, FormEvent } from 'react';
import { REVIEWS } from '../data/menu';
import { MapPin, Mail, Phone, Calendar, Clock, Star, Flame, Send, Check, Instagram, ExternalLink, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const [activeReview, setActiveReview] = useState<number>(0);
  const [subEmail, setSubEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (subEmail.trim() && /^\S+@\S+\.\S+$/.test(subEmail)) {
      setSubscribed(true);
      setSubEmail('');
    }
  };

  return (
    <footer className="bg-[#1c1917] text-stone-300 pt-20 border-t border-stone-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
        
        {/* Reviews Slider row (First block of social proof) */}
        <div id="reviews" className="mb-24 border-b border-stone-800 pb-20">
          <div className="text-center mb-12">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-500 font-bold block mb-2">
              Patron Chronicles
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-black tracking-tight text-white animate-fade-in">
              Sovereign Reviews
            </h2>
          </div>

          <div className="max-w-3xl mx-auto text-center relative px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6 text-gold-500">
                  {[...Array(REVIEWS[activeReview].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                {/* Comment quote */}
                <p className="font-serif text-lg md:text-xl md:leading-relaxed text-stone-100 italic font-light mb-8 px-4 md:px-10">
                  "{REVIEWS[activeReview].comment}"
                </p>

                {/* Author Info */}
                <div>
                  <strong className="block text-white font-serif text-base tracking-wide font-bold">
                    {REVIEWS[activeReview].name}
                  </strong>
                  <span className="text-[10px] font-mono text-gold-500 tracking-widest uppercase mt-1 block font-semibold">
                    {REVIEWS[activeReview].role} • {REVIEWS[activeReview].date}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReview(idx)}
                  className={`w-2 h-2 rounded-none transition-all cursor-pointer ${
                    activeReview === idx ? 'bg-gold-500 w-6' : 'bg-stone-700 hover:bg-stone-600'
                  }`}
                  title={`Show review ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Coordinates & Newsletter grid */}
        <div className="grid md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Logo, Story summary and Social */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div>
              <span className="font-serif text-2xl font-black tracking-widest text-gold-500">
                THE ORA CAFE
              </span>
              <span className="block text-[8px] uppercase tracking-[0.3em] font-mono text-stone-500 mt-1 font-bold">
                • Modern Indian •
              </span>
            </div>

            <p className="text-xs text-stone-400 font-sans leading-relaxed font-light">
              We stand as Bhilwara’s premier rooftop sanctuary for modern Indian progressive, street style, tandoori, and delicious Falahari dining. An architectural haven featuring elegant rooftop views, rich flavors, and contemporary culinary art.
            </p>

            <div className="flex flex-wrap gap-2.5 mt-2">
              <a 
                href="https://www.instagram.com/theoracafe?igsh=dGoxa3Ywcnc2cDVp" 
                target="_blank" 
                rel="noreferrer"
                className="py-1 px-2.5 border border-stone-850 hover:border-gold-500/50 bg-[#211e1b] text-stone-400 hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-wider"
                title="Instagram"
              >
                <Instagram className="w-3.5 h-3.5 text-gold-500" />
                <span>Instagram</span>
              </a>
              <a 
                href="https://www.facebook.com/TheOraCafe/" 
                target="_blank" 
                rel="noreferrer"
                className="py-1 px-2.5 border border-stone-850 hover:border-gold-500/50 bg-[#211e1b] text-stone-400 hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-wider"
                title="Facebook"
              >
                <Facebook className="w-3.5 h-3.5 text-gold-500" />
                <span>Facebook</span>
              </a>
              <a 
                href="https://www.zomato.com/bhilwara/the-ora-cafe-bhilwara-locality/reviews" 
                target="_blank" 
                rel="noreferrer"
                className="py-1 px-2.5 border border-stone-850 hover:border-gold-500/50 bg-[#211e1b] text-stone-400 hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-wider"
                title="Zomato Reviews"
              >
                <ExternalLink className="w-3.5 h-3.5 text-gold-500" />
                <span>Zomato</span>
              </a>
              <a 
                href="https://www.district.in/dining/bhilwara/the-ora-cafe-bhilwara-locality?srsltid=AfmBOort_sp3IeD3OgKnS6WCfT_qdI8r35GRuKjcRSzUPFFDk9z-5Tzw" 
                target="_blank" 
                rel="noreferrer"
                className="py-1 px-2.5 border border-stone-850 hover:border-gold-500/50 bg-[#211e1b] text-stone-400 hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-wider"
                title="District Dining"
              >
                <ExternalLink className="w-3.5 h-3.5 text-gold-500" />
                <span>District</span>
              </a>
              <a 
                href="https://www.tripadvisor.in/Restaurant_Review-g1162289-d15004720-Reviews-The_Ora_Cafe-Bhilwara_Bhilwara_District_Rajasthan.html" 
                target="_blank" 
                rel="noreferrer"
                className="py-1 px-2.5 border border-stone-850 hover:border-gold-500/50 bg-[#211e1b] text-stone-400 hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-wider"
                title="TripAdvisor Reviews"
              >
                <ExternalLink className="w-3.5 h-3.5 text-gold-500" />
                <span>TripAdvisor</span>
              </a>
            </div>

            <div className="text-stone-500 text-[10px] font-mono mt-4">
              © 2026 THE ORA CAFE. ALL RIGHTS RESERVED.
            </div>
          </div>

          {/* Coordinates and Hours */}
          <div className="md:col-span-4 grid sm:grid-cols-2 gap-8 md:gap-4">
            
            {/* Coordinates */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-[9px] uppercase tracking-widest text-gold-500 font-bold mb-2">
                Coordinates
              </h3>
              
              <a
                href="https://maps.app.goo.gl/9WLJxCoCnaq8Hvwk6"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2.5 text-xs text-stone-400 hover:text-white transition-colors"
                id="footer-maps-link"
              >
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>
                  G38, Rooftop, The Ora Cafe,<br />
                  The Grandstand, Love Garden Rd,<br />
                  Bhilwara, Rajasthan 311001
                </span>
              </a>

              <a
                href="mailto:theoracafe@gmail.com"
                className="flex items-center gap-2.5 text-xs text-stone-400 hover:text-white transition-colors"
                id="footer-email-link"
              >
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <span>theoracafe@gmail.com</span>
              </a>

              <a
                href="tel:+919460351156"
                className="flex items-center gap-2.5 text-xs text-stone-400 hover:text-white transition-colors"
                id="footer-phone-link"
              >
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+91 94603 51156</span>
              </a>
            </div>

            {/* Operating Hours */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-[9px] uppercase tracking-widest text-gold-500 font-bold mb-2">
                Hours of Sanctuary
              </h3>

              <div className="flex items-start gap-2.5 text-xs text-stone-400">
                <Clock className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <div>
                    <span className="text-stone-500 font-mono text-[9px] uppercase block font-bold">Everyday dining</span>
                    <span className="font-medium text-stone-300 text-[11px]">10:00 AM - 11:00 PM</span>
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono">
                    * Elegant seating available on both our Rooftop and our AC Chambers
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Majestic Newsletter Register */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div>
              <h3 className="font-mono text-[9px] uppercase tracking-widest text-gold-500 font-bold mb-2">
                Imperial Bulletins
              </h3>
              <p className="text-xs text-stone-400 font-sans leading-relaxed font-light">
                Subscribe to receive private dining invitations, seasonal chef table menus, and tandoor lessons.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                required
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                placeholder="Secure bulletins (your-email@mail.com)"
                className="w-full bg-[#272421] border border-stone-800 rounded-none py-3 px-4 pr-12 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-gold-500 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-gold-500 rounded-none text-stone-950 hover:bg-gold-600 transition-colors flex items-center justify-center cursor-pointer"
                title="Subscribe"
              >
                {subscribed ? <Check className="w-4 h-4 text-stone-950 font-bold" /> : <Send className="w-4 h-4 text-stone-950 font-bold" />}
              </button>
            </form>
            
            <AnimatePresence>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[11px] text-gold-500 font-medium flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  Your registry email has been authorized. Expect seasonal news!
                </motion.p>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </footer>
  );
}
