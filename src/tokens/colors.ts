/**
 * Deel brand color tokens (hex for screen).
 * Aligned with CSS variables in index.css – use for JS (e.g. confetti, charts).
 */
export const colors = {
  licorice: '#000000',
  deelberry: '#1a0a5c',
  acai: '#5c2d91',
  acai2: '#7b5bb5',
  smoothie: '#a89fcc',
  smoothie2: '#c4b9dc',
  smoothie3: '#e8dceb',
  latte: '#e8dfc4',
  burntTangelo: '#c7381f',
  tangelo: '#e85c00',
  tangelo2: '#f27a1b',
  cornbread: '#ffd426',
  cornbread2: '#ffed63',
  cornbread3: '#fff28f',
  white: '#ffffff',
  blueberry: '#0d2b7e',
  blueberry2: '#3d7ddb',
  seltzer: '#8fc5f0',
  seltzer2: '#b8e2fc',
  seltzer3: '#cce8f7',
} as const;

/** Brand palette for celebrations / charts (vibrant set) */
export const celebrationColors = [
  colors.acai,
  colors.deelberry,
  colors.tangelo,
  colors.cornbread,
  colors.blueberry2,
] as const;

/**
 * Deep, rich background tints for section colour rotation (dark premium theme).
 * Each is a dark, saturated shade of a brand colour – subtle enough to keep
 * text legible, rich enough to feel luxurious.
 * Order alternates warm / cool for maximum contrast between neighbours.
 */
export const sectionBgPalette = [
  '#201547', // acai / deelberry  (deep purple)
  '#1f1a14', // latte             (warm dark)
  '#111a2e', // blueberry         (deep navy)
  '#251710', // tangelo           (dark ember)
  '#1c1828', // smoothie          (dark mauve)
  '#1e1c0e', // cornbread         (dark gold)
  '#121828', // blueberry alt     (midnight)
] as const;

