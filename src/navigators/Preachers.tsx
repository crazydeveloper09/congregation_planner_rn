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
import useLocaLization from "../hooks/useLocalization";
import { ministryGroupsTranslations } from "../screens/MinistryGroups/translations";
import { preachersTranslations } from "../screens/Preachers/translations";
import { Context as SettingsContext } from "../contexts/SettingsContext";

const Stack = createStackNavigator()

const PreachersNavigator = () => {
    const ministryGroupTranslate = useLocaLization(ministryGroupsTranslations);
    const preacherTranslate = useLocaLization(preachersTranslations)
    const settingsContext = useContext(SettingsContext);
    
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: settingsContext.state.mainColor }, headerTitleStyle: headerStyles.title, headerTintColor: 'white'}}>
            <Stack.Screen 
                name="PreachersList" 
                component={PreachersIndexScreen} 
                options={{ headerTitle: preacherTranslate.t("sectionText") }}
            />  
            <Stack.Screen 
                name="AddPreacher" 
                component={PreachersNewScreen} 
                options={{ headerTitle: preacherTranslate.t("addButtonText") }}
            /> 
            <Stack.Screen 
                name="EditPreacher" 
                component={PreachersEditScreen} 
                options={{ headerTitle: preacherTranslate.t("editButtonText") }}
            />
            <Stack.Screen 
                name="SearchPreacher" 
                component={PreachersSearchScreen} 
                options={{ headerTitle: preacherTranslate.t("searchPreacherHeader") }}
            /> 
  
            <Stack.Screen 
                name="DeleteConfirmPreacher" 
                component={PreacherDeleteConfirmScreen} 
                options={{ headerTitle: preacherTranslate.t("deleteConfirmHeader") }}
            />  

            <Stack.Screen 
                name="AddMinistryGroup" 
                component={MinistryGroupNewScreen} 
                options={{ headerTitle: ministryGroupTranslate.t("addHeader") }}
            /> 
    
            <Stack.Screen 
                name="EditMinistryGroup" 
                component={MinistryGroupEditScreen} 
                options={{ headerTitle: ministryGroupTranslate.t("editHeader") }}
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