import React, { FC, useState, useRef, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { BackButton, Screen, Text } from "app/components"
import { spacing, typography, colors } from "app/theme"
import { hp, wp } from "app/theme/responsive"
import SmoothPinCodeInput from "@dreamwalk-os/react-native-smooth-pincode-input"
import NumPad from "app/components/NumPad"
import { Octicons } from "@expo/vector-icons"
import { useHeader } from "app/utils/useHeader"

//@ts-ignore

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface UserPinScreenProps extends AppStackScreenProps<"UserPin"> {}

export const UserPinScreen: FC<UserPinScreenProps> = observer(function UserPinScreen({
  route,
  navigation,
}) {
  const [pin, setPin] = useState("")
  useHeader({
    LeftActionComponent: <BackButton />,
  })
  useEffect(() => {
    if (pin.length == 6) {
      navigation.navigate("UserPinConfirmation", { pin })
    }
  }, [pin])
  const pinRef = useRef()
  const update = (val: string) => {
    if (pin.length == 6 || pin === val) {
      return
    }
    setPin(val)
  }
  const onDelete = (val: string) => {
    console.log("valueStr", val)

    setPin(val)
  }
  return (
    <Screen style={$root} preset="fixed">
      <View>
        <Text style={$heading} text={"Create a 6-digit PIN"} preset="subheading" />
        <Text
          style={$description}
          text={"You’ll use this PIN to sign in and confirm\ntransactions"}
        />

        <View style={$InputContainer}>
          <SmoothPinCodeInput
            ref={pinRef}
            value={pin}
            codeLength={6}
            cellSpacing={wp(2.5)}
            cellSize={wp(12.5)}
            cellStyle={{
              borderColor: `${colors.palette.primary700}44`,
              borderWidth: 1,
              borderRadius: spacing.small,
            }}
            password
            cellStyleFilled={{
              borderColor: `${colors.palette.primary700}44`,
            }}
            mask={<Octicons name="dot-fill" size={24} color="black" />}
          />
          <View style={{ height: hp(50) }}>
            <NumPad value={pin} onChange={update} onDelete={onDelete} />
          </View>
        </View>
      </View>
    </Screen>
  )
})

const $heading: TextStyle = {
  fontFamily: typography.fonts.spaceGrotesk.semiBold,
}

const $description: TextStyle = {
  marginTop: hp(2),
  color: colors.textDim,
}

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
  paddingVertical: spacing.medium,
}

const $InputContainer: ViewStyle = {
  // flex: 1,
  height: hp(62),
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: spacing.large,
}
