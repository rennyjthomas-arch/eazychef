import { useEffect, useMemo, useState } from 'react';
import { CARDS, DEFAULT_CARD_IDS } from './data';
import type { AppState, Screen } from './types';

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
    cardIds: [...DEFAULT_CARD_IDS],
    regenCount: 0,
  };
}

function loadInitialState(): AppState {
  const fallback = createDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return { ...fallback, ...parsed };
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

  const goCards = () => setState((s) => ({ ...s, screen: 'cards' }));
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
      cardIds: s.cardIds,
      regenCount: s.regenCount,
    }));

  const regenerate = () => {
    setState((s) => {
      const pool = CARDS;
      const current = s.cardIds;
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      let picks = shuffled.slice(0, 3).map((c) => c.id);
      if (picks.every((id) => current.includes(id)) && pool.length > 3) {
        picks = shuffled.slice(3, 6).map((c) => c.id);
        if (picks.length < 3) picks = shuffled.slice(0, 3).map((c) => c.id);
      }
      return { ...s, cardIds: picks, regenCount: s.regenCount + 1 };
    });
  };

  const selectedCard = useMemo(
    () => CARDS.find((c) => c.id === state.selectedCardId) ?? CARDS[0],
    [state.selectedCardId],
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
    },
  };
}

export type EazychefActions = ReturnType<typeof useEazychefState>['actions'];
