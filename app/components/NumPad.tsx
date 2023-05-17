import { FlatList, TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import React, { FC, useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import Animated, { FadeInDown } from "react-native-reanimated"
import { colors, spacing } from "app/theme"
import { Text } from "./Text"

import { hp, wp } from "app/theme/responsive"

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "#"]

interface Props {
  value: string
  onChange: (value: string) => void
  onDelete: (value: string) => void
}
const NumPad: FC<Props> = ({ onChange, value, onDelete }) => {
  const addValue = (val: string) => {
    const valueStr = value + val
    onChange(valueStr)
  }
  const removeValue = () => {
    const valueStr = value.slice(0, -1)
    onDelete(valueStr || "")
  }
  return (
    <Animated.View entering={FadeInDown.duration(500)} style={$root}>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
        data={numbers}
        numColumns={3}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item, index }) => {
          if (item == "#") {
            return (
              <Animated.View entering={FadeInDown.delay(800)} style={$PadButtonView}>
                <TouchableOpacity onPress={() => removeValue()} style={$PadButtonTouchable}>
                  <Ionicons
                    name="backspace-outline"
                    size={wp(8)}
                    color={colors.palette.primary700}
                  />
                </TouchableOpacity>
              </Animated.View>
            )
          } else {
            return (
              <Animated.View
                entering={FadeInDown.delay((Math.floor(index / 3) + 1) * 200).damping(5)}
                style={$PadButtonView}
              >
                <TouchableOpacity
                  onPress={() => addValue(item as string)}
                  style={$PadButtonTouchable}
                >
                  <Text preset="heading" style={$PadButtonText}>
                    {item}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )
          }
        }}
      />
    </Animated.View>
  )
}

const $PadButtonView: ViewStyle = {
  width: wp(20),
  height: wp(20),
  marginVertical: hp(1.5),
  marginHorizontal: wp(5),
  paddingHorizontal: wp(6),
  paddingVertical: wp(4),
  borderRadius: spacing.massive,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.shadowBackground,
}

const $PadButtonText: TextStyle = {
  color: colors.palette.primary700,
  textAlign: "center",
}

const $PadButtonTouchable: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const $root: ViewStyle = {
  flex: 1,
  marginTop: spacing.large,
}
export default NumPad
