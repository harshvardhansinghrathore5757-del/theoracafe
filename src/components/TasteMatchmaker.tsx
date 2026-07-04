import { useState } from 'react';
import { MENU_ITEMS } from '../data/menu';
import { MenuItem } from '../types';
import { Sparkles, RefreshCw, Flame, ArrowRight, Utensils, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TasteMatchmakerProps {
  onReserveClick: () => void;
}

type QuestionId = 'mood' | 'diet' | 'spice';

export default function TasteMatchmaker({ onReserveClick }: TasteMatchmakerProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedDiet, setSelectedDiet] = useState<string>('None');
  const [selectedSpice, setSelectedSpice] = useState<number | null>(null);
  const [matches, setMatches] = useState<MenuItem[]>([]);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  const steps = [
    {
      id: 'mood' as QuestionId,
      title: 'Choose Your Primary Flavor Mood',
      subtitle: 'What sensory experience does your palate crave tonight?',
      options: [
        { label: 'Velvety & Creamy', value: 'Creamy', desc: 'Saffron cream, buttery rich sauces, slow cooked cashew infusions.' },
        { label: 'Smokey & Smoldering', value: 'Smokey', desc: 'Charcoal clay oven baking, hickory essences, roasted aromatic spices.' },
        { label: 'Zesty Citrus & Tangy', value: 'Citrus-Zing', desc: 'Raw mango, fresh lemon rind, tamarind reductions, fresh mint.' },
        { label: 'Fragrant & Herbal Sanctuary', value: 'Fragrant/Herbal', desc: 'Kashmiri saffron, rosewater mist, fresh sage, sweet cardamom infusion.' }
      ]
    },
    {
      id: 'diet' as QuestionId,
      title: 'State Your Dining Boundaries',
      subtitle: 'We craft our cuisine to fully respect all physical or spiritual dietary goals.',
      options: [
        { label: 'None (Eat Everything)', value: 'None', desc: 'No specific restrictions' },
        { label: 'Strictly Vegetarian', value: 'Vegetarian', desc: 'Plant-based with artisanal milk & ghee' },
        { label: 'Vegan Plant-Based', value: 'Vegan', desc: 'Completely free from animal ingredients or dairy products' },
        { label: 'Gluten-Free Pure', value: 'Gluten-Free', desc: 'Celiac-safe preparations' }
      ]
    },
    {
      id: 'spice' as QuestionId,
      title: 'Define Your Heat Tolerance',
      subtitle: 'From gentle courtly spices to high-end southern Indian fire.',
      options: [
        { label: 'Gentle Courtly Spiciness (Mild)', value: 1, desc: 'Fragrant cardamom and saffron without burning heat.' },
        { label: 'Authentic Medium Zing (Medium)', value: 2, desc: 'Balanced Kashmiri chilli warmth that lingers pleasantly.' },
        { label: 'Imperial Fiery Heat (Hot)', value: 3, desc: 'Explosive Guntur chilli and southern gunpowder pepper bursts.' }
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateMatches();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateMatches = () => {
    // Filter actual database
    const filtered = MENU_ITEMS.filter(item => {
      // 1. Mood match
      const matchesMood = selectedMood ? item.flavorProfiles.includes(selectedMood as any) : true;
      
      // 2. Diet match
      let matchesDiet = true;
      if (selectedDiet !== 'None') {
        matchesDiet = item.tags.includes(selectedDiet as any);
      }

      // 3. Spice match
      let matchesSpice = true;
      if (selectedSpice !== null) {
        if (selectedSpice === 1) {
          matchesSpice = item.spicyLevel <= 1;
        } else if (selectedSpice === 2) {
          matchesSpice = item.spicyLevel === 2;
        } else if (selectedSpice === 3) {
          matchesSpice = item.spicyLevel === 3;
        }
      }

      return matchesMood && matchesDiet && matchesSpice;
    });

    // If no perfect match found, fallback to diet only (or wider net) to prevent empty frustration
    if (filtered.length === 0) {
      const fallback = MENU_ITEMS.filter(item => {
        let matchesDiet = true;
        if (selectedDiet !== 'None') {
          matchesDiet = item.tags.includes(selectedDiet as any);
        }
        return matchesDiet;
      });
      setMatches(fallback.slice(0, 3));
    } else {
      setMatches(filtered);
    }

    setHasCalculated(true);
  };

  const resetQuiz = () => {
    setSelectedMood('');
    setSelectedDiet('None');
    setSelectedSpice(null);
    setCurrentStep(0);
    setHasCalculated(false);
    setMatches([]);
  };

  return (
    <section id="matchmaker" className="py-24 bg-[#fdfcf8] text-[#1c1917] scroll-mt-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Intro */}
        <div className="text-center mb-16">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-600 font-bold block mb-2">
            Palate Discovery Engine
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-black tracking-tight text-[#1c1917] mb-4">
            Discover Your Flavor Match
          </h2>
          <p className="text-stone-600 font-sans text-xs max-w-sm mx-auto font-light leading-relaxed">
            Answer three quick, sensory questions and let we curate the optimal royal custom meal pairings matching your specific craving profile.
          </p>
        </div>

        {/* Wizard Main Card */}
        <div className="relative bg-stone-50 border border-stone-200 rounded-none p-8 md:p-12 overflow-hidden shadow-xs backdrop-blur-md">
          {/* Subtle gold absolute glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/5 rounded-full filter blur-3xl -z-10" />

          <AnimatePresence mode="wait">
            {!hasCalculated ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Step indicator */}
                <div className="flex gap-2 mb-8">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-none transition-all duration-300 ${
                        i === currentStep ? 'bg-gold-500' : 'bg-stone-200'
                      }`}
                    />
                  ))}
                </div>

                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-600 font-bold">
                  Question 0{currentStep + 1} of 03
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1c1917] mt-2 mb-1">
                  {steps[currentStep].title}
                </h3>
                <p className="text-stone-500 text-xs font-sans mb-8">
                  {steps[currentStep].subtitle}
                </p>

                {/* Question Options */}
                <div className="grid md:grid-cols-2 gap-4 mb-10">
                  {steps[currentStep].options.map((opt) => {
                    const isSelected =
                      (steps[currentStep].id === 'mood' && selectedMood === opt.value) ||
                      (steps[currentStep].id === 'diet' && selectedDiet === opt.value) ||
                      (steps[currentStep].id === 'spice' && selectedSpice === opt.value);

                    return (
                      <button
                        key={opt.value.toString()}
                        onClick={() => {
                          if (steps[currentStep].id === 'mood') setSelectedMood(opt.value as string);
                          else if (steps[currentStep].id === 'diet') setSelectedDiet(opt.value as string);
                          else if (steps[currentStep].id === 'spice') setSelectedSpice(opt.value as number);
                        }}
                        className={`text-left p-6 rounded-none border transition-all relative cursor-pointer ${
                          isSelected
                            ? 'border-gold-500 bg-gold-500/10 hover:bg-gold-500/15'
                            : 'border-stone-200 bg-white hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`font-serif text-sm font-bold ${isSelected ? 'text-gold-700' : 'text-[#1c1917]'}`}>
                            {opt.label}
                          </span>
                          {isSelected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-gold-600" />
                          )}
                        </div>
                        <p className="text-stone-600 text-[11px] leading-relaxed font-light">
                          {opt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Nav buttons */}
                <div className="flex justify-between items-center border-t border-stone-200 pt-6">
                  <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`px-5 py-2.5 text-xs font-bold tracking-wider uppercase transition-colors focus:outline-none cursor-pointer ${
                      currentStep === 0
                        ? 'text-stone-300 cursor-not-allowed'
                        : 'text-stone-600 hover:text-[#1c1917]'
                    }`}
                  >
                    Back
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={
                      (steps[currentStep].id === 'mood' && !selectedMood) ||
                      (steps[currentStep].id === 'spice' && selectedSpice === null)
                    }
                    className={`px-6 py-3 font-bold text-[10px] tracking-widest uppercase transition-all duration-300 rounded-none shadow-xs ${
                      ((steps[currentStep].id === 'mood' && !selectedMood) ||
                       (steps[currentStep].id === 'spice' && selectedSpice === null))
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        : 'bg-[#1c1917] text-white hover:bg-gold-600 cursor-pointer active:scale-98'
                    }`}
                  >
                    {currentStep === steps.length - 1 ? 'Reveal Culinary Match' : 'Continue'}
                  </button>
                </div>
              </motion.div>
            ) : (
              // Match Results Panel
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex p-3 rounded-full bg-gold-50 border border-gold-200 text-gold-600 mb-6 animate-pulse">
                  <Compass className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl font-black text-[#1c1917] mb-2">
                  Your Gastronomic Pairings
                </h3>
                <p className="text-stone-600 text-xs font-sans max-w-md mx-auto mb-10 font-light">
                  Based on your affinity for <strong className="text-gold-600 font-bold">{selectedMood}</strong> flavors, keeping a <strong className="text-gold-600 font-bold">{selectedDiet === 'None' ? 'Flexible' : selectedDiet}</strong> dietary rhythm, we recommend making a selection of:
                </p>

                {/* Match Cards Flex */}
                <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto mb-12">
                  {matches.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 bg-white border border-stone-200 rounded-none flex flex-col justify-between shadow-xs hover:border-gold-500 transition-colors"
                    >
                      <div>
                        {/* Tags / Sign */}
                        <div className="flex justify-between items-start mb-4">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-gold-600 font-semibold">
                            {item.category.replace('-', ' ')}
                          </span>
                          <div className="flex gap-1.5">
                            {item.spicyLevel > 0 && (
                              <div className="flex">
                                {[...Array(item.spicyLevel)].map((_, i) => (
                                  <Flame key={i} className="w-3 h-3 text-red-600 fill-red-100" />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <h4 className="font-serif text-lg font-bold text-[#1c1917] mb-2">
                          {item.name}
                        </h4>
                        <p className="text-stone-600 text-xs font-sans font-light leading-relaxed mb-4 line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex justify-end items-center pt-4 border-t border-stone-150">
                        <span className="text-[9px] font-sans text-stone-500 font-medium">
                          {item.tags.join(', ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reset & Reserve CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-stone-200">
                  <button
                    onClick={resetQuiz}
                    className="flex items-center gap-2 px-5 py-3 text-xs font-bold tracking-wider font-sans uppercase text-stone-500 hover:text-[#1c1917] transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset Matchmaker
                  </button>

                  <button
                    onClick={onReserveClick}
                    className="px-8 py-3.5 bg-[#1c1917] text-white font-bold text-[10px] tracking-widest uppercase rounded-none shadow-xs hover:bg-gold-600 transition-all cursor-pointer"
                  >
                    Reserve Table To Taste
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
