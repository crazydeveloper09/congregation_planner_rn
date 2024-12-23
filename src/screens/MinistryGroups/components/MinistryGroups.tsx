import React, { useContext, useEffect } from "react";
import { Context as MinistryGroupContext } from "../../../contexts/MinistryGroupContext";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../../commonComponents/Loading";
import { Context as SettingsContext } from "../../../contexts/SettingsContext";
import { Context as AuthContext } from "../../../contexts/AuthContext";

interface MinistryGroupsProps {
  congregationID: string;
}

const MinistryGroups: React.FC<MinistryGroupsProps> = ({ congregationID }) => {
  const { state, loadMinistryGroups, deleteMinistryGroup } = useContext(MinistryGroupContext);
  const navigation = useNavigation()
  const settingsContext = useContext(SettingsContext);
  const authContext = useContext(AuthContext)

  useEffect(() => {
    loadMinistryGroups(congregationID);
  }, [congregationID]);

  if (state.isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={state.ministryGroups}
        renderItem={(ministryGroup) => (
          <View>
            <Text style={[styles.title, { backgroundColor: settingsContext.state.mainColor, fontSize: 16 + settingsContext.state.fontIncrement }]}>{ministryGroup.item.name}</Text>
            <FlatList
              data={ministryGroup.item.preachers}
              renderItem={(preacher) =>
                preacher.item?.name === ministryGroup.item.overseer?.name ? (
                  <Text style={[styles.preacher, { fontWeight: "bold", backgroundColor: `${settingsContext.state.mainColor}30`, fontSize: 15 + settingsContext.state.fontIncrement }]}>
                    {preacher.item?.name}
                  </Text>
                ) : (
                  <Text style={[styles.preacher, preacher.index % 2 === 0 && { backgroundColor: '#d6d6d6' }, {fontSize: 15 + settingsContext.state.fontIncrement}]}>{preacher.item?.name}</Text>
                )
              }
            />

            {authContext.state.whoIsLoggedIn === "admin" && <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('EditMinistryGroup', { congregationID, ministryGroupID: ministryGroup.item._id })}>
                <FontAwesome name="pencil" size={22 + settingsContext.state.fontIncrement} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteMinistryGroup(congregationID, ministryGroup.item._id)}>
                <FontAwesome name="trash" size={22 + settingsContext.state.fontIncrement} />
              </TouchableOpacity>
            </View>}
          </View>
        )}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    padding: 13,
    fontSize: 16,
    color: "white",
    width: 200,
    textAlign: "center",
    fontWeight: "bold",
  },
  preacher: {
    width: 200,
    padding: 8,
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    gap: 20
},
});

export default MinistryGroups;
