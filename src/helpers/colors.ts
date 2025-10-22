import { DefaultTheme, MD3LightTheme } from 'react-native-paper';
import tinycolor from 'tinycolor2';

export function hexToRGB(hex: string, alpha: number) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

export const buildTheme = (mainColor: string) => {
  const base = tinycolor(mainColor);
  const brightness = base.getBrightness();
  const isDark = brightness < 70;

  const tooLight = ["#662389", "#225354", "#19482A"];
  const tooDark = ["#AD1F64", "#8A2177", "#6D4420"];

  const secondaryContainer = isDark
    ? base.clone().lighten(tooLight.includes(mainColor) ? 35 : 50).toHexString()
    : base.clone().lighten(tooDark.includes(mainColor) ? 35 : 15).toHexString();

  const elevationLevel2 = isDark
    ? base.clone().lighten(tooLight.includes(mainColor) ? 50 : 65).toHexString()
    : base.clone().lighten(tooDark.includes(mainColor) ? 50 : 40).toHexString();

  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: mainColor,
      secondary: mainColor, // 👈 dodaj to
      secondaryContainer, // 👈 to też używa FAB.Group
      onSecondaryContainer: "#000000", // 👈 kontrastowy kolor ikony
      elevation: {
        ...DefaultTheme.colors.elevation,
        level2: elevationLevel2,
      },
    },
  };
};

