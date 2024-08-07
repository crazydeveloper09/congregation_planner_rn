import React, { useContext, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Context as SettingsContext } from "../contexts/SettingsContext";

const Loading: React.FC = () => {
    const settingsContext = useContext(SettingsContext)
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} color={settingsContext.state.mainColor} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})

export default Loading;