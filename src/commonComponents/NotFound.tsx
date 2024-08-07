import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NotFound: React.FC<{ title: string, icon?: string }> = ({ title, icon }) => {
    return (
        <View style={styles.noParamContainer}>
            <MaterialCommunityIcons name={icon || "emoticon-sad-outline"} size={55} />
            <Text style={styles.noParamText}>{title}</Text>
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