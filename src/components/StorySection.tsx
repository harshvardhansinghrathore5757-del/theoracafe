import { ShieldCheck, Heart, Sparkles, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function StorySection() {
  const values = [
    {
      icon: <Award className="w-5 h-5 text-gold-600" />,
      title: 'Grand Royal Legacy',
      description: 'Our recipes stem from royal courts across Awadh, Hyderabad, and Kashmir, honored faithfully without compromise.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-gold-600" />,
      title: 'Molecular Innovation',
      description: 'We embrace scientific culinary arts—incorporating wood-chips smoke, herbal gels, and delicate spray scenting.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-gold-600" />,
      title: 'Ethical Sourcing',
      description: 'From organic local grass-fed butter to directly-imported organic Kashmiri saffron threads.'
    }
  ];

  return (
    <section id="story" className="py-24 bg-[#fdfcf8] text-[#1c1917] border-y border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Core Content */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Story Text Column */}
          <div className="w-full flex flex-col items-center">
            <div className="mb-4 text-center">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-600 block mb-2 font-semibold">Our Celestial Origin</span>
              <h2 className="font-serif text-4xl lg:text-5xl font-black tracking-tight text-[#1c1917] mb-6 leading-tight">
                The Story of <span className="font-serif italic font-light text-gold-600">The Ora Cafe</span>
              </h2>
            </div>
            
            <p className="text-stone-700 font-sans text-sm md:text-base leading-relaxed mb-6 font-light max-w-2xl text-center">
              Founded under the concept of the <strong className="text-gold-600 font-bold">"Ora"</strong>—representing the radiant aura and golden light of imperial Indian dinner gathering circles—we strive to blend nostalgic ancestral cookery with progressive gastronomy.
            </p>

            <p className="text-stone-700 font-sans text-sm md:text-base leading-relaxed mb-8 font-light max-w-2xl text-center">
              Our signature clays are fueled with natural local applewood and hickory coal, baking flatbreads that capture earthy smoke and caramelized spices. Meanwhile, our tableside experiences bring dramatic dining theater, incorporating smoke, gold foil accents, and handcrafted brass wear.
            </p>

            {/* Custom Highlights */}
            <div className="grid grid-cols-3 gap-12 pt-6 border-t border-stone-200 w-full max-w-lg justify-center">
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-gold-600">12+</div>
                <div className="text-[10px] text-stone-500 font-mono uppercase tracking-widest mt-1">Regional Spices</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-gold-600">24h</div>
                <div className="text-[10px] text-stone-500 font-mono uppercase tracking-widest mt-1">Lentils Simmer</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl font-bold text-gold-600">100%</div>
                <div className="text-[10px] text-stone-500 font-mono uppercase tracking-widest mt-1">Pure & Organic</div>
              </div>
            </div>
          </div>

        </div>

        {/* Corporate Values Row */}
        <div className="grid md:grid-cols-3 gap-10 pt-20 mt-12 border-t border-stone-200">
          {values.map((v, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="p-8 bg-white border border-stone-200 rounded-none hover:border-gold-500 hover:shadow-xs transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-full bg-gold-400/10 border border-gold-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {v.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1c1917] mb-3 tracking-wide">{v.title}</h3>
              <p className="text-stone-600 font-sans text-xs leading-relaxed font-light">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
