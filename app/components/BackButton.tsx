import * as React from "react"
import { StyleProp, TextStyle, TouchableHighlight, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import { Text } from "app/components/Text"
import { wp, hp } from "app/theme/responsive"
import { Ionicons } from "@expo/vector-icons"
import { goBack } from "app/navigators"

export interface BackButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  onPress?: () => void
}

/**
 * Describe your component here
 */
export const BackButton = observer(function BackButton(props: BackButtonProps) {
  const { style, onPress } = props
  const $styles = [$container, style]

  return (
    <TouchableHighlight onPress={onPress || goBack}>
      <View style={$styles}>
        <Ionicons name="arrow-back" size={wp(5)} color={colors.palette.primary700} />
      </View>
    </TouchableHighlight>
  )
})

const $container: ViewStyle = {
  width: wp(10),
  height: wp(10),
  marginHorizontal: wp(5),
  paddingHorizontal: wp(2),
  paddingVertical: wp(1),
  borderRadius: spacing.medium,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.shadowBackground,
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
