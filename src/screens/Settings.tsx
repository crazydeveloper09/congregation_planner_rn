import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { Context as AuthContext } from '../contexts/AuthContext';
import packageJson from '../../package.json';
import { Button } from "@rneui/themed";
import { NavigationProp } from "@react-navigation/native";
import useLocaLization from "../hooks/useLocalization";
import { mainTranslations } from "../../localization";
import { Context as SettingsContext } from "../contexts/SettingsContext";

interface SettingsScreenProps {
    navigation: NavigationProp<any>
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
    const auth = useContext(AuthContext)
    const mainTranslate = useLocaLization(mainTranslations)
    const {state, changeMainColor, loadColor} = useContext(SettingsContext)

    useEffect(() => {
        loadColor()
    }, [])

    const availableColors = ['#1F8AAD', '#847577', '#AD1F64', '#AD1F1F', '#1FAD4F','#A58940','#629B48','#7A6E9B','#662389','#8A2177','#225354','#6D4420','#19482A','#19315C']

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{mainTranslate.t("chooseColor")}</Text>
            <FlatList 
                data={availableColors}
                renderItem={({ item }) => <TouchableOpacity onPress={() => changeMainColor(item)} style={[styles.color, { backgroundColor: item }, state?.mainColor === item && { borderWidth: 3, borderColor: 'black' }]}>

                </TouchableOpacity>}
                numColumns={2}
                contentContainerStyle={{ gap: 15, marginTop: 15, paddingBottom: 25 }}
                
            />

            <TouchableOpacity onPress={() => navigation.navigate(`Policy_${mainTranslate.locale}`)}>
                <Text style={{ color: state.mainColor, fontFamily: 'MontserratRegular', textAlign: 'center', fontSize: 16 }}>{mainTranslate.t("policyLabel")}</Text>
            </TouchableOpacity>
            
            <Button 
                title={mainTranslate.t("logOutLabel")}
                titleStyle={{ color: state.mainColor, fontFamily: 'MontserratRegular' }} 
                buttonStyle={{ backgroundColor: 'rgba(52, 52, 52, 0.0)' }} 
                onPress={() => auth.signOut()}
            />
        
            <Text style={styles.versionText}>{mainTranslate.t("copyrightLabel")}</Text>
            <Text style={styles.versionText}>{mainTranslate.t("versionLabel")} {packageJson.version}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontFamily: 'PoppinsSemiBold'
    },
    color: {
        width: '48%',
        height: 100,
        marginRight: 10,
        borderRadius: 10
    },
    versionText: {
        fontSize: 13,
        textAlign: 'center',
        color: '#8D7C7C',
        fontFamily: 'MontserratRegular'
    }
})

export default SettingsScreen;