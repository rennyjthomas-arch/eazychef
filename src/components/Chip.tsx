import type { CSSProperties } from 'react';
import { colors, inkAlpha, terracottaAlpha } from '../theme';

export function chipStyle(selected: boolean) {
  return selected
    ? { bg: colors.terracotta, color: '#FFF8ED', borderColor: colors.terracotta }
    : { bg: colors.creamLight, color: colors.ink, borderColor: inkAlpha(0.14) };
}

interface OptionChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionChip({ label, selected, onClick }: OptionChipProps) {
  const { bg, color, borderColor } = chipStyle(selected);
  const style: CSSProperties = {
    cursor: 'pointer',
    padding: '9px 16px',
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
    border: `1.5px solid ${borderColor}`,
    background: bg,
    color,
  };
  return (
    <div style={style} onClick={onClick}>
      {label}
    </div>
  );
}

interface RemovableChipProps {
  label: string;
  onRemove: () => void;
}

export function RemovableChip({ label, onRemove }: RemovableChipProps) {
  const style: CSSProperties = {
    padding: '8px 14px',
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
    background: terracottaAlpha(0.1),
    color: colors.terracotta,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  };
  return (
    <div style={style}>
      {label}
      <span onClick={onRemove} style={{ cursor: 'pointer', opacity: 0.6 }}>
        ×
      </span>
    </div>
  );
}

interface QuickAddChipProps {
  label: string;
  onClick: () => void;
}

export function QuickAddChip({ label, onClick }: QuickAddChipProps) {
  const style: CSSProperties = {
    cursor: 'pointer',
    padding: '8px 14px',
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
    background: inkAlpha(0.05),
    color: colors.ink,
    border: `1px solid ${inkAlpha(0.1)}`,
  };
  return (
    <div style={style} onClick={onClick}>
      + {label}
    </div>
  );
}
