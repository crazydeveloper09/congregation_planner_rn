import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Context as CartsScheduleContext } from "../../../contexts/CartsScheduleContext";
import { Input } from "@rneui/base";
import DateTimePicker from "react-native-modal-datetime-picker";
import ButtonC from "../../../commonComponents/Button";
import { Switch } from "@rneui/base";
import MyInput from "../../../commonComponents/MyInput";
import ChooseDate from "../../../commonComponents/ChooseDate";

interface CartDayNewScreenProps {
    route: {
        params: {
            date: Date
        }
    }
}

const CartDayNewScreen: React.FC<CartDayNewScreenProps> = ({ route }) => {
    const [date, setDate] = useState<Date>(new Date())
    const [dateOpen, setDateOpen] = useState<boolean>(false)
    const [place, setPlace] = useState<string>('')
    const [startHour, setStartHour] = useState<string>('');
    const [finalHour, setFinalHour] = useState<string>('')
    const { state, addCartDay } = useContext(CartsScheduleContext)

    useEffect(() => {
        setDate(new Date(route.params.date))
    }, [])

    return (
        <View style={styles.container}>
            <ChooseDate 
                label="Data"
                date={date}
                dateOpen={dateOpen}
                setDate={setDate}
                setDateOpen={setDateOpen}
            />
    
            <MyInput 
                value={place}
                onChangeText={setPlace}
                label="Miejsce"
                placeholder="Wpisz lokalizację wózka"
            />

            <MyInput 
                value={startHour}
                onChangeText={setStartHour}
                label="Godzina początkowa wózka"
                keyboardType="numeric"
                placeholder="Wpisz godzinę początkową wózka"
            />

            <MyInput 
                value={finalHour}
                onChangeText={setFinalHour}
                label="Godzina końcowa wózka"
                keyboardType="numeric"
                placeholder="Wpisz godzinę końcową wózka"
    
            />
           
            <ButtonC 
                title="Dodaj dzień wózka"
                isLoading={state.isLoading}
                onPress={() => addCartDay(place, startHour, date, finalHour)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
})

export default CartDayNewScreen;