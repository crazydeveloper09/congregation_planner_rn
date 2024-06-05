import { NavigationProp } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { IMeeting, IOrdinal } from "../../../contexts/interfaces";
import Ordinal from "../components/Ordinal";
import ButtonC from "../../../commonComponents/Button";
import { Context as OrdinalContext } from "../../../contexts/OrdinalsContext";
import { ListItem } from "@rneui/base";
import IconDescriptionValue from "../../../commonComponents/IconDescriptionValue";

interface OrdinalDeleteConfirmScreenProps { 
    navigation: NavigationProp<any>
    route: {
        params: {
            meeting: IMeeting,
            ordinal: IOrdinal
        }
    }
}

const OrdinalDeleteConfirmScreen: React.FC<OrdinalDeleteConfirmScreenProps> = ({ navigation, route }) => {
    const { state, deleteOrdinal } = useContext(OrdinalContext)
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <ListItem containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
            
                <View>
                    <ListItem.Title style={styles.date}>{new Date(route.params.meeting.date).toLocaleDateString('pl-PL')}</ListItem.Title>
                    <IconDescriptionValue 
                        iconName="account-supervisor"
                        description="Porządkowy"
                        value={route.params.ordinal.hallway1.name}
                    />

                    {route.params.ordinal.hallway2 && <IconDescriptionValue 
                        iconName="account-supervisor-outline"
                        description="Porządkowy 2"
                        value={route.params.ordinal.hallway2.name}
                    />}
                    <IconDescriptionValue 
                        iconName="account-eye"
                        description="Porządkowy audytorium"
                        value={route.params.ordinal.auditorium.name}
                    />
            
                    {route.params.ordinal.parking && <IconDescriptionValue 
                        iconName="parking"
                        description="Parking"
                        value={route.params.ordinal.parking.name}
                    />}
                </View>
                
            
            </ListItem>

            <Text style={styles.text}>Czy na pewno chcesz usunąć te dane o porządkowych?</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ width: '48%' }}>
                    <ButtonC title="Tak" onPress={() => deleteOrdinal(route.params.meeting._id, route.params.ordinal._id)} isLoading={state.isLoading} color="#AD371F" />
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
    },
    date: {
        fontFamily: "MontserratRegular",
        fontSize: 20,
        marginBottom: 15
    },
})

export default OrdinalDeleteConfirmScreen;