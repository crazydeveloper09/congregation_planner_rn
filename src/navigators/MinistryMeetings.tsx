import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import MinistryMeetingIndexScreen from "../screens/MinistryMeeting/Index";
import MinistryMeetingEditScreen from "../screens/MinistryMeeting/Edit";
import MinistryMeetingNewScreen from "../screens/MinistryMeeting/New";
import MinistryMeetingDeleteConfirmScreen from "../screens/MinistryMeeting/DeleteConfirm";
import { StyleSheet } from "react-native";
import useLocaLization from "../hooks/useLocalization";
import { ministryMeetingsTranslations } from "../screens/MinistryMeeting/translations";
import { Context as SettingsContext } from "../contexts/SettingsContext";

const Stack = createStackNavigator();

const MinistryMeetingNavigator: React.FC = () => {
    const ministryMeetingTranslate = useLocaLization(ministryMeetingsTranslations);
    const settingsContext = useContext(SettingsContext);
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: settingsContext.state.mainColor }, headerTintColor: "white", headerTitleStyle: headerStyles.title }}>
            <Stack.Screen 
                name="Ministry Meeting Index" 
                component={MinistryMeetingIndexScreen} 
                options={{
                    headerTitle: ministryMeetingTranslate.t("sectionText")
                }}
            />
            <Stack.Screen 
                name="Ministry Meeting Edit" 
                component={MinistryMeetingEditScreen} 
                options={{
                    headerTitle: ministryMeetingTranslate.t("editText")
                }}
            />
            <Stack.Screen 
                name="Ministry Meeting New" 
                component={MinistryMeetingNewScreen} 
                options={{
                    headerTitle: ministryMeetingTranslate.t("addText")
                }}
            />
            <Stack.Screen 
                name="Ministry Meeting Delete Confirm" 
                component={MinistryMeetingDeleteConfirmScreen} 
                options={{
                    headerTitle: ministryMeetingTranslate.t("deleteConfirmHeader"),
                }}
                
            />
        </Stack.Navigator>
    )
}

const headerStyles = StyleSheet.create({
    header: {
      backgroundColor: '#28a745',
    },
    title: { 
      color: 'white',
      fontFamily: 'MontserratSemiBold', 
      fontSize: 19 
    }
  })

export default MinistryMeetingNavigator;