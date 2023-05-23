// useLoading.ts

import { LoadingContext, LoadingContextProps } from "app/contexts/LoadingContext"
import { useContext } from "react"

export const useLoading = (): LoadingContextProps => {
  const loadingContext = useContext(LoadingContext)
  if (!loadingContext) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return loadingContext
}
