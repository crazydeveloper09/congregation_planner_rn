import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context as SettingsContext } from "../contexts/SettingsContext";
import { Button } from "@rneui/base";

interface ButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  color?: string;
  fontColor?: string;
  marginBottom?: number;
}

const ButtonC: React.FC<ButtonProps> = ({
  title,
  onPress,
  isLoading,
  color,
  fontColor,
  marginBottom
}) => {
  const settingsContext = useContext(SettingsContext);
  // #AD1F1F
  return (
    <>
      <Button 
        title={title} 
        buttonStyle={[styles.button, { backgroundColor: color || settingsContext.state.mainColor, marginBottom }]} 
        titleStyle={{ fontSize: 18 + settingsContext.state.fontIncrement, color: fontColor || 'white', }} 
        onPress={onPress}
        loading={isLoading}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 6,
    paddingVertical: 12,
  },
});

export default ButtonC;
