export const Radius = {
  s: 5,
  m: 10,
  l: 15,
  max: ~(1 << 31),
} as const

export type Radius = keyof typeof Radius
