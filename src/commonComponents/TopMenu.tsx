import { Divider } from "@rneui/base";
import React, { useContext } from "react";
import { FlatList, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Context as SettingsContext } from "../contexts/SettingsContext";
import useLocaLization from "../hooks/useLocalization";
import { mainTranslations } from "../../localization";

interface TopMenuProps {
  state: string;
  data: string[];
  updateState: Function;
}

const TopMenu: React.FC<TopMenuProps> = ({ state, data, updateState }) => {
  const settingsContext = useContext(SettingsContext);
  const mainTranslate = useLocaLization(mainTranslations)

  return (
    <><FlatList
      data={data}
      renderItem={({ item, index }) => (
        <>
          <TouchableOpacity onPress={() => updateState(item)} style={{ marginRight: 10 }}>
            {state === item ? (
              <Text style={[styles.activeItem, { color: settingsContext.state.mainColor, fontSize: 18 + settingsContext.state.fontIncrement }]}>{item}</Text>
            ) : (
              <Text style={[styles.item, { fontSize: 18 + settingsContext.state.fontIncrement }]}>{item}</Text>
            )}
          </TouchableOpacity>
          {index !== data.length - 1 && <Divider orientation="vertical" color="black" />}

        </>

      )}
      contentContainerStyle={styles.container}
      horizontal
      centerContent={true} /><Divider orientation="horizontal" color="#8a8a8a" /></>
  );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        gap: 10,
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 13
    },
    item: {
        fontFamily: "MontserratRegular",
        fontSize: 18,
    },
    activeItem: { 
        fontFamily: 'MontserratSemiBold', 
        fontSize: 18
    }
})

export default TopMenu;
