import React, { useContext, useEffect } from "react";
import { Text } from "react-native";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Context as SettingsContext } from "../contexts/SettingsContext";

interface ButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  color?: string;
}

const ButtonC: React.FC<ButtonProps> = ({
  title,
  onPress,
  isLoading,
  color,
}) => {
  const settingsContext = useContext(SettingsContext);
  // #AD1F1F
  return (
    <Button
      mode={"contained"}
      textColor={"white"}
      buttonColor={
        color || settingsContext.state.mainColor
      }
      labelStyle={{ fontSize: 18 }}
      style={[styles.button, { borderColor: color || "black" }]}
      onPress={onPress}
      loading={isLoading}
    >
      <Text>{title}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 6,
    paddingVertical: 4,
  },
});

export default ButtonC;
