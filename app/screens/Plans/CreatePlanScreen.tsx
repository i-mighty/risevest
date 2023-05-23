import React, { FC, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { BackButton, Button, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { hp } from "app/theme/responsive"
import { useHeader } from "app/utils/useHeader"
import { ProgressBar, TextInput } from "react-native-paper"
import Form, { FormRef } from "app/features/Form"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import FormInput from "app/features/Form/FormInput"
import FormDateTimeInput from "app/features/Form/FormDateTimeInput"
import { yupResolver } from "@hookform/resolvers/yup"
import FormCurrencyInput from "app/features/Form/FormCurrencyInput"
import { useLoading } from "app/hooks/useLoading"
import { useCreatePlan } from "app/hooks/useCreatePlan"
import { CreatePlanRequestBody } from "app/services/api/requests"
import Toast from "react-native-toast-message"
import { showToast } from "app/utils/alert"
import { useAuth } from "app/hooks/useAuth"

interface CreatePlanScreenProps extends AppStackScreenProps<"CreatePlan"> {}
const schema = yup.object().shape({
  plan_name: yup.string().required(),
  target_amount: yup.string().required(),
  maturity_date: yup.date().required(),
})

const fields = ["plan_name", "target_amount", "maturity_date"]
export const CreatePlanScreen: FC<CreatePlanScreenProps> = observer(function CreatePlanScreen({
  route,
  navigation,
}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const { showLoading, hideLoading } = useLoading()
  const { user } = useAuth()
  const { mutate: createPlan } = useCreatePlan()
  // useEffect(() => {
  //   showToast({
  //     text1: "Error",
  //     text2: planError as string,
  //     type: "error",
  //   })
  // }, [planError])
  const formRef = useRef<FormRef>()

  const page = route.params?.page || 1
  // const {
  //   control,
  //   register,
  //   formState: { errors },
  // } = useForm({
  //   mode: "onChange",
  //   criteriaMode: "all",
  //   resolver: yupResolver(schema, { abortEarly: false }),
  // })

  const backButtonPress = () => {
    if (page === 1) {
      navigation.goBack()
    } else {
      navigation.setParams({ page: page - 1 })
    }
  }
  const titleText = () => {
    switch (page) {
      case 1:
        return "Goal name"
      case 2:
        return "Target amount"
      case 3:
        return "Target date"
      default:
        return "Create a plan"
    }
  }

  const optionLabelText = () => {
    switch (page) {
      case 1:
        return "What are you saving for"
      case 2:
        return "How much do need?"
      case 3:
        return "When do you want to withdraw?"
      default:
        return ""
    }
  }

  const renderField = () => {
    switch (page) {
      case 1:
      default:
        return <FormInput fieldKey="plan_name" />
      case 2:
        return <FormCurrencyInput prefix="₦" fieldKey="target_amount" />
      case 3:
        return (
          <FormDateTimeInput
            fieldKey="maturity_date"
            dateFormat="DD-MM-YYYY"
            datePickerProps={{ selectorMode: "date" }}
            inputProps={{
              right: <TextInput.Icon icon={"calendar"} />,
            }}
          />
        )
    }
  }

  const submitAction = async () => {
    const errors = formRef.current.formState.errors
    console.log("errors", errors)

    if (page == 3) {
      if (!errors[fields[page - 1]]) {
        showLoading("Creating Plan...")
        const values = formRef.current.control._formValues as CreatePlanRequestBody
        createPlan(values, {
          onSuccess: (data) => {
            hideLoading()
            navigation.navigate("Feedback", {
              title: "You just created\nyour plan.",
              description: `Well done ${user.first_name}`,
              action: () => {
                navigation.navigate("PlanDetails", { plan: data })
              },
            })
          },
          onError: (error: any) => {
            showToast({
              text1: "Error",
              text2: error.message as string,
              type: "error",
            })
            hideLoading()
          },
        })
      }

      // navigation.setParams({ page: 1 })
    } else {
      if (!errors[fields[page - 1]]) {
        navigation.setParams({ page: page + 1 })
      }
    }
  }

  useHeader(
    {
      LeftActionComponent: <BackButton onPress={backButtonPress} />,
      title: titleText(),
    },
    [page],
  )
  return (
    <Screen style={$root} preset="scroll">
      <View style={{ marginTop: hp(1) }}>
        <Text text={`Question ${page} of 3`} style={[{ marginVertical: hp(2) }, $description]} />
        <ProgressBar
          animatedValue={page / 3}
          style={{ height: 10, borderRadius: 5, marginVertical: hp(2) }}
        />
        <View style={{ marginVertical: hp(2) }}>
          <Text preset="formLabel" text={optionLabelText()} />
          <Form ref={formRef} schema={schema} validationMode="all" criteriaMode="firstError">
            {renderField()}
          </Form>
        </View>
        <Button onPress={submitAction} text="Continue" preset="filled" />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
}

const $description: TextStyle = {
  marginVertical: spacing.small,
  color: colors.textDim,
}
