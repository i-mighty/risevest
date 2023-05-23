// LoadingContext.tsx

import { colors } from "app/theme"
import React, { createContext, useState, ReactNode } from "react"
import Spinner from "react-native-loading-spinner-overlay"
import { TextStyle } from "react-native/types"

export interface LoadingContextProps {
  loading: boolean
  showLoading: (textContent?: string) => void
  hideLoading: () => void
}

export const LoadingContext = createContext<LoadingContextProps>({
  loading: false,
  showLoading: () => {},
  hideLoading: () => {},
})

interface LoadingProviderProps {
  children: ReactNode
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [textContent, setTextContent] = useState("Loading...")

  const showLoading = (newTextContent?: string): void => {
    setLoading(true)
    if (newTextContent) {
      setTextContent(newTextContent)
    }
  }

  const hideLoading = (): void => {
    setLoading(false)
    setTextContent("Loading...")
  }

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
      <Spinner visible={loading} textContent={textContent} textStyle={$loadingText} />
    </LoadingContext.Provider>
  )
}

const $loadingText: TextStyle = {
  color: colors.background,
}
