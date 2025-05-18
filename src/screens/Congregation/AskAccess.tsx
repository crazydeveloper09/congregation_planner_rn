import React, { useContext, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Context as AuthContext } from "../../contexts/AuthContext";
import ButtonC from "../../commonComponents/Button";
import MyInput from "../../commonComponents/MyInput";
import useLocaLization from "../../hooks/useLocalization";
import { authTranslations } from "./translations";

const CongregationAskAccessScreen: React.FC = () => {
    const { askAccess, state } = useContext(AuthContext);
    const authTranslate = useLocaLization(authTranslations)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [congName, setCongName] = useState('');

    if(state.errMessage){
        Alert.alert("Server error", state.errMessage)
    }
    return (
        <View style={styles.container}>
            <MyInput 
                label={authTranslate.t("nameLabel")}
                placeholder={authTranslate.t("namePlaceholder")}
                value={name}
                onChangeText={setName}
            />

            <MyInput 
                label={authTranslate.t("usernameLabel")}
                placeholder={authTranslate.t("congNamePlaceholder")}
                value={congName}
                onChangeText={setCongName}
            />
            <MyInput 
                label={authTranslate.t("emailLabel")}
                placeholder={authTranslate.t("emailPlaceholder")}
                value={email}
                onChangeText={setEmail}
            />

            <ButtonC title={authTranslate.t("askAccessButton")} isLoading={state.isLoading} onPress={() => askAccess(name, congName, email)} />
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
    header: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'MontserratSemiBold',
    },
})

export default CongregationAskAccessScreen;