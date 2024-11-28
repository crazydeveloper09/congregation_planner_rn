import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { Context as CongregationContext } from "../../contexts/AuthContext";
import Loading from "../../commonComponents/Loading";
import { groupBy } from "../../helpers/arrays";
import { IActivity } from "../../contexts/interfaces";
import Activity from "./components/Activity";
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import { ScrollView } from "react-native-gesture-handler";
import { columnsNum } from "../../helpers/devices";

const CongregationActivityScreen: React.FC = () => {
    const [applicationType, setApplicationType] = useState('Aplikacja mobilna');
    const {state, loadCongregationActivities} = useContext(CongregationContext);
    const settingsContext = useContext(SettingsContext)

    useEffect(() => {
        loadCongregationActivities(state.congregation?._id);
    }, [state.congregation?._id])

    if(state.isLoading){
        return <Loading />
    }

    if(state.errMessage){
        Alert.alert("Server error", state.errMessage)
    }

    const groupedActivities = state.activities && groupBy<IActivity>(state.activities, 'applicationType')
    return (
        <ScrollView style={styles.container}>
            <FlatList 
                data={state.activities && Object.keys(groupedActivities as object)}
                renderItem={({item}) => <TouchableOpacity onPress={() => setApplicationType(item)}>
                    { item === applicationType? <Text style={[styles.textActive, { color: settingsContext.state.mainColor, borderBottomColor: settingsContext.state.mainColor }]}>{item}</Text> : <Text style={styles.text}>{item}</Text>}
                </TouchableOpacity>}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center', gap: 10, backgroundColor: 'white', padding: 10}}
                horizontal
                centerContent={true}
            />
            <FlatList 
                data={state.activities && groupedActivities![applicationType]}
                renderItem={({item}) => <Activity activity={item} />}
                contentContainerStyle={{ padding: 15 }}
                scrollEnabled={false}
                numColumns={columnsNum}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
        flex: 1,
    },
    text: {
        fontSize: 18,
        fontFamily: 'PoppinsRegular'
    },
    textActive: {
        fontSize: 18,
        fontFamily: 'PoppinsSemiBold',
        borderBottomWidth: 2
    }
});

export default CongregationActivityScreen;