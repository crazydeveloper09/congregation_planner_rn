import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import { Context as AuthContext } from '../../contexts/AuthContext';
import ButtonC from '../../commonComponents/Button';
import MyInput from '../../commonComponents/MyInput';
import useLocaLization from '../../hooks/useLocalization';
import { authTranslations } from './translations';
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CongregationsVerificationScreen: React.FC = () => {
    const [code, setCode] = useState<string>();
    const { state, verifyNewUser } = useContext(AuthContext)
    const authTranslate = useLocaLization(authTranslations);
    const settingsContext = useContext(SettingsContext);

    return (
        <KeyboardAwareScrollView enableOnAndroid={true} style={styles.container} contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            { state.errMessage && <Text style={styles.errMessage}>{state.errMessage}</Text> }
            { state.successMessage && <Text style={styles.successMessage}>{state.successMessage}</Text> }
            <MyInput 
                label={authTranslate.t('codeLabel')}
                placeholder={authTranslate.t('codePlaceholder')}
                value={code}
                onChangeText={setCode}
            />
            <ButtonC 
                title={authTranslate.t('verificationButtonText')}
                onPress={() => verifyNewUser({ code, userID: state.userID })}
                isLoading={state.isLoading}
            />
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
        color: '#1F8AAD'
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

export default CongregationsVerificationScreen;