import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import MeetingsIndexScreen from "../screens/Meetings/Index";
import MeetingNewScreen from "../screens/Meetings/New";
import MeetingEditScreen from "../screens/Meetings/Edit";
import MeetingDeleteConfirmScreen from "../screens/Meetings/DeleteConfirm";
import MeetingAssignmentNewScreen from "../screens/Meetings/Assignments/New";
import MeetingAssignmentEditScreen from "../screens/Meetings/Assignments/Edit";
import MeetingAssignmentDeleteConfirmScreen from "../screens/Meetings/Assignments/DeleteConfirm";
import { StyleSheet } from "react-native";
import useLocaLization from "../hooks/useLocalization";
import { meetingAssignmentTranslations } from "../screens/Meetings/Assignments/translations";
import { meetingsTranslations } from "../screens/Meetings/translations";
import { Context as SettingsContext } from "../contexts/SettingsContext";

const Stack = createStackNavigator();

const MeetingsNavigator: React.FC = () => {
    const meetingAssignmentsTranslate = useLocaLization(meetingAssignmentTranslations);
    const meetingTranslate = useLocaLization(meetingsTranslations);
    const settingsContext = useContext(SettingsContext);
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: settingsContext.state.mainColor }, headerTitleStyle: headerStyles.title, headerTintColor: 'white' }}>
            <Stack.Screen 
                name="Meetings Index" 
                component={MeetingsIndexScreen} 
                options={{
                    headerTitle: meetingTranslate.t("sectionText")
                }}
            />
            <Stack.Screen 
                name="Meetings New" 
                component={MeetingNewScreen} 
                options={{
                    headerTitle: meetingTranslate.t("addText")
                }}
            />
            <Stack.Screen 
                name="Meetings Edit" 
                component={MeetingEditScreen} 
                options={{
                    headerTitle: meetingTranslate.t("editText")
                }}
            />
            <Stack.Screen 
                name="Meetings Delete Confirm" 
                component={MeetingDeleteConfirmScreen} 
                options={{
                    headerTitle: meetingTranslate.t("deleteConfirmHeaderText")
                }}
            />
            <Stack.Screen 
                name="Meetings Assignment New" 
                component={MeetingAssignmentNewScreen} 
                options={{
                    headerTitle: meetingAssignmentsTranslate.t("addHeaderText")
                }}
            />
            <Stack.Screen 
                name="Meetings Assignment Edit" 
                component={MeetingAssignmentEditScreen} 
                options={{
                    headerTitle: meetingAssignmentsTranslate.t("editHeaderText")
                }}
            />
            <Stack.Screen 
                name="Meetings Assignment Delete Confirm" 
                component={MeetingAssignmentDeleteConfirmScreen} 
                options={{
                    headerTitle: meetingAssignmentsTranslate.t("deleteConfirmHeaderText")
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

export default MeetingsNavigator;