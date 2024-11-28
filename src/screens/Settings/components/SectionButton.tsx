import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Context as SettingsContext } from "../../../contexts/SettingsContext";

interface SectionButtonProps {
  iconName: string;
  description: string;
  onPress: Function;
}

const SectionButton: React.FC<SectionButtonProps> = ({
  iconName,
  description,
  onPress
}) => {
  const settingsContext = useContext(SettingsContext)

  return (
    <Pressable onPress={() => onPress()} style={styles.container}>
      <Text style={styles.titleContainer}>
        <MaterialCommunityIcons name={iconName} size={22 + settingsContext.state.fontIncrement} style={{ marginRight: 10 }} />
        <Text>  </Text>
        <Text style={[styles.text, { fontSize: 20 + settingsContext.state.fontIncrement, }]}>{description}</Text>
      </Text>
      <MaterialCommunityIcons name={"chevron-right"} size={22} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  titleContainer: {
    marginBottom: 10,
    paddingVertical: 5
  },
  text: {
    fontFamily: "MontserratRegular",
    marginBottom: 10,
    paddingVertical: 5,
  },
});

export default SectionButton;
