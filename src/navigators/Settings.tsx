import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar, StyleSheet } from "react-native";
import SettingsScreen from "../screens/Settings/Index";
import PoliciesScreen from "../screens/Settings/Policies";
import useLocaLization from "../hooks/useLocalization";
import { mainTranslations } from "../../localization";
import PoliciesEnScreen from "../screens/Settings/PoliciesEn";
import { Context as SettingsContext } from "../contexts/SettingsContext";
import PreachersNavigator from "./Preachers";
import AuthNavigator from "./Auth";
import CongregationsNavigator from "./CongregationNavigator";
import HelpInTranslationScreen from "../screens/Settings/HelpInTranslation";
import ShareIdeaScreen from "../screens/Settings/ShareIdea";
import RaiseIssueScreen from "../screens/Settings/RaiseIssue";
import { settingsTranslations } from "../screens/Settings/translations";
import PreacherTerritoriesScreen from "../screens/Preachers/PreacherTerritories";
import TerritoriesHistoryScreen from "../screens/Preachers/History";

const Stack = createStackNavigator()

const SettingsNavigator = () => {
  const mainTranslate = useLocaLization(mainTranslations);
  const settingsTranslate = useLocaLization(settingsTranslations);
  const settingsContext = useContext(SettingsContext);
  useEffect(() => {

  }, [settingsContext.state.mainColor])
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: settingsContext.state.mainColor }, headerTitleStyle: headerStyles.title, headerTintColor: 'white'}}>
            <Stack.Screen 
                name="Settings" 
                component={SettingsScreen} 
                options={{ headerTitle: mainTranslate.t("settingsLabel") }}
            />  
            <Stack.Screen 
                name="Policy_pl" 
                component={PoliciesScreen} 
                options={{ headerTitle: 'Polityka prywatności i RODO' }}
            />  
            <Stack.Screen 
                name="Policy_en" 
                component={PoliciesEnScreen} 
                options={{ headerTitle: 'Privacy policy and GPDR' }}
            />  
            <Stack.Screen 
                name="Translate" 
                component={HelpInTranslationScreen} 
                options={{ headerTitle: settingsTranslate.t("translateLabel") }}
            />
            <Stack.Screen 
                name="Suggestion" 
                component={ShareIdeaScreen} 
                options={{ headerTitle: settingsTranslate.t("feedbackLabel") }}
            />
            <Stack.Screen 
                name="Error" 
                component={RaiseIssueScreen} 
                options={{ headerTitle: settingsTranslate.t("issueLabel") }}
            />
            <Stack.Screen 
                name="PreacherTerritories" 
                component={PreacherTerritoriesScreen} 
                options={{ headerTitle: "Moje tereny" }}
            />

            <Stack.Screen 
                name="TerritoryHistory" 
                component={TerritoriesHistoryScreen} 
                options={{ headerTitle: "Mapka terenu" }}
            />
            <Stack.Screen name="Preachers" component={PreachersNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Cong" component={CongregationsNavigator} options={{ headerShown: false }} />
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

export default SettingsNavigator;