import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { Context as OrdinalContext } from "../../../contexts/OrdinalsContext";
import territories from "../../../api/territories";
import { IMeeting, IOrdinal, IPreacher } from "../../../contexts/interfaces";
import ButtonC from "../../../commonComponents/Button";
import { Switch } from "@rneui/base";
import DropDownPicker from "react-native-dropdown-picker";
import Meeting from "../../Meetings/components/Meeting";

interface OrdinalEditScreenProps {
    route: {
        params: {
            meeting: IMeeting,
            ordinal: IOrdinal
        }
    }
}

const OrdinalEditScreen: React.FC<OrdinalEditScreenProps> = ({ route }) => {
    const [hallway1Value, setHallway1Value] = useState("");
    const [hallway1Open, setHallway1Open] = useState(false);
    const [hallway1Items, setHallway1Items] = useState([]);
    const [isHallway2, setIsHallway2] = useState<boolean>(false);
    const [hallway2Value, setHallway2Value] = useState<string>('')
    const [hallway2Open, setHallway2Open] = useState<boolean>(false);
    const [hallway2Items, setHallway2Items] = useState([]);
    const [auditoriumValue, setAuditoriumValue] = useState<string>('')
    const [auditoriumOpen, setAuditoriumOpen] = useState<boolean>(false);
    const [auditoriumItems, setAuditoriumItems] = useState([]);
    const [isParking, setIsParking] = useState(false)
    const [parkingValue, setParkingValue] = useState<string>('')
    const [parkingOpen, setParkingOpen] = useState<boolean>(false);
    const [parkingItems, setParkingItems] = useState([]);
    const { state, editOrdinal } = useContext(OrdinalContext);


    const loadPreachers = async () => {
        const token = await AsyncStorage.getItem('token')
        territories.get<IPreacher[]>('/preachers/all', {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        .then((response) => {
            const selectItems = response.data.filter((preacher) => preacher.roles.includes("can_see_audio_video")).map((preacher) => {
                return { label: preacher.name, value: preacher._id } as never
            })
            setHallway1Items(selectItems)
            setAuditoriumItems(selectItems)
            setHallway2Items(selectItems)
            setParkingItems(selectItems)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        loadPreachers()
        setHallway1Value(route.params.ordinal.hallway1._id)
        setAuditoriumValue(route.params.ordinal.auditorium._id)
        setHallway2Value(route.params.ordinal.hallway2?._id!)
        setParkingValue(route.params.ordinal.parking?._id!)
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.meeting}>Zobacz kto ma już zadanie na zebraniu</Text>
            <Meeting meeting={route.params.meeting} filter="Wszystkie" />
            <Text style={styles.labelStyle}>Porządkowy (1)</Text>
            <DropDownPicker 
                value={hallway1Value}
                setValue={setHallway1Value}
                open={hallway1Open}
                setOpen={setHallway1Open}
                items={hallway1Items}
                listMode="MODAL"
                modalTitle="Porządkowy (1)"
                placeholder="Wybierz porządkowego (1)"
            />

            <Text style={styles.labelStyle}>Czy jest potrzebny porządkowy 2?</Text>
            <Switch  
                value={isHallway2}
                onValueChange={(value) => setIsHallway2(value)}
                style={styles.switch}
                color={'#1F8AAD'}
            />

            { isHallway2 && <>
                <Text style={styles.labelStyle}>Porządkowy 2</Text>
                <DropDownPicker 
                    value={hallway2Value}
                    setValue={setHallway2Value}
                    open={hallway2Open}
                    setOpen={setHallway2Open}
                    items={hallway2Items}
                    listMode="MODAL"
                    modalTitle="Porządkowy 2"
                    placeholder="Wybierz porządkowego 2"
                />
            </>}

            <Text style={styles.labelStyle}>Porządkowy audytorium</Text>
            <DropDownPicker 
                value={auditoriumValue}
                setValue={setAuditoriumValue}
                open={auditoriumOpen}
                setOpen={setAuditoriumOpen}
                items={auditoriumItems}
                listMode="MODAL"
                modalTitle="Porządkowy audytorium"
                placeholder="Wybierz porządkowego audytorium"
            />

            

            <Text style={styles.labelStyle}>Czy jest potrzebny porządkowy na parkingu?</Text>
            <Switch  
                value={isParking}
                onValueChange={(value) => setIsParking(value)}
                style={styles.switch}
                color={'#1F8AAD'}
            />
            {isParking && <>
                <DropDownPicker 
                    value={parkingValue}
                    setValue={setParkingValue}
                    open={parkingOpen}
                    setOpen={setParkingOpen}
                    items={parkingItems}
                    containerStyle={{
                        marginVertical: 8
                    }}
                    listMode="MODAL"
                    modalTitle="Porządkowy parking"
                    placeholder="Wybierz porządkowego na parkingu"
                />

            </>}
            <ButtonC 
                title="Edytuj dane porządkowi"
                isLoading={state.isLoading}
                onPress={() => editOrdinal(route.params.meeting._id, route.params.ordinal._id, hallway1Value, hallway2Value, auditoriumValue, parkingValue)}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    meeting: {
        fontSize: 21,
        color: '#1F8AAD',
        fontFamily: 'PoppinsSemiBold'
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
    switch: {
        alignSelf: 'flex-start',  
        transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
        marginVertical: 8
    },
    containerInput: {
        paddingHorizontal: 0,
        paddingVertical: 0,
    }
})

export default OrdinalEditScreen;