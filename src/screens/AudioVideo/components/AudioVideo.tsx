import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IAudioVideo, IMeeting } from "../../../contexts/interfaces";
import { ListItem } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NotFound from "../../../commonComponents/NotFound";
import { Context as PreachersContext } from "../../../contexts/PreachersContext";
import { Context as AuthContext } from "../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import IconDescriptionValue from "../../../commonComponents/IconDescriptionValue";
import IconContainer from "../../../commonComponents/IconContainer";
import IconLink from "../../../commonComponents/IconLink";

interface AudioVideoProps {
    meeting: IMeeting,
    audioVideo: IAudioVideo
}

const AudioVideo: React.FC<AudioVideoProps> = ({ audioVideo, meeting }) => {
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
            {audioVideo ? <View>
                <IconDescriptionValue 
                    iconName="laptop"
                    description="Operator wideo"
                    value={audioVideo.videoOperator.name}
                />
                
                {audioVideo.audioOperator && <IconDescriptionValue 
                    iconName="audio-video"
                    description="Operator audio"
                    value={audioVideo.audioOperator.name}
                />}
                <IconDescriptionValue 
                    iconName="microphone"
                    description="Mikrofon 1"
                    value={audioVideo.microphone1Operator.name}
                />
    
                {audioVideo.microphone2Operator && <IconDescriptionValue 
                    iconName="microphone-outline"
                    description="Mikrofon 2"
                    value={audioVideo.microphone2Operator.name}
                />}
                {((state.preacher && state.preacher.roles?.includes('can_edit_audio_video')) || authContext.state.whoIsLoggedIn === "admin") && <IconContainer>
                    <IconLink 
                        onPress={() => navigation.navigate("Audio Edit", { meeting, audioVideo })}
                        iconName="pencil"
                        description="Edytuj dane"
                    />
                    <IconLink 
                        onPress={() => navigation.navigate("Audio Delete Confirm", { meeting, audioVideo })}
                        iconName="trash-can"
                        description="Usuń dane"
                    />
                </IconContainer>}
                
            </View> : <>
                <NotFound title="Nie dodano rekordów audio-video dla tego zebrania" />
                {((state.preacher && state.preacher.roles?.includes("can_edit_audio_video")) || authContext.state.whoIsLoggedIn === "admin") && (
                    <IconLink 
                        onPress={() => navigation.navigate("Audio New", { meeting })}
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
})

export default AudioVideo;