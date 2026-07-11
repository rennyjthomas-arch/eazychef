import type { Recipe } from './data';

export type Screen =
  | 'onboarding'
  | 'pantry'
  | 'cards'
  | 'missing'
  | 'detail'
  | 'rating'
  | 'trends'
  | 'roadmap'
  | 'profile';

export interface AppState {
  screen: Screen;
  onboardingComplete: boolean;
  obStep: number;
  diet: string;
  allergies: string[];
  customAllergies: string[];
  allergyInput: string;
  dishes: string[];
  dishInput: string;
  goal: string;
  cookWho: string;
  cookSkill: string;
  weekdayTime: string;
  weekendTime: string;
  pantryText: string;
  pantryItems: string[];
  selectedCardId: string | null;
  rating: number;
  ratingNote: string;
  recipes: Recipe[];
  recipesLoading: boolean;
  recipesError: string | null;
  regenCount: number;
}
