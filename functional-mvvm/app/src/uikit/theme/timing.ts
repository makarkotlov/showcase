export const Timing = {
  quick: 300,
  medium: 600,
  long: 900,
} as const

export type Timing = keyof typeof Timing
