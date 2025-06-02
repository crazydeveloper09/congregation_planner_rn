import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Context as SettingsContext } from "../contexts/SettingsContext";

interface IconLinkProps {
  onPress: Function;
  iconName: string;
  description: string;
  color?: string;
  isCentered?: boolean;
}

const IconLink: React.FC<IconLinkProps> = ({
  onPress,
  iconName,
  description,
  color,
  isCentered,
}) => {
  const settingsContext = useContext(SettingsContext);
  return (
    <Pressable onPress={() => onPress()}>
      <Text
        style={[
          styles.link,
          {
            color: color || settingsContext.state.mainColor,
            textAlign: isCentered ? "center" : "left",
            paddingVertical: 10 + settingsContext.state.fontIncrement
          },
          {fontSize: 17 + settingsContext.state.fontIncrement}
        ]}
      >
        <MaterialCommunityIcons size={18 + settingsContext.state.fontIncrement} name={iconName} />
        <Text> </Text>
        <Text>{description}</Text>
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  link: {
    fontSize: 17,
    paddingVertical: 10,
  },
});

export default IconLink;
