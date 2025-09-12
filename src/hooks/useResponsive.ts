import { useMemo } from "react";
import { Platform, useWindowDimensions } from "react-native";

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  const aspectRatio = height / width;
  const isWeb = Platform.OS === "web";

  const values = useMemo(() => {
    const isTablet = !isWeb && aspectRatio < 1.6 && width >= 600;
    const isDesktop = width >= 1000;
    const isMobile = !isTablet && !isDesktop;

    const columnsNum = isDesktop || isTablet ? 2 : 1;

    return { width, height, isWeb, isTablet, isDesktop, isMobile, columnsNum };
  }, [width, height, aspectRatio, isWeb]);

  return values;
};
