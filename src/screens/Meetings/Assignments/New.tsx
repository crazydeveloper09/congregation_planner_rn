import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import territories from "../../../api/territories";
import { IMeeting, IPreacher } from "../../../contexts/interfaces";
import DropDownPicker from "react-native-dropdown-picker";
import { Context as MeetingContext } from "../../../contexts/MeetingContext";
import ButtonC from "../../../commonComponents/Button";
import { Switch } from "@rneui/base";
import Meeting from "../components/Meeting";
import AudioVideo from "../../AudioVideo/components/AudioVideo";
import Attendant from "../../AudioVideo/components/Attendant";
import MyInput from "../../../commonComponents/MyInput";
import Label from "../../../commonComponents/Label";
import { months } from "../../../../defaultData";
import { defaultStyles } from "../../defaultStyles";
import useLocaLization from "../../../hooks/useLocalization";
import { meetingAssignmentTranslations } from "./translations";
import { mainTranslations } from "../../../../localization";
import { attendantTranslations } from "../../AudioVideo/Attendants/translations";
import { meetingsTranslations } from "../translations";

interface MeetingAssignmentNewScreenProps {
    route: {
        params: {
            meeting: IMeeting
        }
    }
}

const MeetingAssignmentNewScreen: React.FC<MeetingAssignmentNewScreenProps> = ({ route }) => {
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
        {label: meetingAssignmentsTranslate.t('bibleTalk'), value: meetingAssignmentsTranslate.t('bibleTalk')},
        {label: meetingAssignmentsTranslate.t('watchtowerStudy'), value: meetingAssignmentsTranslate.t('watchtowerStudy')}
    ] : [
        {label: meetingAssignmentsTranslate.t('treasuresFromGodsWord'), value: meetingAssignmentsTranslate.t('treasuresFromGodsWord')},
        {label: meetingAssignmentsTranslate.t('applyYourselfToMinistry'), value: meetingAssignmentsTranslate.t('applyYourselfToMinistry')},
        {label: meetingAssignmentsTranslate.t('livingAsChristians'), value: meetingAssignmentsTranslate.t('livingAsChristians')},
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
    const [isReader, setIsReader] = useState(false)
    const [readerValue, setReaderValue] = useState<string>('')
    const [readerOpen, setReaderOpen] = useState<boolean>(false);
    const [readerItems, setReaderItems] = useState([]);
    const [topic, setTopic] = useState<string>('')
    const [isOtherParticipant, setIsOtherParticipant] = useState<boolean>(false);
    const [otherParticipant, setOtherParticipant] = useState<string>('')
    const { state, addAssignment } = useContext(MeetingContext);


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
            const currentMonthMeetings = state.meetings?.filter((meeting) => meeting.month === currentMonth);
            const selectParticipantItems = response.data.filter((preacher) => preacher.roles.includes("can_have_assignment")).map((preacher) => {
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
                return { label: meetingAssignmentsTranslate.t('readerCounter', {name: preacher.name, currentMonth, alreadyRead}), value: preacher._id } as never
            })
            setParticipantItems([...participantItems, ...selectParticipantItems])
            setReaderItems(readerItems)
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
            <Text style={styles.meeting}>Audio-video</Text>
            <AudioVideo meeting={route.params.meeting} audioVideo={route.params.meeting.audioVideo} />
            <Text style={styles.meeting}>{attendantTranslate.t("sectionText")}</Text>
            <Attendant meeting={route.params.meeting} attendant={route.params.meeting.ordinal} />

            <Label text={meetingAssignmentsTranslate.t("typeLabel")} />
            <DropDownPicker 
                value={typeValue}
                setValue={setTypeValue}
                open={typeOpen}
                setOpen={setTypeOpen}
                items={typeItems}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                listMode="MODAL"
                modalTitle={meetingAssignmentsTranslate.t("typeLabel")}
                placeholder={meetingAssignmentsTranslate.t("typePlaceholder")}
            />

            {route.params.meeting.type === meetingTranslate.t("midWeek") && <>
                <Label text={meetingAssignmentsTranslate.t("defaultTopicLabel")} />
                <DropDownPicker 
                    value={defaultTopicValue}
                    setValue={setDefaultTopicValue}
                    open={defaultTopicOpen}
                    setOpen={setDefaultTopicOpen}
                    items={defaultTopicItems}
                    labelStyle={defaultStyles.dropdown}
                    placeholderStyle={defaultStyles.dropdown}
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
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                listMode="MODAL"
                modalTitle={meetingAssignmentsTranslate.t("participantLabel")}
                placeholder={meetingAssignmentsTranslate.t("participantPlaceholder")}
            />
            <Label text={meetingAssignmentsTranslate.t("isReaderSwitchLabel")} />
            <Switch  
                value={isReader}
                onValueChange={(value) => {
                    setIsReader(value)
                    value === false && setReaderValue('')
                }}
                style={{ alignSelf: 'flex-start',  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], marginVertical: 10 }}
                color={'#1F8AAD'}
            />

            { isReader && <>
                <Label text={meetingAssignmentsTranslate.t("readerLabel")} />
                <DropDownPicker 
                    value={readerValue}
                    setValue={setReaderValue}
                    open={readerOpen}
                    setOpen={setReaderOpen}
                    items={readerItems}
                    labelStyle={defaultStyles.dropdown}
                    placeholderStyle={defaultStyles.dropdown}
                    listMode="MODAL"
                    modalTitle={meetingAssignmentsTranslate.t("readerLabel")}
                    placeholder={meetingAssignmentsTranslate.t("readerPlaceholder")}
                />
            </>}
            <Label text={meetingAssignmentsTranslate.t("isOtherParticipantSwitchLabel")} />
            <Switch  
                value={isOtherParticipant}
                onValueChange={(value) => {
                    setIsOtherParticipant(value)
                    value === true && setOtherParticipant('')
                }}
                style={{ alignSelf: 'flex-start',  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], marginVertical: 10 }}
                color={'#1F8AAD'}
            />
            {isOtherParticipant && <>
                <MyInput 
                    value={otherParticipant}
                    onChangeText={setOtherParticipant}
                    label={meetingAssignmentsTranslate.t("otherParticipantLabel")}
                    placeholder={meetingAssignmentsTranslate.t("otherParticipantPlaceholder")}
                />

            </>}
            <View style={{ marginBottom: 40 }}>
                <ButtonC 
                    title={meetingAssignmentsTranslate.t("addText")}
                    isLoading={state.isLoading}
                    onPress={() => addAssignment(route.params.meeting._id, topic, typeValue, participantValue, readerValue, otherParticipant, defaultTopicValue)}
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
        color: '#1F8AAD',
        fontFamily: 'PoppinsSemiBold'
    },
})

export default MeetingAssignmentNewScreen;