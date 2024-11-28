import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { Context as AuthContext } from "../../contexts/AuthContext";
import packageJson from "../../../package.json";
import { Button } from "@rneui/themed";
import { NavigationProp } from "@react-navigation/native";
import useLocaLization from "../../hooks/useLocalization";
import { mainTranslations } from "../../../localization";
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import { Slider } from "@rneui/base";
import { ScrollView } from "react-native";
import SectionTitle from "./components/SectionTitle";
import SectionLink from "./components/SectionLink";
import SectionButton from "./components/SectionButton";


const SettingsScreen: React.FC = () => {
  const auth = useContext(AuthContext);
  const mainTranslate = useLocaLization(mainTranslations);
  const { state, changeMainColor, loadColor, incrementFont } =
    useContext(SettingsContext);
  const [fontIncrement, setFontIncrement] = useState<number>(state.fontIncrement || 0);

  useEffect(() => {
    loadColor();
  }, []);

  const availableColors = [
    "#1F8AAD",
    "#847577",
    "#AD1F64",
    "#AD1F1F",
    "#1FAD4F",
    "#A58940",
    "#629B48",
    "#7A6E9B",
    "#662389",
    "#8A2177",
    "#225354",
    "#6D4420",
    "#19482A",
    "#19315C",
  ];

  const styles = StyleSheet.create({
    container: {
      padding: 15,
    },
    title: {
      fontSize: 18 + state.fontIncrement,
      fontFamily: "MontserratRegular",
    },
    section: {
      paddingVertical: 10,
    },
    color: {
      width: "48%",
      height: 100,
      marginRight: 10,
      borderRadius: 10,
    },
    versionText: {
      fontSize: 13 + state.fontIncrement,
      textAlign: "center",
      fontFamily: "MontserratRegular",
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ justifyContent: "center", paddingBottom: 40 }}
    >
      <SectionTitle iconName="account-group-outline" value="Zbór" />
      <View style={styles.section}>
        <SectionLink
          screen="Cong"
          iconName="information-outline"
          description="Informacje"
        />
        {auth.state.whoIsLoggedIn === "admin" && (
          <SectionLink
            screen="Preachers"
            iconName="account"
            description="Głosiciele"
          />
        )}
  
      </View>
      {auth.state.whoIsLoggedIn === "admin" && ""}
      <SectionTitle iconName="palette-outline" value="Personalizacja" />
      <View style={styles.section}>
        <Text style={styles.title}>{mainTranslate.t("chooseColor")}</Text>
        <FlatList
          data={availableColors}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => changeMainColor(item)}
              style={[
                styles.color,
                { backgroundColor: item },
                state?.mainColor === item && {
                  borderWidth: 3,
                  borderColor: "black",
                },
              ]}
            ></TouchableOpacity>
          )}
          scrollEnabled={false}
          numColumns={2}
          contentContainerStyle={{ gap: 15, marginTop: 15, paddingBottom: 25 }}
        />
        <Text style={styles.title}>Dostosuj wielkość czcionki</Text>
        <View style={{ marginVertical: 20 }}>
          <Slider
            value={fontIncrement}
            onValueChange={(value) => setFontIncrement(value)}
            onSlidingComplete={() => incrementFont(fontIncrement)}
            step={1}
            maximumValue={10}
            thumbTouchSize={{ width: 20, height: 20 }}
            thumbTintColor={state.mainColor}
          />
        </View>
      </View>

      <SectionTitle iconName="file-document-outline" value="Prawo" />
      <View style={styles.section}>
        <SectionLink
          screen={`Policy_${mainTranslate.locale}`}
          iconName="file-document"
          description={mainTranslate.t("policyLabel")}
        />
      </View>
      <SectionButton
        iconName="power"
        description={mainTranslate.t("logOutLabel")}
        onPress={() => auth.signOut()}
      />
      <View style={{ paddingTop: 15 }}>
        <Text style={styles.versionText}>
          {mainTranslate.t("copyrightLabel")}
        </Text>
        <Text style={styles.versionText}>
          {mainTranslate.t("versionLabel")} {packageJson.version}
        </Text>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
