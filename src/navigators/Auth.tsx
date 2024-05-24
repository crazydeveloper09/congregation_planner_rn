import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/Welcome";
import CongregationsLoginScreen from "../screens/Congregation/Login";
import CongregationsTwoFactorScreen from "../screens/Congregation/TwoFactor";
import { navigationRef } from "../RootNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        
            <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#1F8AAD' }, headerTitleStyle: headerStyles.title, headerTintColor: 'white' }}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen 
                    name="Log in" 
                    component={CongregationsLoginScreen} 
                    options={{ 
                        headerTitle: 'Logowanie', 
                    }}
                />  
                <Stack.Screen 
                    name="TwoFactor" 
                    component={CongregationsTwoFactorScreen} 
                    options={{ headerTitle: 'Dwustopniowa weryfikacja' }}
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