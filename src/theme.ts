export const colors = {
  cream: '#FAF3E7',
  creamLight: '#FFFDF8',
  bg: '#F0E9DC',
  terracotta: '#C1592F',
  turmeric: '#E7A93B',
  sage: '#8FA05E',
  ink: '#2B1B12',
} as const;

export const fonts = {
  display: "'Fredoka', sans-serif",
  body: "'Inter', sans-serif",
} as const;

export const inkAlpha = (a: number) => `rgba(43,27,18,${a})`;
export const terracottaAlpha = (a: number) => `rgba(193,89,47,${a})`;
export const turmericAlpha = (a: number) => `rgba(231,169,59,${a})`;
export const sageAlpha = (a: number) => `rgba(143,160,94,${a})`;
