import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { IMeeting, IAttendant } from "../../../contexts/interfaces";
import { ListItem } from "@rneui/themed";
import NotFound from "../../../commonComponents/NotFound";
import { Context as PreachersContext } from "../../../contexts/PreachersContext";
import { Context as AuthContext } from "../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import IconDescriptionValue from "../../../commonComponents/IconDescriptionValue";
import IconLink from "../../../commonComponents/IconLink";
import IconContainer from "../../../commonComponents/IconContainer";
import { Divider } from "@rneui/base";
import useLocaLization from "../../../hooks/useLocalization";
import { attendantTranslations } from "../Attendants/translations";
import { mainTranslations } from "../../../../localization";

interface AttendantProps {
    meeting: IMeeting,
    attendant: IAttendant
}

const Attendant: React.FC<AttendantProps> = ({ attendant, meeting }) => {
    const [expanded, setExpanded] = useState<boolean>(new Date(meeting.date).toLocaleDateString("pl-PL") === new Date().toLocaleDateString("pl-PL"));
    const navigation = useNavigation();
    const {state} = useContext(PreachersContext)
    const authContext = useContext(AuthContext)
    const attendantTranslate = useLocaLization(attendantTranslations)
    const mainTranslate = useLocaLization(mainTranslations);
    return (
        <>
             <ListItem.Accordion
            containerStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.0)',
                paddingHorizontal: 0
            }}
            content={
                <>
                
                <ListItem.Content>
                    <ListItem.Title style={styles.date}>{new Date(meeting.date).toLocaleDateString('pl-PL')} { new Date(meeting.date).toLocaleDateString("pl-PL") === new Date().toLocaleDateString("pl-PL") && mainTranslate.t("today") }</ListItem.Title>
                </ListItem.Content>
                </>
            }
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded);
            }}
        >
            {attendant ?  <>
                    <IconDescriptionValue 
                        iconName="account-supervisor"
                        description={attendantTranslate.t("hallwayLabel")}
                        value={attendant.hallway1.name}
                    />

                    {attendant.hallway2 && <IconDescriptionValue 
                        iconName="account-supervisor-outline"
                        description={attendantTranslate.t("hallway2Label")}
                        value={attendant.hallway2.name}
                    />}
                    <IconDescriptionValue 
                        iconName="account-eye"
                        description={attendantTranslate.t("auditoriumLabel")}
                        value={attendant.auditorium.name}
                    />
            
                    {attendant.parking && <IconDescriptionValue 
                        iconName="parking"
                        description={attendantTranslate.t("parkingLabel")}
                        value={attendant.parking.name}
                    />}
                    {((state.preacher && state.preacher.roles?.includes("can_edit_audio_video")) || authContext.state.whoIsLoggedIn === "admin") && <IconContainer>
                        <IconLink 
                            onPress={() => navigation.navigate("Attendant Edit", { meeting, attendant })}
                            iconName="pencil"
                            description={attendantTranslate.t("editText")}
                        />
                        <IconLink 
                            onPress={() => navigation.navigate("Attendant Delete Confirm", { meeting, attendant })}
                            iconName="trash-can"
                            description={attendantTranslate.t("deleteText")}
                        />
                    </IconContainer>}

                
              
            </> : <>
               
                    <NotFound title={attendantTranslate.t("noEntryText")} />
                    {((state.preacher && state.preacher.roles?.includes("can_edit_audio_video")) || authContext.state.whoIsLoggedIn === "admin") && (
                        <IconLink 
                            onPress={() => navigation.navigate("Attendant New", { meeting })}
                            iconName="plus"
                            isCentered
                            description={attendantTranslate.t("addText")}
                        />
                    )}
                
                
            </>}
           
        </ListItem.Accordion>
        <Divider />
        </>
       
    )
}

const styles = StyleSheet.create({

    date: {
        fontFamily: "MontserratRegular",
        fontSize: 20,
    },
})

export default Attendant;