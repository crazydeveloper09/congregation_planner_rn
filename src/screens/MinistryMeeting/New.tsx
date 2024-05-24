import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import { Context as MinistryMeetingContext } from "../../contexts/MinistryMeetingContext";
import { Input } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import ButtonC from "../../commonComponents/Button";
import Loading from "../../commonComponents/Loading";
import territories from "../../api/territories";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IPreacher } from "../../contexts/interfaces";
import { Switch } from "@rneui/base";

const MinistryMeetingNewScreen: React.FC = () => {
    const [date, setDate] = useState<Date>(new Date())
    const [dateOpen, setDateOpen] = useState<boolean>(false)
    const [time, setTime] = useState<Date>(new Date())
    const [timeOpen, setTimeOpen] = useState<boolean>(false);
    const [place, setPlace] = useState<string>('')
    const [leadValue, setLeadValue] = useState("");
    const [leadOpen, setLeadOpen] = useState(false);
    const [leadItems, setLeadItems] = useState([]);
    const [isTopic, setIsTopic] = useState<boolean>(false);
    const [topic, setTopic] = useState<string>('')
    const { state, addMinistryMeeting } = useContext(MinistryMeetingContext)
    const preachersContext = useContext(PreachersContext)

    const loadPreachers = async () => {
        const token = await AsyncStorage.getItem('token')
        territories.get<IPreacher[]>('/preachers/all', {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        .then((response) => {
            const selectItems = response.data.filter((preacher) => preacher.roles.includes("can_lead_minimeetings")).map((preacher) => {
                return { label: preacher.name, value: preacher._id } as never
            })
            setLeadItems(selectItems)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        loadPreachers()
    }, [])

    if(preachersContext.state.isLoading){
        return <Loading />
    }
    return (
        <View style={styles.container}>
            <Text style={styles.labelStyle}>Data</Text>
            <TouchableOpacity onPress={() => setDateOpen(true)} style={{...styles.inputContainer, padding: 15}}>
                <Text>
                    {date.toLocaleDateString()} 
                </Text>
            </TouchableOpacity>
            <DateTimePicker date={date} onConfirm={(date) => {
                setDate(date)
                setDateOpen(false)
            }} onCancel={() => setDateOpen(false)} isVisible={dateOpen} />
            <Text style={styles.labelStyle}>Czas</Text>
            <TouchableOpacity onPress={() => setTimeOpen(true)} style={{...styles.inputContainer, padding: 15}}>
                <Text>
                    {time.getHours().toLocaleString('pl-Pl')}:{time.getMinutes()} 
                </Text>
            </TouchableOpacity>
            <DateTimePicker mode="time" date={time} onConfirm={(date) => {
                setTime(date)
                setTimeOpen(false)
            }} onCancel={() => setTimeOpen(false)} isVisible={timeOpen} />
            <Input 
                value={place}
                onChangeText={setPlace}
                label={<Text style={styles.labelStyle}>Miejsce</Text>}
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.containerInput}
                placeholder="Wpisz miejsce zbiórki"
            />
            <Text style={styles.labelStyle}>Prowadzący</Text>
            <DropDownPicker 
                value={leadValue}
                setValue={setLeadValue}
                open={leadOpen}
                setOpen={setLeadOpen}
                items={leadItems}
                listMode="MODAL"
                modalTitle="Prowadzący zbiórkę"
                placeholder="Wybierz prowadzącego"
            />
            <Text style={styles.labelStyle}>Czy jest ustalony temat zbiórki</Text>
            <Switch  
                value={isTopic}
                onValueChange={(value) => setIsTopic(value)}
                style={{ alignSelf: 'flex-start',  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], marginVertical: 15 }}
                color={'#1F8AAD'}
            />
            {isTopic && <>
                <Input 
                    value={topic}
                    onChangeText={setTopic}
                    label={<Text style={styles.labelStyle}>Temat</Text>}
                    inputContainerStyle={styles.inputContainer}
                    containerStyle={styles.containerInput}
                    placeholder="Wpisz temat zbiórki"
                />

            </>}
            <ButtonC 
                title="Dodaj zbiórkę"
                isLoading={state.isLoading}
                onPress={() => addMinistryMeeting(place, leadValue, date, time, topic)}
            />
        </View>
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

export default MinistryMeetingNewScreen;