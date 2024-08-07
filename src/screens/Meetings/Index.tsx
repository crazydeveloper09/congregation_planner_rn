import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { groupBy } from "../../helpers/arrays";
import { meetings } from "./data.mock";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
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
      : meetingTranslate.t("midweek")
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

  const isType = Object.keys(groupBy<IMeeting>(state.meetings!, "type")).includes(type);
  const isMonth = Object.keys(groupBy<IMeeting>(state.meetings!, "month")).includes(currentMonth);

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {currentFilter === mainTranslate.t("all") && state.meetings?.length !== 0 && <>
        <TopMenu state={type} data={state?.meetings && Object.keys(groupBy(state?.meetings, "type"))!} updateState={setType} />
        <TopMenu state={currentMonth} data={state?.meetings && Object.keys(groupBy(state?.meetings, "month"))!} updateState={setCurrentMonth} />
      </>}
      

      {(preachersContext.state.preacher && preachersContext.state.preacher.roles?.includes("can_lead_meetings") || preachersContext.state.preacher?.roles?.includes("can_have_assignment") || preachersContext.state.preacher?.roles?.includes("can_say_prayer")) && <TopMenu state={currentFilter} data={filters} updateState={setCurrentFilter} />}
      { currentFilter === mainTranslate.t("all") ? <View style={styles.container}>
        {!isType && <NotFound title={meetingTranslate.t("typePlaceholder")} icon="format-list-bulleted" />}
        {!isMonth && isType && <NotFound title={mainTranslate.t("chooseMonth")} icon="calendar-month-outline" />}
        {state.meetings?.length === 0 ? <NotFound title={meetingTranslate.t("noEntryText")} /> : <>
        {groupBy<IMeeting>(state?.meetings, "type")[type]?.filter(
            (meeting) => meeting.month === currentMonth
          ).length === 0 ? (
            isMonth && <NotFound title={meetingTranslate.t("notFoundText")} />
          ) : (
            <>
              <FlatList
                keyExtractor={(meeting) => meeting._id}
                data={groupBy<IMeeting>(state?.meetings, "type")[type]?.filter(
                  (meeting) => meeting.month === currentMonth
                )}
                renderItem={({ item }) => <Meeting meeting={item} filter={currentFilter} />}
                scrollEnabled={false}
              />
              { authContext.state.whoIsLoggedIn === "admin" && <IconDescriptionValue 
                iconName="download"
                value={mainTranslate.t("pdfInfo")}
              />}
              
            </>
          )}
        </>}
      </View> : <View style={styles.container}>
        <Text style={[styles.meeting, { color: settingsContext.state.mainColor}]}>{meetingTranslate.t("leadOrPrayer")}</Text>
        {state.meetings?.length === 0 ? <NotFound title={meetingTranslate.t("noAssigmentsText")} /> : <FlatList
            keyExtractor={(meeting) => meeting?._id}
            data={state.meetings}
            renderItem={({ item }) => <Meeting meeting={item} filter={currentFilter} />}
            scrollEnabled={false}
          />}
          <Text style={[styles.meeting, { color: settingsContext.state.mainColor}]}>{meetingTranslate.t("taskOrReading")}</Text>
            {state.assignments?.length === 0 ? <NotFound title={meetingTranslate.t("noAssigmentsText")} /> : <FlatList
              keyExtractor={(assignment) => assignment?._id}
              data={state.assignments}
              renderItem={({ item }) => <PreacherAssignment type={item.type} assignment={item} preacher={preachersContext.state.preacher!} />}
              scrollEnabled={false}
            />}
      </View>}
      
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
