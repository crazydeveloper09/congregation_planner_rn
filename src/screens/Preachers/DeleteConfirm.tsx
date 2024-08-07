import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import { NavigationProp } from "@react-navigation/native";
import Loading from "../../commonComponents/Loading";
import { FontAwesome } from "@expo/vector-icons";
import ButtonC from "../../commonComponents/Button";
import useLocaLization from "../../hooks/useLocalization";
import { preachersTranslations } from "./translations";
import { mainTranslations } from "../../../localization";

interface PreacherDeleteConfirmScreenProps {
    navigation: NavigationProp<any>;
    route: {
        params: {
            id: string
        }
    }
}

const PreacherDeleteConfirmScreen: React.FC<PreacherDeleteConfirmScreenProps> = ({ navigation, route }) => {
    const [preacherID, setPreacherID] = useState(route.params.id)
    const {state, loadPreacherInfo, deletePreacher} = useContext(PreachersContext);
    const preacherTranslate = useLocaLization(preachersTranslations);
    const mainTranslate = useLocaLization(mainTranslations)

    useEffect(() => {
        loadPreacherInfo(preacherID)
    }, [preacherID])

    if(state.isLoading) {
        return <Loading />
    }

    
    if(state.errMessage){
        Alert.alert("Server error", state.errMessage)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{preacherTranslate.t("deleteConfirmText", {name: state.preacher?.name})}</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ width: '48%' }}>
                    <ButtonC title={mainTranslate.t("yes")} onPress={() => deletePreacher(preacherID)} isLoading={state.isLoading} color="#AD371F" />
                </View>
                <View style={{ width: '48%' }}>
                <ButtonC title={mainTranslate.t("no")} onPress={() => navigation.navigate('PreachersList')} />
                </View>
            
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    text: {
        fontSize: 21,
        marginVertical: 10,
    }
})

export default PreacherDeleteConfirmScreen;