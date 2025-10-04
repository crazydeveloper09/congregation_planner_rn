import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const aspectRatio = height / width;

// Platform-aware width thresholds
export const isWeb = Platform.OS === "web";

// Define breakpoints
export const isTablet = !isWeb && aspectRatio < 1.6 && width >= 600;
export const isDesktop = width >= 1000;
export const isMobile = !isTablet && !isDesktop;

const determineNumOfColumns = () => {
  if (isDesktop || isTablet) return 2;
  return 1;
};

export const columnsNum = determineNumOfColumns();