import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Context as SettingsContext } from "../contexts/SettingsContext";

interface PaginationProps {
  activePage: number;
  totalPages: number;
  updateState: Function
}

const Pagination: React.FC<PaginationProps> = ({ activePage, totalPages, updateState }) => {
  const settingsContext = useContext(SettingsContext);
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={pages}
        renderItem={({ item }) =>
          activePage === item ? (
            <TouchableOpacity
              style={[styles.itemContainer, { backgroundColor: settingsContext.state.mainColor }]}
              onPress={() => updateState(item)}
            >
              <Text style={[styles.text, { color: 'white' }]}>{item}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.itemContainer, { backgroundColor: "white" }]} onPress={() => updateState(item)}>
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          )
        }
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', gap: 15 }}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  itemContainer: {
    height: 40,
    width: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 9000,
  },
  text: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 17
  }
});

export default Pagination;
