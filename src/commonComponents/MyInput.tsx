import { Input, InputProps } from "@rneui/base";
import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import Label from "./Label";
import { Context as SettingsContext } from "../contexts/SettingsContext";

const MyInput: React.FC<InputProps> = (props) => {
    const settingsContext = useContext(SettingsContext);
    return (
        <Input 
            value={props.value}
            onChangeText={props.onChangeText}
            label={<Label text={props.label as string} />}
            inputContainerStyle={[styles.inputContainer, { padding: 8 + settingsContext.state.fontIncrement }]}
            containerStyle={styles.containerInput}
            keyboardType={props.keyboardType}
            inputStyle={{ fontSize: 15 + settingsContext.state.fontIncrement }}
            placeholder={props.placeholder}
            secureTextEntry={props.secureTextEntry}
            autoCorrect={props.autoCorrect}
            autoCapitalize={props.autoCapitalize}
        />
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 6,
        padding: 8,
        borderColor: 'black',
    },
    labelStyle: {
        fontFamily: 'MontserratSemiBold',
        marginVertical: 8,
        color: 'black',
        fontSize: 17
    },
    containerInput: {
        paddingHorizontal: 0,
        paddingVertical: 0,
    }
})

export default MyInput;