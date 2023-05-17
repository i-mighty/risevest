import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from "react-native-paper"

const fontConfig = {
  web: {
    light: {
      fontFamily: "DMsansRegular",
      fontWeight: "light",
    },
    thin: {
      fontFamily: "DMsansRegular",
      fontWeight: "thin",
    },
    regular: {
      fontFamily: "DMsansRegular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "DMsansMedium",
      fontWeight: "normal",
    },
  },
  ios: {
    light: {
      fontFamily: "DMsansRegular",
      fontWeight: "light",
    },
    thin: {
      fontFamily: "DMsansRegular",
      fontWeight: "thin",
    },
    regular: {
      fontFamily: "DMsansRegular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "DMsansMedium",
      fontWeight: "normal",
    },
  },
  android: {
    light: {
      fontFamily: "DMsansRegular",
      fontWeight: "light",
    },
    thin: {
      fontFamily: "DMsansRegular",
      fontWeight: "thin",
    },
    regular: {
      fontFamily: "DMsansRegular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "DMsansMedium",
      fontWeight: "normal",
    },
  },
}

export const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0898A0",
  },
  //@ts-ignore
  // fonts: configureFonts({ config: fontConfig, isV3: true }),
}
