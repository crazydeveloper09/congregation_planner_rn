import { Input } from '@rneui/themed';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import ButtonC from '../../commonComponents/Button';
import { Context as PreachersContext } from '../../contexts/PreachersContext';
import DropDownPicker from 'react-native-dropdown-picker';
import MyInput from '../../commonComponents/MyInput';
import Label from '../../commonComponents/Label';
import { defaultStyles } from '../defaultStyles';
import useLocaLization from '../../hooks/useLocalization';
import { preachersTranslations } from './translations';

const PreachersNewScreen: React.FC = () => {
    const [name, setName] = useState('');
    const {addPreacher, state} = useContext(PreachersContext)
    const [rolesValue, setRolesValue] = useState<string[]>(['can_see_meetings', 'can_see_minimeetings'])
    const [rolesOpen, setRolesOpen] = useState<boolean>(false);
    const preacherTranslate = useLocaLization(preachersTranslations);
    const [rolesItems, setRolesItems] = useState([
        {label: preacherTranslate.t("can_see_meetings"), value: 'can_see_meetings'},
        {label: preacherTranslate.t("can_lead_meetings"), value: 'can_lead_meetings'},
        {label: preacherTranslate.t("can_have_assignment"), value: 'can_have_assignment'},
        {label: preacherTranslate.t("can_edit_meetings"), value: 'can_edit_meetings'},
        {label: preacherTranslate.t("can_say_prayer"), value: 'can_say_prayer'},
        {label: preacherTranslate.t("can_be_reader"), value: 'can_be_reader'},
        {label: preacherTranslate.t("can_lead_minimeetings"), value: 'can_lead_minimeetings'},
        {label: preacherTranslate.t("can_see_minimeetings"), value: 'can_see_minimeetings'},
        {label: preacherTranslate.t("can_edit_minimeetings"), value: 'can_edit_minimeetings'},
        {label: preacherTranslate.t("can_see_cartSchedule"), value: 'can_see_cartSchedule'},
        {label: preacherTranslate.t("can_self-assign_cartHour"), value: 'can_self-assign_cartHour'},
        {label: preacherTranslate.t("can_edit_cartSchedule"), value: 'can_edit_cartSchedule'},
        {label: preacherTranslate.t("can_see_audio_video"), value: 'can_see_audio_video'},
        {label: preacherTranslate.t("can_be_video"), value: 'can_be_video'},
        {label: preacherTranslate.t("can_be_audio"), value: 'can_be_audio'},
        {label: preacherTranslate.t("can_take_mic"), value: 'can_take_mic'},
        {label: preacherTranslate.t("can_be_ordinal"), value: 'can_be_ordinal'},
        {label: preacherTranslate.t("can_edit_audio_video"), value: 'can_edit_audio_video'}
    ]);

    
    if(state.errMessage){
        Alert.alert("Server error", state.errMessage)
    }

    return (
        <View style={styles.container}>
            <MyInput 
                label={preacherTranslate.t("nameLabel")}
                placeholder={preacherTranslate.t("namePlaceholder")}
                value={name}
                onChangeText={setName}
            />
            <Label text={preacherTranslate.t("rolesLabel")} />
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
                placeholder={preacherTranslate.t("rolesPlaceholder")}
            />
            <ButtonC title="Dodaj głosiciela" isLoading={state.isLoading} onPress={() => addPreacher(name, rolesValue)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        justifyContent: 'center'
    },
})

export default PreachersNewScreen;