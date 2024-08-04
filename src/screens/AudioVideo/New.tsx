import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { Context as AudioVideoContext } from "../../contexts/AudioVideoContext";
import { Context as MeetingContext } from "../../contexts/MeetingContext";
import territories from "../../api/territories";
import { IMeeting, IPreacher } from "../../contexts/interfaces";
import ButtonC from "../../commonComponents/Button";
import { Switch } from "@rneui/base";
import DropDownPicker from "react-native-dropdown-picker";
import Meeting from "../Meetings/components/Meeting";
import { ScrollView } from "react-native-gesture-handler";
import Label from "../../commonComponents/Label";
import Attendant from "./components/Attendant";
import { defaultStyles } from "../defaultStyles";
import { months } from "../../../defaultData";
import useLocaLization from "../../hooks/useLocalization";
import { audioVideoTranslations } from "./translations";
import { mainTranslations } from "../../../localization";
import { meetingAssignmentTranslations } from "../Meetings/Assignments/translations";
import { attendantTranslations } from "./Attendants/translations";

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
    const audioVideoTranslate = useLocaLization(audioVideoTranslations);
    const mainTranslate = useLocaLization(mainTranslations);
    const meetingAssignmentsTranslate = useLocaLization(meetingAssignmentTranslations);
    const attendantTranslate = useLocaLization(attendantTranslations)
    const { state, addAudioVideo } = useContext(AudioVideoContext);
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

                return { label: audioVideoTranslate.t("videoOperatorCounter", {name: preacher.name, currentMonth, alreadyAssigned}), value: preacher._id } as never
            })
            const selectAudioItems = response.data.filter((preacher) => preacher.roles.includes("can_be_audio")).map((preacher) => {
                let alreadyAssigned = currentMonthMeetings?.filter((meeting) => meeting.audioVideo?.audioOperator?.name === preacher.name).length

                return { label: audioVideoTranslate.t("audioOperatorCounter", {name: preacher.name, currentMonth, alreadyAssigned}), value: preacher._id } as never
            })
            const selectMicItems = response.data.filter((preacher) => preacher.roles.includes("can_take_mic")).map((preacher) => {
                let alreadyAssigned = currentMonthMeetings?.filter((meeting) => meeting.audioVideo?.microphone1Operator?.name === preacher.name || meeting.audioVideo?.microphone2Operator?.name === preacher.name).length

                return { label: audioVideoTranslate.t("micsCounter", {name: preacher.name, currentMonth, alreadyAssigned}), value: preacher._id } as never
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
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.meeting}>{meetingAssignmentsTranslate.t("seeOtherAssignmentsLabel")}</Text>
            <Meeting meeting={route.params.meeting} filter={mainTranslate.t("all")} />

            <Text style={[styles.meeting, { marginTop: 15 }]}>{attendantTranslate.t("sectionText")}</Text>
            <Attendant meeting={route.params.meeting} attendant={route.params.meeting.ordinal} />

            <Label text={audioVideoTranslate.t("videoOperatorLabel")} />
            <DropDownPicker 
                value={videoOperatorValue}
                setValue={setVideoOperatorValue}
                open={videoOperatorOpen}
                setOpen={setVideoOperatorOpen}
                items={videoOperatorItems}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                listMode="MODAL"
                modalTitle={audioVideoTranslate.t("videoOperatorLabel")}
                placeholder={audioVideoTranslate.t("videoOperatorPlaceholder")}
            />
            <Label text={audioVideoTranslate.t("isAudioOperatorSwitchText")} />
            <Switch  
                value={isAudioOperator}
                onValueChange={(value) => setIsAudioOperator(value)}
                style={styles.switch}
                color={'#1F8AAD'}
            />

            { isAudioOperator && <>
                <Label text={audioVideoTranslate.t("audioOperatorLabel")} />
                <DropDownPicker 
                    value={audioOperatorValue}
                    setValue={setAudioOperatorValue}
                    open={audioOperatorOpen}
                    setOpen={setAudioOperatorOpen}
                    items={audioOperatorItems}
                    labelStyle={defaultStyles.dropdown}
                    placeholderStyle={defaultStyles.dropdown}
                    listMode="MODAL"
                    modalTitle={audioVideoTranslate.t("audioOperatorLabel")}
                    placeholder={audioVideoTranslate.t("audioOperatorPlaceholder")}
                />
            </>}
            <Label text={audioVideoTranslate.t("mic1Label")} />
            <DropDownPicker 
                value={microphone1Value}
                setValue={setMicrophone1Value}
                open={microphone1Open}
                setOpen={setMicrophone1Open}
                items={microphone1Items}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                listMode="MODAL"
                modalTitle={audioVideoTranslate.t("mic1Label")}
                placeholder={audioVideoTranslate.t("mic1Placeholder")}
            />

            <Label text={audioVideoTranslate.t("isMic2SwitchText")} />
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
                    modalTitle={audioVideoTranslate.t("mic2Label")}
                    placeholder={audioVideoTranslate.t("mic2Placeholder")}
                />

            </>}
            <ButtonC 
                title={audioVideoTranslate.t("addHeaderText")}
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
    switch: {
        alignSelf: 'flex-start',  
        transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
        marginVertical: 8
    },
})

export default AudioVideoNewScreen;