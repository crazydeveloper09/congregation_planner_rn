import React, {useContext, useState} from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from '@rneui/themed';
import ButtonC from '../../commonComponents/Button';
import { Context as AuthContext } from '../../contexts/AuthContext';
import MyInput from '../../commonComponents/MyInput';
import useLocaLization from '../../hooks/useLocalization';
import { authTranslations } from './translations';
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import { useResponsive } from '../../hooks/useResponsive';
import InfoText from '../../commonComponents/InfoText';

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
    const authTranslate = useLocaLization(authTranslations);
    const settingsContext = useContext(SettingsContext);
    const { isDesktop } = useResponsive();

    return (
        <KeyboardAwareScrollView enableOnAndroid={true} style={styles.container} contentContainerStyle={[{ flex: 1, justifyContent: 'center' },  isDesktop && { width: '50%', marginHorizontal: 'auto'}]}>
            <Text h3 style={[styles.header, { color: settingsContext.state.mainColor, fontSize: 21 + settingsContext.state.fontIncrement }]}>{authTranslate.t('loginHeading')}</Text>
            { state.errMessage && <Text style={styles.errMessage}>{state.errMessage}</Text> }
            { state.successMessage && <Text style={styles.successMessage}>{state.successMessage}</Text> }
            {route.params.type === "admin" ? <>
            <MyInput 
                label={authTranslate.t('usernameLabel')}
                placeholder={authTranslate.t('usernamePlaceholder')}
                value={username}
                onChangeText={setUsername}
                autoCapitalize='none'
                autoCorrect={false}
            />
            <MyInput 
                label={authTranslate.t('passwordLabel')}
                placeholder={authTranslate.t('passwordPlaceholder')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize='none'
                autoCorrect={false}
            />
            
            <ButtonC 
                title={authTranslate.t('loginButtonText')}
                onPress={() => signIn({ username, password })}
                isLoading={state.isLoading}
            />
            <View style={{ marginTop: 10 }}>
                <ButtonC 
                    title={authTranslate.t('forgotPasswordButtonText')}
                    onPress={() => Linking.openURL("https://www.congregationplanner.pl/forgot")}
                    isLoading={state.isLoading}
                    color="rgba(0, 0, 0, 0.0)"
                    fontColor={settingsContext.state.mainColor}
                    isTransparent
                />
            </View>
        
            </> : <>
                <MyInput 
                    label={authTranslate.t('specialLinkLabel')}
                    placeholder={authTranslate.t('specialLinkPlaceholder')}
                    value={link}
                    onChangeText={setLink}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
        
                
                <ButtonC 
                    title={authTranslate.t('loginButtonText')}
                    onPress={() => logInPreacher(link)}
                    isLoading={state.isLoading}
                />
                <InfoText text={authTranslate.t("specialLinkInstruction")} />
            
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