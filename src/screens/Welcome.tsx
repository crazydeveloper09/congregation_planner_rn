import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import logo_transparent from '../images/logo_transparent.png';
import { Link, NavigationProp } from "@react-navigation/native";
import { Button } from "react-native-paper";
import useLocaLization from "../hooks/useLocalization";
import { authTranslations } from "./Congregation/translations";
import { Context as SettingsContext } from "../contexts/SettingsContext";
import ButtonC from "../commonComponents/Button";
import { hexToRGB } from "../helpers/colors";

interface WelcomeScreenProps {
    navigation: NavigationProp<any>
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    const settingsContext = useContext(SettingsContext);
    const i18n = useLocaLization(authTranslations);
    const buttonColor = hexToRGB(settingsContext.state.mainColor, 0.4);
    console.log(hexToRGB(settingsContext.state.mainColor, 0.4))
    return (
        <ScrollView style={[styles.container, { backgroundColor: settingsContext.state.mainColor }]} contentContainerStyle={{  justifyContent: 'center', alignItems: 'center', }}>
            <Image source={logo_transparent} width={200} height={200} />
            <Text style={styles.title}>{i18n.t('greeting')}</Text>
    
            <Button mode="contained" buttonColor={"#ffffff35"} style={styles.button} labelStyle={{ fontSize: 18 }} onPress={() => navigation.navigate("Log in", { type: "admin" })}>
                <Text>{i18n.t('adminLoginButton')}</Text>
            </Button>
            
            <Button mode="contained" buttonColor="white" textColor={settingsContext.state.mainColor} labelStyle={{ fontSize: 18 }} style={styles.button} onPress={() => navigation.navigate("Log in", { type: "preacher" })}>
                <Text>{i18n.t('preacherLoginButton')}</Text>
            </Button>
            
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        
    },
    title: {
        fontFamily: "SatisfyRegular",
        fontSize: 30,
        marginBottom: 20,
        color: 'white'
    },
    button: {
        width: '100%',
        marginBottom: 20,
        borderRadius: 6,
        padding: 4
    }
})

export default WelcomeScreen;