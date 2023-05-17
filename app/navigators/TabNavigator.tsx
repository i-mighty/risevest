import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons"
import { HomeScreen } from "app/screens"
import { colors } from "app/theme"

const Tab = createMaterialBottomTabNavigator()

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      inactiveColor={colors.palette.primary700}
      labeled={false}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bell" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Fontisto name="wallet" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}
