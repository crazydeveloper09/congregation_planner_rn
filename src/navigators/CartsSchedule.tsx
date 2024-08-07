import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import CartsScheduleIndexScreen from "../screens/CartsSchedule/Index";
import CartDayNewScreen from "../screens/CartsSchedule/Day/New";
import { StyleSheet } from "react-native";
import CartDayEditScreen from "../screens/CartsSchedule/Day/Edit";
import CartDayDeleteConfirmScreen from "../screens/CartsSchedule/Day/DeleteConfirm";
import useLocaLization from "../hooks/useLocalization";
import { cartScheduleTranslations } from "../screens/CartsSchedule/translations";
import { Context as SettingsContext } from "../contexts/SettingsContext";

const Stack = createStackNavigator();

const CartsScheduleNavigator: React.FC = () => {
    const cartScheduleTranslate = useLocaLization(cartScheduleTranslations)
    const settingsContext = useContext(SettingsContext);
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: settingsContext.state.mainColor }, headerTitleStyle: headerStyles.title, headerTintColor: 'white' }}>
            <Stack.Screen 
                name="Carts Schedule Index" 
                component={CartsScheduleIndexScreen} 
                options={{
                    headerTitle: cartScheduleTranslate.t("sectionText")
                }}
            />
            <Stack.Screen 
                name="Carts Day New" 
                component={CartDayNewScreen} 
                options={{
                    headerTitle: cartScheduleTranslate.t("addText")
                }}
            />
            <Stack.Screen 
                name="Carts Day Edit" 
                component={CartDayEditScreen} 
                options={{
                    headerTitle: cartScheduleTranslate.t("editText")
                }}
            />
            <Stack.Screen 
                name="Carts Day Delete Confirm" 
                component={CartDayDeleteConfirmScreen} 
                options={{
                    headerTitle: cartScheduleTranslate.t("deleteConfirmHeaderText")
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

export default CartsScheduleNavigator;