import React, { useContext, useEffect } from "react";
import { Text } from "react-native";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

interface ButtonProps {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
    color?: string;
}

const ButtonC: React.FC<ButtonProps> = ({ title, onPress, isLoading, color }) => {

    return <Button mode="contained" buttonColor={color ? color: "#1F8AAD"} labelStyle={{ fontSize: 18 }} style={styles.button} onPress={onPress} loading={isLoading}>
   
        <Text>{title}</Text>
   
</Button>
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderRadius: 6,
        paddingVertical: 4,
    }
})

export default ButtonC;

