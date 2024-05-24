import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { MinistryMeeting as IMinistryMeeting} from "./data.mock";
import { groupBy } from "../../helpers/arrays";
import { FlatList } from "react-native-gesture-handler";
import { months } from "../../../defaultData";
import MinistryMeeting from "./components/MinistryMeeting";
import { Context as MinistryMeetingContext } from "../../contexts/MinistryMeetingContext";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import { Context as AuthContext } from "../../contexts/AuthContext";

import Loading from "../../commonComponents/Loading";
import NotFound from "../../commonComponents/NotFound";
import { NavigationProp } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderRight from "../../commonComponents/HeaderRight";
import TopMenu from "../../commonComponents/TopMenu";

interface MinistryMeetingIndexScreenProps {
    navigation: NavigationProp<any>
}

const MinistryMeetingIndexScreen: React.FC<MinistryMeetingIndexScreenProps> = ({ navigation }) => {
    const filters = ["Wszystkie", "Moje przydziały"]
    const [currentFilter, setCurrentFilter] = useState<string>("Wszystkie")
    const [currentMonth, setCurrentMonth] = useState<string>(`${months[new Date().getMonth()] + ' ' + new Date().getFullYear()}`)
    const { state, loadMinistryMeetings, loadMinistryMeetingsOfPreacher } = useContext(MinistryMeetingContext)
    const preachersContext = useContext(PreachersContext)
    const authContext = useContext(AuthContext)
    useEffect(() => {
        currentFilter === "Wszystkie" ? loadMinistryMeetings() : loadMinistryMeetingsOfPreacher();
        if(((preachersContext.state.preacher && preachersContext.state.preacher.roles?.includes("can_edit_minimeetings")) || authContext.state.whoIsLoggedIn === "admin")) {
            navigation.setOptions({
                headerRight: () => <HeaderRight>
                <TouchableOpacity onPress={() => navigation.navigate('Ministry Meeting New')}>
                    <MaterialCommunityIcons name='plus' size={30} color={'white'} />
                </TouchableOpacity>
    
            </HeaderRight>
            })
          }
        
        const unsubscribe = navigation.addListener('focus', () => {
            currentFilter === "Wszystkie" ? loadMinistryMeetings() : loadMinistryMeetingsOfPreacher();
        });
    
        return unsubscribe;
    }, [currentFilter])

    if(state.isLoading){
        return <Loading />
    }

    const ministryMeetingsGroup = groupBy<IMinistryMeeting>(state.ministryMeetings!, 'month');
    return (
        <ScrollView>
            {state.ministryMeetings?.length !== 0 && <>
                <TopMenu state={currentMonth} data={ministryMeetingsGroup && Object.keys(ministryMeetingsGroup)} updateState={setCurrentMonth} />
                {(preachersContext.state.preacher && preachersContext.state.preacher.roles?.includes("can_lead_minimeetings")) && <TopMenu state={currentFilter} data={filters} updateState={setCurrentFilter} />}
            </> }
            
                
            { state.ministryMeetings?.length === 0 ? <NotFound title="Niestety nie znaleziono zbiórek" /> : <FlatList
                keyExtractor={(ministryMeeting) => ministryMeeting.date} 
                data={ministryMeetingsGroup && ministryMeetingsGroup[currentMonth]}
                renderItem={({ item }) => <MinistryMeeting meeting={item} navigate={navigation.navigate} />}
                contentContainerStyle={styles.container}
                scrollEnabled={false}
                
            />}
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginBottom: 50
    },
    month: {
        fontSize: 17,
        fontFamily: 'MontserratRegular'
    },
    monthNavigation: {
        backgroundColor: 'white',
        paddingVertical: 8
    },
})

export default MinistryMeetingIndexScreen;