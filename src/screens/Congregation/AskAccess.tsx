import React, { useContext } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import { Context as AuthContext } from "../../contexts/AuthContext";
import ButtonC from "../../commonComponents/Button";
import MyInput from "../../commonComponents/MyInput";
import useLocaLization from "../../hooks/useLocalization";
import { authTranslations } from "./translations";
import { mainTranslations } from "../../../localization";

const CongregationAskAccessScreen: React.FC = () => {
    const { askAccess, state } = useContext(AuthContext);
    const authTranslate = useLocaLization(authTranslations);
    const mainTranslate = useLocaLization(mainTranslations);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(mainTranslate.t("emptyField")),
        congName: Yup.string().required(mainTranslate.t("emptyField")),
        email: Yup.string()
            .email(mainTranslate.t("invalidEmail"))
            .required(mainTranslate.t("emptyField")),
    });

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ name: "", congName: "", email: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    askAccess(values.name, values.congName, values.email);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
                            label={authTranslate.t("usernameLabel")}
                            placeholder={authTranslate.t("congNamePlaceholder")}
                            value={values.congName}
                            onChangeText={handleChange("congName")}
                            onBlur={handleBlur("congName")}
                            error={touched.congName && errors.congName ? errors.congName : undefined}
                        />
                        <MyInput
                            label={authTranslate.t("emailLabel")}
                            placeholder={authTranslate.t("emailPlaceholder")}
                            value={values.email}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            error={touched.email && errors.email ? errors.email : undefined}
                        />
                        <ButtonC
                            title={authTranslate.t("askAccessButton")}
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
        backgroundColor: "#ece9e9",
        padding: 15,
        flex: 1,
        justifyContent: "center",
    },
});

export default CongregationAskAccessScreen;
