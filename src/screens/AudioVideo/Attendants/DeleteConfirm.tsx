import { NavigationProp } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { IMeeting, IAttendant } from "../../../contexts/interfaces";
import ButtonC from "../../../commonComponents/Button";
import { Context as AttendantContext } from "../../../contexts/AttendantsContext";
import { ListItem } from "@rneui/base";
import IconDescriptionValue from "../../../commonComponents/IconDescriptionValue";
import useLocaLization from "../../../hooks/useLocalization";
import { attendantTranslations } from "./translations";
import { mainTranslations } from "../../../../localization";
import { Context as SettingsContext } from "../../../contexts/SettingsContext";

interface AttendantDeleteConfirmScreenProps { 
    navigation: NavigationProp<any>
    route: {
        params: {
            meeting: IMeeting,
            attendant: IAttendant
        }
    }
}

const AttendantDeleteConfirmScreen: React.FC<AttendantDeleteConfirmScreenProps> = ({ navigation, route }) => {
    const { state, deleteAttendant } = useContext(AttendantContext)
    const settingsContext = useContext(SettingsContext);
    const attendantTranslate = useLocaLization(attendantTranslations)
    const mainTranslate = useLocaLization(mainTranslations)
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <ListItem containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
            
                <View>
                    <ListItem.Title style={[styles.date, { fontSize: 20 + settingsContext.state.fontIncrement }]}>{new Date(route.params.meeting.date).toLocaleDateString('pl-PL')}</ListItem.Title>
                    <IconDescriptionValue 
                        iconName="account-supervisor"
                        description={attendantTranslate.t("hallwayLabel")}
                        value={route.params.attendant.hallway1?.name}
                    />

                    {route.params.attendant.hallway2 && <IconDescriptionValue 
                        iconName="account-supervisor-outline"
                        description={attendantTranslate.t("hallway2Label")}
                        value={route.params.attendant.hallway2?.name}
                    />}
                    <IconDescriptionValue 
                        iconName="account-eye"
                        description={attendantTranslate.t("auditoriumLabel")}
                        value={route.params.attendant.auditorium?.name}
                    />
            
                    {route.params.attendant.parking && <IconDescriptionValue 
                        iconName="parking"
                        description={attendantTranslate.t("parkingLabel")}
                        value={route.params.attendant.parking?.name}
                    />}
                </View>
                
            
            </ListItem>

            <Text style={[styles.text, { fontSize: 21 + settingsContext.state.fontIncrement }]}>{attendantTranslate.t("deleteConfirmText")}</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ width: '48%' }}>
                    <ButtonC title={mainTranslate.t("yes")} onPress={() => deleteAttendant(route.params.meeting._id, route.params.attendant._id)} isLoading={state.isLoading} color="#AD371F" />
                </View>
                <View style={{ width: '48%' }}>
                    <ButtonC title={mainTranslate.t("no")} onPress={() => navigation.navigate('Audio Index')} />
                </View>
            
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 80,
        flex: 1,
    },
    text: {
        fontSize: 21,
        marginVertical: 10,
    },
    date: {
        fontFamily: "MontserratRegular",
        fontSize: 20,
        marginBottom: 15
    },
})

export default AttendantDeleteConfirmScreen;