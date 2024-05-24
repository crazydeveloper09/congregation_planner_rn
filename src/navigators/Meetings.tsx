import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MeetingsIndexScreen from "../screens/Meetings/Index";
import MeetingNewScreen from "../screens/Meetings/New";
import MeetingEditScreen from "../screens/Meetings/Edit";
import MeetingDeleteConfirmScreen from "../screens/Meetings/DeleteConfirm";
import MeetingAssignmentNewScreen from "../screens/Meetings/Assignments/New";
import MeetingAssignmentEditScreen from "../screens/Meetings/Assignments/Edit";
import MeetingAssignmentDeleteConfirmScreen from "../screens/Meetings/Assignments/DeleteConfirm";
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();

const MeetingsNavigator: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#1F8AAD' }, headerTitleStyle: headerStyles.title, headerTintColor: 'white' }}>
            <Stack.Screen 
                name="Meetings Index" 
                component={MeetingsIndexScreen} 
                options={{
                    headerTitle: "Zebrania"
                }}
            />
            <Stack.Screen 
                name="Meetings New" 
                component={MeetingNewScreen} 
                options={{
                    headerTitle: "Dodaj zebranie"
                }}
            />
            <Stack.Screen 
                name="Meetings Edit" 
                component={MeetingEditScreen} 
                options={{
                    headerTitle: "Edytuj zebranie"
                }}
            />
            <Stack.Screen 
                name="Meetings Delete Confirm" 
                component={MeetingDeleteConfirmScreen} 
                options={{
                    headerTitle: "Potwierdź usunięcie zebrania"
                }}
            />
            <Stack.Screen 
                name="Meetings Assignment New" 
                component={MeetingAssignmentNewScreen} 
                options={{
                    headerTitle: "Dodaj zadanie na zebraniu"
                }}
            />
            <Stack.Screen 
                name="Meetings Assignment Edit" 
                component={MeetingAssignmentEditScreen} 
                options={{
                    headerTitle: "Edytuj zadanie na zebraniu"
                }}
            />
            <Stack.Screen 
                name="Meetings Assignment Delete Confirm" 
                component={MeetingAssignmentDeleteConfirmScreen} 
                options={{
                    headerTitle: "Potwierdź usunięcie zadania na zebraniu"
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