import type { ReactNode } from 'react';
import { Logo } from './Logo';
import { colors, fonts, inkAlpha } from '../theme';

export function BotBubble({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <div style={{ marginTop: 2 }}>
        <Logo size={34} />
      </div>
      <div
        style={{
          background: colors.creamLight,
          border: `1px solid ${inkAlpha(0.08)}`,
          borderRadius: '4px 16px 16px 16px',
          padding: '12px 16px',
          fontFamily: fonts.display,
          fontWeight: 500,
          fontSize: 15,
          color: colors.ink,
          maxWidth: '82%',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function UserBubble({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        alignSelf: 'flex-end',
        background: colors.terracotta,
        color: '#FFF8ED',
        fontFamily: fonts.display,
        fontWeight: 600,
        fontSize: 14,
        padding: '10px 16px',
        borderRadius: '16px 16px 4px 16px',
        maxWidth: '78%',
      }}
    >
      {children}
    </div>
  );
}
