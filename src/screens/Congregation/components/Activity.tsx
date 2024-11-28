import React, { useContext } from "react";
import { IActivity } from "../../../contexts/interfaces";
import { StyleSheet, Text, View } from "react-native";
import { isTablet } from "../../../helpers/devices";
import { Context as SettingsContext } from "../../../contexts/SettingsContext";

interface ActivityProps {
    activity: IActivity
}

const Activity: React.FC<ActivityProps> = ({ activity }) => {
    const settingsContext = useContext(SettingsContext);
    return (
        <View style={[styles.container, { backgroundColor: '#f6edd9' }]}>
            
            <Text style={[styles.text, { fontSize: 16 + settingsContext.state.fontIncrement }]}>
                <Text>Data i czas: </Text>
                <Text style={styles.textBold}>{new Date(activity.date).toLocaleString()}</Text>
            </Text>
            { activity.applicationType === "Aplikacja internetowa" && <Text style={[styles.text, { fontSize: 16 + settingsContext.state.fontIncrement }]}>
                <Text>Platforma: </Text>
                <Text style={styles.textBold}>{activity?.platform}</Text>
            </Text>}
            <Text style={[styles.text, { fontSize: 16 + settingsContext.state.fontIncrement }]}>
                <Text>Adres IP: </Text>
                <Text style={styles.textBold}>{activity?.ipAddress}</Text>
            </Text>
            <Text style={[styles.text, { fontSize: 16 + settingsContext.state.fontIncrement }]}>
                <Text>Informacje o użytkowniku: </Text>
                <Text style={styles.textBold}>{activity?.userAgent}</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        height: 'auto',
        width: isTablet ? '49%' : 'auto',
        marginRight: isTablet ? 15 : 0
    },
    text: {
        fontFamily: 'InterRegular',
        fontSize: 16,
        marginBottom: 10
    },
    textBold: {
        fontFamily: 'InterSemiBold'
    },
    
})

export default Activity;