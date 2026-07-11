import type { Recipe } from '../data';
import type { EazychefActions } from '../state';
import { colors, fonts, inkAlpha, sageAlpha, terracottaAlpha } from '../theme';

interface MissingProps {
  selectedCard: Recipe;
  actions: EazychefActions;
}

export function Missing({ selectedCard, actions }: MissingProps) {
  const hasMissing = selectedCard.missing.length > 0;

  return (
    <div style={{ padding: '28px 0 24px', display: 'flex', flexDirection: 'column', gap: 18, minHeight: '100%' }}>
      <div onClick={actions.backToCards} style={{ cursor: 'pointer', fontSize: 13, fontWeight: 600, color: inkAlpha(0.5) }}>
        ← Back
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: selectedCard.stripeBg, flexShrink: 0 }} />
        <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 18, color: colors.ink }}>{selectedCard.name}</div>
      </div>

      {hasMissing ? (
        <div
          style={{
            background: terracottaAlpha(0.08),
            border: `1px solid ${terracottaAlpha(0.18)}`,
            borderRadius: 20,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 14, color: colors.ink }}>
            Quick heads up — a couple of things aren't in your kitchen yet:
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {selectedCard.missing.map((m) => (
              <div
                key={m}
                style={{
                  padding: '8px 14px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  background: colors.creamLight,
                  border: `1px solid ${terracottaAlpha(0.25)}`,
                  color: colors.terracotta,
                }}
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            background: sageAlpha(0.1),
            border: `1px solid ${sageAlpha(0.25)}`,
            borderRadius: 20,
            padding: 16,
            fontFamily: fonts.display,
            fontWeight: 500,
            fontSize: 14,
            color: '#4E5E33',
          }}
        >
          You've got everything for this one already. Nice.
        </div>
      )}

      <div style={{ flex: 1 }} />
      <div
        onClick={actions.goDetail}
        style={{
          cursor: 'pointer',
          textAlign: 'center',
          background: colors.ink,
          color: '#FFF8ED',
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 15,
          padding: 15,
          borderRadius: 999,
        }}
      >
        Let's cook anyway
      </div>
    </div>
  );
}
