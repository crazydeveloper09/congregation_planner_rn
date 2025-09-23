import React from "react";
import { StyleSheet, Text } from "react-native";
import useLocaLization from "../hooks/useLocalization";
import { mainTranslations } from "../../localization";

const EmailDataInfo: React.FC = () => {
    const mainTranslate = useLocaLization(mainTranslations);

    return <Text style={styles.text}>{mainTranslate.t("dataInfo")}</Text>
}

const styles = StyleSheet.create({
 text: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 15,
    fontSize: 13
 }
})

export default EmailDataInfo;