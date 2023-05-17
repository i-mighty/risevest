// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#41BCC4",
  primary200: "#38B6BE",
  primary300: "#2EB0B8",
  primary400: "#25AAB2",
  primary500: "#1BA4AC",
  primary600: "#119EA6",
  primary700: "#0898A0",

  transparentGrey: "#71879C1F",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#F34040",

  success500: "#27BF41",

  textNeutral: "#71879C",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.textNeutral,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral100,

  shadowBackground: palette.transparentGrey,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
  /**
   * Success messages
   *
   */
  success: palette.success500,
}

export function addOpacity(hex: string, opacity: number) {
  // Check if the opacity is a valid value
  if (opacity < 0 || opacity > 100) {
    throw new Error("Opacity must be between 0 and 100")
  }

  // Convert the hex color to an array of RGB values
  var rgb = hexToRgb(hex)

  // Calculate the alpha channel value
  var alpha = opacity / 100

  // Create a new color with the specified opacity
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`
}

// Helper function to convert a hex color to an array of RGB values
export function hexToRgb(hex: string) {
  // Remove the hash symbol from the hex string
  hex = hex.replace("#", "")

  // Convert the hex string to an array of RGB values
  var rgb = [
    parseInt(hex.substring(0, 2), 16),
    parseInt(hex.substring(2, 4), 16),
    parseInt(hex.substring(4, 6), 16),
  ]

  return rgb
}
