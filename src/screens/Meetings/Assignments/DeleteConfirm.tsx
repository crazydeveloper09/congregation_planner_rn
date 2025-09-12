import { NavigationProp } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IMeeting, IMeetingAssignment } from "../../../contexts/interfaces";
import { Context as MeetingContext } from "../../../contexts/MeetingContext";
import { Context as SettingsContext } from "../../../contexts/SettingsContext";
import ButtonC from "../../../commonComponents/Button";
import { ListItem } from "react-native-elements";
import IconDescriptionValue from "../../../commonComponents/IconDescriptionValue";
import { chooseFontColorAndIcon } from "./helpers/types";
import useLocaLization from "../../../hooks/useLocalization";
import { mainTranslations } from "../../../../localization";
import { meetingAssignmentTranslations } from "./translations";

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
    const settingsContext = useContext(SettingsContext);
    const { icon, fontColor } = chooseFontColorAndIcon(route.params.assignment.type, settingsContext.state.fontIncrement);
    const meetingAssignmentsTranslate = useLocaLization(meetingAssignmentTranslations);
    const mainTranslate = useLocaLization(mainTranslations);
    

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <ListItem containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
            
                <View>
                    <Text style={[{ backgroundColor: fontColor, fontSize: 21 + settingsContext.state.fontIncrement }, styles.title]}>
                        {icon}
                        <Text>{meetingAssignmentsTranslate.t(route.params.assignment.type)}</Text>
                    </Text>
                    <Text style={[{ color: fontColor, fontSize: 18 + settingsContext.state.fontIncrement }, styles.assignmentTitle]}>
                        {route.params.assignment.topic || route.params.assignment.defaultTopic}
                    </Text>
                    <IconDescriptionValue 
                            iconName="account"
                            value={route.params.assignment.participant?.name || route.params.assignment.otherParticipant}
                    />
                    {route.params.assignment.reader && (
                    <IconDescriptionValue 
                        iconName="account-tie-voice"
                        description={meetingAssignmentsTranslate.t('readerLabel')}
                        value={route.params.assignment.reader.name}
                    />
                
                    )}
                    {route.params.assignment.helper && (
                    <IconDescriptionValue 
                        iconName="handshake"
                        description={meetingAssignmentsTranslate.t('helperLabel')}
                        value={route.params.assignment.helper.name}
                    />
                
                    )}
                </View>
                
            
            </ListItem>
            <Text style={[styles.text, { fontSize: 21 + settingsContext.state.fontIncrement }]}>{meetingAssignmentsTranslate.t('deleteConfirmText')}</Text>
            <View style={{ flexDirection: 'row', flex: 1, gap: 8 }}>
                <View style={{ width: '48%' }}>
                    <ButtonC title={mainTranslate.t('yes')} onPress={() => deleteAssignment(route.params.meeting._id, route.params.assignment._id)} isLoading={state.isLoading} color="#AD371F" />
                </View>
                <View style={{ width: '48%' }}>
                <ButtonC title={mainTranslate.t('no')} onPress={() => navigation.navigate('Meetings Index')} />
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
    title: {
        padding: 10,
        fontSize: 21,
        fontFamily: "PoppinsSemiBold",
        color: "white",
        gap: 6,
        width: '100%'
    },
    assignmentTitle: {
        paddingVertical: 10,
        fontSize: 18,
        fontFamily: "InterRegular",
      },
    text: {
        fontSize: 21,
        marginVertical: 10,
    }
})

export default MeetingAssignmentDeleteConfirmScreen;