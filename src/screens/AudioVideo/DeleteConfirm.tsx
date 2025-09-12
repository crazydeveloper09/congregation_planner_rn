import { NavigationProp } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { IAudioVideo, IMeeting } from "../../contexts/interfaces";
import ButtonC from "../../commonComponents/Button";
import { Context as AudioVideoContext } from "../../contexts/AudioVideoContext";
import { ListItem } from "@rneui/base";
import IconDescriptionValue from "../../commonComponents/IconDescriptionValue";
import useLocaLization from "../../hooks/useLocalization";
import { audioVideoTranslations } from "./translations";
import { mainTranslations } from "../../../localization";
import { Context as SettingsContext } from "../../contexts/SettingsContext";

interface AudioVideoDeleteConfirmScreenProps { 
    navigation: NavigationProp<any>
    route: {
        params: {
            meeting: IMeeting
            audioVideo: IAudioVideo
        }
    }
}

const AudioVideoDeleteConfirmScreen: React.FC<AudioVideoDeleteConfirmScreenProps> = ({ navigation, route }) => {
    const { state, deleteAudioVideo } = useContext(AudioVideoContext);
    const audioVideoTranslate = useLocaLization(audioVideoTranslations);
    const mainTranslate = useLocaLization(mainTranslations)
    const settingsContext = useContext(SettingsContext);
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <ListItem containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
            
                <View>
                    <ListItem.Title style={[styles.date, { fontSize: 20 + settingsContext.state.fontIncrement }]}>{new Date(route.params.meeting.date).toLocaleDateString('pl-PL')}</ListItem.Title>
                    <IconDescriptionValue 
                        iconName="laptop"
                        description={audioVideoTranslate.t("videoOperatorLabel")}
                        value={route.params.audioVideo.videoOperator?.name}
                    />
                    
                    {route.params.audioVideo.audioOperator && <IconDescriptionValue 
                        iconName="audio-video"
                        description={audioVideoTranslate.t("audioOperatorLabel")}
                        value={route.params.audioVideo.audioOperator?.name}
                    />}
                    <IconDescriptionValue 
                        iconName="microphone"
                        description={audioVideoTranslate.t("mic1Label")}
                        value={route.params.audioVideo.microphone1Operator?.name}
                    />
        
                    {route.params.audioVideo.microphone2Operator && <IconDescriptionValue 
                        iconName="microphone-outline"
                        description={audioVideoTranslate.t("mic2Label")}
                        value={route.params.audioVideo.microphone2Operator?.name}
                    />}
                </View>
                
            
            </ListItem>
            <Text style={[styles.text, { fontSize: 21 + settingsContext.state.fontIncrement }]}>{audioVideoTranslate.t("deleteConfirmText")}</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ width: '48%' }}>
                    <ButtonC title={mainTranslate.t("yes")} onPress={() => deleteAudioVideo(route.params.meeting._id, route.params.audioVideo._id)} isLoading={state.isLoading} color="#AD371F" />
                </View>
                <View style={{ width: '48%' }}>
                <ButtonC title={mainTranslate.t("no")} onPress={() => navigation.navigate('Audio Index')} />
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

export default AudioVideoDeleteConfirmScreen;