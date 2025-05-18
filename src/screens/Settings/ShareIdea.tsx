import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MyInput from "../../commonComponents/MyInput";
import useLocaLization from "../../hooks/useLocalization";
import { authTranslations } from "../Congregation/translations";
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import ButtonC from "../../commonComponents/Button";
import { settingsTranslations } from "./translations";

const ShareIdeaScreen: React.FC = () => {
    const [name, setName] = useState('')
    const [shortDescription, setShortDescription] = useState('');
    const [detailedDescription, setDetailedDescription] = useState('');
    const [email, setEmail] = useState('');
    
    const authTranslate = useLocaLization(authTranslations);
    const settingsTranslate = useLocaLization(settingsTranslations);
    const {state, shareIdea} = useContext(SettingsContext)

    return (
        <View style={styles.container}>
            <MyInput 
                label={authTranslate.t("nameLabel")}
                placeholder={authTranslate.t("namePlaceholder")}
                value={name}
                onChangeText={setName}
            />
            <MyInput 
                label={settingsTranslate.t("shortDescriptionLabel")}
                placeholder={settingsTranslate.t("shortDescriptionPlaceholder")}
                value={shortDescription}
                onChangeText={setShortDescription}
            />
            <MyInput 
                label={settingsTranslate.t("detailedDescriptionLabel")}
                placeholder={settingsTranslate.t("detailedDescriptionPlaceholder")}
                value={detailedDescription}
                onChangeText={setDetailedDescription}
                multiline
                numberOfLines={6}
            />
            <MyInput 
                label={authTranslate.t("emailLabel")}
                placeholder={authTranslate.t("emailPlaceholder")}
                value={email}
                onChangeText={setEmail}
            />
             <ButtonC 
                title={settingsTranslate.t("feedbackLabel")}
                isLoading={state.isLoading}
                onPress={() => shareIdea(name, shortDescription, detailedDescription, email)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 15,
    },
});

export default ShareIdeaScreen;