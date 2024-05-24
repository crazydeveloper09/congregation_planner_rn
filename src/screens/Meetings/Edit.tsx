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

interface MeetingEditScreenProps {
    route: {
        params: {
            meeting: IMeeting
        }
    }
}

const MeetingEditScreen: React.FC<MeetingEditScreenProps> = ({ route }) => {
    const [date, setDate] = useState<Date>(new Date())
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
    const [endPrayerItems, setEndPrayerItems] = useState([]);
    const [isOtherEndPrayer, setIsOtherEndPrayer] = useState<boolean>(false);
    const [otherEndPrayer, setOtherEndPrayer] = useState<string>('')
    const { state, editMeeting } = useContext(MeetingContext)

    const loadPreachers = async () => {
        const token = await AsyncStorage.getItem('token')
        territories.get<IPreacher[]>('/preachers/all', {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        .then((response) => {
            const selectPrayerItems = response.data.filter((preacher) => preacher.roles.includes("can_say_prayer")).map((preacher) => {
                return { label: preacher.name, value: preacher._id } as never
            })
            const selectLeadItems = response.data.filter((preacher) => preacher.roles.includes("can_lead_meetings")).map((preacher) => {
                return { label: preacher.name, value: preacher._id } as never
            })
            setLeadItems(selectLeadItems)
            setBeginPrayerItems(selectPrayerItems)
            setEndPrayerItems(selectPrayerItems)
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
        loadPreachers()
        loadMinistryGroups()
        setDate(new Date(route.params.meeting.date))
        setBeginPrayerValue(route.params.meeting.beginPrayer._id)
        setTypeValue(route.params.meeting.type)
        setBeginSong(route.params.meeting.beginSong.toString())
        setMidSong(route.params.meeting.midSong.toString())
        setEndSong(route.params.meeting.endSong.toString())
        setLeadValue(route.params.meeting.lead._id)
        setEndPrayerValue(route.params.meeting.endPrayer._id)
        setCleaningGroupValue(route.params.meeting.cleaningGroup?._id)
        if(route.params.meeting.otherEndPrayer){
            setIsOtherEndPrayer(true);
            setOtherEndPrayer(route.params.meeting.otherEndPrayer)
        }
    }, [route.params.meeting])


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.labelStyle}>Data</Text>
            <TouchableOpacity onPress={() => setDateOpen(true)} style={{...styles.inputContainer, padding: 15}}>
                <Text>
                    {date.toLocaleString()} 
                </Text>
            </TouchableOpacity>
            <DateTimePicker date={date} onConfirm={(date) => {
                setDate(date)
                setDateOpen(false)
            }} onCancel={() => setDateOpen(false)} isVisible={dateOpen} mode="datetime" />
            <Text style={styles.labelStyle}>Typ</Text>
            <DropDownPicker 
                value={typeValue}
                setValue={setTypeValue}
                open={typeOpen}
                setOpen={setTypeOpen}
                items={typeItems}
                listMode="MODAL"
                modalTitle="Wybierz typ zebrania"
                placeholder="Wybierz typ zebrania"
            />

            <Text style={styles.labelStyle}>Grupa służby, która sprząta</Text>
            <DropDownPicker 
                value={cleaningGroupValue}
                setValue={setCleaningGroupValue}
                open={cleaningGroupOpen}
                setOpen={setCleaningGroupOpen}
                items={cleaningGroupItems}
                listMode="MODAL"
                modalTitle="Wybierz grupę służby, która sprząta"
                placeholder="Wybierz grupę służby, która sprząta"
            />
        
            <Input 
                value={beginSong}
                onChangeText={setBeginSong}
                label={<Text style={styles.labelStyle}>Pieśń początkowa</Text>}
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.containerInput}
                placeholder="Wpisz numer pieśni początkowej"
            />
            <Text style={styles.labelStyle}>Prowadzący</Text>
            <DropDownPicker 
                value={leadValue}
                setValue={setLeadValue}
                open={leadOpen}
                setOpen={setLeadOpen}
                items={leadItems}
                listMode="MODAL"
                modalTitle="Wybierz prowadzącego"
                placeholder="Wybierz prowadzącego"
            />
            <Text style={styles.labelStyle}>Modlitwa początkowa</Text>
            <DropDownPicker 
                value={beginPrayerValue}
                setValue={setBeginPrayerValue}
                open={beginPrayerOpen}
                setOpen={setBeginPrayerOpen}
                items={beginPrayerItems}
                listMode="MODAL"
                modalTitle="Wybierz głosiciela do modlitwy początkowej"
                placeholder="Wybierz głosiciela do modlitwy początkowej"
            />
            <Input 
                value={midSong}
                onChangeText={setMidSong}
                label={<Text style={styles.labelStyle}>Pieśń środkowa</Text>}
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.containerInput}
                placeholder="Wpisz numer pieśni środkowej"
            />
            <Input 
                value={endSong}
                onChangeText={setEndSong}
                label={<Text style={styles.labelStyle}>Pieśń końcowa</Text>}
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.containerInput}
                placeholder="Wpisz numer pieśni końcowej"
            />

            <Text style={styles.labelStyle}>Modlitwa końcowa</Text>
            <DropDownPicker 
                value={endPrayerValue}
                setValue={setEndPrayerValue}
                open={endPrayerOpen}
                setOpen={setEndPrayerOpen}
                items={endPrayerItems}
                listMode="MODAL"
                modalTitle="Wybierz głosiciela do modlitwy końcowej"
                placeholder="Wybierz głosiciela do modlitwy końcowej"
            />

            <Text style={styles.labelStyle}>Czy modlitwę końcową powie głosiciel z innego zboru?</Text>
            <Switch  
                value={isOtherEndPrayer}
                onValueChange={(value) => setIsOtherEndPrayer(value)}
                style={{ alignSelf: 'flex-start',  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                color={'#1F8AAD'}
            />
            {otherEndPrayer && <>
                <Input 
                    value={otherEndPrayer}
                    onChangeText={setOtherEndPrayer}
                    label={<Text style={styles.labelStyle}>Modlitwa końcowa - głosiciel z innego zboru</Text>}
                    inputContainerStyle={styles.inputContainer}
                    containerStyle={styles.containerInput}
                    placeholder="Wpisz imię i nazwisko głosiciela z innego zboru"
                />

            </>}
            <ButtonC 
                title="Edytuj zebranie"
                isLoading={state.isLoading}
                onPress={() => editMeeting(route.params.meeting._id, typeValue, cleaningGroupValue, leadValue, date, beginPrayerValue, beginSong, midSong, endSong, endPrayerValue, otherEndPrayer)}
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

export default MeetingEditScreen;