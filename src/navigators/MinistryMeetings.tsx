import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MinistryMeetingIndexScreen from "../screens/MinistryMeeting/Index";
import MinistryMeetingEditScreen from "../screens/MinistryMeeting/Edit";
import MinistryMeetingNewScreen from "../screens/MinistryMeeting/New";
import MinistryMeetingDeleteConfirmScreen from "../screens/MinistryMeeting/DeleteConfirm";
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();

const MinistryMeetingNavigator: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#1F8AAD' }, headerTintColor: "white", headerTitleStyle: headerStyles.title }}>
            <Stack.Screen 
                name="Ministry Meeting Index" 
                component={MinistryMeetingIndexScreen} 
                options={{
                    headerTitle: "Zbiórki"
                }}
            />
            <Stack.Screen 
                name="Ministry Meeting Edit" 
                component={MinistryMeetingEditScreen} 
                options={{
                    headerTitle: "Edytuj zbiórkę"
                }}
            />
            <Stack.Screen 
                name="Ministry Meeting New" 
                component={MinistryMeetingNewScreen} 
                options={{
                    headerTitle: "Dodaj zbiórkę"
                }}
            />
            <Stack.Screen 
                name="Ministry Meeting Delete Confirm" 
                component={MinistryMeetingDeleteConfirmScreen} 
                options={{
                    headerTitle: "Potwierdź usunięcie zbiórki",
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