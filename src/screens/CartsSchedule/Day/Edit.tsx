import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as CartsScheduleContext } from "../../../contexts/CartsScheduleContext";
import { Input } from "react-native-elements";
import ButtonC from "../../../commonComponents/Button";
import { ICartDay } from "../../../contexts/interfaces";

interface CartDayEditScreenProps {
    route: {
        params: {
            cartDay: ICartDay
        }
    }
}

const CartDayEditScreen: React.FC<CartDayEditScreenProps> = ({ route }) => {
    const [place, setPlace] = useState<string>('')
    const { state, editCartDay } = useContext(CartsScheduleContext)

    useEffect(() => {
        setPlace(route.params.cartDay.place)
    }, [])

    return (
        <View style={styles.container}>
            <Input 
                value={place}
                onChangeText={setPlace}
                label={<Text style={styles.labelStyle}>Miejsce</Text>}
                inputContainerStyle={styles.inputContainer}
                containerStyle={styles.containerInput}
                placeholder="Wpisz lokalizację wózka"
            />
           
            <ButtonC 
                title="Edytuj dzień wózka"
                isLoading={state.isLoading}
                onPress={() => editCartDay(route.params.cartDay._id, place)}
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

export default CartDayEditScreen;