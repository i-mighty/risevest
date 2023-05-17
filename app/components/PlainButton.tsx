import React, { memo } from "react"
import { TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from "react-native"
import { TextProps } from "./Text"

interface IButtonProps extends TouchableWithoutFeedbackProps {
  loading?: boolean
  textProps?: TextProps
  eventDescription?: string
}

const PlainButton: React.FC<IButtonProps> = (props) => {
  const { children, textProps, loading, onPress, ...rest } = props

  const onInternalButtonPress = (event: any) => {
    //analytics

    onPress?.(event)
  }

  return (
    <TouchableWithoutFeedback onPress={onInternalButtonPress} disabled={loading} {...rest}>
      {children}
    </TouchableWithoutFeedback>
  )
}

export default memo(PlainButton)
