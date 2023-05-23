import React, { createContext, useState, useEffect, useContext, ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "app/services/api"
import { NewUser, UserSession } from "app/types/auth"
import { request } from "app/services/api/requests"
import { useLoading } from "app/hooks/useLoading"

// Define types
export type AuthContextType = {
  user: UserSession | null
  isAuthenticated: boolean
  newInstall: boolean
  login: (
    { email_address, password }: { email_address: string; password: string },
    onComplete: () => void,
    onError?: (err?: any) => void,
  ) => void
  signup: (newUser: NewUser, onComplete: () => void, onError?: (err?: any) => void) => void
  logout: () => void
  savePinCode: (pinCode: string | null) => void
  pinCodeMatches: (pin: string) => boolean
}

// Create MMKV storage instance

// Create the authentication context
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Authentication provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null)
  const [pinCode, setPinCode] = useState<string | null>(null)
  const [newInstall, setNewInstall] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(!!user)
  useEffect(() => {
    console.log("====================================")
    console.log("auth state:", isAuthenticated)
    console.log("====================================")
  }, [isAuthenticated])

  const { showLoading, hideLoading } = useLoading()

  // Load user and pin code from storage on component mount
  useEffect(() => {
    loadUser()
    loadPinCode()
    firstTime()
  }, [])

  const firstTime = async () => {
    const appOpened = await AsyncStorage.getItem("opened")
    if (!appOpened) {
      //no state: new app so set state
      setNewInstall(true)
      AsyncStorage.setItem("opened", "true")
    }
  }

  // Load user from storage
  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }

  const pinCodeMatches = (passedPin: string) => {
    if (pinCode && passedPin == pinCode) {
      return true
    }
    return false
  }

  // Load pin code from storage
  const loadPinCode = async () => {
    const storedPinCode = await AsyncStorage.getItem("pinCode")
    if (storedPinCode) {
      setPinCode(storedPinCode)
    }
  }

  // Save user to storage
  const saveUser = async (user: UserSession | null) => {
    setUser(user)
    if (user) {
      await AsyncStorage.setItem("user", JSON.stringify(user))
    } else {
      await AsyncStorage.removeItem("user")
    }
  }

  // Save pin code to storage
  const savePinCode = async (pinCode: string | null) => {
    if (pinCode) {
      await AsyncStorage.setItem("pinCode", pinCode)
    } else {
      await AsyncStorage.removeItem("pinCode")
    }
  }

  // Login function
  const login = async (
    values: { email_address: string; password: string },
    onComplete: () => void,
    onError?: (err?: any) => void,
  ) => {
    try {
      showLoading("Signing in...")
      const response = await request.post<UserSession>("/sessions", JSON.stringify(values))

      if (response.status === 200) {
        const loggedInUser = response.data
        setIsAuthenticated(true)

        await saveUser(loggedInUser)
        hideLoading()
        onComplete()
      } else {
        // Handle login error
        // For example, display an error message
        onError && onError(response.data)
        console.error("Login failed")
        hideLoading()
      }
    } catch (error) {
      hideLoading()

      onError && onError(error)
      // Handle network or other errors
      console.error("Error occurred during login:", error)
    }
  }

  // Signup function
  const signup = async (newUser: NewUser, onComplete: () => void, onError?: (err?: any) => any) => {
    try {
      showLoading("Signing up...")
      const response = await request.post("/users", JSON.stringify(newUser))
      if (response.status == 200) {
        hideLoading()
        onComplete()
      } else {
        hideLoading()
        onError && onError(response.data)
        console.error("Signup failed", response.data)
      }
    } catch (error) {
      hideLoading()
      onError && onError(error)
      console.error("Error occurred during signup:", error)
    }
  }

  // Logout function
  const logout = async () => {
    setIsAuthenticated(false)
    await saveUser(null)
  }

  // Provide the authentication context value to child components
  const authContextValue: AuthContextType = {
    newInstall,
    user,
    pinCodeMatches,
    isAuthenticated,
    login,
    signup,
    logout,
    savePinCode,
  }

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}
