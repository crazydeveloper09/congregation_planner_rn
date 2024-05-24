import { NavigationProp } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { IAudioVideo, IMeeting } from "../../contexts/interfaces";
import AudioVideo from "./components/AudioVideo";
import ButtonC from "../../commonComponents/Button";
import { Context as AudioVideoContext } from "../../contexts/AudioVideoContext";

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
    const { state, deleteAudioVideo } = useContext(AudioVideoContext)
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <AudioVideo audioVideo={route.params.audioVideo!} meeting={route.params.meeting} />
            <Text style={styles.text}>Czy na pewno chcesz usunąć te dane o audio-video?</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ width: '48%' }}>
                    <ButtonC title="Tak" onPress={() => deleteAudioVideo(route.params.meeting._id, route.params.audioVideo._id)} isLoading={state.isLoading} color="#AD371F" />
                </View>
                <View style={{ width: '48%' }}>
                <ButtonC title="Nie" onPress={() => navigation.navigate('Audio Index')} />
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
    }
})

export default AudioVideoDeleteConfirmScreen;