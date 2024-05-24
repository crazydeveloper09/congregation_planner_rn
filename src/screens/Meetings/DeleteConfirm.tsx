import { NavigationProp } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { IMeeting } from "../../contexts/interfaces";
import Meeting from "./components/Meeting";
import ButtonC from "../../commonComponents/Button";
import { Context as MeetingContext } from "../../contexts/MeetingContext";

interface MeetingDeleteConfirmScreenProps { 
    navigation: NavigationProp<any>
    route: {
        params: {
            meeting: IMeeting
        }
    }
}

const MeetingDeleteConfirmScreen: React.FC<MeetingDeleteConfirmScreenProps> = ({ navigation, route }) => {
    const { state, deleteMeeting } = useContext(MeetingContext)
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <Meeting meeting={route.params.meeting!} />
            <Text style={styles.text}>Czy na pewno chcesz usunąć to zebranie?</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ width: '48%' }}>
                    <ButtonC title="Tak" onPress={() => deleteMeeting(route.params.meeting._id)} isLoading={state.isLoading} color="#AD371F" />
                </View>
                <View style={{ width: '48%' }}>
                <ButtonC title="Nie" onPress={() => navigation.navigate('Meetings Index')} />
                </View>
            
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 80,
        flex: 1,
    },
    text: {
        fontSize: 21,
        marginVertical: 10,
    }
})

export default MeetingDeleteConfirmScreen;