import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import logo_transparent from '../images/logo_transparent.png';
import { Link, NavigationProp } from "@react-navigation/native";
import { Button } from "react-native-paper";

interface WelcomeScreenProps {
    navigation: NavigationProp<any>
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={logo_transparent} width={200} height={200} />
            <Text style={styles.title}>Witaj w Congregation Planner</Text>
            <Button mode="contained" buttonColor="#25A5D0" style={styles.button} onPress={() => navigation.navigate("Log in", { type: "admin" })}>
                    <Text>Logowanie administratora</Text>
            </Button>
            
            <Button mode="contained" buttonColor="white" textColor="#1F8AAD" style={styles.button} onPress={() => navigation.navigate("Log in", { type: "preacher" })}>
                <Text>Logowanie głosiciela</Text>
            </Button>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F8AAD',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
        
    },
    title: {
        fontFamily: "SatisfyRegular",
        fontSize: 30,
        marginBottom: 20,
        color: 'white'
    },
    button: {
        width: '100%',
        marginBottom: 20,
        borderRadius: 6
    }
})

export default WelcomeScreen;