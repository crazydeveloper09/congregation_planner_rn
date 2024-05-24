import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text, Button } from '@rneui/themed';
import ButtonC from '../../commonComponents/Button';
import { Context as AuthContext } from '../../contexts/AuthContext';

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

    return (
        <View style={styles.container}>
            <Text h3 style={styles.header}>Zaloguj się do Congregation Planner</Text>
            { state.errMessage && <Text style={styles.errMessage}>{state.errMessage}</Text> }
            { state.successMessage && <Text style={styles.successMessage}>{state.successMessage}</Text> }
            {route.params.type === "admin" ? <>
            <Input 
                label="Nazwa zboru"
                placeholder='Wpisz nazwę zboru'
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.labelStyle}
                containerStyle={styles.containerInput}
                value={username}
                onChangeText={setUsername}
                autoCapitalize='none'
                autoCorrect={false}
            />
            <Input 
                label="Hasło"
                placeholder='Wpisz hasło'
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.labelStyle}
                containerStyle={styles.containerInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize='none'
                autoCorrect={false}
            />
            
            <ButtonC 
                title={'Zaloguj się'}
                onPress={() => signIn({ username, password })}
                isLoading={state.isLoading}
            />
            </> : <>
            <Input 
                label="Specjalny link"
                placeholder='Wklej specjalny link'
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.labelStyle}
                containerStyle={styles.containerInput}
                value={link}
                onChangeText={setLink}
                autoCapitalize='none'
                autoCorrect={false}
            />
    
            
            <ButtonC 
                title={'Zaloguj się'}
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
    inputContainer: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 6,
        padding: 5,
        borderColor: 'black',
    },
    labelStyle: {
        fontFamily: 'MontserratSemiBold',
        marginBottom: 6,
        color: 'black'
    },
    containerInput: {
        paddingHorizontal: 0,
        paddingVertical: 0,
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