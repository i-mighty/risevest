import React, { memo } from "react"
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { Controller, Control, FieldValues } from "react-hook-form"
import DateTimePickerInput, { DateTimePickerInputProps } from "app/components/DateTimePickerInput"
import { typography } from "app/theme"
import dayjs from "dayjs"
interface IProps extends DateTimePickerInputProps {
  fieldKey: string
  isVisible?: boolean
  control?: Control<FieldValues, object>
  errors?: {
    [x: string]: any
  }
  onFieldSubmit?: () => void
  onInputRef?: (ref: any) => void
  wrapperStyle?: ViewStyle
  autoNextFocus?: boolean
}

const FormDateTimeInput: React.FC<IProps> = (props) => {
  const {
    control,
    errors,
    fieldKey,
    onFieldSubmit,
    onInputRef,
    wrapperStyle,
    autoNextFocus,
    inputProps,
    datePickerProps,
    ...rest
  } = props
  return (
    <View style={[$Wrapper, wrapperStyle]}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <DateTimePickerInput
            ref={onInputRef}
            inputProps={{
              error: errors?.[fieldKey]?.message,
              ...inputProps,
              style: $InputStyle,
            }}
            datePickerProps={datePickerProps}
            onChange={(d) => {
              onChange(d)
              onFieldSubmit?.()
            }}
            initialDatetime={value}
            onBlur={onBlur}
            {...rest}
          />
        )}
        name={fieldKey}
      />
    </View>
  )
}

export default memo(FormDateTimeInput)

const $Wrapper: ViewStyle = {
  paddingTop: hp(2),
}

const $InputStyle: TextStyle = {
  fontFamily: typography.fonts.dmSans.bold,
  fontWeight: "bold",
}
