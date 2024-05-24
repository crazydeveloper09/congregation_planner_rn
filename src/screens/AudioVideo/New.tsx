import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { Context as AudioVideoContext } from "../../contexts/AudioVideoContext";
import territories from "../../api/territories";
import { IMeeting, IPreacher } from "../../contexts/interfaces";
import ButtonC from "../../commonComponents/Button";
import { Switch } from "@rneui/base";
import DropDownPicker from "react-native-dropdown-picker";
import Meeting from "../Meetings/components/Meeting";
import { ScrollView } from "react-native-gesture-handler";

interface AudioVideoNewScreenProps {
    route: {
        params: {
            meeting: IMeeting,
        }
    }
}

const AudioVideoNewScreen: React.FC<AudioVideoNewScreenProps> = ({ route }) => {
    const [videoOperatorValue, setVideoOperatorValue] = useState("");
    const [videoOperatorOpen, setVideoOperatorOpen] = useState(false);
    const [videoOperatorItems, setVideoOperatorItems] = useState([]);
    const [isAudioOperator, setIsAudioOperator] = useState<boolean>(false);
    const [audioOperatorValue, setAudioOperatorValue] = useState<string>('')
    const [audioOperatorOpen, setAudioOperatorOpen] = useState<boolean>(false);
    const [audioOperatorItems, setAudioOperatorItems] = useState([]);
    const [microphone1Value, setMicrophone1Value] = useState<string>('')
    const [microphone1Open, setMicrophone1Open] = useState<boolean>(false);
    const [microphone1Items, setMicrophone1Items] = useState([]);
    const [isMicrophone2, setIsMicrophone2] = useState(false)
    const [microphone2Value, setMicrophone2Value] = useState<string>('')
    const [microphone2Open, setMicrophone2Open] = useState<boolean>(false);
    const [microphone2Items, setMicrophone2Items] = useState([]);
    const { state, addAudioVideo } = useContext(AudioVideoContext);


    const loadPreachers = async () => {
        const token = await AsyncStorage.getItem('token')
        territories.get<IPreacher[]>('/preachers/all', {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        .then((response) => {
            const selectItems = response.data.filter((preacher) => preacher.roles.includes("can_see_audio_video")).map((preacher) => {
                return { label: preacher.name, value: preacher._id } as never
            })
            setVideoOperatorItems(selectItems)
            setMicrophone1Items(selectItems)
            setAudioOperatorItems(selectItems)
            setMicrophone2Items(selectItems)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        loadPreachers()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.meeting}>Zobacz kto ma już zadanie na zebraniu</Text>
            <Meeting meeting={route.params.meeting} filter="Wszystkie" />
            <Text style={styles.labelStyle}>Operator wideo</Text>
            <DropDownPicker 
                value={videoOperatorValue}
                setValue={setVideoOperatorValue}
                open={videoOperatorOpen}
                setOpen={setVideoOperatorOpen}
                items={videoOperatorItems}
                listMode="MODAL"
                modalTitle="Operator wideo"
                placeholder="Wybierz operatora wideo"
            />

            <Text style={styles.labelStyle}>Czy jest potrzebny operator audio?</Text>
            <Switch  
                value={isAudioOperator}
                onValueChange={(value) => setIsAudioOperator(value)}
                style={styles.switch}
                color={'#1F8AAD'}
            />

            { isAudioOperator && <>
                <Text style={styles.labelStyle}>Operator audio</Text>
                <DropDownPicker 
                    value={audioOperatorValue}
                    setValue={setAudioOperatorValue}
                    open={audioOperatorOpen}
                    setOpen={setAudioOperatorOpen}
                    items={audioOperatorItems}
                    listMode="MODAL"
                    modalTitle="Operator audio"
                    placeholder="Wybierz operatora audio"
                />
            </>}

            <Text style={styles.labelStyle}>Mikrofon 1 (lewy)</Text>
            <DropDownPicker 
                value={microphone1Value}
                setValue={setMicrophone1Value}
                open={microphone1Open}
                setOpen={setMicrophone1Open}
                items={microphone1Items}
                listMode="MODAL"
                modalTitle="Mikrofon 1"
                placeholder="Wybierz głosiciela do mikrofonu 1"
            />

            

            <Text style={styles.labelStyle}>Czy jest potrzebny mikrofon 2 (prawy)?</Text>
            <Switch  
                value={isMicrophone2}
                onValueChange={(value) => setIsMicrophone2(value)}
                style={styles.switch}
                color={'#1F8AAD'}
            />
            {isMicrophone2 && <>
                <DropDownPicker 
                    value={microphone2Value}
                    setValue={setMicrophone2Value}
                    open={microphone2Open}
                    setOpen={setMicrophone2Open}
                    items={microphone2Items}
                    containerStyle={{
                        marginVertical: 10
                    }}
                    listMode="MODAL"
                    modalTitle="Mikrofon 2"
                    placeholder="Wybierz głosiciela do mikrofonu 2"
                />

            </>}
            <ButtonC 
                title="Dodaj dane audio-video"
                isLoading={state.isLoading}
                onPress={() => addAudioVideo(route.params.meeting._id, audioOperatorValue, videoOperatorValue, microphone1Value, microphone2Value)}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    meeting: {
        fontSize: 21,
        color: '#1F8AAD',
        fontFamily: 'PoppinsSemiBold'
    },
    inputContainer: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 6,
        padding: 5,
        borderColor: 'black',
    },
    labelStyle: {
        fontFamily: 'MontserratSemiBold',
        marginVertical: 8,
        color: 'black',
    },
    containerInput: {
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    switch: {
        alignSelf: 'flex-start',  
        transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
        marginVertical: 8
    },
})

export default AudioVideoNewScreen;