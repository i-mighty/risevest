import React, { memo, useEffect } from "react"
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native"

import { Controller, Control, FieldValues } from "react-hook-form"
import { hp } from "app/theme/responsive"
import { TextInput, TextInputProps } from "react-native-paper"
import { colors, typography } from "app/theme"
import CurrencyInput from "react-native-currency-input"

export interface FormInputProps extends TextInputProps {
  fieldKey: string
  prefix?: string
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

const FormCurrencyInput: React.FC<FormInputProps> = (props) => {
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
    prefix,
    ...rest
  } = props

  return (
    <View style={[$Wrapper, wrapperStyle]}>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <CurrencyInput
              value={value}
              onChangeValue={onChange}
              delimiter=","
              separator="."
              precision={2}
              minValue={0}
              onBlur={onBlur}
              renderTextInput={(props) => (
                <TextInput
                  {...props}
                  left={prefix ? <TextInput.Affix text={prefix} /> : null}
                  selectionColor=""
                  mode="outlined"
                  outlineColor={`${colors.palette.primary700}44`}
                  error={errors[fieldKey]}
                  ref={onInputRef}
                  autoCapitalize="none"
                  returnKeyType={autoNextFocus ? "next" : undefined}
                  style={StyleSheet.flatten([style, $InputStyle])}
                  onSubmitEditing={() => onFieldSubmit?.()}
                />
              )}
              onChangeText={(formattedValue) => {
                console.log(formattedValue) // R$ +2.310,46
              }}
            />
          </>
        )}
        name={fieldKey}
      />
    </View>
  )
}

export default memo(FormCurrencyInput)

const $Wrapper: ViewStyle = {
  paddingTop: hp(2),
}
const $InputStyle: TextStyle = {
  fontFamily: typography.fonts.dmSans.medium,
  fontWeight: "bold",
}
