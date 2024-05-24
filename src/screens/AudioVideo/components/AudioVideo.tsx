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
                {((state.preacher && state.preacher.roles?.includes('can_edit_audio_video')) || authContext.state.whoIsLoggedIn === "admin") && <View style={styles.linkContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Audio Edit", { meeting, audioVideo })}>
                        <Text style={styles.link}>
                            <MaterialCommunityIcons name="pencil" size={18} />
                            <Text> </Text>
                            <Text>Edytuj dane</Text>
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Audio Delete Confirm", { meeting, audioVideo })}>
                        <Text style={styles.link}>
                            <MaterialCommunityIcons name="trash-can" size={18} />
                            <Text> </Text>
                            <Text>Usuń dane</Text>
                        </Text>
                    </TouchableOpacity>
                </View>}
                
            </View> : <>
                <NotFound title="Nie dodano rekordów audio-video dla tego zebrania" />
                {((state.preacher && state.preacher.roles?.includes("can_edit_audio_video")) || authContext.state.whoIsLoggedIn === "admin") && <View style={styles.linkContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Audio New", { meeting })}>
                        <Text style={styles.link}>
                            <MaterialCommunityIcons name="plus" size={18} />
                            <Text> </Text>
                            <Text>Dodaj dane</Text>
                        </Text>
                    </TouchableOpacity>
                
                </View>}
                

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

export default AudioVideo;