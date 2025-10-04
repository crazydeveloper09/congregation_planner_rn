import React from "react";
import { StyleSheet, Text } from "react-native";

interface DescriptionAndValueProps {
    description: string;
    value: string;
}

const DescriptionAndValue: React.FC<DescriptionAndValueProps> = ({ description, value }) => {
    return (
        <Text style={styles.text}>
            <Text>{description}: </Text>
            <Text style={styles.textBold}>{value}</Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "InterRegular",
        fontSize: 16,
        marginBottom: 10,
    },
    textBold: {
        fontFamily: "InterSemiBold",
    },
})

export default DescriptionAndValue;