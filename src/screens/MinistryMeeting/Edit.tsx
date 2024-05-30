import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import { Context as MinistryMeetingContext } from "../../contexts/MinistryMeetingContext";
import { Input } from "@rneui/base";
import DateTimePicker from "react-native-modal-datetime-picker";
import ButtonC from "../../commonComponents/Button";
import Loading from "../../commonComponents/Loading";
import territories from "../../api/territories";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMinistryMeeting, IPreacher } from "../../contexts/interfaces";
import { Switch } from "@rneui/base";
import { NavigationProp } from "@react-navigation/native";

interface MinistryMeetingEditScreenProps {
    navigation: NavigationProp<any>;
    route: {
        params: {
            meeting: IMinistryMeeting;
        }
    }
}

const MinistryMeetingEditScreen: React.FC<MinistryMeetingEditScreenProps> = ({ navigation, route }) => {
    const { state, editMinistryMeeting } = useContext(MinistryMeetingContext)
    const [date, setDate] = useState<Date>(new Date())
    const [dateOpen, setDateOpen] = useState<boolean>(false)
    const [time, setTime] = useState<Date>(new Date())
    const [timeOpen, setTimeOpen] = useState<boolean>(false);
    const [place, setPlace] = useState<string>('')
    const [defaultPlaceValue, setDefaultPlaceValue] = useState<string>('')
    const [defaultPlaceOpen, setDefaultPlaceOpen] = useState<boolean>(false);
    const [defaultPlaceItems, setDefaultPlaceItems] = useState([
        { label: 'Sala Królestwa', value: 'Sala Królestwa' },
        { label: 'Zoom', value: 'Zoom' },
    ]);
    const [leadValue, setLeadValue] = useState("");
    const [leadOpen, setLeadOpen] = useState(false);
    const [leadItems, setLeadItems] = useState([]);
    const [isTopic, setIsTopic] = useState<boolean>(false);
    const [topic, setTopic] = useState<string>('')
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
        setLeadValue(route.params.meeting?.lead._id!)
        setDate(new Date(route.params.meeting.date))
        setTime(new Date(route.params.meeting.date))
        setPlace(route.params.meeting.place)
        setDefaultPlaceValue(route.params.meeting?.defaultPlace || '')
        if(route.params.meeting.topic) {
            setTopic(route.params.meeting.topic)
            setIsTopic(true)
        }
        
    }, [])

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
            }} onCancel={() => setDateOpen(false)} isVisible={dateOpen} mode="datetime" />
          
            <DateTimePicker mode="time" date={time} onConfirm={(date) => {
                setTime(date)
                setTimeOpen(false)
            }} onCancel={() => setTimeOpen(false)} isVisible={timeOpen} />
            <Text style={styles.labelStyle}>Domyślne miejsce</Text>
                <DropDownPicker 
                    value={defaultPlaceValue}
                    setValue={setDefaultPlaceValue}
                    open={defaultPlaceOpen}
                    setOpen={setDefaultPlaceOpen}
                    items={defaultPlaceItems}
                    listMode="MODAL"
                    modalTitle="Domyślne miejsce"
                    placeholder="Wybierz domyślne miejsce zbiórki"
                />
            {defaultPlaceValue === '' && <Input 
                value={place}
                onChangeText={setPlace}
                label={<Text style={styles.labelStyle}>Miejsce</Text>}
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.containerInput}
                placeholder="Wpisz miejsce zbiórki"
            />}
    
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
                title="Edytuj zbiórkę"
                isLoading={state.isLoading}
                onPress={() => editMinistryMeeting(route.params.meeting._id, place, leadValue, date, time, topic)}
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

export default MinistryMeetingEditScreen;