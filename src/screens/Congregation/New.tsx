import React, { useContext } from "react";
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import { Context as AuthContext } from "../../contexts/AuthContext";
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import ButtonC from "../../commonComponents/Button";
import MyInput from "../../commonComponents/MyInput";
import useLocaLization from "../../hooks/useLocalization";
import { authTranslations } from "./translations";
import { mainTranslations } from "../../../localization";
import { Checkbox } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CongregationRegisterScreen: React.FC = () => {
    const { registerCongregation, state } = useContext(AuthContext);
    const settingsContext = useContext(SettingsContext)
    const authTranslate = useLocaLization(authTranslations);
    const mainTranslate = useLocaLization(mainTranslations);
    const navigation = useNavigation()

    const validationSchema = Yup.object().shape({
        congName: Yup.string().required(mainTranslate.t("emptyField")),
        mainAdminEmail: Yup.string()
            .email(mainTranslate.t("invalidEmail"))
            .required(mainTranslate.t("emptyField")),
        secondAdminEmail: Yup.string()
            .email(mainTranslate.t("invalidEmail")),
        password: Yup.string().required(mainTranslate.t("emptyField")),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password')], authTranslate.t("passwordsDontMatch"))
            .required(mainTranslate.t("emptyField")),
        termsAccepted: Yup.boolean()
            .oneOf([true], mainTranslate.t("mustAcceptTerms"))
            .required(mainTranslate.t("mustAcceptTerms")),
    });

    return (
        <KeyboardAwareScrollView enableOnAndroid style={styles.container} contentContainerStyle={{ justifyContent: "center", }}>
            <Formik
                initialValues={{ congName: "", mainAdminEmail: "", secondAdminEmail: "", password: "", repeatPassword: "", termsAccepted: false }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    registerCongregation(values.congName, values.mainAdminEmail, values.secondAdminEmail, values.password);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                    <>
                        { state.errMessage && <Text style={styles.errMessage}>{state.errMessage}</Text> }
                        { state.successMessage && <Text style={styles.successMessage}>{state.successMessage}</Text> }
                        <MyInput
                            label={authTranslate.t("usernameLabel")}
                            placeholder={authTranslate.t("congNamePlaceholder")}
                            value={values.congName}
                            onChangeText={handleChange("congName")}
                            onBlur={handleBlur("congName")}
                            error={touched.congName && errors.congName ? errors.congName : undefined}
                        />
                        <MyInput
                            label={authTranslate.t("adminLabel")}
                            placeholder={authTranslate.t("adminPlaceholder")}
                            value={values.mainAdminEmail}
                            onChangeText={handleChange("mainAdminEmail")}
                            onBlur={handleBlur("mainAdminEmail")}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            error={touched.mainAdminEmail && errors.mainAdminEmail ? errors.mainAdminEmail : undefined}
                        />
                        <MyInput
                            label={authTranslate.t("secondAdminLabel")}
                            placeholder={authTranslate.t("secondAdminPlaceholder")}
                            value={values.secondAdminEmail}
                            onChangeText={handleChange("secondAdminEmail")}
                            onBlur={handleBlur("secondAdminEmail")}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            error={touched.secondAdminEmail && errors.secondAdminEmail ? errors.secondAdminEmail : undefined}
                        />
                        <MyInput 
                            label={authTranslate.t('passwordLabel')}
                            placeholder={authTranslate.t('passwordPlaceholder')}
                            value={values.password}
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            secureTextEntry
                            autoCapitalize='none'
                            autoCorrect={false}
                            error={touched.password && errors.password ? errors.password : undefined}
                        />
                        <MyInput 
                            label={authTranslate.t('repeatPasswordLabel')}
                            placeholder={authTranslate.t('repeatPasswordPlaceholder')}
                            value={values.repeatPassword}
                            onChangeText={handleChange("repeatPassword")}
                            onBlur={handleBlur("repeatPassword")}
                            secureTextEntry
                            autoCapitalize='none'
                            autoCorrect={false}
                            error={touched.repeatPassword && errors.repeatPassword ? errors.repeatPassword : undefined}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <View
                                style={[
                                styles.checkboxWrapper,
                                Platform.OS === 'ios' && styles.iosBorder,
                                ]}
                            >
                                <Checkbox
                                    status={values.termsAccepted ? 'checked' : 'unchecked'}
                                    onPress={() => setFieldValue('termsAccepted', !values.termsAccepted)}
                                    color={settingsContext.state.mainColor} // tick color
                                    uncheckedColor={settingsContext.state.mainColor} // outline color when unchecked
                                  
                                />
                            </View>

                            <Pressable onPress={() => navigation.navigate(`Policy_${mainTranslate.locale}`)}>
                                <Text>
                                    {authTranslate.t("privacyAccept")}
                                    <Text style={{ color: settingsContext.state.mainColor }}>
                                        {authTranslate.t("privacyPolicy")}
                                    </Text>
                                </Text>
                            </Pressable>
                        </View>
                        {touched.termsAccepted && errors.termsAccepted && (
                        <Text style={{ color: '#d00' }}>{errors.termsAccepted}</Text>
                        )}
                                    
                        <ButtonC
                            title={authTranslate.t("registerLabel")}
                    
                            isLoading={state.isLoading}
                            onPress={handleSubmit as any}
                        />
                    </>
                )}
            </Formik>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ece9e9",
        padding: 15,
        flex: 1
    },
    errMessage: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    },
    successMessage: {
        color: 'green',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    },
    checkboxWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iosBorder: {
        borderWidth: 1,
        borderColor: 'black', // or settingsContext.state.mainColor
        borderRadius: 2,
        marginRight: 10
    },
});

export default CongregationRegisterScreen;
