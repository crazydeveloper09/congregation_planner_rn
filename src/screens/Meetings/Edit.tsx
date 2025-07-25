import { Switch } from "@rneui/base";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ButtonC from "../../commonComponents/Button";
import { Context as MeetingContext } from "../../contexts/MeetingContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMeeting, IMinistryGroup, IPreacher } from "../../contexts/interfaces";
import territories from "../../api/territories";
import MyInput from "../../commonComponents/MyInput";
import ChooseDate from "../../commonComponents/ChooseDate";
import Label from "../../commonComponents/Label";
import { defaultDropdownStyles, defaultSwitchStyles } from "../defaultStyles";
import { months } from "../../../defaultData";
import useLocaLization from "../../hooks/useLocalization";
import { meetingsTranslations } from "./translations";
import { meetingAssignmentTranslations } from "./Assignments/translations";
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { storage } from "../../helpers/storage";

interface MeetingEditScreenProps {
    route: {
        params: {
            meeting: IMeeting
        }
    }
}

const MeetingEditScreen: React.FC<MeetingEditScreenProps> = ({ route }) => {
    const meetingTranslate = useLocaLization(meetingsTranslations);
    const meetingAssignmentsTranslate = useLocaLization(meetingAssignmentTranslations);
    const [date, setDate] = useState<Date>(new Date(route.params.meeting.date))
    const [dateOpen, setDateOpen] = useState<boolean>(false)
    const [beginPrayerValue, setBeginPrayerValue] = useState<string>('')
    const [beginPrayerOpen, setBeginPrayerOpen] = useState<boolean>(false);
    const [beginPrayerItems, setBeginPrayerItems] = useState([]);
    const [cleaningGroupValue, setCleaningGroupValue] = useState<string>('')
    const [cleaningGroupOpen, setCleaningGroupOpen] = useState<boolean>(false);
    const [cleaningGroupItems, setCleaningGroupItems] = useState([]);
    const [typeValue, setTypeValue] = useState<string>('')
    const [beginSong, setBeginSong] = useState<string>('')
    const [midSong, setMidSong] = useState<string>('')
    const [endSong, setEndSong] = useState<string>('')
    const [leadValue, setLeadValue] = useState("");
    const [leadOpen, setLeadOpen] = useState(false);
    const [leadItems, setLeadItems] = useState([]);
    const [endPrayerValue, setEndPrayerValue] = useState<string>('')
    const [endPrayerOpen, setEndPrayerOpen] = useState<boolean>(false);
    const [endPrayerItems, setEndPrayerItems] = useState([
        {label: meetingAssignmentsTranslate.t("otherCongPreacherChoose"), value: ''}
    ]);
    const [isOtherEndPrayer, setIsOtherEndPrayer] = useState<boolean>(false);
    const [otherEndPrayer, setOtherEndPrayer] = useState<string>('')
    const { state, editMeeting } = useContext(MeetingContext);
    const settingsContext = useContext(SettingsContext);
    const dropdownStyles = defaultDropdownStyles(settingsContext.state.fontIncrement)

    const loadPreachers = async (date: Date) => {
        const token = await storage.getItem('token')
        territories.get<IPreacher[]>('/preachers/all', {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        .then((response) => {
            const meetingDate = new Date(date)
            const currentMonth = `${months[meetingDate.getMonth()]} ${meetingDate.getFullYear()}`;
            const currentMonthMeetings = state.allMeetings?.filter((meeting) => meeting.month === currentMonth);
            const selectPrayerItems = response.data.filter((preacher) => preacher.roles.includes("can_say_prayer")).map((preacher) => {
                let alreadyAssigned = currentMonthMeetings?.filter((meeting) => meeting.beginPrayer?.name === preacher.name || meeting.endPrayer?.name === preacher.name).length

                return { label: meetingTranslate.t("prayerCounter", {name: preacher.name, currentMonth, alreadyAssigned}), value: preacher._id } as never
            })
            const selectLeadItems = response.data.filter((preacher) => preacher.roles.includes("can_lead_meetings")).map((preacher) => {
                let alreadyAssigned = currentMonthMeetings?.filter((meeting) => meeting.lead?.name === preacher.name).length

                return { label: meetingTranslate.t("leadCounter", {name: preacher.name, currentMonth, alreadyAssigned}), value: preacher._id } as never
            })
            setLeadItems(selectLeadItems)
            setBeginPrayerItems(selectPrayerItems)
            setEndPrayerItems([{ label: meetingAssignmentsTranslate.t("otherCongPreacherChoose"), value: ''}, ...selectPrayerItems])
        })
        .catch((err) => console.log(err))
    }

    const loadMinistryGroups = async () => {
        const token = await storage.getItem('token')
        const congregationID = await storage.getItem('congregationID')
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
        setTypeValue(date.getDay() === 0 || date.getDay() === 6 ? meetingTranslate.t("weekend") : meetingTranslate.t("midWeek"))
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
        <KeyboardAwareScrollView style={styles.container}>
            <ChooseDate 
                label={meetingTranslate.t("dateLabel")}
                date={date}
                dateOpen={dateOpen}
                setDate={setDate}
                setDateOpen={setDateOpen}
                mode="datetime"
            />
            
            <Label text={meetingTranslate.t("cleaningGroupLabel")} />
            <DropDownPicker 
                value={cleaningGroupValue}
                setValue={setCleaningGroupValue}
                open={cleaningGroupOpen}
                setOpen={setCleaningGroupOpen}
                items={cleaningGroupItems}
                modalTitleStyle={dropdownStyles.text}
                labelStyle={[dropdownStyles.container, dropdownStyles.text]}
                placeholderStyle={[dropdownStyles.container, dropdownStyles.text]}
                listMode="MODAL"
                modalTitle={meetingTranslate.t("cleaningGroupLabel")}
                placeholder={meetingTranslate.t("cleaningGroupPlaceholder")}
            />
        
            <MyInput 
                value={beginSong}
                onChangeText={setBeginSong}
                label={meetingTranslate.t("beginSongLabel")}
                placeholder={meetingTranslate.t("beginSongPlaceholder")}
            />
            <Label text={meetingTranslate.t("leadLabel")} />
            <DropDownPicker 
                value={leadValue}
                setValue={setLeadValue}
                open={leadOpen}
                setOpen={setLeadOpen}
                items={leadItems}
                modalTitleStyle={dropdownStyles.text}
                labelStyle={[dropdownStyles.container, dropdownStyles.text]}
                placeholderStyle={[dropdownStyles.container, dropdownStyles.text]}
                listMode="MODAL"
                modalTitle={meetingTranslate.t("leadLabel")}
                placeholder={meetingTranslate.t("leadPlaceholder")}
            />
            <Label text={meetingTranslate.t("beginPrayerLabel")} />
            <DropDownPicker 
                value={beginPrayerValue}
                setValue={setBeginPrayerValue}
                open={beginPrayerOpen}
                setOpen={setBeginPrayerOpen}
                items={beginPrayerItems}
                modalTitleStyle={dropdownStyles.text}
                labelStyle={[dropdownStyles.container, dropdownStyles.text]}
                placeholderStyle={[dropdownStyles.container, dropdownStyles.text]}
                listMode="MODAL"
                modalTitle={meetingTranslate.t("beginPrayerLabel")}
                placeholder={meetingTranslate.t("beginPrayerPlaceholder")}
            />
            <MyInput 
                value={midSong}
                onChangeText={setMidSong}
                label={meetingTranslate.t("midSongLabel")}
                placeholder={meetingTranslate.t("midSongPlaceholder")}
            />
            <MyInput 
                value={endSong}
                onChangeText={setEndSong}
                label={meetingTranslate.t("endSongLabel")}
                placeholder={meetingTranslate.t("endSongPlaceholder")}
            />
            <Label text={meetingTranslate.t("endPrayerLabel")} />
            <DropDownPicker 
                value={endPrayerValue}
                setValue={setEndPrayerValue}
                open={endPrayerOpen}
                setOpen={setEndPrayerOpen}
                items={endPrayerItems}
                modalTitleStyle={dropdownStyles.text}
                labelStyle={[dropdownStyles.container, dropdownStyles.text]}
                placeholderStyle={[dropdownStyles.container, dropdownStyles.text]}
                listMode="MODAL"
                modalTitle={meetingTranslate.t("endPrayerLabel")}
                placeholder={meetingTranslate.t("endPrayerPlaceholder")}
            />
            {typeValue === meetingTranslate.t("weekend") && <>
                <Label text={meetingTranslate.t("isOtherEndPrayerSwitch")} />
                <Switch  
                    value={isOtherEndPrayer}
                    onValueChange={(value) => setIsOtherEndPrayer(value)}
                    style={defaultSwitchStyles(settingsContext.state.fontIncrement, isOtherEndPrayer, 'left').container}
                    color={settingsContext.state.mainColor}
                />
                {isOtherEndPrayer && <>
                    <MyInput 
                        value={otherEndPrayer}
                        onChangeText={setOtherEndPrayer}
                        label={meetingTranslate.t("otherEndPrayerLabel")}
                        placeholder={meetingTranslate.t("otherEndPrayerPlaceholder")}
                    />

                </>}
            </>}
            <View style={{ marginBottom: 40, marginTop: 20 }}>
                <ButtonC 
                    title={meetingTranslate.t("editText")}
                    isLoading={state.isLoading}
                    onPress={() => editMeeting(route.params.meeting._id, typeValue, cleaningGroupValue, leadValue, date, beginPrayerValue, beginSong, midSong, endSong, endPrayerValue, otherEndPrayer)}
                />
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
})

export default MeetingEditScreen;