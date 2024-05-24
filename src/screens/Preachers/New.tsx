import { Input } from '@rneui/themed';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import ButtonC from '../../commonComponents/Button';
import { Context as PreachersContext } from '../../contexts/PreachersContext';
import DropDownPicker from 'react-native-dropdown-picker';

const PreachersNewScreen: React.FC = () => {
    const [name, setName] = useState('');
    const {addPreacher, state} = useContext(PreachersContext)
    const [rolesValue, setRolesValue] = useState<string[]>(['can_see_meetings', 'can_see_minimeetings'])
    const [rolesOpen, setRolesOpen] = useState<boolean>(false);
    const [rolesItems, setRolesItems] = useState([
        {label: 'Może wyświetlać plan zebrań', value: 'can_see_meetings'},
        {label: 'Może przewodniczyć zebraniu', value: 'can_lead_meetings'},
        {label: 'Może mieć zadanie na zebraniu', value: 'can_have_assignment'},
        {label: 'Może edytować plan zebrań', value: 'can_edit_meetings'},
        {label: 'Może pomodlić się na zebraniu', value: 'can_say_prayer'},
        {label: 'Może poprowadzić zbiórkę', value: 'can_lead_minimeetings'},
        {label: 'Może wyświetlać plan zbiórek', value: 'can_see_minimeetings'},
        {label: 'Może edytować plan zbiórek', value: 'can_edit_minimeetings'},
        {label: 'Może wyświetlać plan wózka', value: 'can_see_cartSchedule'},
        {label: 'Może edytować plan wózka', value: 'can_edit_cartSchedule'},
        {label: 'Może wyświetlać plan audio-wideo i porządkowych', value: 'can_see_audio_video'},
        {label: 'Może edytować plan audio-wideo i porządkowych', value: 'can_edit_audio_video'}
    ]);

    
    if(state.errMessage){
        Alert.alert("Server error", state.errMessage)
    }

    return (
        <View style={styles.container}>
            <Input 
                label="Imię i nazwisko głosiciela"
                placeholder='Wpisz imię i nazwisko'
                inputContainerStyle={styles.inputContainer}
                labelStyle={styles.labelStyle}
                containerStyle={styles.containerInput}
                value={name}
                onChangeText={setName}
            />
             <Text style={styles.labelStyle}>Role</Text>
            <DropDownPicker 
                multiple={true}
                value={rolesValue}
                setValue={setRolesValue}
                open={rolesOpen}
                setOpen={setRolesOpen}
                items={rolesItems}
                containerStyle={{
                    marginVertical: 8
                }}
                placeholder="Wybierz rolę"
            />
            <ButtonC title="Dodaj głosiciela" isLoading={state.isLoading} onPress={() => addPreacher(name, rolesValue)} />
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
    }
})

export default PreachersNewScreen;