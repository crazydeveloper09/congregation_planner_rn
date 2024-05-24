import React from "react";
import { FlatList, TouchableOpacity, StyleSheet, Text } from "react-native";

interface TopMenuProps {
  state: string;
  data: string[];
  updateState: Function;
}

const TopMenu: React.FC<TopMenuProps> = ({ state, data, updateState }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => updateState(item)}>
          {state === item ? (
            <Text style={styles.activeItem}>{item}</Text>
          ) : (
            <Text style={styles.item}>{item}</Text>
          )}
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.container}
      horizontal
      centerContent={true}
    />
  );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        gap: 10,
        backgroundColor: "white",
        padding: 10,
    },
    item: {
        fontFamily: "MontserratRegular",
        fontSize: 17,
    },
    activeItem: { 
        color: '#1F8AAD', 
        fontFamily: 'MontserratSemiBold', 
        fontSize: 17
    }
})

export default TopMenu;
