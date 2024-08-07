import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
    <TouchableOpacity onPress={() => onPress()}>
      <Text
        style={[
          styles.link,
          {
            color: color || settingsContext.state.mainColor,
            textAlign: isCentered ? "center" : "left",
          },
        ]}
      >
        <MaterialCommunityIcons size={18} name={iconName} />
        <Text> </Text>
        <Text>{description}</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    fontSize: 17,
    paddingVertical: 10,
  },
});

export default IconLink;
