import { useState, useMemo, useEffect } from 'react';
import { MENU_ITEMS } from '../data/menu';
import { MenuItem } from '../types';
import { Search, Flame, Sparkles, Filter, Shield, Info, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Reset expansion when filters change
  useEffect(() => {
    setIsExpanded(false);
  }, [selectedCategory, searchQuery, activeTags.join(',')]);

  const categories = [
    { value: 'all', label: 'All Delicacies' },
    { value: 'soup-salad', label: 'Soup & Salads' },
    { value: 'jain-specials', label: 'Jain Specials' },
    { value: 'combos', label: 'Exclusive Combos' },
    { value: 'tandoori', label: 'Tandoori' },
    { value: 'main-course', label: 'Main Course' },
    { value: 'breads', label: 'Breads' },
    { value: 'falahari', label: 'Falahari' },
    { value: 'rice-biryani', label: 'Rice & Biryani' },
    { value: 'burgers-sandwiches', label: 'Burgers & Sandwiches' },
    { value: 'chinese-asian', label: 'Chinese & Asian' },
    { value: 'pizza-pasta', label: 'Pizza & Pasta' },
    { value: 'drinks', label: 'Drinks' },
    { value: 'desserts', label: 'Desserts' }
  ];

  const dietaryTags = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Nut-Free', 'Jain', 'Falahari'];

  // Toggle dietary tags filter
  const handleTagToggle = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Filter lists
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      // Search filter
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));

      // Direct tag filters
      const matchesTags = activeTags.every(tag => item.tags.includes(tag as any));

      return matchesCategory && matchesSearch && matchesTags;
    });
  }, [selectedCategory, searchQuery, activeTags]);

  const visibleItems = useMemo(() => {
    if (isExpanded) return filteredItems;
    return filteredItems.slice(0, 6);
  }, [filteredItems, isExpanded]);

  return (
    <section id="menu" className="py-24 bg-[#fdfcf8] text-[#1c1917] scroll-mt-20 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-600 font-bold block mb-2">
            The Culinary Compendium
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-black tracking-tight text-[#1c1917] mb-4">
            The Gastronomic Menu
          </h2>
          <div className="w-12 h-[1px] bg-gold-500/60 mx-auto mb-4" />
          <p className="text-stone-600 font-sans text-xs max-w-lg mx-auto leading-relaxed font-light">
            Every dish is handcrafted by our master culinary artisans using traditional wood-coals and modern culinary science techniques.
          </p>
        </div>

        {/* Inputs & Filter Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 bg-stone-50 border border-stone-200 p-6 rounded-none">
          {/* Categories Tab */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.value}
                id={`menu-cat-${cat.value}`}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider rounded-none transition-all cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-[#1c1917] text-white font-bold shadow-xs'
                    : 'text-stone-600 hover:text-[#1c1917] bg-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full lg:max-w-xs">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="menu-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes or ingredients..."
              className="w-full bg-white border border-stone-200 rounded-none py-2.5 pl-10 pr-4 text-xs text-[#1c1917] placeholder-stone-400 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>
        </div>

        {/* Dietary boundary checklist row */}
        <div className="flex flex-wrap items-center gap-3 mb-12 bg-gold-400/5 border border-stone-200 px-6 py-4 rounded-none">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#1c1917] font-bold flex items-center gap-1.5 mr-2">
            <Filter className="w-3 h-3" />
            Dietary Filter:
          </span>
          {dietaryTags.map(tag => {
            const isSelected = activeTags.includes(tag);
            return (
              <button
                key={tag}
                id={`dietary-filter-${tag}`}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1.5 rounded-none text-[10px] font-sans tracking-wide transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isSelected 
                    ? 'bg-gold-500/10 border-gold-500 text-gold-700 font-bold' 
                    : 'border-stone-200 text-stone-600 bg-white hover:bg-stone-50'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-gold-600' : 'bg-stone-300'}`} />
                {tag}
              </button>
            );
          })}
          {activeTags.length > 0 && (
            <button
              id="clear-dietary-filters"
              onClick={() => setActiveTags([])}
              className="ml-auto text-[10px] font-mono uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center text-xs font-mono text-stone-500">
          <span>Showing {filteredItems.length} delicacies</span>
          {searchQuery && (
            <span>Search for "{searchQuery}"</span>
          )}
        </div>

        {/* Menu Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                id={`menu-item-${item.id}`}
                className="bg-white border border-stone-200 rounded-none p-6 hover:border-gold-500 hover:shadow-md transition-all flex flex-col justify-between relative group"
              >
                {/* Ribbon check if signature */}
                {item.signature && (
                  <div className="absolute top-0 right-6 translate-y-[-50%] bg-[#1c1917] text-gold-400 border border-gold-500 text-[8px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-none shadow-xs flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    Signature
                  </div>
                )}

                <div>
                  {/* Category Title & Spice */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-gold-600 font-bold">
                      {item.category.replace('-', ' ')}
                    </span>

                    {/* Spark of spices */}
                    {item.spicyLevel > 0 && (
                      <div className="flex gap-1" title={`Spice Level: ${item.spicyLevel}`}>
                        {[...Array(item.spicyLevel)].map((_, i) => (
                          <Flame key={i} className="w-3.5 h-3.5 text-red-600 fill-red-100" />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Header Title */}
                  <h3 className="font-serif text-lg font-bold text-[#1c1917] mb-2 leading-snug group-hover:text-gold-600 transition-colors">
                    {item.name}
                  </h3>

                  {/* Body description */}
                  <p className="text-stone-600 font-sans text-xs font-light leading-relaxed mb-6 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* Tags list */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-none bg-stone-50 border border-stone-200 text-stone-500 text-[9px] font-sans">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Stats / CTA */}
                  <div className="flex justify-end items-center pt-4 border-t border-stone-150">
                    <button
                      id={`menu-btn-detail-${item.id}`}
                      onClick={() => setSelectedItem(item)}
                      className="px-4 py-2 border border-[#1c1917] hover:border-gold-600 bg-transparent text-[#1c1917] hover:text-gold-600 text-[9px] font-mono font-bold uppercase tracking-widest rounded-none transition-all duration-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Info className="w-3 h-3" />
                      Culinary Info
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Explore More Button */}
        {filteredItems.length > 6 && (
          <div className="flex justify-center mt-12 mb-4">
            <button
              id="toggle-menu-expand"
              onClick={() => {
                const goingToCollapse = isExpanded;
                setIsExpanded(prev => !prev);
                if (goingToCollapse) {
                  const menuEl = document.getElementById('menu');
                  if (menuEl) {
                    menuEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="px-8 py-3.5 border border-gold-500 hover:bg-[#1c1917] hover:text-white hover:border-[#1c1917] bg-white text-gold-600 font-mono text-[10px] font-bold uppercase tracking-widest rounded-none transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
            >
              {isExpanded ? (
                <>
                  <span>Show Less Delicacies</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Explore Full Menu ({filteredItems.length - 6} More)</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Dynamic Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-[#12141c]/5 border border-stone-200 rounded-none">
            <h3 className="font-serif text-xl text-stone-600 mb-2">No delicacies found</h3>
            <p className="text-stone-500 text-xs font-sans max-w-sm mx-auto">
              We couldn't locate dishes matching your specific combination of filters. Try clearing your search query or resetting limits.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setActiveTags([]);
              }}
              className="mt-6 px-6 py-2.5 bg-[#1c1917] text-white text-[10px] font-bold tracking-widest uppercase rounded-none cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Detailed Modal Popup */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="absolute inset-0 bg-stone-900/80 backdrop-blur-md"
              />

              {/* Modal Body Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative bg-[#fdfcf8] border border-stone-300 w-full max-w-2xl p-8 md:p-10 rounded-none shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  id="menu-modal-close"
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-6 right-6 p-2 rounded-none hover:bg-stone-100 text-stone-500 hover:text-[#1c1917] transition-colors cursor-pointer border border-stone-200"
                  title="Close popup"
                >
                  <span className="font-mono text-xs">✕</span>
                </button>

                {/* Modal Content */}
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold-600 font-bold block mb-2">
                  {selectedItem.category.replace('-', ' ')}
                </span>
                
                <h3 className="font-serif text-3xl font-black text-[#1c1917] mt-2 mb-4 leading-tight">
                  {selectedItem.name}
                </h3>

                <p className="text-stone-700 font-sans text-sm leading-relaxed mb-8 font-light">
                  {selectedItem.description}
                </p>

                {/* Attributes Grid split */}
                <div className="grid sm:grid-cols-2 gap-8 border-t border-stone-200 pt-8 mb-8 text-xs font-sans">
                  {/* Left Specs */}
                  <div>
                    <h4 className="font-mono text-[9px] uppercase tracking-widest text-[#1c1917] mb-4 font-bold">Ingredients</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.ingredients.map(ing => (
                        <span key={ing} className="px-3 py-1.5 bg-white border border-stone-200 rounded-none text-stone-800 font-medium">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Tags and info */}
                  <div className="flex flex-col gap-6">
                    {/* Flavors matched info */}
                    <div>
                      <h4 className="font-mono text-[9px] uppercase tracking-widest text-[#1c1917] mb-2 font-bold">Flavor Spectrum</h4>
                      <p className="text-stone-700 font-sans">
                        {selectedItem.flavorProfiles.join(' • ')}
                      </p>
                    </div>

                    {/* Stats */}
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400 block">Energy Score</span>
                      <span className="font-mono text-xs text-[#1c1917] font-semibold mt-1 block">{selectedItem.calories} kcal</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gold-50 border border-gold-200 px-5 py-4 rounded-none text-xs flex items-start gap-3 text-gold-950">
                  <Shield className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gold-950 font-bold block mb-1">Health & Sensory Allergens Check</strong>
                    This craft recipe features premium spices. For any bespoke allergies (e.g. strict lactose or dairy exclusion) or tableside heat adjustments, please clarify on your Reservation form below.
                  </div>
                </div>

                <button
                  id="menu-modal-order-cta"
                  onClick={() => {
                    setSelectedItem(null);
                    const element = document.getElementById('reservation');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full mt-8 py-3.5 bg-[#1c1917] text-white font-bold text-[10px] tracking-widest uppercase rounded-none cursor-pointer hover:bg-gold-600 transition-all"
                >
                  Book Tableside Experience To Enjoy
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
