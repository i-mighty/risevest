import React, { memo, useState } from "react"
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableWithoutFeedback,
} from "react-native"

import { Controller, Control, FieldValues } from "react-hook-form"
import { hp } from "app/theme/responsive"
import { TextInputProps } from "react-native-paper"
import { colors, typography } from "app/theme"
import CountryPicker, { Country, Flag } from "react-native-country-picker-modal"
import { CustomInput } from "app/components/CustomInput"
import { Text } from "app/components"

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

const FormPhoneNumberInput: React.FC<FormInputProps> = (props) => {
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
  const [country, setCountry] = useState<Country>({
    cca2: "NG",
    region: "Africa",
    subregion: "Western Africa",
    flag: "flag-ng",
    callingCode: ["234"],
    name: "Nigeria",
    currency: ["NGN"],
  })
  const [openModal, setOpenModal] = useState(false)
  return (
    <View style={[$Wrapper, wrapperStyle]}>
      <Controller
        control={control}
        rules={rules}
        name={fieldKey}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            mode="outlined"
            left={
              <CountryPicker
                countryCode={country.cca2}
                withCallingCodeButton
                onSelect={(country) => {
                  setCountry(country)
                }}
                visible={openModal}
                onClose={() => setOpenModal(false)}
                renderFlagButton={(props) => (
                  <TouchableWithoutFeedback onPress={() => setOpenModal(true)}>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Flag {...props} flagSize={20} countryCode={country.cca2} />
                      <Text style={$InputStyle}>{`+${country.callingCode[0]}`}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
            }
            textContentType="telephoneNumber"
            outlineColor={`${colors.palette.primary700}44`}
            error={errors[fieldKey]}
            // ref={onInputRef}
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
      />
    </View>
  )
}

export default memo(FormPhoneNumberInput)

const $Wrapper: ViewStyle = {
  paddingTop: hp(2),
}
const $InputStyle: TextStyle = {
  fontFamily: typography.fonts.dmSans.bold,
  fontWeight: "bold",
}
