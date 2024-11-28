import { Input } from '@rneui/themed';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import ButtonC from '../../commonComponents/Button';
import { Context as PreachersContext } from '../../contexts/PreachersContext';
import DropDownPicker from 'react-native-dropdown-picker';
import MyInput from '../../commonComponents/MyInput';
import Label from '../../commonComponents/Label';
import { defaultDropdownStyles } from '../defaultStyles';
import useLocaLization from '../../hooks/useLocalization';
import { preachersTranslations } from './translations';
import { Context as SettingsContext } from "../../contexts/SettingsContext";

const PreachersNewScreen: React.FC = () => {
    const [name, setName] = useState('');
    const {addPreacher, state} = useContext(PreachersContext)
    const preacherTranslate = useLocaLization(preachersTranslations);
    const [rolesValue, setRolesValue] = useState<string[]>(['can_see_meetings', 'can_see_minimeetings'])
    const [rolesOpen, setRolesOpen] = useState<boolean>(false);
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
    const [privilegesValue, setPrivilegesValue] = useState<string[]>([])
    const [privilegesOpen, setPrivilegesOpen] = useState<boolean>(false);
    const [privilegesItems, setPrivilegesItems] = useState([
        {label: preacherTranslate.t("elder"), value: 'elder'},
        {label: preacherTranslate.t("mini_servant"), value: 'mini_servant'},
        {label: preacherTranslate.t("co"), value: 'co'},
        {label: preacherTranslate.t("pioneer"), value: 'pioneer'},
        {label: preacherTranslate.t("aux_pioneer"), value: 'aux_pioneer'},
        {label: preacherTranslate.t("admin"), value: 'admin'},
    ]);
    const settingsContext = useContext(SettingsContext);
    const dropdownStyles = defaultDropdownStyles(settingsContext.state.fontIncrement)

    
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
                modalTitleStyle={dropdownStyles.text}
                labelStyle={[dropdownStyles.container, dropdownStyles.text]}
                placeholderStyle={[dropdownStyles.container, dropdownStyles.text]}
                listMode="MODAL"
                modalTitle={preacherTranslate.t("rolesLabel")}
                containerStyle={{
                    marginVertical: 8
                }}
                placeholder={preacherTranslate.t("rolesPlaceholder")}
            />
            <Label text={preacherTranslate.t("privilegesLabel")} />
            <DropDownPicker 
                multiple={true}
                value={privilegesValue}
                setValue={setPrivilegesValue}
                open={privilegesOpen}
                setOpen={setPrivilegesOpen}
                items={privilegesItems}
                modalTitleStyle={dropdownStyles.text}
                labelStyle={[dropdownStyles.container, dropdownStyles.text]}
                placeholderStyle={[dropdownStyles.container, dropdownStyles.text]}
                listMode="MODAL"
                modalTitle={preacherTranslate.t("privilegesLabel")}
                containerStyle={{
                    marginVertical: 8
                }}
                placeholder={preacherTranslate.t("privilegesPlaceholder")}
            />
            <ButtonC title="Dodaj głosiciela" isLoading={state.isLoading} onPress={() => addPreacher(name, rolesValue, privilegesValue)} />
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