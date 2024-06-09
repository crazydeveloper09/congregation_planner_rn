import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Label from "./Label";

interface ChooseDateProps {
    date: Date;
    setDate: Function;
    setDateOpen: Function;
    dateOpen: boolean;
    mode?: "date" | "datetime",
    label: string
}

const ChooseDate: React.FC<ChooseDateProps> = (props) => {
    return (
        <View>
            <Label text={props.label} />
            <Pressable onPress={() => props.setDateOpen(true)} style={styles.inputContainer}>
                <Text>
                    {props.mode === "datetime" ? props.date.toLocaleString() : props.date.toLocaleDateString()} 
                </Text>
            </Pressable>
            <DateTimePicker date={props.date} onConfirm={(date) => {
                props.setDate(date)
                props.setDateOpen(false)
            }} onCancel={() => props.setDateOpen(false)} isVisible={props.dateOpen} mode={props.mode || "date"} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 6,
        padding: 18,
        borderColor: 'black',
    },
})

export default ChooseDate;