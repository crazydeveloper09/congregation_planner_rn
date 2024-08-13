import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { Context as AttendantContext } from "../../../contexts/AttendantsContext";
import { Context as MeetingContext } from "../../../contexts/MeetingContext";
import territories from "../../../api/territories";
import { IMeeting, IAttendant, IPreacher } from "../../../contexts/interfaces";
import ButtonC from "../../../commonComponents/Button";
import { Switch } from "@rneui/base";
import DropDownPicker from "react-native-dropdown-picker";
import Meeting from "../../Meetings/components/Meeting";
import Label from "../../../commonComponents/Label";
import AudioVideo from "../components/AudioVideo";
import { defaultStyles } from "../../defaultStyles";
import { months } from "../../../../defaultData";
import useLocaLization from "../../../hooks/useLocalization";
import { mainTranslations } from "../../../../localization";
import { meetingAssignmentTranslations } from "../../Meetings/Assignments/translations";
import { attendantTranslations } from "./translations";
import { Context as SettingsContext } from "../../../contexts/SettingsContext";

interface AttendantEditScreenProps {
    route: {
        params: {
            meeting: IMeeting,
            attendant: IAttendant
        }
    }
}

const AttendantEditScreen: React.FC<AttendantEditScreenProps> = ({ route }) => {
    const [hallway1Value, setHallway1Value] = useState("");
    const [hallway1Open, setHallway1Open] = useState(false);
    const [hallway1Items, setHallway1Items] = useState([]);
    const [isHallway2, setIsHallway2] = useState<boolean>(false);
    const [hallway2Value, setHallway2Value] = useState<string>('')
    const [hallway2Open, setHallway2Open] = useState<boolean>(false);
    const [hallway2Items, setHallway2Items] = useState([]);
    const [auditoriumValue, setAuditoriumValue] = useState<string>('')
    const [auditoriumOpen, setAuditoriumOpen] = useState<boolean>(false);
    const [auditoriumItems, setAuditoriumItems] = useState([]);
    const [isParking, setIsParking] = useState(false)
    const [parkingValue, setParkingValue] = useState<string>('')
    const [parkingOpen, setParkingOpen] = useState<boolean>(false);
    const [parkingItems, setParkingItems] = useState([]);
    const mainTranslate = useLocaLization(mainTranslations);
    const meetingAssignmentsTranslate = useLocaLization(meetingAssignmentTranslations);
    const attendantTranslate = useLocaLization(attendantTranslations)
    const { state, editAttendant } = useContext(AttendantContext);
    const meetingContext = useContext(MeetingContext)
    const settingsContext = useContext(SettingsContext);


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
            const currentMonthMeetings = meetingContext.state.meetings?.filter((meeting) => meeting.month === currentMonth);
            const selectItems = response.data.filter((preacher) => preacher.roles.includes("can_be_ordinal")).map((preacher) => {
                let alreadyAssigned = currentMonthMeetings?.filter((meeting) => meeting.ordinal?.hallway1?.name === preacher.name || meeting.ordinal?.hallway2?.name === preacher.name || meeting.ordinal?.auditorium?.name === preacher.name || meeting.ordinal?.parking?.name === preacher.name).length

                return { label: attendantTranslate.t("counter", { name: preacher.name, currentMonth, alreadyAssigned }), value: preacher._id } as never
            })
            setHallway1Items(selectItems)
            setAuditoriumItems(selectItems)
            setHallway2Items(selectItems)
            setParkingItems(selectItems)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        loadPreachers()
        setHallway1Value(route.params.attendant.hallway1._id)
        setAuditoriumValue(route.params.attendant.auditorium._id)
        setHallway2Value(route.params.attendant.hallway2?._id!)
        setParkingValue(route.params.attendant.parking?._id!)
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.meeting, { color: settingsContext.state.mainColor }]}>{meetingAssignmentsTranslate.t("seeOtherAssignmentsLabel")}</Text>
            <Meeting meeting={route.params.meeting} filter={mainTranslate.t("all")} />

            <Text style={[styles.meeting, { marginTop: 15, color: settingsContext.state.mainColor }]}>Audio-video</Text>
            <AudioVideo meeting={route.params.meeting} audioVideo={route.params.meeting.audioVideo} />

            <Label text={attendantTranslate.t("hallwayLabel")} />
            <DropDownPicker 
                value={hallway1Value}
                setValue={setHallway1Value}
                open={hallway1Open}
                setOpen={setHallway1Open}
                items={hallway1Items}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                listMode="MODAL"
                modalTitle={attendantTranslate.t("hallwayLabel")}
                placeholder={attendantTranslate.t("hallwayPlaceholder")}
            />
            <Label text={attendantTranslate.t("isHallway2SwitchText")} />
            <Switch  
                value={isHallway2}
                onValueChange={(value) => setIsHallway2(value)}
                style={styles.switch}
                color={settingsContext.state.mainColor}
            />

            { isHallway2 && <>
                <Label text={attendantTranslate.t("hallway2Label")} />
                <DropDownPicker 
                    value={hallway2Value}
                    setValue={setHallway2Value}
                    open={hallway2Open}
                    setOpen={setHallway2Open}
                    items={hallway2Items}
                    labelStyle={defaultStyles.dropdown}
                    placeholderStyle={defaultStyles.dropdown}
                    listMode="MODAL"
                    modalTitle={attendantTranslate.t("hallway2Label")}
                    placeholder={attendantTranslate.t("hallway2Placeholder")}
                />
            </>}
            <Label text={attendantTranslate.t("auditoriumLabel")} />
            <DropDownPicker 
                value={auditoriumValue}
                setValue={setAuditoriumValue}
                open={auditoriumOpen}
                setOpen={setAuditoriumOpen}
                items={auditoriumItems}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                listMode="MODAL"
                modalTitle={attendantTranslate.t("auditoriumLabel")}
                placeholder={attendantTranslate.t("auditoriumPlaceholder")}
            />
            
            <Label text={attendantTranslate.t("isParkingSwitchText")} />
            <Switch  
                value={isParking}
                onValueChange={(value) => setIsParking(value)}
                style={styles.switch}
                color={settingsContext.state.mainColor}
            />
            {isParking && <>
                <DropDownPicker 
                    value={parkingValue}
                    setValue={setParkingValue}
                    open={parkingOpen}
                    setOpen={setParkingOpen}
                    items={parkingItems}
                    containerStyle={{
                        marginVertical: 8
                    }}
                    labelStyle={defaultStyles.dropdown}
                    placeholderStyle={defaultStyles.dropdown}
                    listMode="MODAL"
                    modalTitle={attendantTranslate.t("parkingLabel")}
                    placeholder={attendantTranslate.t("parkingPlaceholder")}
                />

            </>}
            <View style={{ marginBottom: 40 }}>
                <ButtonC 
                    title={attendantTranslate.t("editHeaderText")}
                    isLoading={state.isLoading}
                    onPress={() => editAttendant(route.params.meeting._id, route.params.attendant._id, hallway1Value, hallway2Value, auditoriumValue, parkingValue)}
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
        fontFamily: 'PoppinsSemiBold'
    },
    switch: {
        alignSelf: 'flex-start',  
        transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
        marginVertical: 8
    }
})

export default AttendantEditScreen;