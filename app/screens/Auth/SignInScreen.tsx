import React, { FC, useRef } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { colors, spacing, typography } from "app/theme"
import { hp } from "app/theme/responsive"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import Form, { FormRef } from "app/features/Form"

import * as yup from "yup"
import YupPassword from "yup-password"

import FormInput from "app/features/Form/FormInput"
import PasswordFormInput from "app/features/Form/PasswordFormInput"
import PlainButton from "app/components/PlainButton"
import { useAuth } from "app/hooks/useAuth"
YupPassword(yup) // extend yup

const SignInValidationSchema = yup.object().shape({
  email_address: yup.string().email().required(),
  // password: yup.string().password().minNumbers(0).required(),
})

interface SignInScreenProps extends AppStackScreenProps<"SignIn"> {}

export const SignInScreen: FC<SignInScreenProps> = observer(function SignInScreen({ navigation }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { login } = useAuth()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const formRef = useRef<FormRef>()

  const loginAction = (values: { email_address: string; password: string }) => {
    login(values, () => {
      //
      navigation.navigate("UserPin")
    })
  }

  return (
    <Screen style={$root} safeAreaEdges={["top"]} preset="scroll">
      <Text style={$heading} text="Welcome back" preset="subheading" />
      <Text
        style={$description}
        text={
          "Let’s get you logged in to get back to building\nyour dollar-denominated investment portfolio"
        }
      />
      <Form ref={formRef} schema={SignInValidationSchema} validationMode="all" criteriaMode="all">
        <FormInput fieldKey="email_address" placeholder="Email" label={"Email"} />
        <PasswordFormInput fieldKey="password" placeholder="Password" label={"Password"} />
      </Form>
      <View style={{ marginVertical: spacing.medium }}>
        <Button
          text="Sign In"
          preset="filled"
          onPress={() =>
            formRef.current.submit((values) => {
              loginAction(values as unknown as { email_address: string; password: string })
            })
          }
        />
      </View>
      <View style={{ marginVertical: spacing.medium }}>
        <PlainButton>
          <Text
            preset="formLabel"
            text="I forgot my password"
            style={{ color: colors.palette.primary700 }}
          />
        </PlainButton>
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
  paddingVertical: spacing.massive,
}
