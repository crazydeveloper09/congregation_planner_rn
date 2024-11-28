import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as SettingsContext } from "../contexts/SettingsContext";

const NotFound: React.FC<{ title: string, icon?: string }> = ({ title, icon }) => {
    const settingsContext = useContext(SettingsContext);
    return (
        <View style={styles.noParamContainer}>
            <MaterialCommunityIcons name={icon || "emoticon-sad-outline"} size={55 + settingsContext.state.fontIncrement} />
            <Text style={[styles.noParamText, { fontSize: 18 + settingsContext.state.fontIncrement }]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    noParamContainer: {
        marginTop: 65,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      },
      noParamText: {
        marginTop: 15,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: "PoppinsRegular",
      },
})

export default NotFound;