import React, { useContext, useEffect, useState } from "react";
import { Alert, FlatList, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { Context as TerritoriesContext } from "../../contexts/TerritoriesContext";
import Loading from "../../commonComponents/Loading";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Territory from "./components/Territory";
import { ITerritory } from "../../contexts/interfaces";
import { NavigationProp } from "@react-navigation/native";
import { columnsNum, isDesktop } from "../../helpers/devices";
import { countDaysFromNow } from "../../helpers/dates";
import useLocaLization from "../../hooks/useLocalization";
import { preachersTranslations } from "./translations";

interface PreacherTerritoriesScreenProps {
    navigation: NavigationProp<any>
    route: {
        params: {
            preacherID: string
        }
    }
}

const PreacherTerritoriesScreen: React.FC<PreacherTerritoriesScreenProps> = ({ navigation, route }) => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(40)
    const { state, searchTerritory, clearError } = useContext(TerritoriesContext);
    const preacherTranslate = useLocaLization(preachersTranslations);

  console.log(route.params.preacherID.toString().replaceAll("\"", ""))
    useEffect(() => {
        searchTerritory('preacher', route.params.preacherID.toString().replaceAll("\"", ""), page, limit, 'all')
    }, [route.params.preacherID])

    if(state.isLoading){
        return <Loading />
    }
    
    if(state.errMessage){
      Alert.alert("Server error", state.errMessage, [{ text: "OK", onPress: () => clearError() }])
    }

    return (
        <ScrollView style={[styles.container, isDesktop && { width: '60%', marginHorizontal: 'auto'}]}>
            {state.territories?.docs?.length === 0 ? (
                <View style={styles.noParamContainer}>
                    <Entypo name="emoji-sad" size={45} />
                <Text style={styles.noParamText}>{preacherTranslate.t("noPreacherTerritory")}</Text>
                </View>
            ) : (
                <View style={styles.resultsContainer}>
                <Text style={styles.resultsText}>
                    Rezultaty wyszukiwania: {state.territories?.totalDocs}
                </Text>
                <FlatList
                    keyExtractor={((territory) => territory._id)}
                    data={state.territories?.docs}
                    renderItem={({ item }) => <Territory territory={item} preachers={[]} />}
                    scrollEnabled={false}
                    numColumns={columnsNum}
                />
                
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '',
        padding: 15
    },
    headerRight: {
        flexDirection: 'row',
        gap: 15,
        marginRight: 15
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
})

export default PreacherTerritoriesScreen;