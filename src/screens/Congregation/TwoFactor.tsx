import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import { Context as AuthContext } from '../../contexts/AuthContext';
import ButtonC from '../../commonComponents/Button';
import MyInput from '../../commonComponents/MyInput';
import useLocaLization from '../../hooks/useLocalization';
import { authTranslations } from './translations';
import { Context as SettingsContext } from "../../contexts/SettingsContext";

const CongregationsTwoFactorScreen: React.FC = () => {
    const [code, setCode] = useState<string>();
    const { state, verifyUser } = useContext(AuthContext)
    const i18n = useLocaLization(authTranslations);
    const settingsContext = useContext(SettingsContext);

    return (
        <View style={styles.container}>
            <Text h3 style={[styles.header, { color: settingsContext.state.mainColor, fontSize: 21 + settingsContext.state.fontIncrement }]}>{i18n.t('twoFactorHeading')}</Text>
            { state.errMessage && <Text style={styles.errMessage}>{state.errMessage}</Text> }
            { state.successMessage && <Text style={styles.successMessage}>{state.successMessage}</Text> }
            <MyInput 
                label={i18n.t('codeLabel')}
                placeholder={i18n.t('codePlaceholder')}
                value={code}
                onChangeText={setCode}
            />
            <ButtonC 
                title={i18n.t('twoFactorButtonText')}
                onPress={() => verifyUser({ code, userID: state.userID })}
                isLoading={state.isLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        justifyContent: 'center'
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

export default CongregationsTwoFactorScreen;