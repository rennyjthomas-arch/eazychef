import { useEffect, useMemo, useState } from 'react';
import { FALLBACK_RECIPE, STRIPE_PALETTE, type AIRecipe, type Recipe } from './data';
import type { AppState, Screen } from './types';

function ingredientMatchesPantry(ingredient: string, pantryItems: string[]) {
  const norm = ingredient.trim().toLowerCase();
  return pantryItems.some((p) => {
    const pn = p.trim().toLowerCase();
    return pn === norm || norm.includes(pn) || pn.includes(norm);
  });
}

function toDisplayRecipe(ai: AIRecipe, index: number, pantryItems: string[]): Recipe {
  return {
    id: ai.id,
    name: ai.name,
    prep: ai.prep,
    reason: ai.reason,
    stripeBg: STRIPE_PALETTE[index % STRIPE_PALETTE.length],
    photoLabel: ai.name.toLowerCase(),
    image: ai.image ?? null,
    missing: ai.ingredients.filter((ing) => !ingredientMatchesPantry(ing, pantryItems)),
    steps: ai.steps.map((text, i) => ({ n: i + 1, text })),
  };
}

const STORAGE_KEY = 'eazychef-app-state-v1';

function createDefaultState(): AppState {
  return {
    screen: 'onboarding',
    onboardingComplete: false,
    obStep: 0,
    diet: '',
    allergies: [],
    customAllergies: [],
    allergyInput: '',
    dishes: [],
    dishInput: '',
    goal: '',
    cookWho: '',
    cookSkill: '',
    weekdayTime: '',
    weekendTime: '',
    pantryText: '',
    pantryItems: [],
    selectedCardId: null,
    rating: 0,
    ratingNote: '',
    recipes: [],
    recipesLoading: false,
    recipesError: null,
    regenCount: 0,
  };
}

function loadInitialState(): AppState {
  const fallback = createDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return { ...fallback, ...parsed, recipesLoading: false, recipesError: null };
  } catch {
    return fallback;
  }
}

export function useEazychefState() {
  const [state, setState] = useState<AppState>(loadInitialState);

  useEffect(() => {
    const handle = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // storage unavailable — ignore
      }
    }, 200);
    return () => clearTimeout(handle);
  }, [state]);

  const setDiet = (label: string) => {
    setState((s) => ({ ...s, diet: label }));
    setTimeout(nextStep, 250);
  };

  const toggleAllergy = (label: string) => {
    setState((s) => {
      let arr: string[];
      if (label === 'None of these') {
        arr = s.allergies.includes(label) ? [] : ['None of these'];
      } else {
        arr = s.allergies.filter((a) => a !== 'None of these');
        arr = arr.includes(label) ? arr.filter((a) => a !== label) : [...arr, label];
      }
      return { ...s, allergies: arr };
    });
  };

  const setAllergyInput = (value: string) => setState((s) => ({ ...s, allergyInput: value }));

  const addCustomAllergy = () => {
    setState((s) => {
      const v = s.allergyInput.trim();
      if (v && !s.customAllergies.includes(v)) {
        return {
          ...s,
          customAllergies: [...s.customAllergies, v],
          allergyInput: '',
          allergies: s.allergies.filter((a) => a !== 'None of these'),
        };
      }
      return { ...s, allergyInput: '' };
    });
  };

  const removeCustomAllergy = (idx: number) =>
    setState((s) => ({ ...s, customAllergies: s.customAllergies.filter((_, i) => i !== idx) }));

  const setDishInput = (value: string) => setState((s) => ({ ...s, dishInput: value }));

  const addDish = () => {
    setState((s) => {
      const v = s.dishInput.trim();
      if (v && s.dishes.length < 4) {
        return { ...s, dishes: [...s.dishes, v], dishInput: '' };
      }
      return s;
    });
  };

  const removeDish = (idx: number) =>
    setState((s) => ({ ...s, dishes: s.dishes.filter((_, i) => i !== idx) }));

  const setGoal = (label: string) => {
    setState((s) => ({ ...s, goal: label }));
    setTimeout(nextStep, 250);
  };

  const setCookWho = (label: string) => setState((s) => ({ ...s, cookWho: label }));
  const setCookSkill = (label: string) => setState((s) => ({ ...s, cookSkill: label }));
  const setWeekday = (label: string) => setState((s) => ({ ...s, weekdayTime: label }));
  const setWeekend = (label: string) => setState((s) => ({ ...s, weekendTime: label }));

  const nextStep = () => setState((s) => ({ ...s, obStep: s.obStep + 1 }));
  const finishOnboarding = () => setState((s) => ({ ...s, screen: 'pantry', onboardingComplete: true }));

  const setPantryText = (value: string) => setState((s) => ({ ...s, pantryText: value }));

  const addPantryItem = () => {
    setState((s) => {
      const parts = s.pantryText
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);
      if (parts.length) {
        const merged = [...s.pantryItems];
        parts.forEach((p) => {
          if (!merged.includes(p)) merged.push(p);
        });
        return { ...s, pantryItems: merged, pantryText: '' };
      }
      return { ...s, pantryText: '' };
    });
  };

  const onPantryKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPantryItem();
    }
  };

  const removePantryItem = (idx: number) =>
    setState((s) => ({ ...s, pantryItems: s.pantryItems.filter((_, i) => i !== idx) }));

  const addQuickPantry = (label: string) =>
    setState((s) => (s.pantryItems.includes(label) ? s : { ...s, pantryItems: [...s.pantryItems, label] }));

  const fetchRecipes = async (isRegenerate: boolean) => {
    const excludeNames = isRegenerate ? state.recipes.map((r) => r.name) : [];
    setState((s) => ({ ...s, recipesLoading: true, recipesError: null }));
    try {
      const res = await fetch('/.netlify/functions/generate-recipes', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          diet: state.diet,
          allergies: [...state.allergies.filter((a) => a !== 'None of these'), ...state.customAllergies],
          dishes: state.dishes,
          goal: state.goal,
          cookSkill: state.cookSkill,
          weekdayTime: state.weekdayTime,
          weekendTime: state.weekendTime,
          pantryItems: state.pantryItems,
          count: 4,
          excludeNames,
        }),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      const data = await res.json();
      const aiRecipes: AIRecipe[] = Array.isArray(data.recipes) ? data.recipes : [];
      if (!aiRecipes.length) throw new Error('No recipes returned');
      setState((s) => ({
        ...s,
        recipes: aiRecipes.map((r, i) => toDisplayRecipe(r, i, s.pantryItems)),
        recipesLoading: false,
        regenCount: isRegenerate ? s.regenCount + 1 : s.regenCount,
      }));
    } catch {
      setState((s) => ({
        ...s,
        recipesLoading: false,
        recipesError: "Couldn't reach the recipe assistant — try again.",
      }));
    }
  };

  const goCards = () => {
    setState((s) => ({ ...s, screen: 'cards' }));
    fetchRecipes(false);
  };
  const selectCard = (id: string) => setState((s) => ({ ...s, selectedCardId: id, screen: 'missing' }));
  const backToCards = () => setState((s) => ({ ...s, screen: 'cards' }));
  const goDetail = () => setState((s) => ({ ...s, screen: 'detail' }));
  const backToMissing = () => setState((s) => ({ ...s, screen: 'missing' }));
  const goRating = () => setState((s) => ({ ...s, screen: 'rating' }));
  const setRating = (n: number) => setState((s) => ({ ...s, rating: n }));
  const setRatingNote = (value: string) => setState((s) => ({ ...s, ratingNote: value }));
  const submitRating = () => setState((s) => ({ ...s, screen: 'trends' }));
  const goRoadmap = () => setState((s) => ({ ...s, screen: 'roadmap' }));
  const goProfile = () => setState((s) => ({ ...s, screen: 'profile' }));
  const jump = (screen: Screen) => setState((s) => ({ ...s, screen }));

  const restart = () =>
    setState((s) => ({
      ...createDefaultState(),
      regenCount: s.regenCount,
    }));

  const regenerate = () => {
    fetchRecipes(true);
  };

  const selectedCard = useMemo(
    () => state.recipes.find((c) => c.id === state.selectedCardId) ?? FALLBACK_RECIPE,
    [state.recipes, state.selectedCardId],
  );

  return {
    state,
    selectedCard,
    actions: {
      setDiet,
      toggleAllergy,
      setAllergyInput,
      addCustomAllergy,
      removeCustomAllergy,
      setDishInput,
      addDish,
      removeDish,
      setGoal,
      setCookWho,
      setCookSkill,
      setWeekday,
      setWeekend,
      nextStep,
      finishOnboarding,
      setPantryText,
      addPantryItem,
      onPantryKeyDown,
      removePantryItem,
      addQuickPantry,
      goCards,
      selectCard,
      backToCards,
      goDetail,
      backToMissing,
      goRating,
      setRating,
      setRatingNote,
      submitRating,
      goRoadmap,
      goProfile,
      jump,
      restart,
      regenerate,
      fetchRecipes,
    },
  };
}

export type EazychefActions = ReturnType<typeof useEazychefState>['actions'];
