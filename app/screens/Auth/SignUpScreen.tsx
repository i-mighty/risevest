import React, { FC, useRef } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { colors, spacing, typography } from "app/theme"
import { hp } from "app/theme/responsive"
import Form, { FormRef } from "app/features/Form"

import * as yup from "yup"
import YupPassword from "yup-password"

import FormInput from "app/features/Form/FormInput"
import PasswordFormInput from "app/features/Form/PasswordFormInput"
YupPassword(yup) // extend yup

const signUpValidationSchema = yup.object().shape({
  email_address: yup.string().email().required(),
  password: yup.string().password().minNumbers(0).required(),
})

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> {}

export const SignUpScreen: FC<SignUpScreenProps> = observer(function SignUpScreen({ navigation }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const formRef = useRef<FormRef>()

  return (
    <Screen style={$root} safeAreaEdges={["top"]} preset="scroll">
      <Text style={$heading} text="Create an account" preset="subheading" />
      <Text
        style={$description}
        text={"Start building your dollar-denominated \ninvestment portfolio"}
      />
      <Form ref={formRef} schema={signUpValidationSchema} validationMode="all" criteriaMode="all">
        <FormInput fieldKey="email_address" placeholder="Email" label={"Email"} />
        <PasswordFormInput fieldKey="password" placeholder="Password" label={"Password"} />
      </Form>
      <View style={{ marginVertical: spacing.medium }}>
        <Button
          text="Sign Up"
          preset="filled"
          onPress={() =>
            formRef.current.submit((values) => {
              navigation.navigate("UserInfo", {
                email_address: values.email,
                password: values.password,
              })
            })
          }
        />
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
