import { FC, forwardRef, useImperativeHandle, useState } from "react"
import { TextInput, TextInputProps } from "react-native-paper"
import { View, ViewStyle, TextInput as RNInput } from "react-native"

const $InputContainer: ViewStyle = {
  flexDirection: "row",
  flex: 1,
}
const $AdornmentContainer: ViewStyle = {
  // alignItems: "center",
  justifyContent: "center",
  paddingVertical: 0,
  paddingLeft: 10,
}

export interface CustomInputRef {
  focus: () => void
}

interface Props extends TextInputProps {}

export const CustomInput = forwardRef<CustomInputRef, Props>((props, ref) => {
  const { left, right } = props
  const [focused, setFocused] = useState(false)

  return (
    <TextInput
      {...props}
      label={focused && props.value && props.label}
      render={(inputProps) => (
        <View style={$InputContainer}>
          {left && <View style={$AdornmentContainer}>{left}</View>}
          <RNInput
            {...inputProps}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {right && <View style={$AdornmentContainer}>{right}</View>}
        </View>
      )}
    />
  )
})
