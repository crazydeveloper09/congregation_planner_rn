import React from "react";
import { StyleSheet, Text } from "react-native";

const Label: React.FC<{ text: string }> = ({ text }) => {
    return (
        <Text style={styles.text}>{text}</Text>
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