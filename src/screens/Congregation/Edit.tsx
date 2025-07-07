import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Context as AuthContext } from "../../contexts/AuthContext";
import Loading from "../../commonComponents/Loading";
import ButtonC from "../../commonComponents/Button";
import MyInput from "../../commonComponents/MyInput";
import useLocaLization from "../../hooks/useLocalization";
import { authTranslations } from "./translations";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CongregationEditScreen: React.FC = () => {
    const { editCongregation, state, loadCongregationInfo } = useContext(AuthContext);
    const [username, setUsername] = useState('')
    const [ministryOverseerEmail, setMinistryOverseerEmail] = useState('')
    const [territoryServantEmail, setTerritoryServantEmail] = useState('')
    const [mainCity, setMainCity] = useState('');
    const authTranslate = useLocaLization(authTranslations)

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
        <KeyboardAwareScrollView style={styles.container} contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <MyInput 
                label={authTranslate.t("usernameLabel")}
                placeholder={authTranslate.t("usernamePlaceholder")}
                value={username}
                onChangeText={setUsername}
            />

            <MyInput 
                label={authTranslate.t("adminLabel")}
                placeholder={authTranslate.t("adminPlaceholder")}
                value={territoryServantEmail}
                onChangeText={setTerritoryServantEmail}
            />
            <MyInput 
                label={authTranslate.t("secondAdminLabel")}
                placeholder={authTranslate.t("secondAdminPlaceholder")}
                value={ministryOverseerEmail}
                onChangeText={setMinistryOverseerEmail}
            />

            <ButtonC title={authTranslate.t("editCongText")} isLoading={state.isLoading} onPress={() => editCongregation(username, territoryServantEmail, ministryOverseerEmail, state.congregation?._id)} />
        </KeyboardAwareScrollView>
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