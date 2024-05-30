import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
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

interface MeetingsIndexScreenProps {
  navigation: NavigationProp<any>;
}

const MeetingsIndexScreen: React.FC<MeetingsIndexScreenProps> = ({
  navigation,
}) => {
  const filters = ["Wszystkie", "Moje przydziały"]
  const [currentFilter, setCurrentFilter] = useState<string>("Wszystkie")
  const [type, setType] = useState<string>(
    new Date().getDay() === 0 || new Date().getDay() === 6
      ? "Zebranie w weekend"
      : "Zebranie w tygodniu"
  );
  const [currentMonth, setCurrentMonth] = useState<string>(
    `${months[new Date().getMonth()] + " " + new Date().getFullYear()}`
  );
  const { state, loadMeetings, loadPreacherMeetingAssignments } = useContext(MeetingContext);
  const preachersContext = useContext(PreachersContext)
  const authContext = useContext(AuthContext)

  useEffect(() => {
    currentFilter === "Wszystkie" ? loadMeetings() : loadPreacherMeetingAssignments();
    if(((preachersContext.state.preacher && preachersContext.state.preacher.roles?.includes("can_edit_meetings")) || authContext.state.whoIsLoggedIn === "admin")) {
      navigation.setOptions({
        headerRight: () => <HeaderRight>
            <TouchableOpacity onPress={() => navigation.navigate('Meetings New')}>
                <MaterialCommunityIcons name='plus' size={30} color={'white'} />
            </TouchableOpacity>
            
        </HeaderRight>
      })
    }
  
    const unsubscribe = navigation.addListener("focus", () => {
      currentFilter === "Wszystkie" ? loadMeetings() : loadPreacherMeetingAssignments();
    });

    return unsubscribe;
  }, [currentFilter]);


  if (state.isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView>
      {currentFilter === "Wszystkie" && state.meetings?.length !== 0 && <>
        <TopMenu state={type} data={state?.meetings && Object.keys(groupBy(state?.meetings, "type"))!} updateState={setType} />
        <TopMenu state={currentMonth} data={state?.meetings && Object.keys(groupBy(state?.meetings, "month"))!} updateState={setCurrentMonth} />
      </>}
      

      {(preachersContext.state.preacher && preachersContext.state.preacher.roles?.includes("can_lead_meetings") || preachersContext.state.preacher?.roles?.includes("can_have_assignment") || preachersContext.state.preacher?.roles?.includes("can_say_prayer")) && <TopMenu state={currentFilter} data={filters} updateState={setCurrentFilter} />}
      { currentFilter === "Wszystkie" ? <View style={styles.container}>
        {state.meetings?.length === 0 ? <NotFound title="Niestety nie dodano jeszcze zebrań" /> : <>
        {groupBy<IMeeting>(state?.meetings, "type")[type]?.filter(
            (meeting) => meeting.month === currentMonth
          ).length === 0 ? (
            <NotFound title="Niestety nie znaleziono zebrań" />
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
                value='Zaloguj się w aplikacji internetowej, by wygenerowac plik do druku'
              />}
              
            </>
          )}
        </>}
      </View> : <View style={styles.container}>
        <Text style={styles.meeting}>Prowadzący lub modlitwa</Text>
        {state.meetings?.length === 0 ? <NotFound title="Nie przydzielono Ci zadań w tej dziedzinie" /> : <FlatList
            keyExtractor={(meeting) => meeting?._id}
            data={state.meetings}
            renderItem={({ item }) => <Meeting meeting={item} filter={currentFilter} />}
            scrollEnabled={false}
          />}
          <Text style={styles.meeting}>Zadania lub lektorowanie</Text>
            {state.assignments?.length === 0 ? <NotFound title="Nie przydzielono Ci zadań w tej dziedzinie" /> : <FlatList
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
    color: '#1F8AAD',
    fontFamily: 'PoppinsSemiBold',
    marginTop: 10
  },
  activeType: {
    fontSize: 17,
    fontFamily: "MontserratRegular",
  },
});

export default MeetingsIndexScreen;
