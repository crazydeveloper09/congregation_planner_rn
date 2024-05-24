import { NavigationProp } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as MinistryMeetingContext } from "../../contexts/MinistryMeetingContext";
import MinistryMeeting from "./components/MinistryMeeting";
import ButtonC from "../../commonComponents/Button";

interface MinistryMeetingDeleteConfirmScreenProps {
    navigation: NavigationProp<any>;
    route: {
        params: {
            id: string;                 
        }
    }
}

const MinistryMeetingDeleteConfirmScreen: React.FC<MinistryMeetingDeleteConfirmScreenProps> = ({ navigation, route }) => {
    const {state, deleteMinistryMeeting} = useContext(MinistryMeetingContext);
    
    const meeting = state.ministryMeetings?.find((meeting) => meeting._id === route.params.id)
    return (
        <View style={styles.container}>
            <MinistryMeeting meeting={meeting!} navigate={navigation.navigate} />
            <Text style={styles.text}>Czy na pewno chcesz usunąć tą zbiórkę?</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ width: '48%' }}>
                    <ButtonC title="Tak" onPress={() => deleteMinistryMeeting(route.params.id)} isLoading={state.isLoading} color="#AD371F" />
                </View>
                <View style={{ width: '48%' }}>
                <ButtonC title="Nie" onPress={() => navigation.navigate('Ministry Meeting Index')} />
                </View>
            
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 21,
        marginVertical: 10,
    }
})

export default MinistryMeetingDeleteConfirmScreen;