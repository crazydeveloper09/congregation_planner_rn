import { Input, InputProps } from "@rneui/base";
import React from "react";
import { StyleSheet, Text } from "react-native";
import Label from "./Label";

const MyInput: React.FC<InputProps> = (props) => {
    return (
        <Input 
            value={props.value}
            onChangeText={props.onChangeText}
            label={<Label text={props.label as string} />}
            inputContainerStyle={styles.inputContainer}
            containerStyle={styles.containerInput}
            keyboardType={props.keyboardType}
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