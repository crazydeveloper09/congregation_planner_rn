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
import { mainTranslations } from "../../../../localization";
import { Context as SettingsContext } from "../../../contexts/SettingsContext";

interface AudioVideoProps {
    meeting: IMeeting,
    audioVideo: IAudioVideo,
    shouldAutomaticallyExpand?: boolean;
}

const AudioVideo: React.FC<AudioVideoProps> = ({ audioVideo, meeting, shouldAutomaticallyExpand = true }) => {
    const [expanded, setExpanded] = useState<boolean>(shouldAutomaticallyExpand && new Date(meeting.date).toLocaleDateString("pl-PL") === new Date().toLocaleDateString("pl-PL"));
    const navigation = useNavigation();
    const {state} = useContext(PreachersContext)
    const authContext = useContext(AuthContext)
    const settingsContext = useContext(SettingsContext);
    const audioVideoTranslate = useLocaLization(audioVideoTranslations)
    const mainTranslate = useLocaLization(mainTranslations);
      const dateToDisplay = new Date(meeting?.date).toLocaleString("pl-PL", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    hour12: settingsContext.state.format12h,
  });
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
                    <ListItem.Title style={[styles.date, { fontSize: 20 + settingsContext.state.fontIncrement }]}>{dateToDisplay} { new Date(meeting.date).toLocaleDateString("pl-PL") === new Date().toLocaleDateString("pl-PL") && mainTranslate.t("today") }</ListItem.Title>
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
                        value={audioVideo.videoOperator?.name}
                    />
                    
                    {audioVideo.audioOperator && <IconDescriptionValue 
                        iconName="audio-video"
                        description={audioVideoTranslate.t("audioOperatorLabel")}
                        value={audioVideo.audioOperator?.name}
                    />}
                    <IconDescriptionValue 
                        iconName="microphone"
                        description={audioVideoTranslate.t("mic1Label")}
                        value={audioVideo.microphone1Operator?.name}
                    />
        
                    {audioVideo.microphone2Operator && <IconDescriptionValue 
                        iconName="microphone-outline"
                        description={audioVideoTranslate.t("mic2Label")}
                        value={audioVideo.microphone2Operator?.name}
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
                            isCentered
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