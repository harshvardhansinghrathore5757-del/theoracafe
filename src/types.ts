export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'soup-salad' | 'jain-specials' | 'combos' | 'tandoori' | 'main-course' | 'breads' | 'falahari' | 'rice-biryani' | 'burgers-sandwiches' | 'chinese-asian' | 'pizza-pasta' | 'drinks' | 'desserts';
  price: number;
  tags: ('Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Nut-Free' | 'Jain' | 'Falahari')[];
  spicyLevel: 0 | 1 | 2 | 3; // 0 = none, 3 = high
  signature: boolean;
  flavorProfiles: ('Smokey' | 'Tangy' | 'Creamy' | 'Citrus-Zing' | 'Bold-Spice' | 'Fragrant/Herbal')[];
  ingredients: string[];
  calories: number;
}

export type SeatingZoneId = 'royal-hall' | 'monsoon-garden';

export interface SeatingZone {
  id: SeatingZoneId;
  name: string;
  description: string;
  capacityDescription: string;
  vibe: string;
}

export interface ReservationDetail {
  customerName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  zoneId: SeatingZoneId;
  specialRequests: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

