import React, { useState } from "react"
import FormInput, { FormInputProps } from "../FormInput"
import { View } from "react-native"
import { TextInput } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import _ from "lodash"
import { colors, spacing } from "app/theme"
import { Text } from "app/components"
const PasswordFormInput: React.FC<FormInputProps & { hasValidation?: boolean }> = ({
  hasValidation,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const errors = props.errors
  const fieldKey = props.fieldKey
  const value = props.control._formValues[fieldKey]
  const validations = {
    min: "Minimum of 8 characters",
    minUppercase: "One UPPERCASE character",
    minSymbol: "One unique character (e.g: !@#$%^&*?)",
  }

  const renderValidationRadio = () => {
    const checkError = (key: string) => {
      if (!value) {
        return true
      }
      if (!errors[fieldKey] && value != "") {
        return false
      } else if (errors[fieldKey] && errors[fieldKey].types[key]) {
        return true
      } else {
        return false
      }
    }

    return Object.keys(validations).map((key) => (
      <View style={{ flexDirection: "row", marginVertical: spacing.micro }}>
        {checkError(key) ? (
          <MaterialCommunityIcons
            name="checkbox-blank-circle-outline"
            size={24}
            color={colors.palette.primary700}
          />
        ) : (
          <MaterialCommunityIcons name="check-circle" size={24} color={colors.palette.primary700} />
        )}
        <Text text={validations[key]} style={{ marginLeft: spacing.small }} />
      </View>
    ))
  }
  return (
    <>
      <FormInput
        textContentType="newPassword"
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye" : "eye-off"}
            onPress={() => setShowPassword((s) => !s)}
          />
        }
        {...props}
      />
      {hasValidation && (
        <View style={{ marginTop: spacing.medium }}>{renderValidationRadio()}</View>
      )}
    </>
  )
}

export default PasswordFormInput
