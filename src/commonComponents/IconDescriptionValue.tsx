import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import { IconProps } from "react-native-vector-icons/Icon";

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
  return (
    <Text style={styles.text}>
      <MaterialCommunityIcons name={iconName} size={20} />
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
