import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import logo_transparent from '../images/logo_transparent.png';
import { Link, NavigationProp } from "@react-navigation/native";
import { Button } from "react-native-paper";
import useLocaLization from "../hooks/useLocalization";
import { authTranslations } from "./Congregation/translations";

interface WelcomeScreenProps {
    navigation: NavigationProp<any>
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    
    const i18n = useLocaLization(authTranslations);

    return (
        <View style={styles.container}>
            <Image source={logo_transparent} width={200} height={200} />
            <Text style={styles.title}>{i18n.t('greeting')}</Text>
            <Button mode="contained" buttonColor="#25A5D0" style={styles.button} labelStyle={{ fontSize: 18 }} onPress={() => navigation.navigate("Log in", { type: "admin" })}>
                    <Text>{i18n.t('adminLoginButton')}</Text>
            </Button>
            
            <Button mode="contained" buttonColor="white" textColor="#1F8AAD" labelStyle={{ fontSize: 18 }} style={styles.button} onPress={() => navigation.navigate("Log in", { type: "preacher" })}>
                <Text>{i18n.t('preacherLoginButton')}</Text>
            </Button>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F8AAD',
        justifyContent: 'center',
        alignItems: 'center',
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