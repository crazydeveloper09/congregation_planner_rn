import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as CartsScheduleContext } from "../../../contexts/CartsScheduleContext";
import { Input } from "react-native-elements";
import ButtonC from "../../../commonComponents/Button";
import { ICartDay } from "../../../contexts/interfaces";
import MyInput from "../../../commonComponents/MyInput";
import useLocaLization from "../../../hooks/useLocalization";
import { cartScheduleTranslations } from "../translations";

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
    const cartScheduleTranslate = useLocaLization(cartScheduleTranslations)

    useEffect(() => {
        setPlace(route.params.cartDay.place)
    }, [])

    return (
        <View style={styles.container}>
            <MyInput 
                value={place}
                onChangeText={setPlace}
                label={cartScheduleTranslate.t("placeLabel")}
                placeholder={cartScheduleTranslate.t("placePlaceholder")}
            />
           
            <ButtonC 
                title={cartScheduleTranslate.t("editText")}
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
})

export default CartDayEditScreen;