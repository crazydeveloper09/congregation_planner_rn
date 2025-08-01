import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Alert, Platform } from "react-native";
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
import IconDescriptionValue from "../../commonComponents/IconDescriptionValue";
import useLocaLization from "../../hooks/useLocalization";
import { ministryMeetingsTranslations } from "./translations";
import { mainTranslations } from "../../../localization";
import { IMinistryMeeting } from "../../contexts/interfaces";
import { buildMinistryMeetingsPDF } from "./helpers/pdf";
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import IconLink from "../../commonComponents/IconLink";

interface MinistryMeetingIndexScreenProps {
    navigation: NavigationProp<any>
}

const MinistryMeetingIndexScreen: React.FC<MinistryMeetingIndexScreenProps> = ({ navigation }) => {
    const ministryMeetingTranslate = useLocaLization(ministryMeetingsTranslations)
    const mainTranslate = useLocaLization(mainTranslations)
    const filters = [mainTranslate.t("all"), mainTranslate.t("myAssignments")]
    const [currentFilter, setCurrentFilter] = useState<string>(mainTranslate.t("all"))
    const [currentMonth, setCurrentMonth] = useState<string>(`${months[new Date().getMonth()] + ' ' + new Date().getFullYear()}`)
    const { state, loadMinistryMeetings, loadMinistryMeetingsOfPreacher } = useContext(MinistryMeetingContext)
    const preachersContext = useContext(PreachersContext)
    const authContext = useContext(AuthContext)

    const [refreshing, setRefreshing] = React.useState(false);

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);

    const generateMinistryMeetingsPDF = async (meetings: IMinistryMeeting[], month: string) => {
        try {
          const html = buildMinistryMeetingsPDF(meetings, month);

          if (Platform.OS === 'web') {
                  let html2pdf: any;
          html2pdf = require("html2pdf.js");
            // Create a temporary container for the HTML
            const element = document.createElement('div');
            element.innerHTML = html;
            document.body.appendChild(element);

            // Use html2pdf to generate and save the PDF
            await html2pdf()
              .set({
                margin: 0.5,
                filename: `${ministryMeetingTranslate.t("sectionText")}_${month}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
              })
              .from(element)
              .save();

            // Clean up the temporary element
            document.body.removeChild(element);
          } else {
            // Native platforms (iOS/Android) - your original code
            const { uri } = await Print.printToFileAsync({ html });

            const newPath = FileSystem.documentDirectory + `${ministryMeetingTranslate.t("sectionText")}_${month}.pdf`;
            await FileSystem.copyAsync({
              from: uri,
              to: newPath,
            });

            if (await Sharing.isAvailableAsync()) {
              await Sharing.shareAsync(newPath);
            }
          }
        } catch (error) {
          Alert.alert("Error", mainTranslate.t("generatePDFError"));
        }
      }

    useEffect(() => {
        currentFilter === mainTranslate.t("all") ? loadMinistryMeetings() : loadMinistryMeetingsOfPreacher();
        preachersContext.loadAllPreachers();
        if(((preachersContext.state.preacher && preachersContext.state.preacher.roles?.includes("can_edit_minimeetings")) || authContext.state.whoIsLoggedIn === "admin")) {
            navigation.setOptions({
                headerRight: () => <HeaderRight>
                <TouchableOpacity onPress={onRefresh}>
                    <MaterialCommunityIcons name="refresh" size={30} color={"white"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Ministry Meeting New')}>
                    <MaterialCommunityIcons name='plus' size={30} color={'white'} />
                </TouchableOpacity>
    
            </HeaderRight>
            })
          }
        
        const unsubscribe = navigation.addListener('focus', () => {
            currentFilter === mainTranslate.t("all") ? loadMinistryMeetings() : loadMinistryMeetingsOfPreacher();
        });
    
        return unsubscribe;
    }, [currentFilter, refreshing])

    if(state.isLoading){
        return <Loading />
    }

    const ministryMeetingsGroup = groupBy<IMinistryMeeting>(state.ministryMeetings!, 'month');
    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {state.ministryMeetings?.length !== 0 && <>
                <TopMenu state={currentMonth} data={ministryMeetingsGroup && Object.keys(ministryMeetingsGroup)} updateState={setCurrentMonth} />
            </> }
            {(preachersContext.state.preacher && preachersContext.state.preacher.roles?.includes("can_lead_minimeetings")) && <TopMenu state={currentFilter} data={filters} updateState={setCurrentFilter} />}
            
            <View style={styles.container}>
           
                { state.ministryMeetings?.length === 0 ? <NotFound title={ministryMeetingTranslate.t("noEntryText")} /> : <>
                {ministryMeetingsGroup && !Object.keys(ministryMeetingsGroup).includes(currentMonth) && <NotFound title={mainTranslate.t("chooseMonth")} icon="calendar-month-outline" />}
                <FlatList
                    keyExtractor={(ministryMeeting) => ministryMeeting._id} 
                    data={ministryMeetingsGroup && ministryMeetingsGroup[currentMonth]}
                    renderItem={({ item }) => <MinistryMeeting meeting={item} navigate={navigation.navigate} />}
                    scrollEnabled={false}
                />
                {authContext.state.whoIsLoggedIn === "admin" && (
                    <IconLink
                    iconName="download"
                      description={`Generuj plik ${ministryMeetingTranslate.t("sectionText")} - ${currentMonth}`}
                      onPress={() =>
                        generateMinistryMeetingsPDF(
                          ministryMeetingsGroup && ministryMeetingsGroup[currentMonth],
                          currentMonth
                        )
                      }
                    />
                  )}
                </> }

                
            </View>
            
            
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