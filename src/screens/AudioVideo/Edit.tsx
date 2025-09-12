import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { Context as AudioVideoContext } from "../../contexts/AudioVideoContext";
import { Context as MeetingContext } from "../../contexts/MeetingContext";
import { IAudioVideo, IMeeting } from "../../contexts/interfaces";
import ButtonC from "../../commonComponents/Button";
import { Switch } from "@rneui/base";
import DropDownPicker from "react-native-dropdown-picker";
import Meeting from "../Meetings/components/Meeting";
import Label from "../../commonComponents/Label";
import Attendant from "./components/Attendant";
import { defaultDropdownStyles, defaultSwitchStyles } from "../defaultStyles";
import { months } from "../../../defaultData";
import useLocaLization from "../../hooks/useLocalization";
import { audioVideoTranslations } from "./translations";
import { mainTranslations } from "../../../localization";
import { meetingAssignmentTranslations } from "../Meetings/Assignments/translations";
import { attendantTranslations } from "./Attendants/translations";
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import { Context as PreacherContext } from "../../contexts/PreachersContext";
import { useResponsive } from "../../hooks/useResponsive";

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
    const audioVideoTranslate = useLocaLization(audioVideoTranslations);
    const mainTranslate = useLocaLization(mainTranslations);
    const meetingAssignmentsTranslate = useLocaLization(meetingAssignmentTranslations);
    const attendantTranslate = useLocaLization(attendantTranslations)
    const { isDesktop } = useResponsive();
    const { state, editAudioVideo } = useContext(AudioVideoContext);
    const meetingContext = useContext(MeetingContext);
    const settingsContext = useContext(SettingsContext);
    const dropdownStyles = defaultDropdownStyles(settingsContext.state.fontIncrement)
    const preachersContext = useContext(PreacherContext)
    

    const loadPreachers = async () => {
        const allPreachers = preachersContext.state.allPreachers!;
            const meetingDate = new Date(route.params.meeting.date)
            const currentMonth = `${months[meetingDate.getMonth()]} ${meetingDate.getFullYear()}`;
            const currentMonthMeetings = meetingContext.state.allMeetings?.filter((meeting) => meeting.month === currentMonth);
            const selectVideoItems = allPreachers.filter((preacher) => preacher.roles.includes("can_be_video")).map((preacher) => {
                let alreadyAssigned = currentMonthMeetings?.filter((meeting) => meeting.audioVideo?.videoOperator?.name === preacher.name).length

                return { label: audioVideoTranslate.t("videoOperatorCounter", {name: preacher.name, currentMonth, alreadyAssigned}), value: preacher._id } as never
            })
            const selectAudioItems = allPreachers.filter((preacher) => preacher.roles.includes("can_be_audio")).map((preacher) => {
                let alreadyAssigned = currentMonthMeetings?.filter((meeting) => meeting.audioVideo?.audioOperator?.name === preacher.name).length

                return { label: audioVideoTranslate.t("audioOperatorCounter", {name: preacher.name, currentMonth, alreadyAssigned}), value: preacher._id } as never
            })
            const selectMicItems = allPreachers.filter((preacher) => preacher.roles.includes("can_take_mic")).map((preacher) => {
                let alreadyAssigned = currentMonthMeetings?.filter((meeting) => meeting.audioVideo?.microphone1Operator?.name === preacher.name || meeting.audioVideo?.microphone2Operator?.name === preacher.name).length

                return { label: audioVideoTranslate.t("micsCounter", {name: preacher.name, currentMonth, alreadyAssigned}), value: preacher._id } as never
            })
            setVideoOperatorItems(selectVideoItems)
            setMicrophone1Items(selectMicItems)
            setAudioOperatorItems(selectAudioItems)
            setMicrophone2Items(selectMicItems)
    }

    useEffect(() => {
        loadPreachers()
        setVideoOperatorValue(route.params.audioVideo.videoOperator?._id! || "")
        setMicrophone1Value(route.params.audioVideo.microphone1Operator?._id! || "")
        if(route.params.audioVideo.audioOperator){
            setIsAudioOperator(true);
            setAudioOperatorValue(route.params.audioVideo.audioOperator._id)
        }
        if(route.params.audioVideo.microphone2Operator){
            setIsMicrophone2(true);
            setMicrophone2Value(route.params.audioVideo.microphone2Operator._id)
        }
    }, [])

    return (
        <ScrollView style={styles.container} contentContainerStyle={isDesktop && { width: '50%', marginHorizontal: 'auto'}}>
            <Text style={[styles.meeting, { color: settingsContext.state.mainColor }, { fontSize: 21 + settingsContext.state.fontIncrement }]}>{meetingAssignmentsTranslate.t("seeOtherAssignmentsLabel")}</Text>
            <Meeting meeting={route.params.meeting} filter={mainTranslate.t("all")} shouldAutomaticallyExpand={false} />

            <Text style={[styles.meeting, { marginTop: 15, color: settingsContext.state.mainColor }, { fontSize: 21 + settingsContext.state.fontIncrement }]}>{attendantTranslate.t("sectionText")}</Text>
            <Attendant meeting={route.params.meeting} attendant={route.params.meeting.ordinal} shouldAutomaticallyExpand={false} />

            <Label text={audioVideoTranslate.t("videoOperatorLabel")} />
            <DropDownPicker 
                value={videoOperatorValue}
                setValue={setVideoOperatorValue}
                open={videoOperatorOpen}
                setOpen={setVideoOperatorOpen}
                items={videoOperatorItems}
                modalTitleStyle={dropdownStyles.text}
                labelStyle={[dropdownStyles.container, dropdownStyles.text]}
                placeholderStyle={[dropdownStyles.container, dropdownStyles.text]}
                listMode="MODAL"
                modalTitle={audioVideoTranslate.t("videoOperatorLabel")}
                placeholder={audioVideoTranslate.t("videoOperatorPlaceholder")}
            />
            <Label text={audioVideoTranslate.t("isAudioOperatorSwitchText")} />
            <Switch  
                value={isAudioOperator}
                onValueChange={(value) => setIsAudioOperator(value)}
                style={defaultSwitchStyles(settingsContext.state.fontIncrement, isAudioOperator, 'left').container}
                color={settingsContext.state.mainColor}
            />

            { isAudioOperator && <>
                <Label text={audioVideoTranslate.t("audioOperatorLabel")} />
                <DropDownPicker 
                    value={audioOperatorValue}
                    setValue={setAudioOperatorValue}
                    open={audioOperatorOpen}
                    setOpen={setAudioOperatorOpen}
                    items={audioOperatorItems}
                    modalTitleStyle={dropdownStyles.text}
                    labelStyle={[dropdownStyles.container, dropdownStyles.text]}
                    placeholderStyle={[dropdownStyles.container, dropdownStyles.text]}
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
                modalTitleStyle={dropdownStyles.text}
                labelStyle={[dropdownStyles.container, dropdownStyles.text]}
                placeholderStyle={[dropdownStyles.container, dropdownStyles.text]}
                listMode="MODAL"
                modalTitle={audioVideoTranslate.t("mic1Label")}
                placeholder={audioVideoTranslate.t("mic1Placeholder")}
            />

            <Label text={audioVideoTranslate.t("isMic2SwitchText")} />
            <Switch  
                value={isMicrophone2}
                onValueChange={(value) => setIsMicrophone2(value)}
                style={defaultSwitchStyles(settingsContext.state.fontIncrement, isMicrophone2, 'left').container}
                color={settingsContext.state.mainColor}
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
                    modalTitleStyle={dropdownStyles.text}
                    labelStyle={[dropdownStyles.container, dropdownStyles.text]}
                    placeholderStyle={[dropdownStyles.container, dropdownStyles.text]}
                    listMode="MODAL"
                    modalTitle={audioVideoTranslate.t("mic2Label")}
                    placeholder={audioVideoTranslate.t("mic2Placeholder")}
                />

            </>}
            <View style={{ marginBottom: 40 }}>
                <ButtonC 
                    title={audioVideoTranslate.t("editHeaderText")}
                    isLoading={state.isLoading}
                    onPress={() => editAudioVideo(route.params.meeting._id, route.params.audioVideo._id, audioOperatorValue, videoOperatorValue, microphone1Value, microphone2Value)}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    meeting: {
        fontSize: 21,
        fontFamily: 'PoppinsSemiBold'
    },
})

export default AudioVideoEditScreen;