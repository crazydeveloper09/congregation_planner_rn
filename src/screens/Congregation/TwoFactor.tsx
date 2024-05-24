import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text } from '@rneui/themed';
import { Context as AuthContext } from '../../contexts/AuthContext';
import ButtonC from '../../commonComponents/Button';

const CongregationsTwoFactorScreen: React.FC = () => {
    const [code, setCode] = useState<string>();
    const { state, verifyUser } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <Text h3 style={styles.header}>Dwustopniowa weryfikacja w Congregation Planner</Text>
            { state.errMessage && <Text style={styles.errMessage}>{state.errMessage}</Text> }
            { state.successMessage && <Text style={styles.successMessage}>{state.successMessage}</Text> }
            <Input 
                label='Kod dostępu'
                placeholder='Wpisz kod dostępu'
                value={code}
                onChangeText={setCode}
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.labelStyle}
                containerStyle={styles.containerInput}
            />
            <ButtonC 
                title={'Zweryfikuj konto'}
                onPress={() => verifyUser({ code, userID: state.userID })}
                isLoading={state.isLoading}
            />
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