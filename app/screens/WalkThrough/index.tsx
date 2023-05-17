import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, Image, View, Animated, ImageStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Button, Text } from "app/components"
import { colors, spacing, typography } from "app/theme"
import { SlidingDot } from "react-native-animated-pagination-dots"
import { hp, wp } from "app/theme/responsive"
import Ionicons from "@expo/vector-icons/Ionicons"
import { WalkThroughItem, walkthroughPages } from "./walkThroughItems"

interface WalkthroughScreen extends AppStackScreenProps<"WalkthroughScreen"> {}

export const WalkthroughScreen: FC<WalkthroughScreen> = observer(function IntroWalkthroughScreen({
  navigation,
}) {
  const scrollX = React.useRef(new Animated.Value(0)).current
  const listRef = React.useRef<FlatList<WalkThroughItem>>()

  const goForward = (index: number) => {
    listRef.current.scrollToIndex({
      animated: true,
      index: index + 1,
    })
  }

  const goBack = (index: number) => {
    listRef.current.scrollToIndex({
      animated: true,
      index: index - 1,
    })
  }
  const renderBottom = (item: WalkThroughItem, index: number) => {
    switch (index) {
      case 2:
        return (
          <View style={{ flexDirection: "column", justifyContent: "space-around" }}>
            <Button text="Sign Up" preset="filled" onPress={() => navigation.navigate("SignUp")} />
            <Button
              text="Sign In"
              style={{ marginTop: spacing.small }}
              onPress={() => navigation.navigate("SignIn")}
            />
          </View>
        )

      default:
        return (
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button
              onPress={() => goBack(index)}
              LeftAccessory={() => (
                <Ionicons name="arrow-back" size={20} color={colors.palette.primary700} />
              )}
              disabled={index == 0}
              style={{ opacity: index == 0 ? 0.6 : 1, paddingHorizontal: spacing.medium }}
            />
            <Button
              onPress={() => goForward(index)}
              text="Next"
              textStyle={{
                color: item.titleColor,
              }}
              RightAccessory={() => (
                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color={item.titleColor}
                  style={{ marginLeft: spacing.large }}
                />
              )}
            />
          </View>
        )
    }
  }

  return (
    <>
      <FlatList
        data={walkthroughPages}
        horizontal
        ref={listRef}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              width: wp(100),
              backgroundColor: item.bg,
              padding: spacing.large,
            }}
          >
            <Image source={item.picture} style={$image} />
            <Text
              preset="subheading"
              style={{
                fontFamily: typography.fonts.spaceGrotesk.semiBold,
                color: item.titleColor,
              }}
              text={item.title}
            />
            <View style={{ height: hp(15) }}>
              <Text text={item.description} />
            </View>
            <View>{renderBottom(item, index)}</View>
          </View>
        )}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        pagingEnabled
      />
      <SlidingDot
        data={walkthroughPages}
        scrollX={scrollX}
        marginHorizontal={5}
        dotSize={8}
        dotStyle={{
          opacity: 0.4,
        }}
        containerStyle={{
          top: hp(48),
        }}
      />
    </>
  )
})

const $image: ImageStyle = {
  width: "100%",
  height: hp(45),
  marginVertical: spacing.large,
}
