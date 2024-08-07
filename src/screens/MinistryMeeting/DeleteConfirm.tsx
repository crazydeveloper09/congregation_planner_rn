import { NavigationProp } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as MinistryMeetingContext } from "../../contexts/MinistryMeetingContext";
import ButtonC from "../../commonComponents/Button";
import { IMinistryMeeting } from "../../contexts/interfaces";
import { ListItem } from "@rneui/base";
import IconDescriptionValue from "../../commonComponents/IconDescriptionValue";
import useLocaLization from "../../hooks/useLocalization";
import { ministryMeetingsTranslations } from "./translations";
import { mainTranslations } from "../../../localization";

interface MinistryMeetingDeleteConfirmScreenProps {
    navigation: NavigationProp<any>;
    route: {
        params: {
            meeting: IMinistryMeeting                
        }
    }
}

const MinistryMeetingDeleteConfirmScreen: React.FC<MinistryMeetingDeleteConfirmScreenProps> = ({ navigation, route }) => {
    const {state, deleteMinistryMeeting} = useContext(MinistryMeetingContext);
    const ministryMeetingTranslate = useLocaLization(ministryMeetingsTranslations)
    const mainTranslate = useLocaLization(mainTranslations)

    return (
        <View style={styles.container}>
            <ListItem containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
            
                <View>
                    <ListItem.Title style={styles.date}>{new Date(route.params.meeting.date).toLocaleDateString('pl-PL')}</ListItem.Title>
                    <IconDescriptionValue 
                        iconName={route.params.meeting?.defaultPlace === "Zoom" ? "video-box" : "home"}
                        description={ministryMeetingTranslate.t("placeLabel")}
                        value={route.params.meeting?.place || route.params.meeting?.defaultPlace}
                    />
                    <IconDescriptionValue 
                        iconName="account-tie"
                        description={ministryMeetingTranslate.t("leadLabel")}
                        value={route.params.meeting?.lead?.name}
                    />

                    {route.params.meeting?.topic && <IconDescriptionValue 
                        iconName="table-of-contents"
                        description={ministryMeetingTranslate.t("topicLabel")}
                        value={route.params.meeting?.topic}
                    />}
                </View>
                
            
            </ListItem>
            <Text style={styles.text}>{ministryMeetingTranslate.t("deleteConfirmText")}</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ width: '48%' }}>
                    <ButtonC title={mainTranslate.t("yes")} onPress={() => deleteMinistryMeeting(route.params.meeting._id)} isLoading={state.isLoading} color="#AD371F" />
                </View>
                <View style={{ width: '48%' }}>
                <ButtonC title={mainTranslate.t("no")} onPress={() => navigation.navigate('Ministry Meeting Index')} />
                </View>
            
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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

export default MinistryMeetingDeleteConfirmScreen;