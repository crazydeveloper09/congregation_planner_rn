import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { IMeeting, IOrdinal } from "../../../contexts/interfaces";
import { ListItem } from "react-native-elements";
import NotFound from "../../../commonComponents/NotFound";
import { Context as PreachersContext } from "../../../contexts/PreachersContext";
import { Context as AuthContext } from "../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import IconDescriptionValue from "../../../commonComponents/IconDescriptionValue";
import IconLink from "../../../commonComponents/IconLink";
import IconContainer from "../../../commonComponents/IconContainer";

interface OrdinalProps {
    meeting: IMeeting,
    ordinal: IOrdinal
}

const Ordinal: React.FC<OrdinalProps> = ({ ordinal, meeting }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const navigation = useNavigation();
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
                    <ListItem.Title style={styles.date}>{new Date(meeting.date).toLocaleDateString()}</ListItem.Title>
                </ListItem.Content>
                </>
            }
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded);
            }}
            underlayColor={'rgba(0, 0, 0, 0.0)'}
        >
            {ordinal ?  <View>
                <IconDescriptionValue 
                    iconName="account-supervisor"
                    description="Porządkowy"
                    value={ordinal.hallway1.name}
                />

                {ordinal.hallway2 && <IconDescriptionValue 
                    iconName="account-supervisor-outline"
                    description="Porządkowy 2"
                    value={ordinal.hallway2.name}
                />}
                <IconDescriptionValue 
                    iconName="account-eye"
                    description="Porządkowy audytorium"
                    value={ordinal.auditorium.name}
                />
        
                {ordinal.parking && <IconDescriptionValue 
                    iconName="parking"
                    description="Parking"
                    value={ordinal.parking.name}
                />}
                {((state.preacher && state.preacher.roles?.includes("can_edit_audio_video")) || authContext.state.whoIsLoggedIn === "admin") && <IconContainer>
                    <IconLink 
                        onPress={() => navigation.navigate("Ordinal Edit", { meeting, ordinal })}
                        iconName="pencil"
                        description="Edytuj dane"
                    />
                    <IconLink 
                        onPress={() => navigation.navigate("Ordinal Delete Confirm", { meeting, ordinal })}
                        iconName="trash-can"
                        description="Usuń dane"
                    />
                </IconContainer>}
              
            </View> : <>
                <NotFound title="Nie dano rekordów o porządkowych dla tego zebrania" />
                {((state.preacher && state.preacher.roles?.includes("can_edit_audio_video")) || authContext.state.whoIsLoggedIn === "admin") && (
                    <IconLink 
                        onPress={() => navigation.navigate("Ordinal New", { meeting })}
                        iconName="plus"
                        description="Dodaj dane"
                    />
                )}
                
            </>}
           
        </ListItem.Accordion>
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

export default Ordinal;