import React, { useContext, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loading: React.FC = () => {

    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} color={'#1F8AAD'} />
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