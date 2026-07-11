import { ROADMAP_TILES } from '../data';
import type { EazychefActions } from '../state';
import { colors, fonts, inkAlpha } from '../theme';

interface RoadmapProps {
  actions: EazychefActions;
}

export function Roadmap({ actions }: RoadmapProps) {
  return (
    <div style={{ padding: '28px 0 28px', display: 'flex', flexDirection: 'column', gap: 18, minHeight: '100%' }}>
      <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 19, color: colors.ink }}>What's cooking next</div>
      <div style={{ fontSize: 13, color: inkAlpha(0.6), lineHeight: 1.5, marginTop: -8 }}>
        A peek at what's coming to Eazychef.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {ROADMAP_TILES.map((tile) => (
          <div
            key={tile.name}
            style={{
              background: inkAlpha(0.04),
              border: `1px dashed ${inkAlpha(0.18)}`,
              borderRadius: 20,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              minHeight: 120,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: inkAlpha(0.1),
                color: inkAlpha(0.55),
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                padding: '4px 8px',
                borderRadius: 999,
              }}
            >
              Soon
            </div>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: tile.iconBg, opacity: 0.55 }} />
            <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 14, color: inkAlpha(0.55) }}>{tile.name}</div>
            <div style={{ fontSize: 11.5, color: inkAlpha(0.4), lineHeight: 1.4 }}>{tile.blurb}</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />
      <div
        onClick={actions.restart}
        style={{
          cursor: 'pointer',
          textAlign: 'center',
          background: inkAlpha(0.06),
          color: colors.ink,
          fontFamily: fonts.display,
          fontWeight: 600,
          fontSize: 14,
          padding: 14,
          borderRadius: 999,
        }}
      >
        Back to start
      </div>
    </div>
  );
}
