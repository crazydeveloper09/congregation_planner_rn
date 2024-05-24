import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { Context as AuthContext } from '../contexts/AuthContext';
import packageJson from '../../package.json';
import { Button } from "@rneui/themed";
import { NavigationProp } from "@react-navigation/native";

interface SettingsScreenProps {
    navigation: NavigationProp<any>
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
    const auth = useContext(AuthContext)

    return (
        <View style={styles.container}>
            

            <TouchableOpacity onPress={() => navigation.navigate('Policy')}>
                <Text style={{ color: '#1F8AAD', fontFamily: 'MontserratRegular', textAlign: 'center', fontSize: 16 }}>Polityka prywatności i klauzula RODO</Text>
            </TouchableOpacity>
            
            <Button 
                title='Wyloguj się' 
                titleStyle={{ color: '#1F8AAD', fontFamily: 'MontserratRegular' }} 
                buttonStyle={{ backgroundColor: 'rgba(52, 52, 52, 0.0)' }} 
                onPress={() => auth.signOut()}
            />
        
            <Text style={styles.versionText}>© Stworzone z ❤️ przez Maciej Kuta</Text>
            <Text style={styles.versionText}>Wersja {packageJson.version}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ece9e9",
        padding: 15,
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontFamily: 'PoppinsSemiBold'
    },
    color: {
        width: '48%',
        height: 100,
        marginRight: 10,
        borderRadius: 10
    },
    versionText: {
        fontSize: 13,
        textAlign: 'center',
        color: '#8D7C7C',
        fontFamily: 'MontserratRegular'
    }
})

export default SettingsScreen;