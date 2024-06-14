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
import { IPreacher } from "../../contexts/interfaces";
import { Switch } from "@rneui/base";
import MyInput from "../../commonComponents/MyInput";
import ChooseDate from "../../commonComponents/ChooseDate";
import Label from "../../commonComponents/Label";
import { months } from "../../../defaultData";
import { defaultStyles } from "../defaultStyles";

const MinistryMeetingNewScreen: React.FC = () => {
    const [date, setDate] = useState<Date>(new Date())
    const [dateOpen, setDateOpen] = useState<boolean>(false)
    const [time, setTime] = useState<Date>(new Date())
    const [timeOpen, setTimeOpen] = useState<boolean>(false);
    const [place, setPlace] = useState<string>('')
    const [defaultPlaceValue, setDefaultPlaceValue] = useState<string>('')
    const [defaultPlaceOpen, setDefaultPlaceOpen] = useState<boolean>(false);
    const [defaultPlaceItems, setDefaultPlaceItems] = useState([
        { label: 'Wpisz sam miejsce', value: ''},
        { label: 'Sala Królestwa', value: 'Sala Królestwa' },
        { label: 'Zoom', value: 'Zoom' },
    ]);
    const [leadValue, setLeadValue] = useState("");
    const [leadOpen, setLeadOpen] = useState(false);
    const [leadItems, setLeadItems] = useState([]);
    const [isTopic, setIsTopic] = useState<boolean>(false);
    const [topic, setTopic] = useState<string>('')
    const { state, addMinistryMeeting } = useContext(MinistryMeetingContext)
    const preachersContext = useContext(PreachersContext)

    const loadPreachers = async (date: Date) => {
        const token = await AsyncStorage.getItem('token')
        territories.get<IPreacher[]>('/preachers/all', {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        .then((response) => {
            const meetingDate = new Date(date)
            const currentMonth = `${months[meetingDate.getMonth()]} ${meetingDate.getFullYear()}`;
            const currentMonthMeetings = state.ministryMeetings?.filter((meeting) => meeting.month === currentMonth);
            const selectItems = response.data.filter((preacher) => preacher.roles.includes("can_lead_minimeetings")).map((preacher) => {
                let alreadyAssigned = currentMonthMeetings?.filter((meeting) => meeting.lead?.name === preacher.name).length

                return { label: `${preacher.name} - ${currentMonth} - prowadzi już ${alreadyAssigned} zbiórek`, value: preacher._id } as never
            })
            setLeadItems(selectItems)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        loadPreachers(date)
    }, [date])

    if(preachersContext.state.isLoading){
        return <Loading />
    }
    return (
        <View style={styles.container}>
            <ChooseDate 
                label="Data"
                date={date}
                dateOpen={dateOpen}
                setDate={setDate}
                setDateOpen={setDateOpen}
                mode="datetime"
            />

            <Label text="Domyślne miejsce" />
                <DropDownPicker 
                    value={defaultPlaceValue}
                    setValue={setDefaultPlaceValue}
                    open={defaultPlaceOpen}
                    setOpen={setDefaultPlaceOpen}
                    items={defaultPlaceItems}
                    labelStyle={defaultStyles.dropdown}
                    placeholderStyle={defaultStyles.dropdown}
                    listMode="MODAL"
                    modalTitle="Domyślne miejsce"
                    placeholder="Wybierz domyślne miejsce zbiórki"
                />
            {defaultPlaceValue === '' && <MyInput 
                value={place}
                onChangeText={setPlace}
                label="Miejsce"
                placeholder="Wpisz miejsce zbiórki"
            />}
            
            <Label text="Prowadzący" />
            <DropDownPicker 
                value={leadValue}
                setValue={setLeadValue}
                open={leadOpen}
                setOpen={setLeadOpen}
                items={leadItems}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                listMode="MODAL"
                modalTitle="Prowadzący zbiórkę"
                placeholder="Wybierz prowadzącego"
            />
            <Label text="Czy jest ustalony temat zbiórki?" />
            <Switch  
                value={isTopic}
                onValueChange={(value) => setIsTopic(value)}
                style={{ alignSelf: 'flex-start',  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], marginVertical: 15 }}
                color={'#1F8AAD'}
            />
            {isTopic && <>
                <MyInput 
                    value={topic}
                    onChangeText={setTopic}
                    label="Temat"
                    placeholder="Wpisz temat zbiórki"
                />
            </>}
            <ButtonC 
                title="Dodaj zbiórkę"
                isLoading={state.isLoading}
                onPress={() => addMinistryMeeting(place, leadValue, date, time, defaultPlaceValue, topic)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
})

export default MinistryMeetingNewScreen;