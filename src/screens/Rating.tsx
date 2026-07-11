import { DEFAULT_COOK_NAME, RATING_EMOJI, type Recipe } from '../data';
import type { EazychefActions } from '../state';
import type { AppState } from '../types';
import { Logo } from '../components/Logo';
import { colors, fonts, inkAlpha, terracottaAlpha } from '../theme';

interface RatingProps {
  state: AppState;
  selectedCard: Recipe;
  actions: EazychefActions;
}

export function Rating({ state, selectedCard, actions }: RatingProps) {
  const cookNameDisplay = state.cookWho || DEFAULT_COOK_NAME;

  return (
    <div style={{ padding: '28px 0 24px', display: 'flex', flexDirection: 'column', gap: 22, minHeight: '100%' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Logo size={34} />
        <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 18, color: colors.ink }}>
          So — how'd {selectedCard.name} turn out?
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
        {RATING_EMOJI.map((emoji, i) => {
          const n = i + 1;
          const selected = state.rating === n;
          return (
            <div
              key={n}
              onClick={() => actions.setRating(n)}
              style={{
                cursor: 'pointer',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                padding: '12px 4px',
                borderRadius: 16,
                background: selected ? terracottaAlpha(0.14) : colors.creamLight,
                border: `1.5px solid ${selected ? colors.terracotta : inkAlpha(0.1)}`,
              }}
            >
              <div style={{ fontSize: 26 }}>{emoji}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: inkAlpha(0.5) }}>{n}</div>
            </div>
          );
        })}
      </div>

      <textarea
        value={state.ratingNote}
        onChange={(e) => actions.setRatingNote(e.target.value)}
        placeholder={`anything ${cookNameDisplay} should know for next time? (optional)`}
        style={{
          width: '100%',
          minHeight: 90,
          resize: 'none',
          border: `1.5px solid ${inkAlpha(0.12)}`,
          background: colors.creamLight,
          borderRadius: 18,
          padding: 16,
          fontFamily: fonts.body,
          fontSize: 14,
          color: colors.ink,
          outline: 'none',
        }}
      />

      <div style={{ flex: 1 }} />
      <div
        onClick={actions.submitRating}
        style={{
          cursor: 'pointer',
          textAlign: 'center',
          background: colors.terracotta,
          color: '#FFF8ED',
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 15,
          padding: 15,
          borderRadius: 999,
        }}
      >
        Done
      </div>
    </div>
  );
}
