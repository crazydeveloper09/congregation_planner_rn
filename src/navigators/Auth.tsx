import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/Welcome";
import CongregationsLoginScreen from "../screens/Congregation/Login";
import CongregationsTwoFactorScreen from "../screens/Congregation/TwoFactor";
import { StatusBar, StyleSheet } from "react-native";
import useLocaLization from "../hooks/useLocalization";
import { authTranslations } from "../screens/Congregation/translations";
import { Context as SettingsContext } from "../contexts/SettingsContext";
import { useContext } from "react";
import CongregationAskAccessScreen from "../screens/Congregation/AskAccess";
import CongregationRegisterScreen from "../screens/Congregation/New";
import CongregationsVerificationScreen from "../screens/Congregation/Verification";
import PoliciesScreen from "../screens/Settings/Policies";
import PoliciesEnScreen from "../screens/Settings/PoliciesEn";

const Stack = createStackNavigator();

const AuthNavigator = () => {
    const i18n = useLocaLization(authTranslations);
    const settingsContext = useContext(SettingsContext);
    StatusBar.setBackgroundColor(settingsContext.state.mainColor);
    StatusBar.setBarStyle("light-content")
    return (
        
            <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: settingsContext.state.mainColor }, headerTitleStyle: headerStyles.title, headerTintColor: 'white' }}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen 
                    name="Log in" 
                    component={CongregationsLoginScreen} 
                    options={{ 
                        headerTitle: i18n.t('loginHeaderText'), 
                    }}
                />
                <Stack.Screen 
                    name="Ask access" 
                    component={CongregationAskAccessScreen} 
                    options={{ headerTitle: i18n.t('askAccessLabel') }}
                /> 
                <Stack.Screen 
                    name="Register" 
                    component={CongregationRegisterScreen} 
                    options={{ headerTitle: i18n.t('registerLabel') }}
                />  
                <Stack.Screen 
                    name="Verification" 
                    component={CongregationsVerificationScreen} 
                    options={{ headerTitle: i18n.t('verificationLabel') }}
                />   
                <Stack.Screen 
                    name="TwoFactor" 
                    component={CongregationsTwoFactorScreen} 
                    options={{ headerTitle: i18n.t('twoFactorHeaderText') }}
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

export default AuthNavigator;