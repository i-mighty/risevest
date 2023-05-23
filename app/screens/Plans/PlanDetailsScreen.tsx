import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { BackButton, Screen, Text } from "app/components"
import { useHeader } from "app/utils/useHeader"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface PlanDetailsScreenProps extends AppStackScreenProps<"PlanDetails"> {}

export const PlanDetailsScreen: FC<PlanDetailsScreenProps> = observer(function PlanDetailsScreen({
  route,
  navigation,
}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const params = route.params
  useHeader(
    {
      LeftActionComponent: <BackButton />,
      title: params.plan.plan_name,
    },
    [],
  )
  return (
    <Screen style={$root} preset="scroll">
      <Text text="planDetails" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
