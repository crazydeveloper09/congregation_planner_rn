import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import MyInput from "../../commonComponents/MyInput";
import ButtonC from "../../commonComponents/Button";
import useLocaLization from "../../hooks/useLocalization";
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import { authTranslations } from "../Congregation/translations";
import { settingsTranslations } from "./translations";
import { mainTranslations } from "../../../localization";

const RaiseIssueScreen: React.FC = () => {
    const authTranslate = useLocaLization(authTranslations);
    const settingsTranslate = useLocaLization(settingsTranslations);
    const mainTranslate = useLocaLization(mainTranslations);
    const { state, raiseIssue } = useContext(SettingsContext);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(mainTranslate.t("emptyField")),
        shortDescription: Yup.string().required(mainTranslate.t("emptyField")),
        detailedDescription: Yup.string().required(mainTranslate.t("emptyField")),
        email: Yup.string()
            .email(mainTranslate.t("invalidEmail"))
            .required(mainTranslate.t("emptyField")),
    });

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    name: '',
                    shortDescription: '',
                    detailedDescription: '',
                    email: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) =>
                    raiseIssue(
                        values.name,
                        values.shortDescription,
                        values.detailedDescription,
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
                        <MyInput
                            label={settingsTranslate.t("shortDescriptionLabel")}
                            placeholder={settingsTranslate.t("shortDescriptionPlaceholder")}
                            value={values.shortDescription}
                            onChangeText={handleChange("shortDescription")}
                            onBlur={handleBlur("shortDescription")}
                            error={
                                touched.shortDescription && errors.shortDescription
                                    ? errors.shortDescription
                                    : undefined
                            }
                        />
                        <MyInput
                            label={settingsTranslate.t("detailedDescriptionLabel")}
                            placeholder={settingsTranslate.t("detailedDescriptionPlaceholder")}
                            value={values.detailedDescription}
                            onChangeText={handleChange("detailedDescription")}
                            onBlur={handleBlur("detailedDescription")}
                            multiline
                            numberOfLines={6}
                            error={
                                touched.detailedDescription && errors.detailedDescription
                                    ? errors.detailedDescription
                                    : undefined
                            }
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
                            title={settingsTranslate.t("issueLabel")}
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
});

export default RaiseIssueScreen;
