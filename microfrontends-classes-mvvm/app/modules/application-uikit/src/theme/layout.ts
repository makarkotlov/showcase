export const Layout = {
  button: {
    xxxs: 15,
    xxs: 20,
    xs: 25,
    sm: 35,
    md: 40,
    lg: 50,
    xl: 60,
  },
} as const

export type Layout = keyof typeof Layout
