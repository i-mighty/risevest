import { colors } from "app/theme"
import { ImageProps } from "react-native/types"

export interface WalkThroughItem {
  key: string
  picture: ImageProps["source"]
  title: string
  titleColor: string
  bg: string
  description: string
}
export const walkthroughPages: WalkThroughItem[] = [
  {
    key: "qa",
    picture: require("../../../assets/walkThrough/badge.png"),
    title: "Quality assets",
    titleColor: "#FE7122",
    bg: "#FEFAF7",
    description: "Rise invests your money into the best dollar\ninvestments around the world.",
  },
  {
    key: "ss",
    picture: require("../../../assets/walkThrough/search.png"),
    title: "Superior Selection",
    titleColor: "#B80074",
    bg: "#FDF4F9",
    description: "Our expert team and intelligent algorithms\nselect assets that beat the markets.",
  },
  {
    key: "bp",
    picture: require("../../../assets/walkThrough/meter.png"),
    title: "Better Performance",
    titleColor: colors.palette.primary700,
    bg: "#F6FFFE",
    description:
      "You earn more returns, achieve more of your\nfinancial goals and protect your money from\ndevaluation.",
  },
]
