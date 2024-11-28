import { Button } from '@rneui/themed';
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { Context as AuthContext } from '../../contexts/AuthContext';
import { NavigationProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MinistryGroups from '../MinistryGroups/components/MinistryGroups';
import Loading from '../../commonComponents/Loading';
import useLocaLization from '../../hooks/useLocalization';
import { ministryGroupsTranslations } from '../MinistryGroups/translations';
import { Context as PreacherContext } from '../../contexts/PreachersContext';
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import { FlatList } from 'react-native-gesture-handler';
import Preacher from '../Preachers/components/Preacher';
import { columnsNum } from '../../helpers/devices';

interface CongregationsInfoScreenProps {
    navigation: NavigationProp<any>
}

const CongregationsInfoScreen: React.FC<CongregationsInfoScreenProps> = ({ navigation }) => {
    const { signOut, state, loadCongregationInfo } = useContext(AuthContext);
    const preacherContext = useContext(PreacherContext);
    const settingsContext = useContext(SettingsContext);
    const ministryGroupTranslate = useLocaLization(ministryGroupsTranslations);

    useEffect(() => {
        loadCongregationInfo();
        preacherContext.loadAllPreachers();
        navigation.setOptions({
            headerTitle: state.congregation?.username || 'Zbór',
            headerRight: () =>
            state.whoIsLoggedIn === "admin" && <View style={styles.headerRight}>
                <TouchableOpacity onPress={() => navigation.navigate('EditCong')}>
                    <MaterialCommunityIcons name='pencil' size={30} color={'white'} />
                </TouchableOpacity>
                
            </View> 
        })
        const unsubscribe = navigation.addListener('focus', () => {
            loadCongregationInfo();
            preacherContext.loadAllPreachers();
        });
    
        return unsubscribe;
    }, [navigation])

    if(state.isLoading || preacherContext.state.isLoading) {
        return <Loading />
    }

    if(state.errMessage){
        Alert.alert("Server error", state.errMessage)
    }

    navigation.setOptions({
        headerTitle: state.congregation?.username,
    })

    return (
        <ScrollView style={styles.container}>
            { state.whoIsLoggedIn === "admin" ? <>
                <Text style={[styles.header, { fontSize: 21 + settingsContext.state.fontIncrement } ]}>Ogólne informacje</Text>
                <View style={styles.congregationInfo}>
                    <Text style={[styles.text, { fontSize: 18 + settingsContext.state.fontIncrement }]}>Email głównego admina</Text>
                    <Text style={[styles.textBold, { fontSize: 15 + settingsContext.state.fontIncrement }]}>{state.congregation?.territoryServantEmail}</Text>
                </View>
                <View style={styles.congregationInfo}>
                    <Text style={[styles.text, { fontSize: 18 + settingsContext.state.fontIncrement }]}>Email drugiego admina</Text>
                    <Text style={[styles.textBold, { fontSize: 15 + settingsContext.state.fontIncrement }]}>{state.congregation?.ministryOverseerEmail}</Text>
                </View>
            </> : <>
                <Text style={[styles.header, { fontSize: 21 + settingsContext.state.fontIncrement } ]}>Jeśli potrzebujesz pomocy z aplikacją zwróć się do: </Text>
                <FlatList 
                    keyExtractor={((preacher) => preacher._id)}
                    data={preacherContext.state.allPreachers?.filter(preacher => preacher.privileges?.includes('admin'))}
                    renderItem={({ item }) => <Preacher preacher={item} displayAdditionalInfo={false} />}
                    scrollEnabled={false}
                    numColumns={columnsNum}
                />
            </> }
    

            <Text style={[styles.header, { fontSize: 21 + settingsContext.state.fontIncrement } ]}>Starsi</Text>
            <FlatList 
                keyExtractor={((preacher) => preacher._id)}
                data={preacherContext.state.allPreachers?.filter(preacher => preacher.privileges?.includes('elder'))}
                renderItem={({ item }) => <Preacher preacher={item} displayAdditionalInfo={false} />}
                scrollEnabled={false}
                numColumns={columnsNum}
            />
            <Text style={[styles.header, { fontSize: 21 + settingsContext.state.fontIncrement } ]}>Słudzy pomocniczy</Text>
            <FlatList 
                keyExtractor={((preacher) => preacher._id)}
                data={preacherContext.state.allPreachers?.filter(preacher => preacher.privileges?.includes('mini_servant'))}
                renderItem={({ item }) => <Preacher preacher={item} displayAdditionalInfo={false} />}
                scrollEnabled={false}
                numColumns={columnsNum}
            />
            <Text style={[styles.header, { fontSize: 21 + settingsContext.state.fontIncrement } ]}>Pionierzy stali</Text>
            <FlatList 
                keyExtractor={((preacher) => preacher._id)}
                data={preacherContext.state.allPreachers?.filter(preacher => preacher.privileges?.includes('pioneer'))}
                renderItem={({ item }) => <Preacher preacher={item} displayAdditionalInfo={false} />}
                scrollEnabled={false}
                numColumns={columnsNum}
            />
            <Text style={[styles.header, { fontSize: 21 + settingsContext.state.fontIncrement } ]}>Pionierzy pomocniczy</Text>
            <FlatList 
                keyExtractor={((preacher) => preacher._id)}
                data={preacherContext.state.allPreachers?.filter(preacher => preacher.privileges?.includes('aux_pioneer'))}
                renderItem={({ item }) => <Preacher preacher={item} displayAdditionalInfo={false} />}
                scrollEnabled={false}
                numColumns={columnsNum}
            />

            <View style={styles.ministryGroupTitleContainer}>
            <Text style={[styles.header, { fontSize: 21 + settingsContext.state.fontIncrement } ]}>{ministryGroupTranslate.t("sectionText")}</Text>
                {state.whoIsLoggedIn === "admin" && <TouchableOpacity onPress={() => navigation.navigate('AddMinistryGroup', { congregationID: state.congregation?._id })}>
                    <MaterialCommunityIcons name='plus' size={30 + settingsContext.state.fontIncrement} />
                </TouchableOpacity>}
        
            </View>
            <MinistryGroups congregationID={state.congregation?._id!} />
            
        
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ece9e9',
        padding: 15,
        flex: 1,
    },
    map: {
        height: 400,
        width: '100%',
        marginTop: 15,
        marginBottom: 50
    },
    header: {
        fontFamily: 'InterSemiBold',
        fontSize: 21,
        marginTop: 10
    },
    congregationInfo: {
        padding: 13,
        backgroundColor: 'white',
        marginVertical: 10,
        borderColor: '#9999cc',
        borderWidth: 1,
        borderRadius: 10
    },
    ministryGroupTitleContainer: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginTop: 15
    },
    text: {
        fontFamily: 'InterRegular',
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center'
    },
    textBold: {
        fontFamily: 'InterSemiBold',
        textAlign: 'center',
        fontSize: 15
    },
    headerRight: {
        flexDirection: 'row',
        gap: 15,
        marginRight: 15
    }
})

export default CongregationsInfoScreen;