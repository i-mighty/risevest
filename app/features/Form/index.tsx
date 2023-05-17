import React, { useRef, memo, forwardRef, useImperativeHandle } from "react"
import {
  Control,
  CriteriaMode,
  FieldErrors,
  FormState,
  Mode,
  ValidationMode,
  useForm,
} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ObjectSchema } from "yup"
import { StyleProp, ViewStyle } from "react-native"
import { View, StyleSheet } from "react-native"

import { Dayjs } from "dayjs"
import * as yup from "yup"
export interface ModelFormSchema {
  name: string
  label: string
  validations?: yup.Schema
  description?: string
  initialValue?: string | number | Dayjs
}

interface IProps {
  schema: ObjectSchema<any>
  autoNextFocus?: boolean
  children: React.ReactNode | React.ReactNode[]
  fieldWrapperStyle?: StyleProp<ViewStyle>
  wrapperStyle?: StyleProp<ViewStyle>
  defaultValues?: any
  fields?: ModelFormSchema[]
  validationMode?: Mode
  criteriaMode?: CriteriaMode
}

interface FormChildProps {
  autoNextFocus?: boolean
  wrapperStyle?: StyleProp<ViewStyle>
  onFieldSubmit?: () => void
  onInputRef?: (ref: any) => void
  control?: Control
  errors?: FieldErrors<any>
}

export interface FormFieldSchema {
  name: string
}

export interface FormRef {
  submit: (
    callback: (
      values: { [x: string]: any },
      e: React.BaseSyntheticEvent<object, any, any> | undefined,
    ) => void,
  ) => void

  control: Control
  formState: FormState<any>
}

const Form = forwardRef<FormRef, IProps>(
  (
    {
      children,
      schema,
      autoNextFocus,
      fieldWrapperStyle,
      wrapperStyle,
      defaultValues,
      fields,
      validationMode,
      criteriaMode,
    },
    ref,
  ) => {
    let _schema = schema,
      formValidations = yup.object(),
      _defaultValues = new Object()

    if (fields) {
      _schema = fields.reduce((prev, f) => {
        return prev.concat(yup.object().shape({ [f.name]: f.validations }))
      }, formValidations)

      _defaultValues = fields.reduce((prev, f) => {
        prev[f.name] = f.initialValue
        return prev
      }, new Object())
    }

    const { handleSubmit, formState, control } = useForm({
      mode: validationMode,
      criteriaMode,
      resolver: yupResolver(_schema, { abortEarly: false }),
      defaultValues: _defaultValues,
    })

    const { errors } = formState

    const fieldInputRefs = useRef<any[]>([])
    useImperativeHandle(
      ref,
      () => ({
        submit: onFormSubmit,
        control,
        formState,
      }),
      [formState.errors],
    )

    const onFormSubmit = (
      callback: (
        values: { [x: string]: any },
        e: React.BaseSyntheticEvent<object, any, any> | undefined,
      ) => void,
    ) => {
      handleSubmit(callback, (e) => console.log("Invalid form data", e))()
    }

    const onFieldSubmit = (fieldIndex: number) => {
      const childrenCount = React.Children.count(children)
      if (autoNextFocus && children && childrenCount > 1 && fieldIndex < childrenCount - 1) {
        fieldInputRefs.current[fieldIndex + 1]?.focus?.()
      }
    }

    const onRef = (ref: any, index: number) => {
      fieldInputRefs.current[index] = ref
    }

    const renderFormField = () => {}

    const getUpdatedChildren = () => {
      return React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement<FormChildProps>(child, {
            autoNextFocus: autoNextFocus,
            wrapperStyle: fieldWrapperStyle,
            onFieldSubmit: () => onFieldSubmit(index),
            onInputRef: (ref: any) => onRef(ref, index),
            control,
            errors,
          })
        }
        return child
      })
    }

    return <View style={[styles.Wrapper, wrapperStyle]}>{getUpdatedChildren()}</View>
  },
)

export default memo(Form)

const styles = StyleSheet.create({
  Wrapper: {
    width: "100%",
  },
})
