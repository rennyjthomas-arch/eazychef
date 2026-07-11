import { DEFAULT_COOK_NAME, type Recipe } from '../data';
import type { EazychefActions } from '../state';
import type { AppState } from '../types';
import { colors, fonts, inkAlpha, turmericAlpha } from '../theme';

interface DetailProps {
  state: AppState;
  selectedCard: Recipe;
  actions: EazychefActions;
}

export function Detail({ state, selectedCard, actions }: DetailProps) {
  const cookNameDisplay = state.cookWho || DEFAULT_COOK_NAME;
  const cookSkillDisplay = state.cookSkill || 'Comfortable cook';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', paddingTop: 28 }}>
      <div
        onClick={actions.backToMissing}
        style={{ cursor: 'pointer', fontSize: 13, fontWeight: 600, color: inkAlpha(0.5), marginBottom: 12 }}
      >
        ← Back
      </div>
      <div
        style={{
          height: 150,
          borderRadius: 20,
          background: selectedCard.image ? undefined : selectedCard.stripeBg,
          marginBottom: 16,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {selectedCard.image && (
          <>
            <img
              src={selectedCard.image.url}
              alt={selectedCard.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <a
              href={`${selectedCard.image.photographerUrl}?utm_source=eazychef&utm_medium=referral`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                bottom: 8,
                right: 10,
                fontSize: 10,
                color: 'rgba(255,255,255,0.9)',
                background: 'rgba(0,0,0,0.4)',
                padding: '3px 8px',
                borderRadius: 999,
                textDecoration: 'none',
              }}
            >
              {selectedCard.image.photographerName} / Unsplash
            </a>
          </>
        )}
      </div>
      <div style={{ padding: '0 0 100px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 24, color: colors.ink }}>{selectedCard.name}</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <div
            style={{
              background: turmericAlpha(0.22),
              color: '#8A5A16',
              fontSize: 11,
              fontWeight: 700,
              padding: '6px 12px',
              borderRadius: 999,
            }}
          >
            {selectedCard.prep}
          </div>
          <div
            style={{
              background: inkAlpha(0.06),
              color: colors.ink,
              fontSize: 11,
              fontWeight: 700,
              padding: '6px 12px',
              borderRadius: 999,
            }}
          >
            Written for {cookNameDisplay} · {cookSkillDisplay}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 4 }}>
          {selectedCard.steps.map((step) => (
            <div key={step.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 999,
                  background: colors.terracotta,
                  color: '#FFF8ED',
                  fontSize: 12,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {step.n}
              </div>
              <div style={{ fontSize: 14.5, color: colors.ink, lineHeight: 1.5, paddingTop: 2 }}>{step.text}</div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: 'sticky',
          bottom: 0,
          padding: '14px 20px 20px',
          background: 'linear-gradient(to top, #FAF3E7 70%, rgba(250,243,231,0))',
          display: 'flex',
          gap: 10,
        }}
      >
        <div
          onClick={actions.goRating}
          style={{
            cursor: 'pointer',
            flex: 1,
            textAlign: 'center',
            background: colors.ink,
            color: '#FFF8ED',
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: 14,
            padding: 14,
            borderRadius: 999,
          }}
        >
          I cooked this
        </div>
        <div
          style={{
            cursor: 'pointer',
            flexShrink: 0,
            width: 52,
            background: '#25D366',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 999,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12c0 1.82.48 3.53 1.32 5L2 22l5.14-1.28C8.56 21.54 10.24 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"
              fill="#fff"
            />
            <path
              d="M8.5 8.5c.3-.6.9-.6 1.2 0l.6 1.2c.2.4.1.9-.2 1.2l-.4.4c.5 1 1.4 1.9 2.4 2.4l.4-.4c.3-.3.8-.4 1.2-.2l1.2.6c.6.3.6.9 0 1.2-1.6.9-3.7.3-5.2-1.2S7.6 10.1 8.5 8.5z"
              fill="#25D366"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
