import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { IAudioVideo, IMeeting } from "../../../contexts/interfaces";
import { ListItem } from "@rneui/themed";
import NotFound from "../../../commonComponents/NotFound";
import { Context as PreachersContext } from "../../../contexts/PreachersContext";
import { Context as AuthContext } from "../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import IconDescriptionValue from "../../../commonComponents/IconDescriptionValue";
import IconContainer from "../../../commonComponents/IconContainer";
import IconLink from "../../../commonComponents/IconLink";
import { Divider } from "@rneui/base";
import useLocaLization from "../../../hooks/useLocalization";
import { audioVideoTranslations } from "../translations";

interface AudioVideoProps {
    meeting: IMeeting,
    audioVideo: IAudioVideo
}

const AudioVideo: React.FC<AudioVideoProps> = ({ audioVideo, meeting }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const navigation = useNavigation();
    const {state} = useContext(PreachersContext)
    const authContext = useContext(AuthContext)
    const audioVideoTranslate = useLocaLization(audioVideoTranslations)
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
                    <ListItem.Title style={styles.date}>{new Date(meeting.date).toLocaleDateString('pl-PL')}</ListItem.Title>
                </ListItem.Content>
                </>
            }
            isExpanded={expanded}
            onPress={() => {
                setExpanded(!expanded);
            }}
        >
            {audioVideo ? <>
    
                    <IconDescriptionValue 
                        iconName="laptop"
                        description={audioVideoTranslate.t("videoOperatorLabel")}
                        value={audioVideo.videoOperator.name}
                    />
                    
                    {audioVideo.audioOperator && <IconDescriptionValue 
                        iconName="audio-video"
                        description={audioVideoTranslate.t("audioOperatorLabel")}
                        value={audioVideo.audioOperator.name}
                    />}
                    <IconDescriptionValue 
                        iconName="microphone"
                        description={audioVideoTranslate.t("mic1Label")}
                        value={audioVideo.microphone1Operator.name}
                    />
        
                    {audioVideo.microphone2Operator && <IconDescriptionValue 
                        iconName="microphone-outline"
                        description={audioVideoTranslate.t("mic2Label")}
                        value={audioVideo.microphone2Operator.name}
                    />}
                    {((state.preacher && state.preacher.roles?.includes('can_edit_audio_video')) || authContext.state.whoIsLoggedIn === "admin") && <IconContainer>
                        <IconLink 
                            onPress={() => navigation.navigate("Audio Edit", { meeting, audioVideo })}
                            iconName="pencil"
                            description={audioVideoTranslate.t("editText")}
                        />
                        <IconLink 
                            onPress={() => navigation.navigate("Audio Delete Confirm", { meeting, audioVideo })}
                            iconName="trash-can"
                            description={audioVideoTranslate.t("deleteText")}
                        />
                    </IconContainer>}
          
                
                
            </> : <>
               
                    <NotFound title={audioVideoTranslate.t("noEntryText")} />
                    {((state.preacher && state.preacher.roles?.includes("can_edit_audio_video")) || authContext.state.whoIsLoggedIn === "admin") && (
                        <IconLink 
                            onPress={() => navigation.navigate("Audio New", { meeting })}
                            iconName="plus"
                            description={audioVideoTranslate.t("addText")}
                        />
                    )}
            
                
        
            </>}
            
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
})

export default AudioVideo;