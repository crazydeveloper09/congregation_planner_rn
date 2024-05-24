import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AudioVideoIndexScreen from "../screens/AudioVideo/Index";
import AudioVideoNewScreen from "../screens/AudioVideo/New";
import AudioVideoEditScreen from "../screens/AudioVideo/Edit";
import AudioVideoDeleteConfirmScreen from "../screens/AudioVideo/DeleteConfirm";
import OrdinalNewScreen from "../screens/AudioVideo/Ordinals/New";
import OrdinalEditScreen from "../screens/AudioVideo/Ordinals/Edit";
import OrdinalDeleteConfirmScreen from "../screens/AudioVideo/Ordinals/DeleteConfirm";
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();

const AudioVideoNavigator: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#1F8AAD' }, headerTitleStyle: headerStyles.title, headerTintColor: 'white' }}>
            <Stack.Screen 
                name="Audio Index" 
                component={AudioVideoIndexScreen} 
                options={{
                    headerTitle: "Audio-video"
                }}
            />
            <Stack.Screen 
                name="Audio New" 
                component={AudioVideoNewScreen} 
                options={{
                    headerTitle: "Dodaj dane o audio-video"
                }}
            />
            <Stack.Screen 
                name="Audio Edit" 
                component={AudioVideoEditScreen} 
                options={{
                    headerTitle: "Edytuj dane o audio-video"
                }}
            />
            <Stack.Screen 
                name="Audio Delete Confirm" 
                component={AudioVideoDeleteConfirmScreen} 
                options={{
                    headerTitle: "Potwierdzenie usunięcia danych o audio-video"
                }}
            />
             <Stack.Screen 
                name="Ordinal New" 
                component={OrdinalNewScreen} 
                options={{
                    headerTitle: "Dodaj dane o porządkowych"
                }}
            />
            <Stack.Screen 
                name="Ordinal Edit" 
                component={OrdinalEditScreen} 
                options={{
                    headerTitle: "Edytuj dane o porządkowych"
                }}
            />
            <Stack.Screen 
                name="Ordinal Delete Confirm" 
                component={OrdinalDeleteConfirmScreen} 
                options={{
                    headerTitle: "Potwierdzenie usunięcia danych o porządkowych"
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
export default AudioVideoNavigator;