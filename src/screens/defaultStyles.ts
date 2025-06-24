import { Platform, StyleSheet, ViewStyle } from "react-native";

export const defaultDropdownStyles = (fontIncrement: number) =>
  StyleSheet.create({
    container: {
      paddingVertical: 15 + fontIncrement,
    },
    text: {
      fontSize: 15 + fontIncrement,
    },
  });

export const defaultSwitchStyles = (
  fontIncrement: number,
  isTurnedOn: boolean,
  placement: "left" | "right"
) => {
  const isIOS = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';
  const initialScale = isAndroid ? 1.3 : 1.0;
  const incrementDivider = isAndroid ? 10 : 20;
  const androidNotTurnedOn = isAndroid && !isTurnedOn;
  const biggerFont = fontIncrement >= 6;
  const iosRight = isIOS && placement === 'right' && fontIncrement >= 6;
  const leftStyles: ViewStyle =
    placement === "left"
      ? {
          alignSelf: "flex-start",
          marginLeft: androidNotTurnedOn ? biggerFont ? 20 : 2 : biggerFont ? 10 : 2,
          marginVertical: isAndroid ? 10 : 20,
        }
      : {};
  const rightStyles = iosRight ? { marginRight: 10 } : {}

  return StyleSheet.create({
    container: {
      transform: [{ scale: initialScale + fontIncrement / incrementDivider }],
      ...leftStyles,
      ...rightStyles
    },
  });
};
