import React, { FC, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Button } from "app/components"
import { typography, colors, spacing } from "app/theme"
import { hp } from "app/theme/responsive"
import * as yup from "yup"
import Form, { FormRef } from "app/features/Form"
import FormInput from "app/features/Form/FormInput"
import PasswordFormInput from "app/features/Form/PasswordFormInput"
import FormDateTimeInput from "app/features/Form/FormDateTimeInput"
import { TextInput } from "react-native-paper"
import FormPhoneNumberInput from "app/features/Form/FormPhoneNumberInput"
import { useRequestProcessor } from "app/hooks/useRequest"
import { useAuth } from "app/hooks/useAuth"
import { NewUser } from "app/types/auth"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface UserInfoScreenProps extends AppStackScreenProps<"UserInfo"> {}
const infoValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  nick_name: yup.string(),
  phone_number: yup.string().required(),
  date_of_birth: yup.date(),
})
export const UserInfoScreen: FC<UserInfoScreenProps> = observer(function UserInfoScreen({
  route,
  navigation,
}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const { signup } = useAuth()
  const [loading, setLoading] = useState(false)

  const signUpAction = (values: NewUser) => {
    setLoading(true)
    signup(values, () => {
      //
      setLoading(false)
      navigation.navigate("Feedback", {
        title: "",
        description: "",
        action: () => {
          //navigate to SetPin then continue
        },
      })
    })
  }
  const params = route.params
  const formRef = useRef<FormRef>()
  return (
    <Screen style={$root} safeAreaEdges={["top"]} preset="scroll">
      <Text style={$heading} text="Tell Us More About You" preset="subheading" />
      <Text style={$description} text={"Please use your name as it appears on your ID."} />
      <Form ref={formRef} schema={infoValidationSchema} defaultValues={params}>
        <FormInput fieldKey="first_name" label={"Legal First Name"} />
        <FormInput fieldKey="last_name" label={"Legal Last Name"} />
        <FormInput fieldKey="nick_name" label={"Nick Name"} />
        <FormPhoneNumberInput
          fieldKey="phone_number"
          label={"Phone Number"}
          placeholder="Phone Number"
        />
        <FormDateTimeInput
          fieldKey="date_of_birth"
          dateFormat="DD-MM-YYYY"
          datePickerProps={{ selectorMode: "date" }}
          inputProps={{
            placeholder: "Choose Date",
            label: "Date of Birth",
            right: <TextInput.Icon icon={"calendar"} />,
          }}
        />
      </Form>
      <View style={{ marginVertical: spacing.medium }}>
        <Button
          disabled={loading}
          text="Sign Up"
          preset="filled"
          onPress={() =>
            formRef.current.submit((values) => {
              console.log("====================================")
              console.log("values", { ...values, ...params })
              console.log("====================================")
              signUpAction(values as NewUser)
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
