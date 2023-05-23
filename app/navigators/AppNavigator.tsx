/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { useAuth } from "app/hooks/useAuth"
import { TabNavigator } from "./TabNavigator"
import { CreatePlanResponseBody } from "app/services/api/requests"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  // 🔥 Your screens go here
  Splash: undefined
  WalkthroughScreen: undefined
  SignUp: undefined
  UserInfo: {
    email_address: string
    password: string
  }
  UserPin: undefined
  UserPinConfirmation: {
    pin: string
  }
  Feedback: {
    title?: string
    description?: string
    action?: () => void
    buttonText?: string
  }
  Home: undefined
  CreateIntro: undefined
  CreatePlan: {
    page: number
  }
  SignIn: undefined
  PlanDetails: {
    plan: CreatePlanResponseBody
  }
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const { isAuthenticated } = useAuth()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      {/** 🔥 Your screens go here */}
      <Stack.Screen name="Splash" component={Screens.SplashScreen} />
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="WalkthroughScreen" component={Screens.WalkthroughScreen} />
          <Stack.Screen name="SignIn" component={Screens.SignInScreen} />
          <Stack.Screen name="SignUp" component={Screens.SignUpScreen} />
          <Stack.Screen name="UserInfo" component={Screens.UserInfoScreen} />
          <Stack.Screen name="UserPin" component={Screens.UserPinScreen} />
          <Stack.Screen name="UserPinConfirmation" component={Screens.UserPinConfirmationScreen} />
          <Stack.Screen name="Feedback" component={Screens.FeedbackScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="UserPin" component={Screens.UserPinScreen} />
          <Stack.Screen name="UserPinConfirmation" component={Screens.UserPinConfirmationScreen} />
          <Stack.Screen name="Feedback" component={Screens.FeedbackScreen} />
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen name="CreateIntro" component={Screens.CreateIntroScreen} />
          <Stack.Screen name="CreatePlan" component={Screens.CreatePlanScreen} />
        </>
      )}

      <Stack.Screen name="PlanDetails" component={Screens.PlanDetailsScreen} />
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
