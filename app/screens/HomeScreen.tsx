import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Animated, TextStyle, View, ViewStyle, Image } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Button, Card, Screen, Text } from "app/components"
import { hp, wp } from "app/theme/responsive"
import { LinearGradient } from "expo-linear-gradient"
import { addOpacity, colors, spacing } from "app/theme"
import { useHeader } from "app/utils/useHeader"
import { Badge, Divider } from "react-native-paper"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import PlainButton from "app/components/PlainButton"
import { ExpandingDot, SlidingDot } from "react-native-animated-pagination-dots"
import { ShadowIcon } from "app/components/ShadowIcon"
import PlansList from "app/components/PlansList"
import QuoteCard from "app/components/QuoteCard"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const scrollX = React.useRef(new Animated.Value(0)).current

  return (
    <Screen style={$root} preset="scroll">
      <LinearGradient
        style={$gradientTop}
        colors={[
          addOpacity(colors.palette.neutral900, 40),
          addOpacity(colors.palette.secondary200, 16.5),
          colors.background,
        ]}
        start={{ x: 0.5, y: -0.2 }}
      >
        <View style={$row}>
          <View>
            <Text text="Good morning ☀" />
            <Text style={{ fontSize: 20 }} text="Deborah" />
          </View>

          <PlainButton>
            <View
              style={{
                backgroundColor: colors.palette.primary700,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: wp(12),
              }}
            >
              <Text text="Earn 3% bonus" style={{ color: colors.palette.accent100 }} />
            </View>
          </PlainButton>
          <PlainButton>
            <>
              <MaterialCommunityIcons name="bell" size={wp(10)} color={colors.palette.primary700} />
              <Badge
                size={wp(6.2)}
                style={{
                  top: -5,
                  right: -5,
                  paddingHorizontal: 5,
                  position: "absolute",
                  // fontWeight: "bold",
                }}
              >
                9+
              </Badge>
            </>
          </PlainButton>
        </View>
        <View
          style={{
            backgroundColor: colors.background,
            padding: wp(5),
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.background,
            marginVertical: hp(2),
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text text="Total Balance" style={{ color: colors.textDim }} />
            <Ionicons
              name="eye"
              size={14}
              color={colors.textDim}
              style={{ marginLeft: wp(2), marginTop: 2 }}
            />
          </View>
          <Text preset="heading" text="$0.00" style={{ marginVertical: hp(1) }} />
          <Divider />
          <View
            style={{
              width: "100%",
              marginHorizontal: wp(5),
              paddingTop: hp(1),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderTopWidth: 0.1,
              borderColor: colors.palette.primary700,
            }}
          >
            <Text text="Total Gains" style={{ color: colors.textDim }} />
            <MaterialCommunityIcons
              name="arrow-top-right"
              size={14}
              color={colors.error}
              style={{ marginHorizontal: wp(2), marginTop: 2 }}
            />
            <Text text="0.02%" style={{ color: colors.success }} />
            <Ionicons
              name="chevron-forward"
              size={14}
              color={colors.palette.primary700}
              style={{ marginHorizontal: wp(2), marginTop: 2 }}
            />
          </View>
          <View>
            <ExpandingDot
              data={[1, 2, 3]}
              expandingDotWidth={16}
              scrollX={scrollX}
              inActiveDotOpacity={0.6}
              dotStyle={{
                width: 8,
                height: 8,
                backgroundColor: colors.palette.primary700,
                borderRadius: 5,
                marginHorizontal: 5,
              }}
              containerStyle={{
                top: 10,
              }}
            />
          </View>
          <View style={{ marginTop: hp(7), flexDirection: "row" }}>
            <Button style={{ width: "100%", backgroundColor: colors.background }} preset="default">
              <Ionicons name="add" size={26} color={colors.palette.primary700} />
              <Text preset="bold" style={{ marginTop: 2, color: colors.palette.primary700 }}>
                Add Money
              </Text>
            </Button>
          </View>
        </View>
      </LinearGradient>
      <View style={$plansView}>
        <View style={$row}>
          <Text style={{ fontSize: 20 }} text="Create a plan" />
          <PlainButton>
            <View style={$row}>
              <Text text="View all plans" style={{ color: colors.textDim }} />
              <Ionicons
                name="chevron-forward"
                size={18}
                color={colors.palette.primary700}
                style={{ marginHorizontal: wp(2), marginTop: 2 }}
              />
            </View>
          </PlainButton>
        </View>
        <Text
          style={$description}
          text={"Start building your dollar-denominated \ninvestment portfolio"}
        />
        <View style={[{ marginVertical: hp(2) }]}>
          <PlansList />
          {/* List Plans */}
        </View>
        {/* Help Button */}
        <View style={[{ marginVertical: hp(2) }, $row, $helpCard]}>
          <View style={[{ flexDirection: "row", alignItems: "center" }]}>
            <ShadowIcon>
              <AntDesign name="question" size={20} color={colors.palette.primary700} />
            </ShadowIcon>
            <Text style={{ marginLeft: wp(2) }} text="Need help?" preset="formLabel" />
          </View>
          <Button text="Contact us" preset="filled" style={{ paddingVertical: 10 }} />
        </View>
        {/* Quote of the day */}
        <View style={{ marginVertical: hp(2) }}>
          <QuoteCard />
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../../assets/logo_grey.png")}
            style={{
              resizeMode: "contain",
              height: hp(8),
              width: wp(30),
            }}
          />
        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $row: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $gradientTop: ViewStyle = {
  paddingTop: hp(7),
  paddingHorizontal: spacing.medium,
}

const $plansView: ViewStyle = {
  paddingTop: hp(3),
  paddingHorizontal: spacing.medium,
}

const $description: TextStyle = {
  marginTop: hp(2),
  color: colors.textDim,
}

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
