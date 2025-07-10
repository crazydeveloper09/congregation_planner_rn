import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity, Alert } from "react-native";
import { groupBy } from "../../helpers/arrays";
import { ScrollView } from "react-native-gesture-handler";
import { months } from "../../../defaultData";
import Meeting from "./components/Meeting";
import NotFound from "../../commonComponents/NotFound";
import { Context as MeetingContext } from "../../contexts/MeetingContext";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import { Context as AuthContext } from "../../contexts/AuthContext";
import Loading from "../../commonComponents/Loading";
import { NavigationProp } from "@react-navigation/native";
import { IMeeting } from "../../contexts/interfaces";
import HeaderRight from "../../commonComponents/HeaderRight";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PreacherAssignment from "./components/PreacherAssignment";
import TopMenu from "../../commonComponents/TopMenu";
import IconLink from "../../commonComponents/IconLink";
import IconDescriptionValue from "../../commonComponents/IconDescriptionValue";
import useLocaLization from "../../hooks/useLocalization";
import { meetingsTranslations } from "./translations";
import { mainTranslations } from "../../../localization";
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import CleaningAssignment from "./components/CleaningAssignment";
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import { Platform } from 'react-native';
import { buildMeetingsPDF } from "./helpers/pdf";
import ButtonC from "../../commonComponents/Button";
import * as FileSystem from 'expo-file-system';
// @ts-ignore
import html2pdf from "html2pdf.js";

interface MeetingsIndexScreenProps {
  navigation: NavigationProp<any>;
}

const MeetingsIndexScreen: React.FC<MeetingsIndexScreenProps> = ({
  navigation,
}) => {
  const meetingTranslate = useLocaLization(meetingsTranslations);
  const mainTranslate = useLocaLization(mainTranslations);
  const filters = [mainTranslate.t("all"), mainTranslate.t("myAssignments")]
  const [currentFilter, setCurrentFilter] = useState<string>(mainTranslate.t("all"))
  const [type, setType] = useState<string>(
    new Date().getDay() === 0 || new Date().getDay() === 6
      ? meetingTranslate.t("weekend")
      : meetingTranslate.t("midWeek")
  );
  const [currentMonth, setCurrentMonth] = useState<string>(
    `${months[new Date().getMonth()] + " " + new Date().getFullYear()}`
  );
  const { state, loadMeetings, loadPreacherMeetingAssignments } = useContext(MeetingContext);
  const preachersContext = useContext(PreachersContext)
  const authContext = useContext(AuthContext)
  const settingsContext = useContext(SettingsContext);
  const [refreshing, setRefreshing] = React.useState(false);

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);

  const generateMeetingsPDF = async (meetings: IMeeting[], type: string, month: string) => {
    try {

      const html = buildMeetingsPDF(meetings, type, month);
if (Platform.OS === 'web') {
            // Create a temporary container for the HTML
            const element = document.createElement('div');
            element.innerHTML = html;
            document.body.appendChild(element);

            // Use html2pdf to generate and save the PDF
            await html2pdf()
              .set({
                margin: 0.5,
                filename: `${type}_${month}.pdf`,
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

            const newPath = FileSystem.documentDirectory + `${type}_${month}.pdf`;
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
    currentFilter === mainTranslate.t("all") ? loadMeetings() : loadPreacherMeetingAssignments();
    if(((preachersContext.state.preacher && preachersContext.state.preacher.roles?.includes("can_edit_meetings")) || authContext.state.whoIsLoggedIn === "admin")) {
      navigation.setOptions({
        headerRight: () => <HeaderRight>
          <TouchableOpacity
            onPress={onRefresh}
          >
            <MaterialCommunityIcons name="refresh" size={30} color={"white"} />
          </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Meetings New')}>
                <MaterialCommunityIcons name='plus' size={30} color={'white'} />
            </TouchableOpacity>
            
        </HeaderRight>
      })
    }
  
    const unsubscribe = navigation.addListener("focus", () => {
      currentFilter === mainTranslate.t("all") ? loadMeetings() : loadPreacherMeetingAssignments();
    });

    return unsubscribe;
  }, [currentFilter, refreshing]);

  if (state.isLoading) {
    return <Loading />;
  }

  const isType = Object.keys(groupBy<IMeeting>(state.allMeetings!, "type")).includes(type);
  const isMonth = Object.keys(groupBy<IMeeting>(state.allMeetings!, "month")).includes(currentMonth);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {currentFilter === mainTranslate.t("all") &&
        state.allMeetings?.length !== 0 && (
          <>
            <TopMenu
              state={type}
              data={
                state?.allMeetings &&
                Object.keys(groupBy(state?.allMeetings, "type"))!
              }
              updateState={setType}
            />
            <TopMenu
              state={currentMonth}
              data={
                state?.allMeetings &&
                Object.keys(groupBy(state?.allMeetings, "month"))!
              }
              updateState={setCurrentMonth}
            />
          </>
        )}

      {preachersContext.state.preacher &&
        authContext.state.whoIsLoggedIn === "preacher" && (
          <TopMenu
            state={currentFilter}
            data={filters}
            updateState={setCurrentFilter}
          />
        )}
      {currentFilter === mainTranslate.t("all") ? (
        <View style={styles.container}>
          {state.allMeetings?.length === 0 ? (
            <NotFound title={meetingTranslate.t("noEntryText")} />
          ) : (
            <>
              {!isType && (
                <NotFound
                  title={meetingTranslate.t("typePlaceholder")}
                  icon="format-list-bulleted"
                />
              )}
              {!isMonth && isType && (
                <NotFound
                  title={mainTranslate.t("chooseMonth")}
                  icon="calendar-month-outline"
                />
              )}
              {groupBy<IMeeting>(state?.allMeetings, "type")[type]?.filter(
                (meeting) => meeting.month === currentMonth
              ).length === 0 ? (
                isMonth && (
                  <NotFound title={meetingTranslate.t("notFoundText")} />
                )
              ) : (
                <>
                  <FlatList
                    keyExtractor={(meeting) => meeting._id}
                    data={groupBy<IMeeting>(state?.allMeetings, "type")[
                      type
                    ]?.filter((meeting) => meeting.month === currentMonth)}
                    renderItem={({ item }) => (
                      <Meeting meeting={item} filter={currentFilter} />
                    )}
                    scrollEnabled={false}
                  />
                  {authContext.state.whoIsLoggedIn === "admin" && (
                    <IconLink
                    iconName="download"
                      description={`Generuj plik ${type} - ${currentMonth}`}
                      onPress={() =>
                        generateMeetingsPDF(
                          groupBy<IMeeting>(state?.allMeetings, "type")[
                            type
                          ]?.filter(
                            (meeting) => meeting.month === currentMonth
                          ),
                          type,
                          currentMonth
                        )
                      }
                    />
                  )}
                </>
              )}
            </>
          )}
        </View>
      ) : (
        <View style={styles.container}>
          {(preachersContext.state.preacher?.roles?.includes(
            "can_lead_meetings"
          ) ||
            preachersContext.state.preacher?.roles?.includes(
              "can_say_prayer"
            )) && (
            <>
              <Text
                style={[
                  styles.meeting,
                  {
                    color: settingsContext.state.mainColor,
                    fontSize: 19 + settingsContext.state.fontIncrement,
                  },
                ]}
              >
                {meetingTranslate.t("leadOrPrayer")}
              </Text>
              {state.meetings?.length === 0 ? (
                <NotFound title={meetingTranslate.t("noAssigmentsText")} />
              ) : (
                <FlatList
                  keyExtractor={(meeting) => meeting?._id}
                  data={state.meetings}
                  renderItem={({ item }) => (
                    <Meeting meeting={item} filter={currentFilter} />
                  )}
                  scrollEnabled={false}
                />
              )}
            </>
          )}

          {preachersContext.state.preacher?.roles?.includes(
            "can_have_assignment"
          ) && (
            <>
              <Text
                style={[
                  styles.meeting,
                  {
                    color: settingsContext.state.mainColor,
                    fontSize: 19 + settingsContext.state.fontIncrement,
                  },
                ]}
              >
                {meetingTranslate.t("taskOrReading")}
              </Text>
              {state.assignments?.length === 0 ? (
                <NotFound title={meetingTranslate.t("noAssigmentsText")} />
              ) : (
                <FlatList
                  keyExtractor={(assignment) => assignment?._id}
                  data={state.assignments}
                  renderItem={({ item }) => (
                    <PreacherAssignment
                      type={item.type}
                      assignment={item}
                      preacher={preachersContext.state.preacher!}
                    />
                  )}
                  scrollEnabled={false}
                />
              )}
            </>
          )}
          <Text
            style={[
              styles.meeting,
              {
                color: settingsContext.state.mainColor,
                fontSize: 19 + settingsContext.state.fontIncrement,
              },
            ]}
          >
            {meetingTranslate.t("cleaningLabel")}
          </Text>
          {state.allMeetings?.length === 0 ? (
            <NotFound title={meetingTranslate.t("noAssigmentsText")} />
          ) : (
            <FlatList
              keyExtractor={(meeting) => meeting?._id}
              data={state.allMeetings?.filter((meeting) =>
                meeting.cleaningGroup?.preachers.includes(
                  preachersContext.state.preacher?._id.toString()!
                )
              )}
              renderItem={({ item }) => (
                <CleaningAssignment meetingDate={new Date(item.date)} />
              )}
              scrollEnabled={false}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  meeting: {
    fontSize: 19,
    fontFamily: 'PoppinsSemiBold',
    marginTop: 10
  },
  activeType: {
    fontSize: 17,
    fontFamily: "MontserratRegular",
  },
});

export default MeetingsIndexScreen;
