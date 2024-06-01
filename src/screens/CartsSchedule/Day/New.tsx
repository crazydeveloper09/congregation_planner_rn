import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Context as CartsScheduleContext } from "../../../contexts/CartsScheduleContext";
import { Input } from "@rneui/base";
import DateTimePicker from "react-native-modal-datetime-picker";
import ButtonC from "../../../commonComponents/Button";
import { Switch } from "@rneui/base";

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
            <Text style={styles.labelStyle}>Data</Text>
            <TouchableOpacity onPress={() => setDateOpen(true)} style={{...styles.inputContainer, padding: 15}}>
                <Text>
                    {date.toLocaleDateString()} 
                </Text>
            </TouchableOpacity>
            <DateTimePicker date={date} onConfirm={(date) => {
                setDate(date)
                setDateOpen(false)
            }} onCancel={() => setDateOpen(false)} isVisible={dateOpen} />
    
            <Input 
                value={place}
                onChangeText={setPlace}
                label={<Text style={styles.labelStyle}>Miejsce</Text>}
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.containerInput}
                placeholder="Wpisz lokalizację wózka"
            />

            <Input 
                value={startHour}
                onChangeText={setStartHour}
                label={<Text style={styles.labelStyle}>Godzina początkowa wózka</Text>}
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.containerInput}
                keyboardType="numeric"
                placeholder="Wpisz godzinę początkową wózka"
            />

            <Input 
                value={finalHour}
                onChangeText={setFinalHour}
                label={<Text style={styles.labelStyle}>Godzina końcowa wózka</Text>}
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.containerInput}
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
    inputContainer: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 6,
        padding: 5,
        borderColor: 'black',
    },
    labelStyle: {
        fontFamily: 'MontserratSemiBold',
        marginVertical: 8,
        color: 'black',
    },
    containerInput: {
        paddingHorizontal: 0,
        paddingVertical: 0,
    }
})

export default CartDayNewScreen;