import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import territories from "../../../api/territories";
import { IMeeting, IPreacher } from "../../../contexts/interfaces";
import DropDownPicker from "react-native-dropdown-picker";
import { Context as MeetingContext } from "../../../contexts/MeetingContext";
import ButtonC from "../../../commonComponents/Button";
import { Input } from "react-native-elements";
import { Switch } from "@rneui/base";
import Meeting from "../components/Meeting";
import AudioVideo from "../../AudioVideo/components/AudioVideo";
import Ordinal from "../../AudioVideo/components/Ordinal";
import MyInput from "../../../commonComponents/MyInput";
import Label from "../../../commonComponents/Label";
import { months } from "../../../../defaultData";
import { defaultStyles } from "../../defaultStyles";

interface MeetingAssignmentNewScreenProps {
    route: {
        params: {
            meeting: IMeeting
        }
    }
}

const MeetingAssignmentNewScreen: React.FC<MeetingAssignmentNewScreenProps> = ({ route }) => {
    const [participantValue, setParticipantValue] = useState("");
    const [participantOpen, setParticipantOpen] = useState(false);
    const [participantItems, setParticipantItems] = useState([]);
    const [typeValue, setTypeValue] = useState<string>('')
    const [typeOpen, setTypeOpen] = useState<boolean>(false);
    const [typeItems, setTypeItems] = useState(route.params.meeting.type === "Zebranie w weekend" ? [
        {label: 'Wykład biblijny', value: 'Wykład biblijny'},
        {label: 'Studium Strażnicy', value: 'Studium Strażnicy'}
    ] : [
        {label: 'Skarby ze Słowa Bożego', value: 'Skarby ze Słowa Bożego'},
        {label: 'Ulepszajmy swoją służbę', value: 'Ulepszajmy swoją służbę'},
        {label: 'Chrześcijański tryb życia', value: 'Chrześcijański tryb życia'},
    ]);
    const [defaultTopicValue, setDefaultTopicValue] = useState<string>('')
    const [defaultTopicOpen, setDefaultTopicOpen] = useState<boolean>(false);
    const [defaultTopicItems, setDefaultTopicItems] = useState([
        { label: 'Wyszukujemy duchowe skarby', value: 'Wyszukujemy duchowe skarby' },
        { label: 'Czytanie Biblii', value: 'Czytanie Biblii' },
        { label: 'Rozpoczynanie rozmowy', value: 'Rozpoczynanie rozmowy' },
        { label: 'Podtrzymywanie zainteresowania', value: 'Podtrzymywanie zainteresowania' },
        { label: 'Pozyskiwanie uczniów', value: 'Pozyskiwanie uczniów' },
        { label: 'Wyjaśnianie swoich wierzeń', value: 'Wyjaśnianie swoich wierzeń' },
        { label: 'Przemówienie', value: 'Przemówienie' },
        { label: 'Potrzeby zboru', value: 'Potrzeby zboru' },
        { label: 'Osiągnięcia organizacji', value: 'Osiągnięcia organizacji' },
        { label: 'Zborowe studium Biblii', value: 'Zborowe studium Biblii' },
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
            const participantItems = response.data.filter((preacher) => preacher.roles.includes("can_have_assignment")).map((preacher) => {
                let alreadyAssigned = 0;
                currentMonthMeetings?.forEach((meeting) => {
                    alreadyAssigned += meeting.assignments?.filter((assignment) => assignment.participant?.name === preacher.name).length
                })
                return { label: `${preacher.name} - ${currentMonth} - ${alreadyAssigned} zadań`, value: preacher._id } as never
            })
            const readerItems = response.data.filter((preacher) => preacher.roles.includes("can_be_reader")).map((preacher) => {

                let alreadyRead = 0;
                currentMonthMeetings?.forEach((meeting) => {
                    alreadyRead += meeting.assignments?.filter((assignment) => assignment.reader?.name === preacher.name).length
                })
                return { label: `${preacher.name} - ${currentMonth} - lektorował ${alreadyRead} razy`, value: preacher._id } as never
            })
            setParticipantItems(participantItems)
            setReaderItems(readerItems)
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
            <Text style={[styles.meeting, { marginTop: 15 }]}>Audio-video</Text>
            <AudioVideo meeting={route.params.meeting} audioVideo={route.params.meeting.audioVideo} />
            <Text style={[styles.meeting, { marginTop: 15 }]}>Porządkowi</Text>
            <Ordinal meeting={route.params.meeting} ordinal={route.params.meeting.ordinal} />
            
            
            <Label text="Typ" />
            <DropDownPicker 
                value={typeValue}
                setValue={setTypeValue}
                open={typeOpen}
                setOpen={setTypeOpen}
                items={typeItems}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                listMode="MODAL"
                modalTitle="Typ zadania"
                placeholder="Wybierz typ zadania"
            />

            {route.params.meeting.type === "Zebranie w tygodniu" && <>
                <Label text="Domyślny temat" />
                <DropDownPicker 
                    value={defaultTopicValue}
                    setValue={setDefaultTopicValue}
                    open={defaultTopicOpen}
                    setOpen={setDefaultTopicOpen}
                    items={defaultTopicItems}
                    labelStyle={defaultStyles.dropdown}
                    placeholderStyle={defaultStyles.dropdown}
                    listMode="MODAL"
                    modalTitle="Domyślny temat"
                    placeholder="Wybierz domyślny temat zadania"
                />
            </>}
                {defaultTopicValue === '' && <MyInput 
                    value={topic}
                    onChangeText={setTopic}
                    label="Temat"
                    placeholder="Wpisz temat"
                />}
            
                <Label text="Uczestnik" />
            <DropDownPicker 
                value={participantValue}
                setValue={setParticipantValue}
                open={participantOpen}
                setOpen={setParticipantOpen}
                items={participantItems}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                listMode="MODAL"
                modalTitle="Uczestnik"
                placeholder="Wybierz uczestnika"
            />
            <Label text="Czy jest potrzebny lektor?" />
            <Switch  
                value={isReader}
                onValueChange={(value) => setIsReader(value)}
                style={{ alignSelf: 'flex-start',  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],marginVertical: 10 }}
                color={'#1F8AAD'}
            />

            { isReader && <>
                <Label text="Lektor" />
                <DropDownPicker 
                    value={readerValue}
                    setValue={setReaderValue}
                    open={readerOpen}
                    setOpen={setReaderOpen}
                    items={readerItems}
                    labelStyle={defaultStyles.dropdown}
                    placeholderStyle={defaultStyles.dropdown}
                    listMode="MODAL"
                    modalTitle="Lektor"
                    placeholder="Wybierz lektora"
                />
            </>}
            <Label text="Czy zadanie przedstawi głosiciel z innego zboru?" />
            <Switch  
                value={isOtherParticipant}
                onValueChange={(value) => setIsOtherParticipant(value)}
                style={{ alignSelf: 'flex-start',  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], marginVertical: 10 }}
                color={'#1F8AAD'}
            />
            {isOtherParticipant && <>
                <MyInput 
                    value={otherParticipant}
                    onChangeText={setOtherParticipant}
                    label="Uczestnik - głosiciel z innego zboru"
                    placeholder="Wpisz imię i nazwisko"
                />

            </>}
            <View style={{ marginBottom: 40 }}>
                <ButtonC 
                    title="Dodaj zadanie"
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