import { NavigationProp } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IMeeting, IMeetingAssignment } from "../../../contexts/interfaces";
import { Context as MeetingContext } from "../../../contexts/MeetingContext";
import MeetingAssignment from "../components/MeetingAssignment";
import ButtonC from "../../../commonComponents/Button";

interface MeetingAssignmentDeleteConfirmScreenProps { 
    navigation: NavigationProp<any>
    route: {
        params: {
            meeting: IMeeting,
            assignment: IMeetingAssignment
        }
    }
}

const MeetingAssignmentDeleteConfirmScreen: React.FC<MeetingAssignmentDeleteConfirmScreenProps> = ({ navigation, route }) => {
    const { state, deleteAssignment } = useContext(MeetingContext)
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <MeetingAssignment type={route.params.assignment.type} midSong={route.params.meeting.midSong} assignments={{[route.params.assignment.type]: [route.params.assignment]}} meeting={route.params.meeting!} />
            <Text style={styles.text}>Czy na pewno chcesz usunąć to zadanie na zebraniu?</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ width: '48%' }}>
                    <ButtonC title="Tak" onPress={() => deleteAssignment(route.params.meeting._id, route.params.assignment._id)} isLoading={state.isLoading} color="#AD371F" />
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

export default MeetingAssignmentDeleteConfirmScreen;