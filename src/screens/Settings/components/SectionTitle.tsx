import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Text, StyleSheet, Platform } from "react-native";
import { Context as SettingsContext } from "../../../contexts/SettingsContext";

interface SectionTitleProps {
  iconName: string;
  value: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  iconName,
  value,
}) => {
  const settingsContext = useContext(SettingsContext)

  return (
    <Text style={[styles.text, { fontSize: 24 + settingsContext.state.fontIncrement, }]}>
      <MaterialCommunityIcons name={iconName} size={28 + settingsContext.state.fontIncrement} />
      <Text> </Text>
      <Text style={styles.textBold}>{value}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "InterRegular",
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  textBold: {
    fontFamily: "PoppinsSemiBold",
  },
});

export default SectionTitle;
