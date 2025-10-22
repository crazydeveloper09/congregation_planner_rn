import React from "react";
import { StyleSheet, Text } from "react-native";

const InfoText: React.FC<{ text: string }> = ({ text }) => <Text style={styles.text}>{text}</Text>


const styles = StyleSheet.create({
 text: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 15,
    fontSize: 13
 }
})

export default InfoText;