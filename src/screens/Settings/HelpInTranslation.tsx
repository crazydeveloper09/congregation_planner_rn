import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MyInput from "../../commonComponents/MyInput";
import ButtonC from "../../commonComponents/Button";
import useLocaLization from "../../hooks/useLocalization";
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import { authTranslations } from "../Congregation/translations";
import { settingsTranslations } from "./translations";
import { defaultDropdownStyles } from "../defaultStyles";
import DropDownPicker from "react-native-dropdown-picker";
import Label from "../../commonComponents/Label";

const HelpInTranslationScreen: React.FC = () => {
    const [name, setName] = useState('')
    const [primaryLanguageValue, setPrimaryLanguageValue] = useState<string>('')
    const [primaryLanguageOpen, setPrimaryLanguageOpen] = useState<boolean>(false);
    const [primaryLanguageItems, setPrimaryLanguageItems] = useState([
        { label: 'Polski', value: 'Polski' },
        { label: 'English', value: 'Angielski' },
    ]);
    const [toLang, setToLang] = useState('');
    const [email, setEmail] = useState('');
    
    const authTranslate = useLocaLization(authTranslations);
    const settingsTranslate = useLocaLization(settingsTranslations);
    const {state, helpInTranslation} = useContext(SettingsContext);
    const dropdownStyles = defaultDropdownStyles(state.fontIncrement)

    return (
        <View style={styles.container}>
            <MyInput 
                label={authTranslate.t("nameLabel")}
                placeholder={authTranslate.t("namePlaceholder")}
                value={name}
                onChangeText={setName}
            />
            <Label text={settingsTranslate.t("primaryLanguageLabel")} />
            <DropDownPicker 
                value={primaryLanguageValue}
                setValue={setPrimaryLanguageValue}
                open={primaryLanguageOpen}
                setOpen={setPrimaryLanguageOpen}
                items={primaryLanguageItems}
                modalTitleStyle={dropdownStyles.text}
                labelStyle={[dropdownStyles.container, dropdownStyles.text]}
                placeholderStyle={[dropdownStyles.container, dropdownStyles.text]}
                listMode="MODAL"
                modalTitle={settingsTranslate.t("primaryLanguageLabel")}
                placeholder={settingsTranslate.t("primaryLanguagePlaceholder")}
            />
            <MyInput 
                label={settingsTranslate.t("toLangLabel")}
                placeholder={settingsTranslate.t("toLangPlaceholder")}
                value={toLang}
                onChangeText={setToLang}
            />
            <MyInput 
                label={authTranslate.t("emailLabel")}
                placeholder={authTranslate.t("emailPlaceholder")}
                value={email}
                onChangeText={setEmail}
            />
            <ButtonC 
                title={settingsTranslate.t("translateLabel")}
                isLoading={state.isLoading}
                onPress={() => helpInTranslation(name, primaryLanguageValue, toLang, email)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 15,
    },
});

export default HelpInTranslationScreen;