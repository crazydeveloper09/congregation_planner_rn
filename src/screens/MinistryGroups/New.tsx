import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import { Context as MinistryGroupContext } from "../../contexts/MinistryGroupContext";
import { Input } from "@rneui/themed";
import DropDownPicker from "react-native-dropdown-picker";
import Loading from "../../commonComponents/Loading";
import ButtonC from "../../commonComponents/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import territories from "../../api/territories";
import { IPreacher } from "../../contexts/interfaces";
import MyInput from "../../commonComponents/MyInput";
import { defaultStyles } from "../defaultStyles";
import Label from "../../commonComponents/Label";

interface MinistryGroupNewScreenProps {
    route: {
        params: {
            congregationID: string
        }
    }
}

const MinistryGroupNewScreen: React.FC<MinistryGroupNewScreenProps> = ({ route }) => {
    const ministryGroup = useContext(MinistryGroupContext);
    const preachers = useContext(PreachersContext);

    const [name, setName] = useState('')
    const [preachersValue, setPreachersValue] = useState([]);
    const [preachersOpen, setPreachersOpen] = useState(false);
    const [preachersItems, setPreachersItems] = useState([]);
    const [overseerOpen, setOverseerOpen] = useState(false);
    const [overseerValue, setOverseerValue] = useState(null);
    const [overseerItems, setOverseerItems] = useState([]);

    const loadPreachers = async () => {
        const token = await AsyncStorage.getItem('token')
        territories.get<IPreacher[]>('/preachers/all', {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        .then((response) => {
            const selectItems = response.data.map((preacher) => {
                return { label: preacher.name, value: preacher._id } as never
            })
            setPreachersItems(selectItems)
            setOverseerItems(selectItems)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        loadPreachers()
    }, [])

    if(preachers.state.isLoading){
        return <Loading />
    }

    
    if(preachers.state.errMessage || ministryGroup.state.errMessage){
        Alert.alert("Server error", preachers.state.errMessage || ministryGroup.state.errMessage)
    }

    return (
        <View style={styles.container}>
            <MyInput 
                label='Nazwa grupy'
                placeholder="Wpisz nazwę grupy"
                value={name}
                onChangeText={setName}
            />
            <Label text="Wybierz głosicieli" />
            <DropDownPicker
                multiple={true}
                open={preachersOpen}
                value={preachersValue}
                items={preachersItems}
                setOpen={setPreachersOpen}
                setValue={setPreachersValue}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                searchable={true}
                placeholder="Dodaj głosicieli"
            />

            {!preachersOpen && <>
                <Label text="Wybierz nadzorcę służby" />
                <DropDownPicker
                    open={overseerOpen}
                    value={overseerValue}
                    items={overseerItems}
                    setOpen={setOverseerOpen}
                    setValue={setOverseerValue}
                    labelStyle={defaultStyles.dropdown}
                    placeholderStyle={defaultStyles.dropdown}
                    searchable={true}
                    containerStyle={{
                        marginBottom: 20
                    }}
                    placeholder="Wybierz nadzorcę grupy"
                />
            </> }

            <ButtonC title="Dodaj grupę" isLoading={ministryGroup.state.isLoading} onPress={() => ministryGroup.addMinistryGroup(route.params.congregationID, name, preachersValue, overseerValue)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
        padding: 15,
        flex: 1,
        justifyContent: 'center'
    }
})

export default MinistryGroupNewScreen;