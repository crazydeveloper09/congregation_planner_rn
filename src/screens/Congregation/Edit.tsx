import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Context as AuthContext } from "../../contexts/AuthContext";
import Loading from "../../commonComponents/Loading";
import ButtonC from "../../commonComponents/Button";
import MyInput from "../../commonComponents/MyInput";

const CongregationEditScreen: React.FC = () => {
    const { editCongregation, state, loadCongregationInfo } = useContext(AuthContext);
    const [username, setUsername] = useState('')
    const [ministryOverseerEmail, setMinistryOverseerEmail] = useState('')
    const [territoryServantEmail, setTerritoryServantEmail] = useState('')
    const [mainCity, setMainCity] = useState('')

    useEffect(() => {
        loadCongregationInfo();
        setUsername(state.congregation?.username!)
        setTerritoryServantEmail(state.congregation?.territoryServantEmail!)
        setMinistryOverseerEmail(state.congregation?.ministryOverseerEmail!)
        setMainCity(state.congregation?.mainCity!)
    }, [])

    if(state.isLoading) {
        return <Loading />
    }

    if(state.errMessage){
        Alert.alert("Server error", state.errMessage)
    }
    return (
        <View style={styles.container}>
            <MyInput 
                label="Edytuj nazwę zboru"
                placeholder='Wpisz nazwę zboru'
                value={username}
                onChangeText={setUsername}
            />

            <MyInput 
                label="Edytuj mail sługi terenu"
                placeholder='Wpisz mail sługi terenu'
                value={territoryServantEmail}
                onChangeText={setTerritoryServantEmail}
            />
            <MyInput 
                label="Edytuj mail nadzorcy służby"
                placeholder='Wpisz mail nadzorcy służby'
                value={ministryOverseerEmail}
                onChangeText={setMinistryOverseerEmail}
            />
            <MyInput 
                label="Edytuj główne miasto zboru"
                placeholder='Wpisz główne miasto zboru'
                value={mainCity}
                onChangeText={setMainCity}
            />

            <ButtonC title='Edytuj zbór' isLoading={state.isLoading} onPress={() => editCongregation(username, territoryServantEmail, ministryOverseerEmail, mainCity, state.congregation?._id)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
        padding: 15,
        flex: 1,
        justifyContent: 'center'
    },
})

export default CongregationEditScreen;