import { TREND_DAYS } from '../data';
import type { EazychefActions } from '../state';
import type { AppState } from '../types';
import { Logo } from '../components/Logo';
import { colors, fonts, inkAlpha } from '../theme';

interface TrendsProps {
  state: AppState;
  actions: EazychefActions;
}

export function Trends({ state, actions }: TrendsProps) {
  const goalText = state.goal ? state.goal.toLowerCase() : 'eating better';
  const trendCallout = `You said you wanted ${goalText} — and this week you've leaned toward high-protein dinners three nights running. Noticed.`;

  return (
    <div style={{ padding: '28px 0 24px', display: 'flex', flexDirection: 'column', gap: 20, minHeight: '100%' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <div style={{ marginTop: 2 }}>
          <Logo size={34} />
        </div>
        <div
          style={{
            background: colors.creamLight,
            border: `1px solid ${inkAlpha(0.08)}`,
            borderRadius: '4px 16px 16px 16px',
            padding: '14px 16px',
            fontFamily: fonts.display,
            fontWeight: 500,
            fontSize: 15,
            color: colors.ink,
            lineHeight: 1.45,
          }}
        >
          {trendCallout}
        </div>
      </div>

      <div
        style={{
          background: colors.creamLight,
          border: `1px solid ${inkAlpha(0.08)}`,
          borderRadius: 22,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: inkAlpha(0.45) }}>
          Protein-forward dinners, last 7 days
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 110 }}>
          {TREND_DAYS.map((d) => (
            <div
              key={d.label}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}
            >
              <div style={{ width: '100%', borderRadius: 6, height: d.h, background: d.p ? colors.terracotta : inkAlpha(0.12) }} />
              <div style={{ fontSize: 10, fontWeight: 600, color: inkAlpha(0.45) }}>{d.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1 }} />
      <div
        onClick={actions.goRoadmap}
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
        Continue
      </div>
    </div>
  );
}
