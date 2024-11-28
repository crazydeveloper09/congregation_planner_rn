import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/Welcome";
import CongregationsLoginScreen from "../screens/Congregation/Login";
import CongregationsTwoFactorScreen from "../screens/Congregation/TwoFactor";
import { StyleSheet } from "react-native";
import useLocaLization from "../hooks/useLocalization";
import { authTranslations } from "../screens/Congregation/translations";
import { Context as SettingsContext } from "../contexts/SettingsContext";
import { useContext } from "react";

const Stack = createStackNavigator();

const AuthNavigator = () => {
    const i18n = useLocaLization(authTranslations);
    const settingsContext = useContext(SettingsContext);
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
                    name="TwoFactor" 
                    component={CongregationsTwoFactorScreen} 
                    options={{ headerTitle: i18n.t('twoFactorHeaderText') }}
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