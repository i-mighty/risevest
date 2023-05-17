import React, { memo, useEffect } from "react"
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native"

import { Controller, Control, FieldValues } from "react-hook-form"
import { hp } from "app/theme/responsive"
import { TextInput, TextInputProps } from "react-native-paper"
import { colors, typography } from "app/theme"

export interface FormInputProps extends TextInputProps {
  fieldKey: string
  control?: Control<FieldValues, object>
  errors?: {
    [x: string]: any
  }
  rules?: {
    [key: string]: any
  }
  onFieldSubmit?: () => void
  onInputRef?: (ref: any) => void
  wrapperStyle?: StyleProp<ViewStyle>
  autoNextFocus?: boolean
  formatter?: (value: string) => string | null
}

const FormInput: React.FC<FormInputProps> = (props) => {
  const {
    control,
    style,
    errors,
    fieldKey,
    rules,
    onFieldSubmit,
    onInputRef,
    wrapperStyle,
    autoNextFocus,
    formatter,
    ...rest
  } = props

  return (
    <View style={[$Wrapper, wrapperStyle]}>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            outlineColor={`${colors.palette.primary700}44`}
            error={errors[fieldKey]}
            ref={onInputRef}
            autoCapitalize="none"
            returnKeyType={autoNextFocus ? "next" : undefined}
            onChangeText={(value) => onChange(formatter ? formatter(value) : value)}
            onBlur={onBlur}
            value={value}
            style={StyleSheet.flatten([style, $InputStyle])}
            onSubmitEditing={() => onFieldSubmit?.()}
            {...rest}
          />
        )}
        name={fieldKey}
      />
    </View>
  )
}

export default memo(FormInput)

const $Wrapper: ViewStyle = {
  paddingTop: hp(2),
}
const $InputStyle: TextStyle = {
  fontFamily: typography.fonts.dmSans.medium,
  fontWeight: "bold",
}
