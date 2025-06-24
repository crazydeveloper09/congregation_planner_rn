import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import Preacher from "./components/Preacher";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import Loading from "../../commonComponents/Loading";
import Pagination from "../../commonComponents/Pagination";
import { columnsNum } from "../../helpers/devices";
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import NotFound from "../../commonComponents/NotFound";
import useLocaLization from "../../hooks/useLocalization";
import { preachersTranslations } from "./translations";

interface PreachersIndexScreenProps {
  navigation: NavigationProp<any>;
}

const PreachersIndexScreen: React.FC<PreachersIndexScreenProps> = ({
  navigation,
}) => {
  const { state, loadPreachers } = useContext(PreachersContext);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const settingsContext = useContext(SettingsContext);
  const preachersTranslate = useLocaLization(preachersTranslations)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate("AddPreacher")}>
            <MaterialCommunityIcons name="plus" size={30} color={"white"} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SearchPreacher")}
          >
            <MaterialCommunityIcons
              name="account-search"
              size={30}
              color={"white"}
            />
          </TouchableOpacity>
        </View>
      ),
    });
    loadPreachers(page, limit);
    const unsubscribe = navigation.addListener("focus", () => {
      loadPreachers(page, limit);
    });

    return unsubscribe;
  }, [navigation, page, limit]);

  if (state.isLoading) {
    return <Loading />;
  }

  if (state.errMessage) {
    Alert.alert("Server error", state.errMessage);
  }

  return (
    <ScrollView style={styles.container}>
      {state.preachers?.docs?.length !== 0 ? (
        <>
          <FlatList
            keyExtractor={(preacher) => preacher._id}
            data={state.preachers?.docs}
            renderItem={({ item }) => <Preacher preacher={item} />}
            scrollEnabled={false}
            numColumns={columnsNum}
          />
          <Pagination
            activePage={state.preachers?.page!}
            totalPages={state.preachers?.totalPages!}
            updateState={setPage}
          />
        </>
      ) : (
        <NotFound title={preachersTranslate.t("notFoundText")} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15 },
  headerRight: {
    flexDirection: "row",
    gap: 15,
    marginRight: 15,
  },
  header: {
    fontFamily: "InterSemiBold",
    fontSize: 21,
  },
  ministryGroupTitleContainer: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 15,
  },
});

export default PreachersIndexScreen;
