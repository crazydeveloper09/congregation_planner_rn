import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Context as CartsScheduleContext } from "../../../contexts/CartsScheduleContext";
import ButtonC from "../../../commonComponents/Button";
import MyInput from "../../../commonComponents/MyInput";
import ChooseDate from "../../../commonComponents/ChooseDate";
import useLocaLization from "../../../hooks/useLocalization";
import { cartScheduleTranslations } from "../translations";
import { Switch } from "react-native-paper";
import { Context as SettingsContext } from "../../../contexts/SettingsContext";
import Label from "../../../commonComponents/Label";

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
    const [isNotFullHour, setIsNotFullHour] = useState<boolean>(false)
    const [startMinute, setStartMinute] = useState<string>('00')
    const [finishMinute, setFinishMinute] = useState<string>('00')
    const [place, setPlace] = useState<string>('')
    const [startHour, setStartHour] = useState<string>('');
    const [finalHour, setFinalHour] = useState<string>('')
    const { state, addCartDay } = useContext(CartsScheduleContext);
    const cartScheduleTranslate = useLocaLization(cartScheduleTranslations);
    const settingsContext = useContext(SettingsContext)

    useEffect(() => {
        setDate(new Date(route.params.date))
    }, [])

    return (
        <ScrollView style={styles.container}>
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
            <Label text={cartScheduleTranslate.t("isNotFullHourSwitchLabel")} />
            <Switch  
                value={isNotFullHour}
                onValueChange={(value) => {
                    setIsNotFullHour(value)
                }}
                style={{ alignSelf: 'flex-start',  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], marginVertical: 10 }}
                color={settingsContext.state.mainColor}
            />
            {isNotFullHour && <>
                <MyInput 
                    value={startMinute}
                    onChangeText={setStartMinute}
                    keyboardType="numeric"
                    label={cartScheduleTranslate.t("startMinuteLabel")}
                    placeholder={cartScheduleTranslate.t("startMinutePlaceholder")}
                />
                <MyInput 
                    value={finishMinute}
                    onChangeText={setFinishMinute}
                    keyboardType="numeric"
                    label={cartScheduleTranslate.t("finishMinuteLabel")}
                    placeholder={cartScheduleTranslate.t("finishMinutePlaceholder")}
                />
            </>}
            <View style={{ marginBottom: 40 }}>
                <ButtonC 
                    title={cartScheduleTranslate.t("addText")}
                    isLoading={state.isLoading}
                    onPress={() => addCartDay(place, startHour, date, finalHour, startMinute, finishMinute)}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
})

export default CartDayNewScreen;