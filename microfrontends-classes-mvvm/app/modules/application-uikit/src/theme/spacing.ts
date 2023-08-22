export const Spacing = {
  zero: 0,
  xxxs: 1,
  xxs: 2,
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  xxxxl: 60,
} as const

export type Spacing = keyof typeof Spacing
