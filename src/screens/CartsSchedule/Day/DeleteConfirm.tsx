import { NavigationProp } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ICartDay } from "../../../contexts/interfaces";
import ButtonC from "../../../commonComponents/Button";
import { Context as CartsScheduleContext } from "../../../contexts/CartsScheduleContext";
import useLocaLization from "../../../hooks/useLocalization";
import { cartScheduleTranslations } from "../translations";
import { mainTranslations } from "../../../../localization";

interface CartDayDeleteConfirmScreenProps { 
    navigation: NavigationProp<any>
    route: {
        params: {
            cartDay: ICartDay
        }
    }
}

const CartDayDeleteConfirmScreen: React.FC<CartDayDeleteConfirmScreenProps> = ({ navigation, route }) => {
    const { state, deleteCartDay } = useContext(CartsScheduleContext);
    const cartScheduleTranslate = useLocaLization(cartScheduleTranslations)
    const mainTranslate = useLocaLization(mainTranslations)
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>

            <Text style={styles.text}>{cartScheduleTranslate.t("deleteConfirmText", {date: route.params.cartDay.date} )}</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ width: '48%' }}>
                    <ButtonC title={mainTranslate.t("yes")} onPress={() => deleteCartDay(route.params.cartDay._id)} isLoading={state.isLoading} color="#AD371F" />
                </View>
                <View style={{ width: '48%' }}>
                <ButtonC title={mainTranslate.t("no")} onPress={() => navigation.navigate('Carts Schedule Index')} />
                </View>
            
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 80,
        flex: 1,
    },
    text: {
        fontSize: 21,
        marginVertical: 10,
    }
})

export default CartDayDeleteConfirmScreen;