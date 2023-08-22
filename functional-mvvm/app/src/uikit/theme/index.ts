import { Colors } from './colors'
import { Timing } from './timing'
import { Radius } from './radius'
import { Shadow } from './shadow'
import { Spacing } from './spacing'
import { Opacity } from './opacity'
import { Constants } from './constants'
import { Typography } from './typography'

export const Theme = {
  Colors,
  Timing,
  Radius,
  Shadow,
  Spacing,
  Opacity,
  Constants,
  Typography,
}

export type Theme = {
  Colors: Colors
  Timing: Timing
  Radius: Radius
  Shadow: Shadow
  Spacing: Spacing
  Opacity: Opacity
  Constants: Constants
  Typography: Typography
}
