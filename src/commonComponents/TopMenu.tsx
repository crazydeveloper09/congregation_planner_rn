import { Divider } from "@rneui/base";
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
      renderItem={({ item, index }) => (
        <>
          <TouchableOpacity onPress={() => updateState(item)} style={{ marginRight: 10 }}>
            {state === item ? (
              <Text style={styles.activeItem}>{item}</Text>
            ) : (
              <Text style={styles.item}>{item}</Text>
            )}
          </TouchableOpacity>
          { index !== data.length - 1 && <Divider orientation="vertical" color="black" />}

        </>
       
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
        paddingHorizontal: 10,
        paddingVertical: 13
    },
    item: {
        fontFamily: "MontserratRegular",
        fontSize: 18,
    },
    activeItem: { 
        color: '#1F8AAD', 
        fontFamily: 'MontserratSemiBold', 
        fontSize: 18
    }
})

export default TopMenu;
