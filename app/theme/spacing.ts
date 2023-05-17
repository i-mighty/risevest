import { wp } from "./responsive"

/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  micro: wp(1),
  tiny: wp(2),
  extraSmall: wp(2.5),
  small: wp(3),
  medium: wp(4),
  large: wp(6),
  extraLarge: wp(8),
  huge: wp(10),
  massive: wp(12),
} as const

export type Spacing = keyof typeof spacing
