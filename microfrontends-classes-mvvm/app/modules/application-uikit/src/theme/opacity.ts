export const Opacity = {
  transparent: 0.0,
  disabled: 0.3,
  focused: 0.4,
  muted: 0.6,
  obscured: 0.95,
  opaque: 1.0,
} as const

export type Opacity = keyof typeof Opacity
