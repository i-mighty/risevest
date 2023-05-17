import { AuthContextType, AuthContext } from "app/contexts/AuthContext"
import { useContext } from "react"

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return authContext
}
