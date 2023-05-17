import React, { memo } from "react"
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native"
import { Select, SelectItem, SelectProps } from "@ui-kitten/components"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { Controller, Control, FieldValues } from "react-hook-form"

export interface IProps extends SelectProps {
  fieldKey: string
  control?: Control<FieldValues, object>
  errors?: {
    [x: string]: any
  }
  rules?: {
    [key: string]: any
  }
  fields: {
    label: string
    value: string
  }[]
  onFieldSubmit?: () => void
  onInputRef?: (ref: any) => void
  wrapperStyle?: StyleProp<ViewStyle>
  autoNextFocus?: boolean
}

const FormSelect: React.FC<IProps> = (props) => {
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
    fields,
    ...rest
  } = props
  return (
    <View style={[styles.Wrapper, wrapperStyle]}>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <Select
            ref={onInputRef}
            size="medium"
            caption={errors?.[fieldKey]?.message}
            status={errors?.[fieldKey]?.message ? "danger" : "basic"}
            onBlur={onBlur}
            value={value}
            onSelect={(value) => onChange(fields[value.row].value)}
            style={StyleSheet.flatten([style, styles.InputStyle])}
            {...rest}
          >
            {fields.map((field) => (
              <SelectItem key={field.value} title={field.label} />
            ))}
          </Select>
        )}
        name={fieldKey}
      />
    </View>
  )
}

export default memo(FormSelect)

const styles = StyleSheet.create({
  Wrapper: {
    paddingTop: hp(2),
  },
  InputStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
})
