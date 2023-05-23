import React, { FC, ReactNode } from "react"
import { observer } from "mobx-react-lite"
import { Image, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { useHeader } from "app/utils/useHeader"
import { ShadowIcon } from "app/components/ShadowIcon"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { colors, spacing } from "app/theme"
import { hp, wp } from "app/theme/responsive"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Icon } from "@expo/vector-icons/build/createIconSet"
import { IconProps } from "@expo/vector-icons/build/createIconSet"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface CreateIntroScreenProps extends AppStackScreenProps<"CreateIntro"> {}

interface Section {
  title: string
  icon: ReactNode
  description: string
}
const sections: Section[] = [
  {
    title: "Give us a few details",
    icon: <AntDesign name="question" size={24} color={colors.palette.primary700} />,
    description: "Tell us what you want to achieve\nand we will help you get there",
  },
  {
    title: "Turn on auto-invest",
    icon: <Ionicons name="calendar-outline" size={24} color={colors.palette.primary700} />,
    description:
      "The easiest way to get your investment\nworking for you is to fund to periodically. ",
  },
  {
    title: "Modify as you progress",
    icon: <Ionicons name="cog-outline" size={24} color={colors.palette.primary700} />,
    description:
      "You are in charge. Make changes to your\nplan, from adding funds, funding source,\nadding money to your wallet and more.",
  },
]
export const CreateIntroScreen: FC<CreateIntroScreenProps> = observer(function CreateIntroScreen({
  navigation,
}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  useHeader({
    LeftActionComponent: (
      <ShadowIcon style={{ marginLeft: wp(5) }}>
        <Ionicons name="close" size={24} color={colors.palette.primary700} />
      </ShadowIcon>
    ),
    title: "Create a plan",
  })
  return (
    <View style={$root}>
      <View style={{ alignItems: "center" }}>
        <Text style={$description} text="Reach your goals faster" />
        <Image
          source={require("../../../assets/new_plan.png")}
          style={{
            resizeMode: "contain",
            height: hp(15),
            marginVertical: hp(5),
          }}
        />
      </View>
      <View style={{ marginBottom: hp(3) }}>
        {sections.map((s) => (
          <View style={{ flexDirection: "row", marginVertical: hp(1) }}>
            <ShadowIcon>{s.icon}</ShadowIcon>
            <View style={{ marginHorizontal: wp(5) }}>
              <Text text={s.title} preset="formLabel" />
              <Text
                text={s.description}
                style={{ marginVertical: spacing.micro, color: colors.textDim }}
                preset="subText"
              />
            </View>
          </View>
        ))}
      </View>
      <Button
        onPress={() => {
          navigation.navigate("CreatePlan")
        }}
        text="Continue"
        preset="filled"
      />
    </View>
  )
})

const $root: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
  paddingHorizontal: wp(5),
  paddingBottom: hp(10),
  justifyContent: "space-between",
}

const $description: TextStyle = {
  // marginVertical: spacing.small,
  color: colors.textDim,
  textAlign: "center",
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
