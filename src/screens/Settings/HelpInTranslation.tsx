import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import MyInput from "../../commonComponents/MyInput";
import ButtonC from "../../commonComponents/Button";
import useLocaLization from "../../hooks/useLocalization";
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import { authTranslations } from "../Congregation/translations";
import { settingsTranslations } from "./translations";
import { defaultDropdownStyles } from "../defaultStyles";
import DropDownPicker from "react-native-dropdown-picker";
import Label from "../../commonComponents/Label";
import { mainTranslations } from "../../../localization";

const HelpInTranslationScreen: React.FC = () => {
    const [primaryLanguageOpen, setPrimaryLanguageOpen] = useState(false);
    const [primaryLanguageItems] = useState([
        { label: 'Polski', value: 'Polski' },
        { label: 'English', value: 'Angielski' },
    ]);

    const authTranslate = useLocaLization(authTranslations);
    const settingsTranslate = useLocaLization(settingsTranslations);
    const mainTranslate = useLocaLization(mainTranslations);
    const { state, helpInTranslation } = useContext(SettingsContext);
    const dropdownStyles = defaultDropdownStyles(state.fontIncrement);

     const validationSchema = Yup.object().shape({
        name: Yup.string().required(mainTranslate.t("emptyField")),
        primaryLanguage: Yup.string().required(mainTranslate.t("emptyField")),
        toLang: Yup.string().required(mainTranslate.t("emptyField")),
        email: Yup.string()
            .email(mainTranslate.t("invalidEmail"))
            .required(mainTranslate.t("emptyField")),
    });

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    name: '',
                    primaryLanguage: '',
                    toLang: '',
                    email: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) =>
                    helpInTranslation(
                        values.name,
                        values.primaryLanguage,
                        values.toLang,
                        values.email
                    )
                }
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    setFieldValue,
                }) => (
                    <>
                        <MyInput
                            label={authTranslate.t("nameLabel")}
                            placeholder={authTranslate.t("namePlaceholder")}
                            value={values.name}
                            onChangeText={handleChange("name")}
                            onBlur={handleBlur("name")}
                            error={touched.name && errors.name ? errors.name : undefined}
                        />

                        <Label text={settingsTranslate.t("primaryLanguageLabel")} />
                        <DropDownPicker
                            value={values.primaryLanguage}
                            setValue={(callback) =>
                                setFieldValue("primaryLanguage", callback(values.primaryLanguage))
                            }
                            open={primaryLanguageOpen}
                            setOpen={setPrimaryLanguageOpen}
                            items={primaryLanguageItems}
                            listMode="MODAL"
                            placeholder={settingsTranslate.t("primaryLanguagePlaceholder")}
                            modalTitle={settingsTranslate.t("primaryLanguageLabel")}
                            modalTitleStyle={dropdownStyles.text}
                            labelStyle={[dropdownStyles.container, dropdownStyles.text]}
                            placeholderStyle={[dropdownStyles.container, dropdownStyles.text]}
                            style={touched.primaryLanguage && errors.primaryLanguage && { borderColor: '#d00', borderWidth: 1 }}
                        />
                        {touched.primaryLanguage && errors.primaryLanguage ? (
                            <Text style={styles.errorStyle}>{errors.primaryLanguage}</Text>
                        ) : null}

                        <MyInput
                            label={settingsTranslate.t("toLangLabel")}
                            placeholder={settingsTranslate.t("toLangPlaceholder")}
                            value={values.toLang}
                            onChangeText={handleChange("toLang")}
                            onBlur={handleBlur("toLang")}
                            error={touched.toLang && errors.toLang ? errors.toLang : undefined}
                        />

                        <MyInput
                            label={authTranslate.t("emailLabel")}
                            placeholder={authTranslate.t("emailPlaceholder")}
                            value={values.email}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            error={touched.email && errors.email ? errors.email : undefined}
                        />

                        <ButtonC
                            title={settingsTranslate.t("translateLabel")}
                            isLoading={state.isLoading}
                            onPress={handleSubmit as any}
                        />
                    </>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    errorStyle: {
        color: "#d00",
        fontFamily: "PoppinsRegular",
        fontSize: 13,
        marginVertical: 6,
        marginLeft: 4,
    },
});

export default HelpInTranslationScreen;
