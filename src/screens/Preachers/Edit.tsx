import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, Alert, Text} from 'react-native';
import { Context as PreachersContext } from '../../contexts/PreachersContext';
import ButtonC from '../../commonComponents/Button';
import { Input } from '@rneui/themed';
import Loading from '../../commonComponents/Loading';
import DropDownPicker from 'react-native-dropdown-picker';
import { IPreacher } from '../../contexts/interfaces';
import MyInput from '../../commonComponents/MyInput';
import Label from '../../commonComponents/Label';
import { defaultDropdownStyles } from '../defaultStyles';
import useLocaLization from '../../hooks/useLocalization';
import { preachersTranslations } from './translations';
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import { meetingAssignmentTranslations } from '../Meetings/Assignments/translations';

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
    const preacherTranslate = useLocaLization(preachersTranslations);
    const meetingAssigmentTranslate = useLocaLization(meetingAssignmentTranslations);
    const [rolesItems, setRolesItems] = useState([
        {label: preacherTranslate.t("ui"), value: "ui"},
        {label: preacherTranslate.t("can_see_meetings"), value: 'can_see_meetings', parent: "ui"},
        {label: preacherTranslate.t("can_edit_meetings"), value: 'can_edit_meetings', parent: "ui"},
        {label: preacherTranslate.t("can_see_minimeetings"), value: 'can_see_minimeetings', parent: "ui"},
        {label: preacherTranslate.t("can_edit_minimeetings"), value: 'can_edit_minimeetings', parent: "ui"},
        {label: preacherTranslate.t("can_see_cartSchedule"), value: 'can_see_cartSchedule', parent: "ui"},
        {label: preacherTranslate.t("can_self-assign_cartHour"), value: 'can_self-assign_cartHour', parent: "ui"},
        {label: preacherTranslate.t("can_edit_cartSchedule"), value: 'can_edit_cartSchedule', parent: "ui"},
        {label: preacherTranslate.t("can_see_audio_video"), value: 'can_see_audio_video', parent: "ui"},
        {label: preacherTranslate.t("can_edit_audio_video"), value: 'can_edit_audio_video', parent: "ui"},

        {label: preacherTranslate.t("uiForms"), value: "uiForms"},
        {label: preacherTranslate.t("can_have_assignment"), value: 'can_have_assignment', parent: "uiForms"},
        {label: preacherTranslate.t("can_lead_meetings"), value: 'can_lead_meetings', parent: "uiForms"},
        {label: preacherTranslate.t("can_say_prayer"), value: 'can_say_prayer', parent: "uiForms"},
        {label: preacherTranslate.t("can_lead_minimeetings"), value: 'can_lead_minimeetings', parent: "uiForms"},

        {label: preacherTranslate.t("forms"), value: "forms"},
        {label: preacherTranslate.t(meetingAssigmentTranslate.t("bibleTalk")), value: meetingAssigmentTranslate.t("bibleTalk"), parent: "forms"},
        {label: preacherTranslate.t(meetingAssigmentTranslate.t("watchtowerStudy")), value: meetingAssigmentTranslate.t("watchtowerStudy"), parent: "forms"},
        {label: preacherTranslate.t(meetingAssigmentTranslate.t("treasuresFromGodsWord")), value: meetingAssigmentTranslate.t("treasuresFromGodsWord"), parent: "forms"},
        {label: preacherTranslate.t(meetingAssigmentTranslate.t("applyYourselfToMinistry")), value: meetingAssigmentTranslate.t("applyYourselfToMinistry"), parent: "forms"},
        {label: preacherTranslate.t(meetingAssigmentTranslate.t("livingAsChristians")), value: meetingAssigmentTranslate.t("livingAsChristians"), parent: "forms"},
        {label: preacherTranslate.t("can_be_reader"), value: 'can_be_reader', parent: "forms"},
        {label: preacherTranslate.t("can_be_video"), value: 'can_be_video', parent: "forms"},
        {label: preacherTranslate.t("can_be_audio"), value: 'can_be_audio', parent: "forms"},
        {label: preacherTranslate.t("can_take_mic"), value: 'can_take_mic', parent: "forms"},
        {label: preacherTranslate.t("can_be_ordinal"), value: 'can_be_ordinal', parent: "forms"},
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


    useEffect(() => {
        const selectRolesItems = preacher?.roles.map((role) => role)
        setRolesValue(selectRolesItems)
        const selectPrivilegesItems = preacher?.privileges.map((privilege) => privilege)
        setPrivilegesValue(selectPrivilegesItems)
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
                listParentLabelStyle={{
                    fontWeight: "bold"
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
            <ButtonC title={preacherTranslate.t("editButtonText")} onPress={() => editPreacher(name, preacher._id, rolesValue, privilegesValue)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        justifyContent: 'center'
    }
})

export default PreachersEditScreen;