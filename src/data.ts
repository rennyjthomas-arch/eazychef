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

// Shape returned by the AI recipe-generation function (netlify/functions/generate-recipes.mts).
export interface AIRecipe {
  id: string;
  name: string;
  prep: string;
  reason: string;
  ingredients: string[];
  steps: string[];
}

export const STRIPE_PALETTE = [
  'repeating-linear-gradient(45deg, #E7A93B, #E7A93B 10px, #f0c169 10px, #f0c169 20px)',
  'repeating-linear-gradient(45deg, #C1592F, #C1592F 10px, #d97748 10px, #d97748 20px)',
  'repeating-linear-gradient(45deg, #8FA05E, #8FA05E 10px, #a4b478 10px, #a4b478 20px)',
] as const;

export const FALLBACK_RECIPE: Recipe = {
  id: 'none',
  name: 'No recipe selected yet',
  prep: '--',
  reason: 'Head to the Recipes tab and pick something to cook.',
  stripeBg: STRIPE_PALETTE[0],
  photoLabel: 'no recipe selected',
  missing: [],
  steps: [{ n: 1, text: 'Go to the Recipes tab to get a suggestion first.' }],
};

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

