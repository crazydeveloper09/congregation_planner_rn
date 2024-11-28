import { StyleSheet } from "react-native";

export const defaultDropdownStyles = (fontIncrement: number) => StyleSheet.create({
    container: {
        paddingVertical: 15 + fontIncrement,
    },
    text: {
        fontSize: 15 + fontIncrement,
    }
})