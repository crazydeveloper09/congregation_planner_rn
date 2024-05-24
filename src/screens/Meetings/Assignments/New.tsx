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
            const selectItems = response.data.filter((preacher) => preacher.roles.includes("can_have_assignment")).map((preacher) => {
                return { label: preacher.name, value: preacher._id } as never
            })
            setParticipantItems(selectItems)
            setReaderItems(selectItems)
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
            <Input 
                    value={topic}
                    onChangeText={setTopic}
                    label={<Text style={styles.labelStyle}>Temat</Text>}
                    inputContainerStyle={styles.inputContainer}
                    containerStyle={styles.containerInput}
                    placeholder="Wpisz temat"
                />
                <Text style={styles.labelStyle}>Typ</Text>
            <DropDownPicker 
                value={typeValue}
                setValue={setTypeValue}
                open={typeOpen}
                setOpen={setTypeOpen}
                items={typeItems}
                listMode="MODAL"
                modalTitle="Typ zadania"
                placeholder="Wybierz typ zadania"
            />

                <Text style={styles.labelStyle}>Uczestnik</Text>
            <DropDownPicker 
                value={participantValue}
                setValue={setParticipantValue}
                open={participantOpen}
                setOpen={setParticipantOpen}
                items={participantItems}
                listMode="MODAL"
                modalTitle="Uczestnik"
                placeholder="Wybierz uczestnika"
            />

            <Text style={styles.labelStyle}>Czy jest potrzebny lektor?</Text>
            <Switch  
                value={isReader}
                onValueChange={(value) => setIsReader(value)}
                style={{ alignSelf: 'flex-start',  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],marginVertical: 10 }}
                color={'#1F8AAD'}
            />

            { isReader && <>
                <Text style={styles.labelStyle}>Lektor</Text>
                <DropDownPicker 
                    value={readerValue}
                    setValue={setReaderValue}
                    open={readerOpen}
                    setOpen={setReaderOpen}
                    items={readerItems}
                    listMode="MODAL"
                    modalTitle="Lektor"
                    placeholder="Wybierz lektora"
                />
            </>}

            <Text style={styles.labelStyle}>Czy zadanie przedstawi głosiciel z innego zboru?</Text>
            <Switch  
                value={isOtherParticipant}
                onValueChange={(value) => setIsOtherParticipant(value)}
                style={{ alignSelf: 'flex-start',  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], marginVertical: 10 }}
                color={'#1F8AAD'}
            />
            {isOtherParticipant && <>
                <Input 
                    value={otherParticipant}
                    onChangeText={setOtherParticipant}
                    label={<Text style={styles.labelStyle}>Uczestnik - głosiciel z innego zboru</Text>}
                    inputContainerStyle={styles.inputContainer}
                    containerStyle={styles.containerInput}
                    placeholder="Wpisz imię i nazwisko"
                />

            </>}
            <ButtonC 
                title="Dodaj zadanie"
                isLoading={state.isLoading}
                onPress={() => addAssignment(route.params.meeting._id, topic, typeValue, participantValue, readerValue, otherParticipant)}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    inputContainer: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 6,
        padding: 5,
        borderColor: 'black',
    },
    meeting: {
        fontSize: 21,
        color: '#1F8AAD',
        fontFamily: 'PoppinsSemiBold'
    },
    labelStyle: {
        fontFamily: 'MontserratSemiBold',
        marginVertical: 8,
        color: 'black',
    },
    containerInput: {
        paddingHorizontal: 0,
        paddingVertical: 0,
    }
})

export default MeetingAssignmentNewScreen;