import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../contexts/AuthContext";
import { Context as PreachersContext } from "../contexts/PreachersContext";
import MainNavigator from "./Main";
import AuthNavigator from "./Auth";
import * as LocalAuthentication from 'expo-local-authentication';

const SwitchNavigator = () => {
    const { state, tryLocalSignIn, signOut } = useContext(AuthContext);
    const preachersContext = useContext(PreachersContext)

    const checkIdentity = () => {
        LocalAuthentication
            .authenticateAsync({
                promptMessage: 'Potwierdź swoją tożsamość, by dokonano automatycznego logowania'
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
        
    }, [])

    return state.token ? <MainNavigator /> : <AuthNavigator />
}

export default SwitchNavigator;