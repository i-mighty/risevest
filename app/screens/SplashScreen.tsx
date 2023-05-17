import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Image, TextStyle, ImageStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { useAuth } from "app/hooks/useAuth"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface SplashScreenProps extends AppStackScreenProps<"Splash"> {}

export const SplashScreen: FC<SplashScreenProps> = observer(function SplashScreen({ navigation }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const timeout = setTimeout(() => {
      isAuthenticated ? navigation.navigate("Home") : navigation.navigate("WalkthroughScreen")
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <Screen style={$root} preset="fixed" StatusBarProps={{ hidden: true }}>
      <View style={$topBox}>
        <Image source={require("../../assets/logo.png")} style={$image} />
        <Text style={$whiteText} text="Dollar investments that" />
        <Text style={$whiteText} text="help you grow " />
      </View>
      <View style={$bottomBox}>
        <Text style={$whiteText} preset={"subText"} text="All rights reserved " />
        <Text style={$whiteText} preset={"subText"} text="(c) 2021 " />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  backgroundColor: colors.palette.primary700,
  justifyContent: "space-between",
  alignItems: "center",
  padding: spacing.huge,
}

const $topBox: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

const $bottomBox: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
}

const $image: ImageStyle = {
  width: 180,
  resizeMode: "contain",
}

const $whiteText: TextStyle = {
  color: colors.palette.neutral100,
  textAlign: "center",
}
