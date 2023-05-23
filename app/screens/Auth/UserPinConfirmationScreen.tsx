import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { BackButton, Screen, Text } from "app/components"
import { typography, colors, spacing } from "app/theme"
import { hp, wp } from "app/theme/responsive"
import SmoothPinCodeInput from "@dreamwalk-os/react-native-smooth-pincode-input"
import NumPad from "app/components/NumPad"
import { useHeader } from "app/utils/useHeader"
import { Octicons } from "@expo/vector-icons"
import { useAuth } from "app/hooks/useAuth"

interface UserPinConfirmationScreenProps extends AppStackScreenProps<"UserPinConfirmation"> {}

export const UserPinConfirmationScreen: FC<UserPinConfirmationScreenProps> = observer(
  function UserPinConfirmationScreen({ route, navigation }) {
    const params = route.params
    const [pin, setPin] = useState("")
    const { savePinCode } = useAuth()
    useHeader({
      LeftActionComponent: <BackButton />,
    })
    useEffect(() => {
      if (pin.length == 6) {
        if (pin == params.pin) {
          savePinCode(pin)
          //Goto home
          navigation.navigate("Home")
        }
      }
    }, [pin, params.pin])
    // const [isConfirming, setIsConfirming] = useState(false)
    const pinRef = useRef()
    const update = (val: string) => {
      console.log("valueStr", val)

      if (pin.length == 6 || pin === val) {
        return
      }
      setPin(val)
    }
    const onDelete = (val: string) => {
      console.log("valueStr", val)

      setPin(val)
    }
    const confirm = () => {}
    return (
      <Screen style={$root} preset="fixed">
        <View>
          <Text style={$heading} text={"Confirm 6-digit PIN"} preset="subheading" />
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
              onFulfill={confirm}
            />
            <View style={{ height: hp(50) }}>
              <NumPad value={pin} onChange={update} onDelete={onDelete} />
            </View>
          </View>
        </View>
      </Screen>
    )
  },
)

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
