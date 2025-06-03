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

  const secondaryContainer = isDark
    ? base.clone().lighten(50).toHexString()
    : base.clone().lighten(15).toHexString();

  const elevationLevel2 = isDark
    ? base.clone().lighten(65).toHexString()
    : base.clone().lighten(40).toHexString();
  
  return {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: mainColor,
    secondaryContainer,
    elevation: {
      ...DefaultTheme.colors.elevation,
      level2: elevationLevel2,
    },
  },
}
};
