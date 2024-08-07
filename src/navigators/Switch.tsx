import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../contexts/AuthContext";
import { Context as PreachersContext } from "../contexts/PreachersContext";
import MainNavigator from "./Main";
import AuthNavigator from "./Auth";
import * as LocalAuthentication from 'expo-local-authentication';
import useLocaLization from "../hooks/useLocalization";
import { mainTranslations } from "../../localization";
import { Context as SettingsContext } from "../contexts/SettingsContext";

const SwitchNavigator = () => {
    const { state, tryLocalSignIn, signOut } = useContext(AuthContext);
    const preachersContext = useContext(PreachersContext)
    const mainTranslate = useLocaLization(mainTranslations)
    const settingsContext = useContext(SettingsContext);

    const checkIdentity = () => {
        LocalAuthentication
            .authenticateAsync({
                promptMessage: mainTranslate.t("confirmIdentity")
            })
            .then((result) => {
                tryLocalSignIn()
                preachersContext.loadPreacherInfo(state.preacherID)
            })
            .catch((err) => {
                console.log(err)
                signOut()
            })
    } 

    useEffect(() => {
        checkIdentity()
        settingsContext.loadColor()
    }, [])

    return state.token ? <MainNavigator /> : <AuthNavigator />
}

export default SwitchNavigator;