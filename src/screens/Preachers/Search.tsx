import { Input } from "@rneui/themed";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, Alert } from "react-native";
import ButtonC from "../../commonComponents/Button";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import Loading from "../../commonComponents/Loading";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Preacher from "./components/Preacher";
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import { columnsNum } from "../../helpers/devices";
import useLocaLization from "../../hooks/useLocalization";
import { preachersTranslations } from "./translations";

const PreachersSearchScreen: React.FC = () => {
  const [param, setParam] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { searchPreacher, state } = useContext(PreachersContext);
  const preacherTranslate = useLocaLization(preachersTranslations);
  const settingsContext = useContext(SettingsContext);

  
  if(state.errMessage){
    Alert.alert("Server error", state.errMessage)
  }

  return (
    <ScrollView style={styles.container}>
      <Input
        placeholder={preacherTranslate.t("nameLabel")}
        value={param}
        onChangeText={setParam}
        inputContainerStyle={styles.inputContainer}
        containerStyle={styles.containerInput}
      />
      <ButtonC
        title="Szukaj"
        onPress={() => {
          searchPreacher(param);
          setSubmitted(true);
        }}
      />

      {!submitted ? (
        <View style={styles.noParamContainer}>
          <FontAwesome name="search" size={45 + settingsContext.state.fontIncrement} sty />
          <Text style={[styles.noParamText, { fontSize: 18 + settingsContext.state.fontIncrement }]}>{preacherTranslate.t("searchPlaceholderText")}</Text>
        </View>
      ) : state.isLoading ? (
        <Loading />
      ) : state.searchResults?.length === 0 ? (
        <View style={styles.noParamContainer}>
            <Entypo name="emoji-sad" size={45 + settingsContext.state.fontIncrement} />
          <Text style={[styles.noParamText, { fontSize: 18 + settingsContext.state.fontIncrement }]}>{preacherTranslate.t("noEntryFoundText")}</Text>
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={[styles.resultsText, { fontSize: 18 + settingsContext.state.fontIncrement }]}>
          {preacherTranslate.t("resultsLabelText")}: {state.searchResults?.length}
          </Text>
          <FlatList
            keyExtractor={((preacher) => preacher._id)}
            data={state.searchResults}
            renderItem={({ item }) => <Preacher preacher={item} />}
            scrollEnabled={false}
            numColumns={columnsNum}
          />
    
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  inputContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
    borderColor: 'black',
  },

  containerInput: {
      paddingHorizontal: 0,
      paddingVertical: 0,
  },
  noParamContainer: {
    marginTop: 65,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  noParamText: {
    marginTop: 15,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: "PoppinsRegular",
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultsText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "PoppinsRegular",
    marginBottom: 20
  },
});

export default PreachersSearchScreen;
