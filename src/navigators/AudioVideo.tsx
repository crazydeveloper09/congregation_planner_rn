import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AudioVideoIndexScreen from "../screens/AudioVideo/Index";
import AudioVideoNewScreen from "../screens/AudioVideo/New";
import AudioVideoEditScreen from "../screens/AudioVideo/Edit";
import AudioVideoDeleteConfirmScreen from "../screens/AudioVideo/DeleteConfirm";
import AttendantNewScreen from "../screens/AudioVideo/Attendants/New";
import AttendantEditScreen from "../screens/AudioVideo/Attendants/Edit";
import AttendantDeleteConfirmScreen from "../screens/AudioVideo/Attendants/DeleteConfirm";
import { StyleSheet } from "react-native";
import useLocaLization from "../hooks/useLocalization";
import { audioVideoTranslations } from "../screens/AudioVideo/translations";
import { attendantTranslations } from "../screens/AudioVideo/Attendants/translations";

const Stack = createStackNavigator();

const AudioVideoNavigator: React.FC = () => {
    const audioVideoTranslate = useLocaLization(audioVideoTranslations);
    const attendantTranslate = useLocaLization(attendantTranslations)
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
                    headerTitle: audioVideoTranslate.t("addHeaderText")
                }}
            />
            <Stack.Screen 
                name="Audio Edit" 
                component={AudioVideoEditScreen} 
                options={{
                    headerTitle: audioVideoTranslate.t("editHeaderText")
                }}
            />
            <Stack.Screen 
                name="Audio Delete Confirm" 
                component={AudioVideoDeleteConfirmScreen} 
                options={{
                    headerTitle: audioVideoTranslate.t("deleteConfirmHeaderText")
                }}
            />
             <Stack.Screen 
                name="Attendant New" 
                component={AttendantNewScreen} 
                options={{
                    headerTitle: attendantTranslate.t("addHeaderText")
                }}
            />
            <Stack.Screen 
                name="Attendant Edit" 
                component={AttendantEditScreen} 
                options={{
                    headerTitle: attendantTranslate.t("editHeaderText")
                }}
            />
            <Stack.Screen 
                name="Attendant Delete Confirm" 
                component={AttendantDeleteConfirmScreen} 
                options={{
                    headerTitle: attendantTranslate.t("deleteConfirmHeaderText")
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