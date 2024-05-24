import { NavigationProp } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { IOrdinal } from "../../../contexts/interfaces";
import Ordinal from "../components/Ordinal";
import ButtonC from "../../../commonComponents/Button";
import { Context as OrdinalContext } from "../../../contexts/OrdinalsContext";

interface OrdinalDeleteConfirmScreenProps { 
    navigation: NavigationProp<any>
    route: {
        params: {
            meetingDate: Date,
            meetingID: string,
            ordinal: IOrdinal
        }
    }
}

const OrdinalDeleteConfirmScreen: React.FC<OrdinalDeleteConfirmScreenProps> = ({ navigation, route }) => {
    const { state, deleteOrdinal } = useContext(OrdinalContext)
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <Ordinal ordinal={route.params.ordinal!} meetingDate={route.params.meetingDate} meetingID={route.params.meetingID} />
            <Text style={styles.text}>Czy na pewno chcesz usunąć te dane o porządkowych?</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ width: '48%' }}>
                    <ButtonC title="Tak" onPress={() => deleteOrdinal(route.params.meetingID, route.params.ordinal._id)} isLoading={state.isLoading} color="#AD371F" />
                </View>
                <View style={{ width: '48%' }}>
                    <ButtonC title="Nie" onPress={() => navigation.navigate('Audio Index')} />
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

export default OrdinalDeleteConfirmScreen;