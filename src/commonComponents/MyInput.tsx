import { Input, InputProps } from "@rneui/base";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import Label from "./Label";
import { Context as SettingsContext } from "../contexts/SettingsContext";

interface MyInputProps extends InputProps {
    error?: string;
}

const MyInput: React.FC<MyInputProps> = (props) => {
    const settingsContext = useContext(SettingsContext);

    return (
        <Input
            value={props.value}
            onChangeText={props.onChangeText}
            label={<Label text={props.label as string} />}
            inputContainerStyle={[
                styles.inputContainer,
                { padding: 8 + settingsContext.state.fontIncrement },
                props.error && { borderColor: '#d00' },
            ]}
            containerStyle={styles.containerInput}
            keyboardType={props.keyboardType}
            inputStyle={{
                fontSize: 15 + settingsContext.state.fontIncrement,
            }}
            placeholder={props.placeholder}
            secureTextEntry={props.secureTextEntry}
            autoCorrect={props.autoCorrect}
            autoCapitalize={props.autoCapitalize}
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
            errorMessage={props.error}
            errorStyle={styles.errorStyle}
        />
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 6,
        padding: 8,
        borderColor: "black",
    },
    containerInput: {
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    errorStyle: {
        color: "#d00",
        fontFamily: "PoppinsRegular",
        fontSize: 13,
        marginVertical: 6,
        marginLeft: 4,
    },
});

export default MyInput;
