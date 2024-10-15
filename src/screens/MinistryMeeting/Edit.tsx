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
import MyInput from "../../commonComponents/MyInput";
import ChooseDate from "../../commonComponents/ChooseDate";
import Label from "../../commonComponents/Label";
import { months } from "../../../defaultData";
import { defaultStyles } from "../defaultStyles";
import useLocaLization from "../../hooks/useLocalization";
import { ministryMeetingsTranslations } from "./translations";
import { Context as SettingsContext } from "../../contexts/SettingsContext";

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
    const [date, setDate] = useState<Date>(new Date(route.params.meeting.date))
    const ministryMeetingTranslate = useLocaLization(ministryMeetingsTranslations)
    const [dateOpen, setDateOpen] = useState<boolean>(false)
    const [time, setTime] = useState<Date>(new Date())
    const [timeOpen, setTimeOpen] = useState<boolean>(false);
    const [place, setPlace] = useState<string>('')
    const [defaultPlaceValue, setDefaultPlaceValue] = useState<string>('')
    const [defaultPlaceOpen, setDefaultPlaceOpen] = useState<boolean>(false);
    const [defaultPlaceItems, setDefaultPlaceItems] = useState([
        { label: ministryMeetingTranslate.t("placeDefaultValue"), value: '' },
        { label: ministryMeetingTranslate.t("kingdomHall"), value: ministryMeetingTranslate.t("kingdomHall") },
        { label: 'Zoom', value: 'Zoom' },
    ]);
    const [leadValue, setLeadValue] = useState("");
    const [leadOpen, setLeadOpen] = useState(false);
    const [leadItems, setLeadItems] = useState([]);
    const [isTopic, setIsTopic] = useState<boolean>(false);
    const [topic, setTopic] = useState<string>('')
    const preachersContext = useContext(PreachersContext)
    const settingsContext = useContext(SettingsContext);

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

                return { label: ministryMeetingTranslate.t("leadCounter", { name: preacher.name, currentMonth, alreadyAssigned }), value: preacher._id } as never
            })
            setLeadItems(selectItems)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        loadPreachers(date)
        setLeadValue(route.params.meeting?.lead?._id!)
        setPlace(route.params.meeting.place)
        setDefaultPlaceValue(route.params.meeting?.defaultPlace || '')
        if(route.params.meeting.topic) {
            setTopic(route.params.meeting.topic)
            setIsTopic(true)
        }
        
    }, [date])

    return (
        <View style={styles.container}>
            <ChooseDate 
                label={ministryMeetingTranslate.t("dateLabel")}
                date={date}
                dateOpen={dateOpen}
                setDate={setDate}
                setDateOpen={setDateOpen}
                mode="datetime"
            />
            <Label text={ministryMeetingTranslate.t("defaultPlaceLabel")} />
                <DropDownPicker 
                    value={defaultPlaceValue}
                    setValue={setDefaultPlaceValue}
                    open={defaultPlaceOpen}
                    setOpen={setDefaultPlaceOpen}
                    items={defaultPlaceItems}
                    labelStyle={defaultStyles.dropdown}
                    placeholderStyle={defaultStyles.dropdown}
                    listMode="MODAL"
                    modalTitle={ministryMeetingTranslate.t("defaultPlaceLabel")}
                    placeholder={ministryMeetingTranslate.t("defaultPlacePlaceholder")}
                />
            {defaultPlaceValue === '' && <MyInput 
                value={place}
                onChangeText={setPlace}
                label={ministryMeetingTranslate.t("placeLabel")}
                placeholder={ministryMeetingTranslate.t("placePlaceholder")}
            />}
            <Label text={ministryMeetingTranslate.t("leadLabel")} />
            <DropDownPicker 
                value={leadValue}
                setValue={setLeadValue}
                open={leadOpen}
                setOpen={setLeadOpen}
                items={leadItems}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                listMode="MODAL"
                modalTitle={ministryMeetingTranslate.t("leadLabel")}
                placeholder={ministryMeetingTranslate.t("leadPlaceholder")}
            />
            <Label text={ministryMeetingTranslate.t("isTopicSwitchText")} />
            <Switch  
                value={isTopic}
                onValueChange={(value) => setIsTopic(value)}
                style={{ alignSelf: 'flex-start',  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], marginVertical: 15 }}
                color={settingsContext.state.mainColor}
            />
            {isTopic && <>
                <MyInput 
                    value={topic}
                    onChangeText={setTopic}
                    label={ministryMeetingTranslate.t("topicLabel")}
                    placeholder={ministryMeetingTranslate.t("topicPlaceholder")}
                />

            </>}
            <ButtonC 
                title={ministryMeetingTranslate.t("editText")}
                isLoading={state.isLoading}
                onPress={() => editMinistryMeeting(route.params.meeting._id, place, leadValue, date, time, defaultPlaceValue, topic)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
})

export default MinistryMeetingEditScreen;