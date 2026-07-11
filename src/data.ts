export interface RecipeStep {
  n: number;
  text: string;
}

export interface Recipe {
  id: string;
  name: string;
  prep: string;
  reason: string;
  stripeBg: string;
  photoLabel: string;
  missing: string[];
  steps: RecipeStep[];
}

export interface RoadmapTile {
  name: string;
  blurb: string;
  iconBg: string;
}

export const DIET = ['Vegetarian', 'Eggetarian', 'Non-veg', 'Vegan'] as const;
export const ALLERGY = ['Peanuts', 'Dairy', 'Gluten', 'Shellfish', 'None of these'] as const;
export const GOAL = [
  'Lose a little weight',
  'More protein',
  'Eat cleaner overall',
  'Manage sugar / BP',
] as const;
export const COOK_SKILL = ['Just starting out', 'Comfortable', 'Confident'] as const;
export const WEEKDAY_T = ['15 min', '30 min', '45+ min'] as const;
export const WEEKEND_T = ['30 min', '60 min', '90+ min'] as const;

export const DEFAULT_CARD_IDS = ['chilla', 'bhurji', 'curd-rice'];

export const PANTRY_QUICK_ADDS = ['Onion', 'Garlic', 'Curd', 'Rice', 'Tomato'];

export const CARDS_INTRO_LINES = [
  "Here's what I'm thinking for tonight —",
  'Okay, took another look — try these instead:',
  'Fair enough, here’s a different angle:',
  'Round three. How about these:',
];

export const RATING_EMOJI = ['\u{1F616}', '\u{1F615}', '\u{1F642}', '\u{1F60B}', '\u{1F929}'];

export const TREND_DAYS = [
  { label: 'Mon', h: 40, p: false },
  { label: 'Tue', h: 78, p: true },
  { label: 'Wed', h: 55, p: false },
  { label: 'Thu', h: 90, p: true },
  { label: 'Fri', h: 62, p: false },
  { label: 'Sat', h: 85, p: true },
  { label: 'Sun', h: 48, p: false },
];

export const ROADMAP_TILES: RoadmapTile[] = [
  { name: 'Waste tracking', blurb: 'See what’s about to expire before it does.', iconBg: '#8FA05E' },
  { name: 'Smart pantry', blurb: 'Auto-updates as you cook and shop.', iconBg: '#E7A93B' },
  { name: 'Kitchen buddies', blurb: 'Plan meals with family or roommates.', iconBg: '#C1592F' },
  { name: 'Streaks & points', blurb: 'Little rewards for cooking at home.', iconBg: '#2B1B12' },
];

export const DEFAULT_COOK_NAME = 'Radha';

export const CARDS: Recipe[] = [
  {
    id: 'chilla',
    name: 'Moong Dal Chilla',
    prep: '20 min',
    reason: 'Quick, protein-forward, and ready before anyone gets hangry. Good one for a weeknight.',
    stripeBg: 'repeating-linear-gradient(45deg, #E7A93B, #E7A93B 10px, #f0c169 10px, #f0c169 20px)',
    photoLabel: 'moong dal chilla',
    missing: ['fresh coriander', 'ginger'],
    steps: [
      { n: 1, text: 'Soak moong dal for 2 hours, then blend with ginger, green chilli and a pinch of salt into a smooth batter.' },
      { n: 2, text: 'Heat a tawa, pour a ladle of batter and spread thin like a dosa.' },
      { n: 3, text: 'Drizzle oil at the edges, flip once golden, cook the other side.' },
      { n: 4, text: 'Serve hot with mint chutney or plain curd.' },
    ],
  },
  {
    id: 'bhurji',
    name: 'Paneer Bhurji Wrap',
    prep: '25 min',
    reason: 'You said protein — this hides veggies in a paneer scramble that even fussy eaters clear off the plate.',
    stripeBg: 'repeating-linear-gradient(45deg, #C1592F, #C1592F 10px, #d97748 10px, #d97748 20px)',
    photoLabel: 'paneer bhurji wrap',
    missing: [],
    steps: [
      { n: 1, text: 'Crumble paneer. Sauté onion, tomato and capsicum till soft.' },
      { n: 2, text: 'Add turmeric, chilli powder and the crumbled paneer, toss for 3-4 minutes.' },
      { n: 3, text: 'Warm the wraps, spoon in the bhurji, roll tight.' },
      { n: 4, text: 'Slice in half, serve with a wedge of lemon.' },
    ],
  },
  {
    id: 'curd-rice',
    name: 'Curd Rice with Tempering',
    prep: '15 min',
    reason: 'Weeknight-tired energy detected. Five ingredients, almost zero effort, still feels like a proper meal.',
    stripeBg: 'repeating-linear-gradient(45deg, #8FA05E, #8FA05E 10px, #a4b478 10px, #a4b478 20px)',
    photoLabel: 'curd rice',
    missing: ['curry leaves', 'mustard seeds'],
    steps: [
      { n: 1, text: 'Mash cooked rice with curd and a splash of milk till creamy.' },
      { n: 2, text: 'Temper mustard seeds, curry leaves and a dry red chilli in hot ghee.' },
      { n: 3, text: 'Pour the tempering over the curd rice, season with salt.' },
      { n: 4, text: 'Chill 10 minutes before serving, if you can wait that long.' },
    ],
  },
  {
    id: 'khichdi',
    name: 'Masala Moong Khichdi',
    prep: '30 min',
    reason: 'One-pot, gentle on digestion, and stretches the pantry you’ve already got. Good one when nobody wants to think.',
    stripeBg: 'repeating-linear-gradient(45deg, #E7A93B, #E7A93B 10px, #f0c169 10px, #f0c169 20px)',
    photoLabel: 'masala moong khichdi',
    missing: ['ghee'],
    steps: [
      { n: 1, text: 'Pressure cook rice and moong dal with turmeric till soft and mushy.' },
      { n: 2, text: 'Temper cumin, hing and dry red chilli in ghee.' },
      { n: 3, text: 'Stir the tempering into the khichdi, adjust consistency with hot water.' },
      { n: 4, text: 'Serve with a spoon of ghee on top and a side of pickle.' },
    ],
  },
  {
    id: 'egg-bhurji',
    name: 'Egg Bhurji with Toast',
    prep: '15 min',
    reason: 'Fast, high-protein, and forgiving if it’s a busy morning-into-evening kind of day.',
    stripeBg: 'repeating-linear-gradient(45deg, #C1592F, #C1592F 10px, #d97748 10px, #d97748 20px)',
    photoLabel: 'egg bhurji',
    missing: ['bread'],
    steps: [
      { n: 1, text: 'Sauté onion, tomato, green chilli till soft.' },
      { n: 2, text: 'Add beaten eggs, scramble on medium heat till just set.' },
      { n: 3, text: 'Finish with chopped coriander and a squeeze of lemon.' },
      { n: 4, text: 'Serve with buttered toast on the side.' },
    ],
  },
  {
    id: 'veg-pulao',
    name: 'One-Pot Veg Pulao',
    prep: '35 min',
    reason: 'Uses up whatever vegetables are looking tired in the fridge, and reheats well for tomorrow’s lunch too.',
    stripeBg: 'repeating-linear-gradient(45deg, #8FA05E, #8FA05E 10px, #a4b478 10px, #a4b478 20px)',
    photoLabel: 'veg pulao',
    missing: ['whole garam masala'],
    steps: [
      { n: 1, text: 'Sauté whole spices and onion in ghee till fragrant.' },
      { n: 2, text: 'Add chopped vegetables and rice, toast for 2 minutes.' },
      { n: 3, text: 'Add water, salt, pressure cook or simmer covered till done.' },
      { n: 4, text: 'Fluff gently and serve with raita.' },
    ],
  },
];
