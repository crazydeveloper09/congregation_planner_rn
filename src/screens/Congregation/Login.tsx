import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input, Text, Button } from '@rneui/themed';
import ButtonC from '../../commonComponents/Button';
import { Context as AuthContext } from '../../contexts/AuthContext';
import MyInput from '../../commonComponents/MyInput';
import useLocaLization from '../../hooks/useLocalization';
import { authTranslations } from './translations';
import { Context as SettingsContext } from "../../contexts/SettingsContext";

interface CongregationsLoginScreenProps {
    route: {
        params: {
            type: string
        }
    }
}

const CongregationsLoginScreen: React.FC<CongregationsLoginScreenProps> = ({ route }) => {
    const { state, signIn, logInPreacher } = useContext(AuthContext);
    const [ username, setUsername ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ link, setLink ] = useState<string>('')
    const i18n = useLocaLization(authTranslations);
    const settingsContext = useContext(SettingsContext);

    return (
        <KeyboardAwareScrollView enableOnAndroid={true} style={styles.container} contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <Text h3 style={[styles.header, { color: settingsContext.state.mainColor, fontSize: 21 + settingsContext.state.fontIncrement }]}>{i18n.t('loginHeading')}</Text>
            { state.errMessage && <Text style={styles.errMessage}>{state.errMessage}</Text> }
            { state.successMessage && <Text style={styles.successMessage}>{state.successMessage}</Text> }
            {route.params.type === "admin" ? <>
            <MyInput 
                label={i18n.t('usernameLabel')}
                placeholder={i18n.t('usernamePlaceholder')}
                value={username}
                onChangeText={setUsername}
                autoCapitalize='none'
                autoCorrect={false}
            />
            <MyInput 
                label={i18n.t('passwordLabel')}
                placeholder={i18n.t('passwordPlaceholder')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize='none'
                autoCorrect={false}
            />
            
            <ButtonC 
                title={i18n.t('loginButtonText')}
                onPress={() => signIn({ username, password })}
                isLoading={state.isLoading}
            />
            </> : <>
            <MyInput 
                label={i18n.t('specialLinkLabel')}
                placeholder={i18n.t('specialLinkPlaceholder')}
                value={link}
                onChangeText={setLink}
                autoCapitalize='none'
                autoCorrect={false}
            />
    
            
            <ButtonC 
                title={i18n.t('loginButtonText')}
                onPress={() => logInPreacher(link)}
                isLoading={state.isLoading}
            />
            </>}
            
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    header: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'MontserratSemiBold',
    },
    button: {
        backgroundColor: '#28a745'
    },
    errMessage: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    },
    successMessage: {
        color: 'green',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    }
})

export default CongregationsLoginScreen;