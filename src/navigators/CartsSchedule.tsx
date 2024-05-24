import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CartsScheduleIndexScreen from "../screens/CartsSchedule/Index";
import CartDayNewScreen from "../screens/CartsSchedule/Day/New";
import { StyleSheet } from "react-native";
import CartDayEditScreen from "../screens/CartsSchedule/Day/Edit";
import CartDayDeleteConfirmScreen from "../screens/CartsSchedule/Day/DeleteConfirm";

const Stack = createStackNavigator();

const CartsScheduleNavigator: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#1F8AAD' }, headerTitleStyle: headerStyles.title, headerTintColor: 'white' }}>
            <Stack.Screen 
                name="Carts Schedule Index" 
                component={CartsScheduleIndexScreen} 
                options={{
                    headerTitle: "Wózek"
                }}
            />
            <Stack.Screen 
                name="Carts Day New" 
                component={CartDayNewScreen} 
                options={{
                    headerTitle: "Dodaj dzień wózka"
                }}
            />
            <Stack.Screen 
                name="Carts Day Edit" 
                component={CartDayEditScreen} 
                options={{
                    headerTitle: "Edytuj dzień wózka"
                }}
            />
            <Stack.Screen 
                name="Carts Day Delete Confirm" 
                component={CartDayDeleteConfirmScreen} 
                options={{
                    headerTitle: "Potwierdź usunięcie dzień wózka"
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