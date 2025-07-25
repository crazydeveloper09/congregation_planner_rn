import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ButtonC from "../../../commonComponents/Button";
import { Input, Switch } from "@rneui/base";
import DropDownPicker from "react-native-dropdown-picker";
import territories from "../../../api/territories";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context as MeetingContext } from "../../../contexts/MeetingContext";
import { IMeeting, IMeetingAssignment, IPreacher } from "../../../contexts/interfaces";
import Meeting from "../components/Meeting";
import AudioVideo from "../../AudioVideo/components/AudioVideo";
import Attendant from "../../AudioVideo/components/Attendant";
import MyInput from "../../../commonComponents/MyInput";
import Label from "../../../commonComponents/Label";
import { months } from "../../../../defaultData";
import { defaultDropdownStyles, defaultSwitchStyles } from "../../defaultStyles";
import useLocaLization from "../../../hooks/useLocalization";
import { meetingAssignmentTranslations } from "./translations";
import { mainTranslations } from "../../../../localization";
import { attendantTranslations } from "../../AudioVideo/Attendants/translations";
import { meetingsTranslations } from "../translations";
import { Context as SettingsContext } from "../../../contexts/SettingsContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { chooseFontColorAndIcon } from "./helpers/types";

interface MeetingAssignmentEditScreenProps {
    route: {
        params: {
            meeting: IMeeting,
            assignment: IMeetingAssignment
        }
    }
}

const MeetingAssignmentEditScreen: React.FC<MeetingAssignmentEditScreenProps> = ({ route }) => {
    const meetingAssignmentsTranslate = useLocaLization(meetingAssignmentTranslations);
    const mainTranslate = useLocaLization(mainTranslations);
    const attendantTranslate = useLocaLization(attendantTranslations)
    const meetingTranslate = useLocaLization(meetingsTranslations)
    const [participantValue, setParticipantValue] = useState("");
    const [participantOpen, setParticipantOpen] = useState(false);
    const [participantItems, setParticipantItems] = useState([
        { label: meetingAssignmentsTranslate.t('otherCongPreacherChoose'), value: ''}
    ]);
    const [typeValue, setTypeValue] = useState<string>('')
    const [typeOpen, setTypeOpen] = useState<boolean>(false);
    const [typeItems, setTypeItems] = useState(route.params.meeting.type === meetingTranslate.t("weekend") ? [
        {label: meetingAssignmentsTranslate.t('bibleTalk'), value: 'bibleTalk'},
        {label: meetingAssignmentsTranslate.t('watchtowerStudy'), value: 'watchtowerStudy'}
    ] : [
        {label: meetingAssignmentsTranslate.t('treasuresFromGodsWord'), value: 'treasuresFromGodsWord'},
        {label: meetingAssignmentsTranslate.t('applyYourselfToMinistry'), value: 'applyYourselfToMinistry'},
        {label: meetingAssignmentsTranslate.t('livingAsChristians'), value: 'livingAsChristians'},
    ]);
    const [defaultTopicValue, setDefaultTopicValue] = useState<string>('')
    const [defaultTopicOpen, setDefaultTopicOpen] = useState<boolean>(false);
    const [defaultTopicItems, setDefaultTopicItems] = useState([
        { label: meetingAssignmentsTranslate.t('chooseTopicByYourself'), value: ''},
        { label: meetingAssignmentsTranslate.t('spiritualGems'), value: meetingAssignmentsTranslate.t('spiritualGems') },
        { label: meetingAssignmentsTranslate.t('bibleReading'), value: meetingAssignmentsTranslate.t('bibleReading') },
        { label: meetingAssignmentsTranslate.t('startConversation'), value: meetingAssignmentsTranslate.t('startConversation') },
        { label: meetingAssignmentsTranslate.t('followingUp'), value: meetingAssignmentsTranslate.t('followingUp') },
        { label: meetingAssignmentsTranslate.t('makeDisciples'), value: meetingAssignmentsTranslate.t('makeDisciples') },
        { label: meetingAssignmentsTranslate.t('explainBeliefs'), value: meetingAssignmentsTranslate.t('explainBeliefs') },
        { label: meetingAssignmentsTranslate.t('talk'), value: meetingAssignmentsTranslate.t('talk') },
        { label: meetingAssignmentsTranslate.t('congregationNeeds'), value: meetingAssignmentsTranslate.t('congregationNeeds') },
        { label: meetingAssignmentsTranslate.t('orgAchievements'), value: meetingAssignmentsTranslate.t('orgAchievements') },
        { label: meetingAssignmentsTranslate.t('congregationStudy'), value: meetingAssignmentsTranslate.t('congregationStudy') },
    ]);
    const [isHelper, setIsHelper] = useState(false)
    const [helperValue, setHelperValue] = useState("");
    const [helperOpen, setHelperOpen] = useState(false);
    const [helperItems, setHelperItems] = useState([]);
    const [readerValue, setReaderValue] = useState<string>('')
    const [readerOpen, setReaderOpen] = useState<boolean>(false);
    const [readerItems, setReaderItems] = useState([]);
    const [topic, setTopic] = useState<string>('')
    const [isOtherParticipant, setIsOtherParticipant] = useState<boolean>(false);
    const [otherParticipant, setOtherParticipant] = useState<string>('')
    const { state, editAssignment } = useContext(MeetingContext);
    const settingsContext = useContext(SettingsContext);
    const dropdownStyles = defaultDropdownStyles(settingsContext.state.fontIncrement)

    const loadPreachers = async (type: string) => {
        const { role } = chooseFontColorAndIcon(type);
        const token = await AsyncStorage.getItem('token')
        territories.get<IPreacher[]>('/preachers/all', {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        .then((response) => {
            
            const meetingDate = new Date(route.params.meeting.date)
            const currentMonth = `${months[meetingDate.getMonth()]} ${meetingDate.getFullYear()}`;
            const currentMonthMeetings = state.allMeetings?.filter((meeting) => meeting.month === currentMonth);
            const selectParticipantItems = response.data.filter((preacher) => preacher.roles.includes("can_have_assignment") && preacher.roles.includes(role)).map((preacher) => {
                let alreadyAssigned = 0;
                currentMonthMeetings?.forEach((meeting) => {
                    alreadyAssigned += meeting.assignments?.filter((assignment) => assignment.participant?.name === preacher.name).length
                })
                return { label: meetingAssignmentsTranslate.t('assignmentsCounter', {name: preacher.name, currentMonth, alreadyAssigned}), value: preacher._id } as never
            })
            const readerItems = response.data.filter((preacher) => preacher.roles.includes("can_be_reader")).map((preacher) => {

                let alreadyRead = 0;
                currentMonthMeetings?.forEach((meeting) => {
                    alreadyRead += meeting.assignments?.filter((assignment) => assignment.reader?.name === preacher.name).length
                })
                return { label: meetingAssignmentsTranslate.t('readingCounter', {name: preacher.name, currentMonth, alreadyRead}), value: preacher._id } as never
            })
            const helperItems = response.data.filter((preacher) => preacher.roles.includes("can_do_exercise")).map((preacher) => {

                return { label: preacher.name, value: preacher._id } as never
            })
            setParticipantItems([ { label: meetingAssignmentsTranslate.t('otherCongPreacherChoose'), value: ''}, ...selectParticipantItems])
            setReaderItems(readerItems)
            setHelperItems(helperItems)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        loadPreachers(typeValue)
        setParticipantValue(route.params.assignment.participant?._id)
        setTypeValue(route.params.assignment.type)
        setDefaultTopicValue(route.params.assignment?.defaultTopic || '')
        setTopic(route.params.assignment.topic)
        if(route.params.assignment.reader){
            setReaderValue(route.params.assignment.reader._id)
        }
        if(route.params.assignment.helper){
            setIsHelper(true);
            setHelperValue(route.params.assignment.helper._id)
        }
        if(route.params.assignment.otherParticipant){
            setIsOtherParticipant(true);
            setOtherParticipant(route.params.assignment.otherParticipant)
        }
    }, [route.params.assignment, typeValue])

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <Text style={[styles.meeting, { color: settingsContext.state.mainColor, fontSize: 21 + settingsContext.state.fontIncrement }]}>{meetingAssignmentsTranslate.t("seeOtherAssignmentsLabel")}</Text>
            <Meeting meeting={route.params.meeting} filter={mainTranslate.t("all")}  shouldAutomaticallyExpand={false} />
            <Text style={[styles.meeting, { color: settingsContext.state.mainColor, fontSize: 21 + settingsContext.state.fontIncrement, marginTop: 15 }]}>Audio-video</Text>
            <AudioVideo meeting={route.params.meeting} audioVideo={route.params.meeting.audioVideo}  shouldAutomaticallyExpand={false} />
            <Text style={[styles.meeting, { color: settingsContext.state.mainColor, fontSize: 21 + settingsContext.state.fontIncrement, marginTop: 15 }]}>{attendantTranslate.t("sectionText")}</Text>
            <Attendant meeting={route.params.meeting} attendant={route.params.meeting.ordinal} shouldAutomaticallyExpand={false} />

            <Label text={meetingAssignmentsTranslate.t("typeLabel")} />
            <DropDownPicker 
                value={typeValue}
                setValue={setTypeValue}
                open={typeOpen}
                setOpen={setTypeOpen}
                items={typeItems}
                modalTitleStyle={dropdownStyles.text}
                labelStyle={[dropdownStyles.container, dropdownStyles.text]}
                placeholderStyle={[dropdownStyles.container, dropdownStyles.text]}
                listMode="MODAL"
                modalTitle={meetingAssignmentsTranslate.t("typeLabel")}
                placeholder={meetingAssignmentsTranslate.t("typePlaceholder")}
            />

            {(route.params.meeting.type === meetingTranslate.t("midWeek") && defaultTopicValue) && <>
                <Label text={meetingAssignmentsTranslate.t("defaultTopicLabel")} />
                <DropDownPicker 
                    value={defaultTopicValue}
                    setValue={setDefaultTopicValue}
                    open={defaultTopicOpen}
                    setOpen={setDefaultTopicOpen}
                    items={defaultTopicItems}
                    modalTitleStyle={dropdownStyles.text}
                    labelStyle={[dropdownStyles.container, dropdownStyles.text]}
                    placeholderStyle={[dropdownStyles.container, dropdownStyles.text]}
                    listMode="MODAL"
                    modalTitle={meetingAssignmentsTranslate.t("defaultTopicLabel")}
                    placeholder={meetingAssignmentsTranslate.t("defaultTopicPlaceholder")}
                />
            </>}

                {defaultTopicValue === '' && <MyInput 
                    value={topic}
                    onChangeText={setTopic}
                    label={meetingAssignmentsTranslate.t("topicLabel")}
                    placeholder={meetingAssignmentsTranslate.t("topicPlaceholder")}
                />}
            
                <Label text={meetingAssignmentsTranslate.t("participantLabel")} />
            <DropDownPicker 
                value={participantValue}
                setValue={setParticipantValue}
                open={participantOpen}
                setOpen={setParticipantOpen}
                items={participantItems}
                modalTitleStyle={dropdownStyles.text}
                labelStyle={[dropdownStyles.container, dropdownStyles.text]}
                placeholderStyle={[dropdownStyles.container, dropdownStyles.text]}
                listMode="MODAL"
                searchable
                modalTitle={meetingAssignmentsTranslate.t("participantLabel")}
                placeholder={meetingAssignmentsTranslate.t("participantPlaceholder")}
            />

            { (typeValue === "watchtower" || typeValue === meetingAssignmentsTranslate.t("congregationStudy")) && <>
                <Label text={meetingAssignmentsTranslate.t("readerLabel")} />
                <DropDownPicker 
                    value={readerValue}
                    setValue={setReaderValue}
                    open={readerOpen}
                    setOpen={setReaderOpen}
                    items={readerItems}
                    modalTitleStyle={dropdownStyles.text}
                    labelStyle={[dropdownStyles.container, dropdownStyles.text]}
                    placeholderStyle={[dropdownStyles.container, dropdownStyles.text]}
                    listMode="MODAL"
                    modalTitle={meetingAssignmentsTranslate.t("readerLabel")}
                    placeholder={meetingAssignmentsTranslate.t("readerPlaceholder")}
                />
            </>}
            {typeValue === "applyYourselfToMinistry" && <>
                <Label text={meetingAssignmentsTranslate.t("isHelperSwitchLabel")} />
                <Switch  
                    value={isHelper}
                    onValueChange={(value) => {
                        setIsHelper(value)
                    }}
                    style={defaultSwitchStyles(settingsContext.state.fontIncrement, isHelper, 'left').container}
                    color={settingsContext.state.mainColor}
                />
                {isHelper && <>
                    <Label text={meetingAssignmentsTranslate.t("helperLabel")} />
                    <DropDownPicker 
                        value={helperValue}
                        setValue={setHelperValue}
                        open={helperOpen}
                        setOpen={setHelperOpen}
                        items={helperItems}
                        modalTitleStyle={dropdownStyles.text}
                        labelStyle={[dropdownStyles.container, dropdownStyles.text]}
                        placeholderStyle={[dropdownStyles.container, dropdownStyles.text]}
                        listMode="MODAL"
                        modalTitle={meetingAssignmentsTranslate.t("helperLabel")}
                        placeholder={meetingAssignmentsTranslate.t("helperPlaceholder")}
                    />

                </>}
            </>}
            {typeValue === "bibleTalk" &&<>
                <Label text={meetingAssignmentsTranslate.t("isOtherParticipantSwitchLabel")} />
                <Switch  
                    value={isOtherParticipant}
                    onValueChange={(value) => {
                        setIsOtherParticipant(value)
                        value === true && setOtherParticipant('')
                    }}
                    style={defaultSwitchStyles(settingsContext.state.fontIncrement, isOtherParticipant, 'left').container}
                    color={settingsContext.state.mainColor}
                />
                {isOtherParticipant && <>
                    <MyInput 
                        value={otherParticipant}
                        onChangeText={setOtherParticipant}
                        label={meetingAssignmentsTranslate.t("otherParticipantLabel")}
                        placeholder={meetingAssignmentsTranslate.t("otherParticipantPlaceholder")}
                    />

                </>}
            </>}
            <View style={{ marginBottom: 40, marginTop: 20 }}>
                <ButtonC 
                    title={meetingAssignmentsTranslate.t("editText")}
                    isLoading={state.isLoading}
                    onPress={() => editAssignment(route.params.meeting?._id, route.params.assignment?._id, topic, typeValue, participantValue, readerValue, otherParticipant, defaultTopicValue, helperValue)}
                />
            </View>
            
        </KeyboardAwareScrollView>
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

export default MeetingAssignmentEditScreen;