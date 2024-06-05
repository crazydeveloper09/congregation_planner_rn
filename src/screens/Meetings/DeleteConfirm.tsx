import { NavigationProp } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { IMeeting, IMeetingAssignment } from "../../contexts/interfaces";
import Meeting from "./components/Meeting";
import ButtonC from "../../commonComponents/Button";
import { Context as MeetingContext } from "../../contexts/MeetingContext";
import { groupBy } from "../../helpers/arrays";
import { ListItem } from "@rneui/base";
import IconDescriptionValue from "../../commonComponents/IconDescriptionValue";
import MeetingAssignment from "./components/MeetingAssignment";

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
    const assignmentsGroup = groupBy<IMeetingAssignment>(route.params.meeting?.assignments, 'type');;
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <ListItem containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
            
                <View>
                    <ListItem.Title style={styles.date}>{new Date(route.params.meeting.date).toLocaleDateString('pl-PL')}</ListItem.Title>
                    {route.params.meeting?.cleaningGroup && <IconDescriptionValue 
                            iconName="broom"
                            value={route.params.meeting?.cleaningGroup?.name}
                        />}
                        <IconDescriptionValue 
                            iconName="music"
                            description="Pieśń"
                            value={route.params.meeting?.beginSong?.toString()}
                        />
                        <IconDescriptionValue 
                            iconName="account-tie"
                            description="Prowadzący"
                            value={route.params.meeting?.lead?.name}
                        />
                        <IconDescriptionValue 
                            iconName="hands-pray"
                            description="Modlitwa"
                            value={route.params.meeting?.beginPrayer?.name}
                        />
                        <FlatList 
                            keyExtractor={(assignmentType) => assignmentType}
                            data={Object.keys(assignmentsGroup)}
                            renderItem={({ item }) => <MeetingAssignment type={item} assignments={assignmentsGroup} midSong={route.params.meeting?.midSong} meeting={route.params.meeting} />}
                            contentContainerStyle={{borderBottomWidth: 1, borderBottomColor: 'black' }}
                            scrollEnabled={false}
                        />
                        <IconDescriptionValue 
                            iconName="music"
                            description="Pieśń końcowa"
                            value={route.params.meeting?.endSong?.toString()}
                        />
                        <IconDescriptionValue 
                            iconName="hands-pray"
                            description="Modlitwa końcowa"
                            value={route.params.meeting?.endPrayer?.name || route.params.meeting?.otherEndPrayer}
                        />
                </View>
                
            
            </ListItem>

            <Text style={styles.text}>Czy na pewno chcesz usunąć to zebranie?</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 90 }}>
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
    },
    text: {
        fontSize: 21,
        marginVertical: 10,
    },
    date: {
        fontFamily: "MontserratRegular",
        fontSize: 20,
        marginBottom: 15
    },
})

export default MeetingDeleteConfirmScreen;