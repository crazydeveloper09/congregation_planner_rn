import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { months } from "../../../defaultData";
import { groupBy } from "../../helpers/arrays";
import { Context as MeetingContext } from "../../contexts/MeetingContext";
import AudioVideo from "./components/AudioVideo";
import Ordinal from "./components/Ordinal";
import { NavigationProp } from "@react-navigation/native";
import Loading from "../../commonComponents/Loading";
import NotFound from "../../commonComponents/NotFound";
import { IMeeting } from "../../contexts/interfaces";
import { Context as AuthContext } from "../../contexts/AuthContext";
import { Context as AudioVideoContext } from "../../contexts/AudioVideoContext";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import AudioVideoAssignment from "./components/AudioVideoAssignment";
import OrdinalAssignment from "./components/OrdinalAssignment";
import TopMenu from "../../commonComponents/TopMenu";

interface AudioVideoIndexScreenProps {
  navigation: NavigationProp<any>
}

const AudioVideoIndexScreen: React.FC<AudioVideoIndexScreenProps> = ({ navigation }) => {
  const filters = ["Wszystkie", "Moje przydziały"]
  const [currentFilter, setCurrentFilter] = useState<string>("Wszystkie")
  const types = ["Audio-video", "Porządkowi"];
  const [type, setType] = useState<string>("Audio-video");
  const [currentMonth, setCurrentMonth] = useState<string>(
    `${months[new Date().getMonth()] + " " + new Date().getFullYear()}`
  );
  const {state, loadMeetings} = useContext(MeetingContext)
  const authContext = useContext(AuthContext)
  const audioVideoContext = useContext(AudioVideoContext)
  const preachersContext = useContext(PreachersContext);

  useEffect(() => {
    currentFilter === "Wszystkie" ? loadMeetings() : audioVideoContext.loadPreacherAudioVideoAssignments();
  
    const unsubscribe = navigation.addListener("focus", () => {
      currentFilter === "Wszystkie" ? loadMeetings() : audioVideoContext.loadPreacherAudioVideoAssignments();
    });

    return unsubscribe;
  }, [currentFilter]);


  if (state.isLoading || audioVideoContext.state.isLoading) {
    return <Loading />;
  }

  const meetingsGroup = groupBy<IMeeting>(state.meetings!, "month");
  
  return (
    <ScrollView>
      {currentFilter === "Wszystkie" && <>
        <TopMenu state={type} data={types} updateState={setType} />
        <TopMenu state={currentMonth} data={meetingsGroup && Object.keys(meetingsGroup)} updateState={setCurrentMonth} />
      </>}
     
      {authContext.state.whoIsLoggedIn !== "admin" && <TopMenu state={currentFilter} data={filters} updateState={setCurrentFilter} />}

        {currentFilter === "Wszystkie" ? <View style={styles.container}>
          {state?.meetings?.length === 0 ? <NotFound title="Niestety nie dodano jeszcze żadnych zebrań" /> : <FlatList
            data={meetingsGroup && meetingsGroup[currentMonth]}
            renderItem={({ item }) => type === "Audio-video" ? <AudioVideo meeting={item} audioVideo={item.audioVideo} /> : <Ordinal meeting={item} ordinal={item.ordinal} />}
            scrollEnabled={false}
          />}
        </View>: <View style={styles.container}>
          <Text style={styles.meeting}>Audio-video</Text>
          {audioVideoContext.state.audioVideos?.length === 0 ? <NotFound title="Nie przydzielono Ci zadań w tej dziedzinie" /> : <FlatList
              data={audioVideoContext.state.audioVideos}
              renderItem={({ item }) => <AudioVideoAssignment assignment={item} preacher={preachersContext.state.preacher!} />}
              scrollEnabled={false}
            />}
          <Text style={styles.meeting}>Porządkowy</Text>
          {audioVideoContext.state.ordinals?.length === 0 ? <NotFound title="Nie przydzielono Ci zadań w tej dziedzinie" /> : <FlatList
              data={audioVideoContext.state.ordinals}
              renderItem={({ item }) => <OrdinalAssignment assignment={item} preacher={preachersContext.state.preacher!} />}
              scrollEnabled={false}
            />}
        </View>}
        
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
   padding: 15,
   marginBottom: 50
  },
  month: {
    fontSize: 17,
    fontFamily: 'MontserratRegular'
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

export default AudioVideoIndexScreen;
