import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { Context as AudioVideoContext } from "../../contexts/AudioVideoContext";
import { Context as MeetingContext } from "../../contexts/MeetingContext";
import territories from "../../api/territories";
import { IAudioVideo, IMeeting, IPreacher } from "../../contexts/interfaces";
import ButtonC from "../../commonComponents/Button";
import { Switch } from "@rneui/base";
import DropDownPicker from "react-native-dropdown-picker";
import Meeting from "../Meetings/components/Meeting";
import Label from "../../commonComponents/Label";
import Ordinal from "./components/Ordinal";
import { defaultStyles } from "../defaultStyles";
import { months } from "../../../defaultData";

interface AudioVideoEditScreenProps {
    route: {
        params: {
            meeting: IMeeting,
            audioVideo: IAudioVideo
        }
    }
}

const AudioVideoEditScreen: React.FC<AudioVideoEditScreenProps> = ({ route }) => {
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
    const { state, editAudioVideo } = useContext(AudioVideoContext);
    const meetingContext = useContext(MeetingContext)


    const loadPreachers = async () => {
        const token = await AsyncStorage.getItem('token')
        territories.get<IPreacher[]>('/preachers/all', {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        .then((response) => {
            const meetingDate = new Date(route.params.meeting.date)
            const currentMonth = `${months[meetingDate.getMonth()]} ${meetingDate.getFullYear()}`;
            const currentMonthMeetings = meetingContext.state.meetings?.filter((meeting) => meeting.month === currentMonth);
            const selectVideoItems = response.data.filter((preacher) => preacher.roles.includes("can_be_video")).map((preacher) => {
                let alreadyAssigned = currentMonthMeetings?.filter((meeting) => meeting.audioVideo?.videoOperator?.name === preacher.name).length

                return { label: `${preacher.name} - ${currentMonth} - był na wideo już ${alreadyAssigned} razy`, value: preacher._id } as never
            })
            const selectAudioItems = response.data.filter((preacher) => preacher.roles.includes("can_be_audio")).map((preacher) => {
                let alreadyAssigned = currentMonthMeetings?.filter((meeting) => meeting.audioVideo?.audioOperator?.name === preacher.name).length

                return { label: `${preacher.name} - ${currentMonth} - był na audio już ${alreadyAssigned} razy`, value: preacher._id } as never
            })
            const selectMicItems = response.data.filter((preacher) => preacher.roles.includes("can_take_mic")).map((preacher) => {
                let alreadyAssigned = currentMonthMeetings?.filter((meeting) => meeting.audioVideo?.microphone1Operator?.name === preacher.name || meeting.audioVideo?.microphone2Operator?.name === preacher.name).length

                return { label: `${preacher.name} - ${currentMonth} - nosił mikrofony już ${alreadyAssigned} razy`, value: preacher._id } as never
            })
            setVideoOperatorItems(selectVideoItems)
            setMicrophone1Items(selectMicItems)
            setAudioOperatorItems(selectAudioItems)
            setMicrophone2Items(selectMicItems)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        loadPreachers()
        setAudioOperatorValue(route.params.audioVideo.audioOperator?._id!)
        setVideoOperatorValue(route.params.audioVideo.videoOperator?._id!)
        setMicrophone1Value(route.params.audioVideo.microphone1Operator?._id!)
        setMicrophone2Value(route.params.audioVideo.microphone2Operator?._id!)
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.meeting}>Zobacz kto ma już zadanie na zebraniu</Text>
            <Meeting meeting={route.params.meeting} filter="Wszystkie" />

            <Text style={[styles.meeting, { marginTop: 15 }]}>Porządkowi</Text>
            <Ordinal meeting={route.params.meeting} ordinal={route.params.meeting.ordinal} />

            <Label text="Operator wideo" />
            <DropDownPicker 
                value={videoOperatorValue}
                setValue={setVideoOperatorValue}
                open={videoOperatorOpen}
                setOpen={setVideoOperatorOpen}
                items={videoOperatorItems}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                listMode="MODAL"
                modalTitle="Operator wideo"
                placeholder="Wybierz operatora wideo"
            />
            <Label text="Czy jest potrzebny operator audio?" />
            <Switch  
                value={isAudioOperator}
                onValueChange={(value) => setIsAudioOperator(value)}
                style={styles.switch}
                color={'#1F8AAD'}
            />

            { isAudioOperator && <>
                <Label text="Operator audio" />
                <DropDownPicker 
                    value={audioOperatorValue}
                    setValue={setAudioOperatorValue}
                    open={audioOperatorOpen}
                    setOpen={setAudioOperatorOpen}
                    items={audioOperatorItems}
                    labelStyle={defaultStyles.dropdown}
                    placeholderStyle={defaultStyles.dropdown}
                    listMode="MODAL"
                    modalTitle="Operator audio"
                    placeholder="Wybierz operatora audio"
                />
            </>}
            <Label text="Mikrofon 1 (lewy)" />
            <DropDownPicker 
                value={microphone1Value}
                setValue={setMicrophone1Value}
                open={microphone1Open}
                setOpen={setMicrophone1Open}
                items={microphone1Items}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                listMode="MODAL"
                modalTitle="Mikrofon 1"
                placeholder="Wybierz głosiciela do mikrofonu 1"
            />

            <Label text="Czy jest potrzebny mikrofon 2 (prawy)?" />
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
                    labelStyle={defaultStyles.dropdown}
                    placeholderStyle={defaultStyles.dropdown}
                    listMode="MODAL"
                    modalTitle="Mikrofon 2"
                    placeholder="Wybierz głosiciela do mikrofonu 2"
                />

            </>}
            <ButtonC 
                title="Edytuj dane audio-video"
                isLoading={state.isLoading}
                onPress={() => editAudioVideo(route.params.meeting._id, route.params.audioVideo._id, audioOperatorValue, videoOperatorValue, microphone1Value, microphone2Value)}
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
    switch: {
        alignSelf: 'flex-start',  
        transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
        marginVertical: 8
    },
})

export default AudioVideoEditScreen;