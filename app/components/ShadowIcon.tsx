import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { wp } from "app/theme/responsive"
import { Ionicons } from "@expo/vector-icons"
import { ReactNode } from "react"

export interface BackButtonProps {
  children: ReactNode
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const ShadowIcon = observer(function BackButton({ children, style }: BackButtonProps) {
  const $styles = [$container, style]

  return <View style={$styles}>{children}</View>
})

const $container: ViewStyle = {
  width: wp(10),
  height: wp(10),
  paddingHorizontal: wp(2),
  paddingVertical: wp(1),
  borderRadius: spacing.extraLarge,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.shadowBackground,
}
