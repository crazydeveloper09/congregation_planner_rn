import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, Platform } from "react-native";
import logo_transparent from '../images/logo_transparent.png';
import { NavigationProp } from "@react-navigation/native";
import useLocaLization from "../hooks/useLocalization";
import { authTranslations } from "./Congregation/translations";
import { Context as SettingsContext } from "../contexts/SettingsContext";
import ButtonC from "../commonComponents/Button";
import { isTablet } from "../helpers/devices";
import { mainTranslations } from "../../localization";
import useOrientation from "../hooks/useOrientation";

interface WelcomeScreenProps {
    navigation: NavigationProp<any>
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    const settingsContext = useContext(SettingsContext);
    const authTranslate = useLocaLization(authTranslations);
    const mainTranslate = useLocaLization(mainTranslations);
    const orientation = useOrientation();
    const isMobile = Platform.OS === "android" || Platform.OS === "ios";

    return (
        <ScrollView style={[styles.container, { backgroundColor: settingsContext.state.mainColor }]} contentContainerStyle={{ alignItems: 'center', justifyContent:'center', marginTop: orientation === 'portrait' && !isTablet ? 50: 0}}>
            {isTablet ? <Image source={logo_transparent} width={150} height={150} /> : <Image source={logo_transparent} style={styles.image} />}
            <Text style={[styles.title, { fontSize: ( isTablet ? 30: 25) + settingsContext.state.fontIncrement }]}>{authTranslate.t('greeting')}</Text>
            
            <View style={[{ flexDirection: 'column', gap: 20, marginTop: 20, width: '100%' }]}>
            
                <Text style={[styles.label, { fontSize: 18 + settingsContext.state.fontIncrement}]}>{mainTranslate.t("registeredCong")}</Text>
                <ButtonC 
                    title={authTranslate.t('preacherLoginButton')}
                    onPress={() => navigation.navigate("Log in", { type: "preacher" })}
                    color="white"
                    fontColor={settingsContext.state.mainColor}
                />
                <ButtonC 
                    title={authTranslate.t('adminLoginButton')}
                    onPress={() => navigation.navigate("Log in", { type: "admin" })}
                    color="#ffffff35"
                />
                <Text style={[styles.label, { fontSize: 18 + settingsContext.state.fontIncrement}]}>{mainTranslate.t("newCong")}</Text>
                <View style={[styles.view, orientation === 'landscape' ? styles.viewLandscape : {}]}>
                    <ButtonC 
                        title={authTranslate.t("registerLabel")}
                        onPress={() => navigation.navigate("Register")}
                        color="rgba(0, 0, 0, 0.0)"
                        fontColor={"white"}
                        isTransparent
                    />
                </View>
            </View>
            
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        paddingTop: 15,
        flex: 1
    },
    view: {
        marginBottom: 0,
    },
    viewLandscape: {
        marginBottom: 80,
    },
    title: {
        fontFamily: "SatisfyRegular",
        marginBottom: 30,
        color: 'white',
        textAlign: "center",
        width: '100%'
    },
    label: {
        fontSize: 18,
        fontFamily: "PoppinsRegular",
        color: "white"
    },
    image: {
        width: '100%',
        height: 250,
        marginBottom: 30
    }
})

export default WelcomeScreen;