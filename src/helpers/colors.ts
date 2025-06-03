import { DefaultTheme, MD3LightTheme } from 'react-native-paper';

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

export const buildTheme = (mainColor: string) => ({
   ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: mainColor,
    secondaryContainer: hexToRGB(mainColor, 0.2),
    elevation: {
      ...DefaultTheme.colors.elevation,
      level2: hexToRGB(mainColor, 0.1),
    },
  },
});
