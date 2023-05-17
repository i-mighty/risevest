import React, { memo } from "react"
import {
  FlatList,
  FlatListProps,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from "react-native"
import { TextProps } from "./Text"
import CreatePlanButton from "./CreatePlanButton"

interface PlanType {
  id: string
}

interface PlansListProps extends Omit<FlatListProps<PlanType>, "data" | "renderItem"> {
  data?: PlanType[]
  loading?: boolean
}

const PlainButton: React.FC<PlansListProps> = (props) => {
  // TODO: Load plans within here
  const { loading, data = [] } = props
  const reData = [{ id: "create" }, ...data]

  const renderMethod = ({ item, index }: { item: PlanType; index: number }) => {
    if (index === 0 && item.id == "create") {
      return <CreatePlanButton />
    } else {
      return null
    }
  }
  return (
    <FlatList
      data={reData}
      horizontal
      renderItem={renderMethod}
      {...props}
      ListEmptyComponent={<CreatePlanButton />}
    />
  )
}

export default memo(PlainButton)
