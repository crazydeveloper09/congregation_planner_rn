import { Switch } from "@rneui/base";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Input } from "react-native-elements";
import ButtonC from "../../commonComponents/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context as MeetingContext } from "../../contexts/MeetingContext";
import Loading from "../../commonComponents/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMeeting, IMinistryGroup, IPreacher } from "../../contexts/interfaces";
import territories from "../../api/territories";
import DateTimePicker from "react-native-modal-datetime-picker";
import MyInput from "../../commonComponents/MyInput";
import ChooseDate from "../../commonComponents/ChooseDate";
import Label from "../../commonComponents/Label";
import { defaultStyles } from "../defaultStyles";
import { months } from "../../../defaultData";

interface MeetingEditScreenProps {
    route: {
        params: {
            meeting: IMeeting
        }
    }
}

const MeetingEditScreen: React.FC<MeetingEditScreenProps> = ({ route }) => {
    const [date, setDate] = useState<Date>(new Date(route.params.meeting.date))
    const [dateOpen, setDateOpen] = useState<boolean>(false)
    const [beginPrayerValue, setBeginPrayerValue] = useState<string>('')
    const [beginPrayerOpen, setBeginPrayerOpen] = useState<boolean>(false);
    const [beginPrayerItems, setBeginPrayerItems] = useState([]);
    const [cleaningGroupValue, setCleaningGroupValue] = useState<string>('')
    const [cleaningGroupOpen, setCleaningGroupOpen] = useState<boolean>(false);
    const [cleaningGroupItems, setCleaningGroupItems] = useState([]);
    const [typeValue, setTypeValue] = useState<string>('')
    const [typeOpen, setTypeOpen] = useState<boolean>(false);
    const [typeItems, setTypeItems] = useState([
        {label: 'Zebranie w weekend', value: 'Zebranie w weekend'},
        {label: 'Zebranie w tygodniu', value: 'Zebranie w tygodniu'}
    ]);
    const [beginSong, setBeginSong] = useState<string>('')
    const [midSong, setMidSong] = useState<string>('')
    const [endSong, setEndSong] = useState<string>('')
    const [leadValue, setLeadValue] = useState("");
    const [leadOpen, setLeadOpen] = useState(false);
    const [leadItems, setLeadItems] = useState([]);
    const [endPrayerValue, setEndPrayerValue] = useState<string>('')
    const [endPrayerOpen, setEndPrayerOpen] = useState<boolean>(false);
    const [endPrayerItems, setEndPrayerItems] = useState([
        {label: 'Wybierz głosiciela z innego zboru', value: ''}
    ]);
    const [isOtherEndPrayer, setIsOtherEndPrayer] = useState<boolean>(false);
    const [otherEndPrayer, setOtherEndPrayer] = useState<string>('')
    const { state, editMeeting } = useContext(MeetingContext)

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
            const currentMonthMeetings = state.meetings?.filter((meeting) => meeting.month === currentMonth);
            const selectPrayerItems = response.data.filter((preacher) => preacher.roles.includes("can_say_prayer")).map((preacher) => {
                let alreadyAssigned = currentMonthMeetings?.filter((meeting) => meeting.beginPrayer?.name === preacher.name || meeting.endPrayer?.name === preacher.name).length

                return { label: `${preacher.name} - ${currentMonth} - modli się już ${alreadyAssigned} razy`, value: preacher._id } as never
            })
            const selectLeadItems = response.data.filter((preacher) => preacher.roles.includes("can_lead_meetings")).map((preacher) => {
                let alreadyAssigned = currentMonthMeetings?.filter((meeting) => meeting.lead?.name === preacher.name).length

                return { label: `${preacher.name} - ${currentMonth} - prowadzi już ${alreadyAssigned} zebrań`, value: preacher._id } as never
            })
            setLeadItems(selectLeadItems)
            setBeginPrayerItems(selectPrayerItems)
            setEndPrayerItems([{ label: 'Wybierz głosiciela z innego zboru', value: ''}, ...selectPrayerItems])
        })
        .catch((err) => console.log(err))
    }

    const loadMinistryGroups = async () => {
        const token = await AsyncStorage.getItem('token')
        const congregationID = await AsyncStorage.getItem('congregationID')
        territories.get<IMinistryGroup[]>(`/congregations/${congregationID}/ministryGroups`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        .then((response) => {
            const cleaningItems = response.data?.map((group: IMinistryGroup) => {
                return { label: group.name, value: group._id }
            })
            setCleaningGroupItems(cleaningItems!)
        })
        .catch((err) => console.log(err))
    }


    useEffect(() => {
        loadPreachers(date)
        loadMinistryGroups()
        setBeginPrayerValue(route.params.meeting.beginPrayer?._id || '')
        setTypeValue(route.params.meeting.type)
        setBeginSong(route.params.meeting.beginSong?.toString() || '')
        setMidSong(route.params.meeting.midSong?.toString() || '')
        setEndSong(route.params.meeting.endSong?.toString() || '')
        setLeadValue(route.params.meeting.lead?._id || '')
        setEndPrayerValue(route.params.meeting.endPrayer?._id || '')
        setCleaningGroupValue(route.params.meeting.cleaningGroup?._id || '')
        if(route.params.meeting.otherEndPrayer){
            setIsOtherEndPrayer(true);
            setOtherEndPrayer(route.params.meeting.otherEndPrayer)
        }
    }, [route.params.meeting, date])


    return (
        <ScrollView style={styles.container}>
            <ChooseDate 
                label="Data"
                date={date}
                dateOpen={dateOpen}
                setDate={setDate}
                setDateOpen={setDateOpen}
                mode="datetime"
            />
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
                modalTitle="Wybierz typ zebrania"
                placeholder="Wybierz typ zebrania"
            />
            <Label text="Grupa służby, która sprząta" />
            <DropDownPicker 
                value={cleaningGroupValue}
                setValue={setCleaningGroupValue}
                open={cleaningGroupOpen}
                setOpen={setCleaningGroupOpen}
                items={cleaningGroupItems}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                listMode="MODAL"
                modalTitle="Wybierz grupę służby, która sprząta"
                placeholder="Wybierz grupę służby, która sprząta"
            />
        
            <MyInput 
                value={beginSong}
                onChangeText={setBeginSong}
                label="Pieśń początkowa"
                placeholder="Wpisz numer pieśni początkowej"
            />
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
                modalTitle="Wybierz prowadzącego"
                placeholder="Wybierz prowadzącego"
            />
            <Label text="Modlitwa początkowa" />
            <DropDownPicker 
                value={beginPrayerValue}
                setValue={setBeginPrayerValue}
                open={beginPrayerOpen}
                setOpen={setBeginPrayerOpen}
                items={beginPrayerItems}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                listMode="MODAL"
                modalTitle="Wybierz głosiciela do modlitwy początkowej"
                placeholder="Wybierz głosiciela do modlitwy początkowej"
            />
            <MyInput 
                value={midSong}
                onChangeText={setMidSong}
                label="Pieśń środkowa"
                placeholder="Wpisz numer pieśni środkowej"
            />
            <MyInput 
                value={endSong}
                onChangeText={setEndSong}
                label="Pieśń końcowa"
                placeholder="Wpisz numer pieśni końcowej"
            />
            <Label text="Modlitwa końcowa" />
            <DropDownPicker 
                value={endPrayerValue}
                setValue={setEndPrayerValue}
                open={endPrayerOpen}
                setOpen={setEndPrayerOpen}
                items={endPrayerItems}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                listMode="MODAL"
                modalTitle="Wybierz głosiciela do modlitwy końcowej"
                placeholder="Wybierz głosiciela do modlitwy końcowej"
            />
            <Label text="Czy modlitwę końcową powie głosiciel z innego zboru?" />
            <Switch  
                value={isOtherEndPrayer}
                onValueChange={(value) => setIsOtherEndPrayer(value)}
                style={{ alignSelf: 'flex-start',  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                color={'#1F8AAD'}
            />
            {otherEndPrayer && <>
                <MyInput 
                    value={otherEndPrayer}
                    onChangeText={setOtherEndPrayer}
                    label="Modlitwa końcowa - głosiciel z innego zboru<"
                    placeholder="Wpisz imię i nazwisko głosiciela z innego zboru"
                />

            </>}
            <View style={{ marginBottom: 40 }}>
                <ButtonC 
                    title="Edytuj zebranie"
                    isLoading={state.isLoading}
                    onPress={() => editMeeting(route.params.meeting._id, typeValue, cleaningGroupValue, leadValue, date, beginPrayerValue, beginSong, midSong, endSong, endPrayerValue, otherEndPrayer)}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
})

export default MeetingEditScreen;