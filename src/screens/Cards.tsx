import { CARDS, CARDS_INTRO_LINES } from '../data';
import type { EazychefActions } from '../state';
import type { AppState } from '../types';
import { colors, fonts, inkAlpha, turmericAlpha } from '../theme';

interface CardsProps {
  state: AppState;
  actions: EazychefActions;
}

export function Cards({ state, actions }: CardsProps) {
  const cards = state.cardIds.map((id) => CARDS.find((c) => c.id === id)).filter((c): c is NonNullable<typeof c> => !!c);
  const intro = CARDS_INTRO_LINES[Math.min(state.regenCount, CARDS_INTRO_LINES.length - 1)];

  return (
    <div style={{ padding: '28px 0 32px', display: 'flex', flexDirection: 'column', gap: 18, minHeight: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 15, color: inkAlpha(0.75), lineHeight: 1.4 }}>
          {intro}
        </div>
        <div
          onClick={actions.regenerate}
          style={{
            cursor: 'pointer',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: colors.creamLight,
            border: `1px solid ${inkAlpha(0.12)}`,
            borderRadius: 999,
            padding: '8px 14px',
            fontSize: 12.5,
            fontWeight: 600,
            color: colors.terracotta,
            boxShadow: `0 4px 12px ${inkAlpha(0.05)}`,
          }}
        >
          <span style={{ fontSize: 14 }}>↻</span> Regenerate
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => actions.selectCard(card.id)}
            style={{
              cursor: 'pointer',
              background: colors.creamLight,
              border: `1px solid ${inkAlpha(0.08)}`,
              borderRadius: 26,
              overflow: 'hidden',
              boxShadow: `0 12px 28px ${inkAlpha(0.08)}`,
            }}
          >
            <div
              style={{
                height: 130,
                background: card.stripeBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  color: inkAlpha(0.5),
                  background: 'rgba(255,253,248,0.75)',
                  padding: '4px 10px',
                  borderRadius: 6,
                }}
              >
                photo: {card.photoLabel}
              </span>
            </div>
            <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 18, color: colors.ink }}>{card.name}</div>
                <div
                  style={{
                    flexShrink: 0,
                    background: turmericAlpha(0.22),
                    color: '#8A5A16',
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '5px 10px',
                    borderRadius: 999,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {card.prep}
                </div>
              </div>
              <div style={{ fontSize: 13.5, color: inkAlpha(0.68), lineHeight: 1.45 }}>{card.reason}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
