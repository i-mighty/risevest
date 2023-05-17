import React, { createContext, useState, useEffect, useContext, ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "app/services/api"
import { NewUser, UserSession } from "app/types/auth"

// Define types
export type AuthContextType = {
  user: UserSession | null
  isAuthenticated: boolean
  newInstall: boolean
  login: ({ email, password }: { email: string; password: string }, onComplete: () => void) => void
  signup: (newUser: NewUser, onComplete: () => void) => void
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
  const isAuthenticated = !!user

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
    { email, password }: { email: string; password: string },
    onComplete: () => void,
  ) => {
    try {
      const response = await api.apisauce.post<UserSession>("/sessions", { email, password })

      if (response.ok) {
        const loggedInUser = response.data
        setUser(loggedInUser)
        await saveUser(loggedInUser)
        onComplete()
      } else {
        // Handle login error
        // For example, display an error message
        console.error("Login failed")
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error occurred during login:", error)
    }
  }

  // Signup function
  const signup = async (newUser: NewUser, onComplete: () => void) => {
    try {
      const response = await api.apisauce.post("/users", newUser)

      if (response.ok) {
        // finish and go to login
        onComplete()
      } else {
        // Handle signup error
        // For example, display an error message
        console.error("Signup failed", response.originalError)
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error occurred during signup:", error)
    }
  }

  // Logout function
  const logout = async () => {
    setUser(null)
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
