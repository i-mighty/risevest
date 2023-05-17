import { addOpacity, colors, spacing } from "app/theme"
import { wp, hp } from "app/theme/responsive"
import React, { useEffect } from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "./Text"
import { useRequestProcessor } from "app/hooks/useRequest"
import { GetQuote } from "app/services/api/requests"

export function QuoteCard() {
  const { query } = useRequestProcessor()

  const { data } = query("quote", GetQuote, { enabled: true })
  useEffect(() => {
    console.log("====================================")
    console.log("quote", data)
    console.log("====================================")
  }, [data])
  return (
    <View
      style={[
        $helpCard,
        {
          backgroundColor: colors.palette.primary700,
          paddingHorizontal: wp(5),
          paddingVertical: hp(2),
        },
      ]}
    >
      <Text text="TODAY'S QUOTE" preset="bold" style={{ color: colors.background }} />
      <View
        style={{
          borderColor: colors.background,
          width: wp(8),
          borderTopWidth: 2,
          marginVertical: hp(2),
        }}
      />
      <Text
        preset="subText"
        style={{ color: colors.background }}
        text="We have no intention of rotating capital out of strong multi-year investments because they’ve recently done well or because ‘growth’ has out performed ‘value’."
      />
      <Text
        preset="formLabel"
        style={{ color: colors.background, marginTop: hp(2) }}
        text={"Carl Segan"}
      />
    </View>
  )
}

export default QuoteCard

const $helpCard: ViewStyle = {
  borderRadius: spacing.medium,
  padding: spacing.extraSmall,
  borderWidth: 1,
  shadowColor: colors.palette.neutral800,
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.08,
  shadowRadius: 12.81,
  elevation: 16,
  backgroundColor: colors.palette.neutral100,
  borderColor: addOpacity(colors.palette.neutral300, 60),
}
