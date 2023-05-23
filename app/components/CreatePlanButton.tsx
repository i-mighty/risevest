import React, { memo } from "react"
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
  ViewStyle,
} from "react-native"
import { Text, TextProps } from "./Text"
import { Ionicons } from "@expo/vector-icons"
import { addOpacity, colors, spacing } from "app/theme"
import { wp, hp } from "app/theme/responsive"
import { useNavigation } from "@react-navigation/native"

interface IButtonProps extends TouchableWithoutFeedbackProps {
  loading?: boolean
}

const PlainButton: React.FC<IButtonProps> = (props) => {
  const { loading, onPress, ...rest } = props
  const navigation = useNavigation()
  const onInternalButtonPress = (event: any) => {
    //other actions
    //@ts-ignore
    navigation.navigate("CreateIntro")
    onPress?.(event)
  }

  return (
    <TouchableWithoutFeedback onPress={onInternalButtonPress} disabled={loading} {...rest}>
      <View style={$createButton}>
        <View
          style={{
            padding: wp(2),
            backgroundColor: addOpacity(colors.palette.primary100, 30),
            borderRadius: wp(15),
            marginBottom: hp(2),
          }}
        >
          <Ionicons name="add" size={wp(7)} color={colors.palette.primary700} />
        </View>
        <Text
          text={"Create an\ninvestment plan"}
          preset="bold"
          style={{ textAlign: "center", color: colors.palette.neutral700 }}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const $createButton: ViewStyle = {
  paddingHorizontal: wp(7),
  paddingVertical: hp(7),
  borderRadius: spacing.small,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.shadowBackground,
}

export default memo(PlainButton)
