import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, Alert, Text} from 'react-native';
import { Context as PreachersContext } from '../../contexts/PreachersContext';
import ButtonC from '../../commonComponents/Button';
import { Input } from '@rneui/themed';
import Loading from '../../commonComponents/Loading';
import DropDownPicker from 'react-native-dropdown-picker';
import { IPreacher } from '../../contexts/interfaces';
import { preacherRoles } from './helpers/roles';
import MyInput from '../../commonComponents/MyInput';
import Label from '../../commonComponents/Label';
import { defaultStyles } from '../defaultStyles';

interface PreachersEditScreenProps {
    navigation: NavigationProp<any>;
    route: {
        params: {
            preacher: IPreacher
        }
    }
}

const PreachersEditScreen: React.FC<PreachersEditScreenProps> = ({ navigation, route }) => {
    const { preacher } = route.params;
    const { state, loadPreacherInfo, editPreacher} = useContext(PreachersContext)
    const [name, setName] = useState(preacher.name);
    const [rolesValue, setRolesValue] = useState<string[]>(['can_see_meetings', 'can_see_minimeetings'])
    const [rolesOpen, setRolesOpen] = useState<boolean>(false);
    const [rolesItems, setRolesItems] = useState([
        {label: 'Może wyświetlać plan zebrań', value: 'can_see_meetings'},
        {label: 'Może przewodniczyć zebraniu', value: 'can_lead_meetings'},
        {label: 'Może mieć zadanie na zebraniu', value: 'can_have_assignment'},
        {label: 'Może edytować plan zebrań', value: 'can_edit_meetings'},
        {label: 'Może pomodlić się na zebraniu', value: 'can_say_prayer'},
        {label: 'Może lektorować na zebraniu', value: 'can_be_reader'},
        {label: 'Może poprowadzić zbiórkę', value: 'can_lead_minimeetings'},
        {label: 'Może wyświetlać plan zbiórek', value: 'can_see_minimeetings'},
        {label: 'Może edytować plan zbiórek', value: 'can_edit_minimeetings'},
        {label: 'Może wyświetlać plan wózka', value: 'can_see_cartSchedule'},
        {label: 'Może zapisać się sam na wózek', value: 'can_self-assign_cartHour'},
        {label: 'Może edytować plan wózka', value: 'can_edit_cartSchedule'},
        {label: 'Może wyświetlać plan audio-wideo i porządkowych', value: 'can_see_audio_video'},
        {label: 'Może być operatorem wideo', value: 'can_be_video'},
        {label: 'Może być operatorem audio', value: 'can_be_audio'},
        {label: 'Może nosić mikrofony', value: 'can_take_mic'},
        {label: 'Może być porządkowym', value: 'can_be_ordinal'},
        {label: 'Może edytować plan audio-wideo i porządkowych', value: 'can_edit_audio_video'}
    ]);


    useEffect(() => {
        const selectItems = preacher?.roles.map((role) => role)
        setRolesValue(selectItems)
    }, [])

    if(state.isLoading){
        return <Loading />
    }

    
    if(state.errMessage){
        Alert.alert("Server error", state.errMessage)
    }


    return (
        <View style={styles.container}>
            <MyInput 
                label="Edytuj imię i nazwisko głosiciela"
                placeholder='Wpisz imię i nazwisko'
                value={name}
                onChangeText={setName}
            />
            <Label text="Role" />
            <DropDownPicker 
                multiple={true}
                value={rolesValue}
                setValue={setRolesValue}
                open={rolesOpen}
                setOpen={setRolesOpen}
                items={rolesItems}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                containerStyle={{
                    marginVertical: 8
                }}
                placeholder="Wybierz rolę"
            />
            <ButtonC title="Edytuj głosiciela" onPress={() => editPreacher(name, preacher._id, rolesValue)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
        padding: 15,
        flex: 1,
        justifyContent: 'center'
    }
})

export default PreachersEditScreen;