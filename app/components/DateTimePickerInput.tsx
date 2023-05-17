import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from "react"
import { View, StyleSheet, Alert, ViewStyle } from "react-native"
import { DateTimePickerModal } from "@i-mighty/rn-datetime-picker"
import { DateTimePickerProps } from "@i-mighty/rn-datetime-picker/components/DateTimePicker"
import dayjs from "dayjs"
import PlainButton from "./PlainButton"
import { TextField, TextFieldProps } from "./TextField"
import { TextInput, TextInputProps } from "react-native-paper"

export interface DateTimePickerInputProps {
  wrapperStyle?: ViewStyle
  initialDatetime?: dayjs.Dayjs | Date | string
  datePickerProps?: DateTimePickerProps
  inputProps?: TextInputProps
  dateFormat?: string
  onChange?: (date: Date | dayjs.Dayjs | string) => void
  onBlur?: () => void
}

export interface DateTimePickerInputRef {
  focus: () => void
}

const DateTimePickerInput = forwardRef<DateTimePickerInputRef, DateTimePickerInputProps>(
  (props, ref) => {
    const {
      inputProps,
      datePickerProps,
      dateFormat,
      onChange,
      initialDatetime,
      wrapperStyle,
      onBlur,
    } = props
    const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false)
    const [selectedValue, setSelectedValue] = useState<dayjs.Dayjs | undefined>()

    useImperativeHandle(
      ref,
      () => ({
        focus: onFocus,
      }),
      [],
    )

    const onFocus = () => {
      setDateTimePickerVisibility(true)
    }

    return (
      <View style={[styles.Wrapper, wrapperStyle]}>
        <PlainButton
          onPress={() => {
            setDateTimePickerVisibility(true)
          }}
        >
          <View>
            <View pointerEvents="none">
              <TextInput
                {...inputProps}
                mode="outlined"
                onFocus={() => setDateTimePickerVisibility(true)}
                value={
                  selectedValue
                    ? selectedValue.format(dateFormat)
                    : initialDatetime
                    ? dayjs(initialDatetime).format(dateFormat)
                    : ""
                }
              />
            </View>
          </View>
        </PlainButton>
        <DateTimePickerModal
          {...datePickerProps}
          isVisible={isDateTimePickerVisible}
          dateValue={dayjs(selectedValue || initialDatetime)}
          onConfirm={(date) => {
            setSelectedValue(dayjs(date))
            setDateTimePickerVisibility(false)
            onChange && onChange(dayjs(date))
            onBlur && onBlur()
          }}
          onClose={() => {
            setDateTimePickerVisibility(false)
            onBlur && onBlur()
          }}
        />
      </View>
    )
  },
)

export default memo(DateTimePickerInput)

const styles = StyleSheet.create({
  Wrapper: {
    width: "100%",
  },
})
