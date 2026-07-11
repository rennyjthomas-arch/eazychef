interface LogoProps {
  size?: number;
}

export function Logo({ size = 34 }: LogoProps) {
  return (
    <svg width={size} height={(size * 56) / 80} viewBox="0 0 80 56" style={{ flexShrink: 0 }}>
      <rect x="18" y="6" width="44" height="44" rx="16" fill="#E7A93B" />
      <circle cx="32" cy="26" r="2.5" fill="#2B1B12" />
      <circle cx="48" cy="26" r="2.5" fill="#2B1B12" />
      <path d="M30 36 Q40 42 50 36" stroke="#2B1B12" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
