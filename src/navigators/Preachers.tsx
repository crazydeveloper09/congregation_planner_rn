import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PreachersIndexScreen from "../screens/Preachers/Index";
import PreachersNewScreen from "../screens/Preachers/New";
import PreachersEditScreen from "../screens/Preachers/Edit";
import PreachersSearchScreen from "../screens/Preachers/Search";
import { StatusBar, StyleSheet } from "react-native";
import PreacherDeleteConfirmScreen from "../screens/Preachers/DeleteConfirm";
import MinistryGroupNewScreen from "../screens/MinistryGroups/New";
import MinistryGroupEditScreen from "../screens/MinistryGroups/Edit";

const Stack = createStackNavigator()

const PreachersNavigator = () => {

    
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#1F8AAD' }, headerTitleStyle: headerStyles.title, headerTintColor: 'white'}}>
            <Stack.Screen 
                name="PreachersList" 
                component={PreachersIndexScreen} 
                options={{ headerTitle: 'Głosiciele' }}
            />  
            <Stack.Screen 
                name="AddPreacher" 
                component={PreachersNewScreen} 
                options={{ headerTitle: 'Dodaj głosiciela' }}
            /> 
            <Stack.Screen 
                name="EditPreacher" 
                component={PreachersEditScreen} 
                options={{ headerTitle: 'Edytuj głosiciela' }}
            />
            <Stack.Screen 
                name="SearchPreacher" 
                component={PreachersSearchScreen} 
                options={{ headerTitle: 'Szukaj głosiciela' }}
            /> 
  
            <Stack.Screen 
                name="DeleteConfirmPreacher" 
                component={PreacherDeleteConfirmScreen} 
                options={{ headerTitle: 'Potwierdź usunięcie' }}
            />  

            <Stack.Screen 
                name="AddMinistryGroup" 
                component={MinistryGroupNewScreen} 
                options={{ headerTitle: 'Dodaj grupę służby' }}
            /> 
    
            <Stack.Screen 
                name="EditMinistryGroup" 
                component={MinistryGroupEditScreen} 
                options={{ headerTitle: 'Edytuj grupę służby' }}
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

export default PreachersNavigator;