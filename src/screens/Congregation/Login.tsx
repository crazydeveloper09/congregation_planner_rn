import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text, Button } from '@rneui/themed';
import ButtonC from '../../commonComponents/Button';
import { Context as AuthContext } from '../../contexts/AuthContext';
import MyInput from '../../commonComponents/MyInput';
import useLocaLization from '../../hooks/useLocalization';
import { authTranslations } from './translations';

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

    return (
        <View style={styles.container}>
            <Text h3 style={styles.header}>{i18n.t('loginHeading')}</Text>
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
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
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