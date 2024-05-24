import React from "react";
import { View, StyleSheet } from "react-native";

const HeaderRight: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 15,
        marginRight: 15
    }
})

export default HeaderRight;