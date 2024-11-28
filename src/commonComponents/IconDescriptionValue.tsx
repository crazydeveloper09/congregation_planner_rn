import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Text, StyleSheet, Platform } from "react-native";
import { Context as SettingsContext } from "../contexts/SettingsContext";

interface IconDescriptionValueProps {
  iconName: string;
  description?: string;
  value: string;
}

const IconDescriptionValue: React.FC<IconDescriptionValueProps> = ({
  iconName,
  description,
  value,
}) => {
  const settingsContext = useContext(SettingsContext);
  return (
    <Text style={[styles.text, { fontSize: 16 + settingsContext.state.fontIncrement }]}>
      <MaterialCommunityIcons name={iconName} size={20 + settingsContext.state.fontIncrement} />
      <Text> </Text>
      {description && <Text>{description}: </Text>}
      <Text style={styles.textBold}>{value}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "InterRegular",
    fontSize: 16,
    marginBottom: 10,
  },
  textBold: {
    fontFamily: "PoppinsSemiBold",
  },
});

export default IconDescriptionValue;
