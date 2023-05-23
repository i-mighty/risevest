import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Text } from "app/components"
import { colors, spacing, typography } from "app/theme"
import { hp, wp } from "app/theme/responsive"
import { Feather } from "@expo/vector-icons"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface FeedbackScreenProps extends AppStackScreenProps<"Feedback"> {}

export const FeedbackScreen: FC<FeedbackScreenProps> = observer(function FeedbackScreen({
  route,
  navigation,
}) {
  const params = route.params
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={$root}>
      <View style={$topBox}>
        <View style={$iconContainer}>
          <Feather name="check" size={wp(20)} color={colors.palette.primary700} />
        </View>
        <Text style={$heading} preset="subheading" text={params?.title || "Success"} />
        <Text
          style={$description}
          text={params?.description || "Congratulations\nYour desired action was successful"}
        />
      </View>
      <View style={$bottomBox}>
        <Button preset="filled" text={params?.buttonText || "Okay"} onPress={params?.action} />
      </View>
    </View>
  )
})

const $iconContainer: ViewStyle = {
  marginHorizontal: wp(5),
  padding: spacing.large,
  borderRadius: wp(20),
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.shadowBackground,
}

const $heading: TextStyle = {
  marginTop: spacing.huge,
  textAlign: "center",
  fontFamily: typography.fonts.spaceGrotesk.semiBold,
}

const $description: TextStyle = {
  marginTop: spacing.small,
  color: colors.textDim,
  textAlign: "center",
}

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: hp(10),
}

const $topBox: ViewStyle = {
  alignItems: "center",
  width: "100%",
  marginVertical: hp(12),
}

const $bottomBox: ViewStyle = {
  width: "80%",
  justifyContent: "center",
}
