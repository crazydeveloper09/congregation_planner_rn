import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ListItem } from "@rneui/themed";
import { groupBy } from "../../../helpers/arrays";
import MeetingAssignment from "./MeetingAssignment";
import { IMeeting, IMeetingAssignment } from "../../../contexts/interfaces";
import { Context as PreachersContext } from "../../../contexts/PreachersContext";
import { Context as AuthContext } from "../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { addMeetingAssignmentToCalendar } from "../helpers/calendar";
import IconDescriptionValue from "../../../commonComponents/IconDescriptionValue";
import IconLink from "../../../commonComponents/IconLink";
import IconContainer from "../../../commonComponents/IconContainer";
import { Divider } from "@rneui/base";
import useLocaLization from "../../../hooks/useLocalization";
import { meetingAssignmentTranslations } from "../Assignments/translations";
import { meetingsTranslations } from "../translations";
import { mainTranslations } from "../../../../localization";

interface MeetingProps {
    meeting: IMeeting,
    filter: string
}

const Meeting: React.FC<MeetingProps> = ({ meeting, filter }) => {
    const [expanded, setExpanded] = useState<boolean>(false)
    const assignmentsGroup = groupBy<IMeetingAssignment>(meeting?.assignments, 'type');
    const navigation = useNavigation();
    const {state} = useContext(PreachersContext)
    const authContext = useContext(AuthContext)
    const meetingAssignmentsTranslate = useLocaLization(meetingAssignmentTranslations);
    const meetingTranslate = useLocaLization(meetingsTranslations);
    const mainTranslate = useLocaLization(mainTranslations);

    if(state.preacher && filter === mainTranslate.t("myAssignments")) {
        return (
          <>
            {state.preacher?._id === meeting.lead?._id && (
                <View>
                    <Text style={styles.title}>
                        {new Date(meeting?.date).toLocaleString('pl-PL', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            })} -
                        {meetingTranslate.t("leadLabel")}
                    </Text>
                    <IconLink 
                        onPress={() => addMeetingAssignmentToCalendar(new Date(meeting?.date), meetingTranslate.t("leadLabel"), meetingTranslate.t("kingdomHall"))}
                        iconName="calendar-month-outline"
                        description={mainTranslate.t("addToCalendar")}
                        isCentered={true}
                    />
                </View>
              
            )}
            {state.preacher?._id === meeting.beginPrayer?._id && (
                <View>
                    <Text style={styles.title}>
                        {new Date(meeting?.date).toLocaleString('pl-PL', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            })} -
                        {meetingTranslate.t("beginPrayerLabel")}
                    </Text>
                    <IconLink 
                        onPress={() => addMeetingAssignmentToCalendar(new Date(meeting?.date), meetingTranslate.t("beginPrayerLabel"), meetingTranslate.t("kingdomHall"))}
                        iconName="calendar-month-outline"
                        description={mainTranslate.t("addToCalendar")}
                        isCentered={true}
                    />
                </View>
            )}
            {state.preacher?._id === meeting.endPrayer?._id && (
                <View>
                    <Text style={styles.title}>
                        {new Date(meeting?.date).toLocaleString('pl-PL', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            })} -
                        {meetingTranslate.t("endPrayerLabel")}
                    </Text>
                    <IconLink
                        onPress={() => addMeetingAssignmentToCalendar(new Date(meeting?.date), meetingTranslate.t("endPrayerLabel"), meetingTranslate.t("kingdomHall"))}
                        iconName="calendar-month-outline"
                        description={mainTranslate.t("addToCalendar")}
                        isCentered={true}
                    />
                </View>
            )}
          </>
        );
    }
    return (<View>
            <ListItem.Accordion
            containerStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.0)',
                paddingHorizontal: 0
            }}
            content={
                <>
                
                <ListItem.Content>
                    <ListItem.Title style={styles.date}>{new Date(meeting.date).toLocaleString('pl-PL', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    })}</ListItem.Title>
                </ListItem.Content>
                </>
            }
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded);
            }}
        >
            
                {meeting?.cleaningGroup && <IconDescriptionValue 
                            iconName="broom"
                            value={meeting?.cleaningGroup?.name}
                        />}
                        <IconDescriptionValue 
                            iconName="music"
                            description={meetingTranslate.t("songLabel")}
                            value={meeting.beginSong !== 0 ? meeting?.beginSong?.toString(): ""}
                        />
                        <IconDescriptionValue 
                            iconName="account-tie"
                            description={meetingTranslate.t("leadLabel")}
                            value={meeting?.lead?.name}
                        />
                        <IconDescriptionValue 
                            iconName="hands-pray"
                            description={meetingTranslate.t("prayerLabel")}
                            value={meeting?.beginPrayer?.name}
                        />
                        
                        {((state.preacher && state.preacher.roles?.includes("can_edit_meetings")) || authContext.state.whoIsLoggedIn === "admin") && (
                            <IconLink 
                                onPress={() => navigation.navigate("Meetings Assignment New", { meeting })}
                                iconName="plus"
                                description={meetingAssignmentsTranslate.t("addText")}
                            />
                        )}
                        
                        <FlatList 
                            keyExtractor={(assignmentType) => assignmentType}
                            data={Object.keys(assignmentsGroup)}
                            renderItem={({ item }) => <MeetingAssignment type={item} assignments={assignmentsGroup} midSong={meeting?.midSong} meeting={meeting} />}
                            contentContainerStyle={{borderBottomWidth: 1, borderBottomColor: 'black' }}
                            scrollEnabled={false}
                        />
                        <IconDescriptionValue 
                            iconName="music"
                            description={meetingTranslate.t("endSongLabel")}
                            value={meeting.endSong !== 0 ? meeting?.endSong?.toString(): ""}
                        />
                        <IconDescriptionValue 
                            iconName="hands-pray"
                            description={meetingTranslate.t("endPrayerLabel")}
                            value={meeting?.endPrayer?.name || meeting?.otherEndPrayer}
                        />
                        
                        {((state.preacher && state.preacher.roles?.includes("can_edit_meetings")) || authContext.state.whoIsLoggedIn === "admin") && <IconContainer>
                            <IconLink 
                                onPress={() => navigation.navigate("Meetings Edit", { meeting })}
                                iconName="pencil"
                                description={meetingTranslate.t("editText")}
                            />
                            <IconLink 
                                onPress={() => navigation.navigate("Meetings Delete Confirm", { meeting })}
                                iconName="trash-can"
                                description={meetingTranslate.t("deleteText")}
                            />
                        </IconContainer>}
              
            
        </ListItem.Accordion>
        <Divider />
        </View>
       
    )
}

const styles = StyleSheet.create({
    date: {
        fontFamily: "MontserratRegular",
        fontSize: 20,
    },
    title: {
        fontSize: 18,
        fontFamily: "PoppinsRegular",
        marginTop: 6,
    },
    text: {
        fontFamily: "InterRegular",
        fontSize: 16,
        textAlign: 'justify',
    },
    textBold: {
        fontFamily: "InterSemiBold",
        fontSize: 16,
        textAlign: 'justify',
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    link: {
        fontSize: 17,
        color: '#1f8aad',
        paddingVertical: 10,
        textAlign: 'center'
    }
});

export default Meeting;