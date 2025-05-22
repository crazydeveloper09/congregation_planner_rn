import React, { useContext } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";
import { Context as SettingsContext } from "../contexts/SettingsContext";

const Label: React.FC<{ text: string, style?: TextStyle }> = ({ text, style }) => {
    const settingsContext = useContext(SettingsContext);
    return (
        <Text style={[styles.text, { fontSize: 17 + settingsContext.state.fontIncrement }, style]}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'MontserratSemiBold',
        marginVertical: 8,
        color: 'black',
        fontSize: 17,
        marginTop: 10
    }
})

export default Label