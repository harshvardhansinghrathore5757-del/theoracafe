import { MenuItem, SeatingZone, Testimonial } from '../types';
import { SECTION_1_ITEMS } from './menu-sections-1';
import { SECTION_2_ITEMS } from './menu-sections-2';
import { SECTION_3_ITEMS } from './menu-sections-3';
import { SECTION_4_ITEMS } from './menu-sections-4';
import { SECTION_5_ITEMS } from './menu-sections-5';

export const MENU_ITEMS: MenuItem[] = [
  ...SECTION_1_ITEMS,
  ...SECTION_2_ITEMS,
  ...SECTION_3_ITEMS,
  ...SECTION_4_ITEMS,
  ...SECTION_5_ITEMS
];

export const SEATING_ZONES: SeatingZone[] = [
  {
    id: 'royal-hall',
    name: 'Royal Heritage Hall',
    description: 'Dine like royalty beneath handcrafted floating brass lanterns, velvet curtains, and gold-leaf murals reflecting colonial modern architecture.',
    capacityDescription: 'Ideal for intimate dinners, romantic dates, & corporate celebrations.',
    vibe: 'Warm, Opulent, Imperial'
  },
  {
    id: 'monsoon-garden',
    name: 'The Monsoon Sanctuary (Garden Terrace)',
    description: 'An open-air lush garden arrangement framed by cascading fragrant jasmine walls, water fountains, and starry lanterns.',
    capacityDescription: 'Casual, vibrant outdoor environment.',
    vibe: 'Romantic, Sensory, Airy'
  }
];

export const REVIEWS: Testimonial[] = [
  {
    id: 'r1',
    name: 'Aishwarya Roy',
    role: 'Michelin Culinary Reviewer',
    rating: 5,
    comment: 'The Jain Punjabi Butter Paneer is a transcendent experience. It perfectly achieves rich heritage depth while remaining completely onion and garlic free.',
    date: 'May 2026'
  },
  {
    id: 'r2',
    name: 'Dr. Kabir Mehta',
    role: 'Gastronome & Local Patron',
    rating: 5,
    comment: 'The Ora Cafe completely redefines the expectations of fine vegetarian dining. The Falahari Thali and Tandoori Platter are absolutely stellar!',
    date: 'June 2026'
  },
  {
    id: 'r3',
    name: 'Elena Rostova',
    role: 'Food & Travel Journalist',
    rating: 5,
    comment: 'Sensational layout and flavors. Watching the masters crisp Cheese Chilli Kulchas at the Sanskrit Chef\'s counter is incredibly satisfying.',
    date: 'April 2026'
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'g1',
    title: 'Precision Plating',
    description: 'Our chefs curate each component with intense micro-gastronomy precision.',
    tag: 'Kitchen Art'
  },
  {
    id: 'g2',
    title: 'The Golden Tandoor',
    description: 'Traditional wood-ember clay oven operating at 800°F producing flawless textures.',
    tag: 'Heritage'
  },
  {
    id: 'g3',
    title: 'The Gold Leaf Parfait',
    description: 'Traditional sweet alphanso fruit cream plated inside high-end spun-sugar.',
    tag: 'Sweet Artistry'
  },
  {
    id: 'g4',
    title: 'Royal Heritage Hall',
    description: 'Crafted interiors incorporating solid brass arches and velvet settings.',
    tag: 'Interior'
  }
];
