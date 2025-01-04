import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import logo_transparent from '../images/logo_transparent.png';
import { NavigationProp } from "@react-navigation/native";
import useLocaLization from "../hooks/useLocalization";
import { authTranslations } from "./Congregation/translations";
import { Context as SettingsContext } from "../contexts/SettingsContext";
import ButtonC from "../commonComponents/Button";
import { isTablet } from "../helpers/devices";

interface WelcomeScreenProps {
    navigation: NavigationProp<any>
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    const settingsContext = useContext(SettingsContext);
    const i18n = useLocaLization(authTranslations);

    return (
        <ScrollView style={[styles.container, { backgroundColor: settingsContext.state.mainColor }]} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1}}>
            {isTablet ? <Image source={logo_transparent} width={200} height={200} /> : <Image source={logo_transparent} style={styles.image} />}
            <Text style={[styles.title, { fontSize: ( isTablet ? 30: 25) + settingsContext.state.fontIncrement }]}>{i18n.t('greeting')}</Text>
            
            <View style={{ flexDirection: 'column', gap: 20 }}>
                <ButtonC 
                    title={i18n.t('adminLoginButton')}
                    onPress={() => navigation.navigate("Log in", { type: "admin" })}
                    color="#ffffff35"
                />

                <ButtonC 
                    title={i18n.t('preacherLoginButton')}
                    onPress={() => navigation.navigate("Log in", { type: "preacher" })}
                    color="white"
                    fontColor={settingsContext.state.mainColor}
                />
            </View>
            
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
    },
    title: {
        fontFamily: "SatisfyRegular",
        marginBottom: 30,
        color: 'white'
    },
    image: {
        width: '100%',
        height: 250,
        marginBottom: 30
    }
})

export default WelcomeScreen;