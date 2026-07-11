import { PANTRY_QUICK_ADDS } from '../data';
import type { EazychefActions } from '../state';
import type { AppState } from '../types';
import { Logo } from '../components/Logo';
import { QuickAddChip, RemovableChip } from '../components/Chip';
import { colors, fonts, inkAlpha, terracottaAlpha } from '../theme';

interface PantryProps {
  state: AppState;
  actions: EazychefActions;
}

export function Pantry({ state, actions }: PantryProps) {
  return (
    <div style={{ padding: '28px 0 24px', display: 'flex', flexDirection: 'column', gap: 20, minHeight: '100%' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Logo size={34} />
        <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 19, color: colors.ink }}>
          So, what's in the kitchen today?
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <textarea
          value={state.pantryText}
          onChange={(e) => actions.setPantryText(e.target.value)}
          onKeyDown={actions.onPantryKeyDown}
          placeholder="e.g. onion, tomato, paneer, curd, leftover dal"
          style={{
            flex: 1,
            minHeight: 64,
            resize: 'none',
            border: `2px solid ${terracottaAlpha(0.18)}`,
            background: colors.creamLight,
            borderRadius: 24,
            padding: '16px 20px',
            fontFamily: fonts.body,
            fontSize: 16,
            color: colors.ink,
            outline: 'none',
            boxShadow: `0 8px 24px ${inkAlpha(0.06)}`,
          }}
        />
        <div
          onClick={actions.addPantryItem}
          style={{
            cursor: 'pointer',
            flexShrink: 0,
            width: 56,
            height: 56,
            borderRadius: 999,
            background: colors.terracotta,
            color: '#FFF8ED',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
            boxShadow: `0 8px 20px ${terracottaAlpha(0.3)}`,
          }}
        >
          +
        </div>
      </div>
      <div style={{ fontSize: 11.5, color: inkAlpha(0.4), marginTop: -10 }}>
        Tip: separate items with a comma — enter to add the whole list at once.
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {PANTRY_QUICK_ADDS.map((l) => (
          <QuickAddChip key={l} label={l} onClick={() => actions.addQuickPantry(l)} />
        ))}
      </div>

      {state.pantryItems.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: inkAlpha(0.45), textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            In your pantry
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {state.pantryItems.map((p, i) => (
              <RemovableChip key={p + i} label={p} onRemove={() => actions.removePantryItem(i)} />
            ))}
          </div>
        </div>
      )}

      <div style={{ flex: 1 }} />
      <div
        onClick={actions.goCards}
        style={{
          cursor: 'pointer',
          textAlign: 'center',
          background: colors.terracotta,
          color: '#FFF8ED',
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 16,
          padding: 16,
          borderRadius: 999,
          boxShadow: `0 10px 24px ${terracottaAlpha(0.32)}`,
        }}
      >
        Find something to cook
      </div>
    </div>
  );
}
