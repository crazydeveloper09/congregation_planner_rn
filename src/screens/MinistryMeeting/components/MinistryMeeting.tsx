import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IMinistryMeeting } from "../../../contexts/interfaces";
import { Context as PreachersContext } from "../../../contexts/PreachersContext";
import { Context as AuthContext } from "../../../contexts/AuthContext";
import { ListItem } from "@rneui/themed";
import { addMinistryMeetingAssignmentToCalendar } from "../helpers/calendar";
import IconDescriptionValue from "../../../commonComponents/IconDescriptionValue";
import IconLink from "../../../commonComponents/IconLink";
import IconContainer from "../../../commonComponents/IconContainer";
import { Divider } from "@rneui/base";

interface MinistryMeetingProps {
    meeting: IMinistryMeeting;
    navigate: Function
}

const MinistryMeeting: React.FC<MinistryMeetingProps> = ({ meeting, navigate }) => {
    const [expanded, setExpanded] = useState<boolean>(false)
    const {state} = useContext(PreachersContext)
    const authContext = useContext(AuthContext)
    return (
        <View>
            <ListItem.Accordion
                containerStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.0)',
                    paddingHorizontal: 0
                }}
                content={
                    <>
                    
                    <ListItem.Content>
                        <ListItem.Title style={styles.date}>
                            {new Date(meeting.date).toLocaleString('pl-PL', { 
                                year: 'numeric', 
                                month: '2-digit', 
                                day: '2-digit', 
                                hour: '2-digit', 
                                minute: '2-digit',
                                hour12: false // użycie formatu 12-godzinnego z AM/PM
                            })}
                        </ListItem.Title>
                    </ListItem.Content>
                    </>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }}
        >
           
                    <IconDescriptionValue 
                        iconName={meeting?.defaultPlace === "Zoom" ? "video-box" : "home"}
                        description="Miejsce"
                        value={meeting?.place || meeting?.defaultPlace}
                    />
                    <IconDescriptionValue 
                        iconName="account-tie"
                        description="Prowadzący"
                        value={meeting?.lead?.name}
                    />

                    {meeting?.topic && <IconDescriptionValue 
                        iconName="table-of-contents"
                        description="Temat"
                        value={meeting?.topic}
                    />}
                    {((state.preacher && state.preacher.roles?.includes("can_edit_minimeetings")) || authContext.state.whoIsLoggedIn === "admin") && <IconContainer>
                        <IconLink 
                            onPress={() => navigate("Ministry Meeting Edit", { meeting })}
                            iconName="pencil"
                            description="Edytuj zbiórkę"
                        />
                        <IconLink 
                            onPress={() => navigate("Ministry Meeting Delete Confirm", { meeting })}
                            iconName="trash-can"
                            description="Usuń zbiórkę"
                        />
                    </IconContainer>}
                    {state.preacher && state.preacher?._id === meeting?.lead?._id && (
                        <IconLink 
                            onPress={() => addMinistryMeetingAssignmentToCalendar(meeting?.date, meeting?.place, meeting?.topic!)}
                            iconName="calendar-month-outline"
                            description="Dodaj do kalendarza"
                            isCentered={true}
                        />
                    )}
           
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
    text: {
        fontFamily: "InterRegular",
        fontSize: 16,
        marginBottom: 10,
    },
    textBold: {
        fontFamily: "InterSemiBold",
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    link: {
        fontSize: 17,
        color: '#1f8aad',
        paddingVertical: 10
    }
})

export default MinistryMeeting;