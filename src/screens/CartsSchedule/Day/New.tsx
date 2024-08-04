import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Context as CartsScheduleContext } from "../../../contexts/CartsScheduleContext";
import ButtonC from "../../../commonComponents/Button";
import MyInput from "../../../commonComponents/MyInput";
import ChooseDate from "../../../commonComponents/ChooseDate";
import useLocaLization from "../../../hooks/useLocalization";
import { cartScheduleTranslations } from "../translations";

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
    const { state, addCartDay } = useContext(CartsScheduleContext);
    const cartScheduleTranslate = useLocaLization(cartScheduleTranslations);

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
                label={cartScheduleTranslate.t("placeLabel")}
                placeholder={cartScheduleTranslate.t("placePlaceholder")}
            />

            <MyInput 
                value={startHour}
                onChangeText={setStartHour}
                keyboardType="numeric"
                label={cartScheduleTranslate.t("beginHourLabel")}
                placeholder={cartScheduleTranslate.t("beginHourPlaceholder")}
            />

            <MyInput 
                value={finalHour}
                onChangeText={setFinalHour}
                keyboardType="numeric"
                label={cartScheduleTranslate.t("endHourLabel")}
                placeholder={cartScheduleTranslate.t("endHourPlaceholder")}
    
            />
           
            <ButtonC 
                title={cartScheduleTranslate.t("addText")}
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