import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { months } from "../../../defaultData";
import { groupBy } from "../../helpers/arrays";
import { Context as MeetingContext } from "../../contexts/MeetingContext";
import AudioVideo from "./components/AudioVideo";
import Attendant from "./components/Attendant";
import { NavigationProp } from "@react-navigation/native";
import Loading from "../../commonComponents/Loading";
import NotFound from "../../commonComponents/NotFound";
import { IMeeting } from "../../contexts/interfaces";
import { Context as AuthContext } from "../../contexts/AuthContext";
import { Context as AudioVideoContext } from "../../contexts/AudioVideoContext";
import { Context as PreachersContext } from "../../contexts/PreachersContext";
import AudioVideoAssignment from "./components/AudioVideoAssignment";
import AttendantAssignment from "./components/AttendantAssignment";
import TopMenu from "../../commonComponents/TopMenu";
import IconDescriptionValue from "../../commonComponents/IconDescriptionValue";
import HeaderRight from "../../commonComponents/HeaderRight";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useLocaLization from "../../hooks/useLocalization";
import { mainTranslations } from "../../../localization";
import { attendantTranslations } from "./Attendants/translations";
import { meetingsTranslations } from "../Meetings/translations";
import { Context as SettingsContext } from "../../contexts/SettingsContext";
import { buildAttendantsPDF, buildAudioVideoPDF } from "./helpers/pdf";
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import IconLink from "../../commonComponents/IconLink";

interface AudioVideoIndexScreenProps {
  navigation: NavigationProp<any>
}

const AudioVideoIndexScreen: React.FC<AudioVideoIndexScreenProps> = ({ navigation }) => {
  const meetingsTranslate = useLocaLization(meetingsTranslations);
  const mainTranslate = useLocaLization(mainTranslations);
  const attendantTranslate = useLocaLization(attendantTranslations)
  const filters = [mainTranslate.t("all"), mainTranslate.t("myAssignments")]
  const [currentFilter, setCurrentFilter] = useState<string>(mainTranslate.t('all'))
  const types = ["Audio-video", attendantTranslate.t("sectionText")];
  const [type, setType] = useState<string>("Audio-video");
  const [currentMonth, setCurrentMonth] = useState<string>(
    `${months[new Date().getMonth()] + " " + new Date().getFullYear()}`
  );
  const {state, loadMeetings} = useContext(MeetingContext)
  const authContext = useContext(AuthContext)
  const audioVideoContext = useContext(AudioVideoContext)
  const preachersContext = useContext(PreachersContext);
  const settingsContext = useContext(SettingsContext)

  const [refreshing, setRefreshing] = React.useState(false);

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);

  const generatePDF = async (meetings: IMeeting[], month: string, type: string) => {
          try {
      
            const html = type === "Audio-video" ? buildAudioVideoPDF(meetings, month) : buildAttendantsPDF(meetings, month);
      
            const { uri } = await Print.printToFileAsync({ html });
      
            const newPath = FileSystem.documentDirectory + `${ type === "Audio-video" ? type: attendantTranslate.t("sectionText")}_${month}.pdf`;
            await FileSystem.copyAsync({
              from: uri,
              to: newPath,
            });
      
            if (await Sharing.isAvailableAsync()) {
              await Sharing.shareAsync(newPath);
            }
          } catch (error) {
            Alert.alert("Error", mainTranslate.t("generatePDFError"));
          }
        }

  useEffect(() => {
    currentFilter === mainTranslate.t("all") ? loadMeetings() : audioVideoContext.loadPreacherAudioVideoAssignments();
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight>
          <TouchableOpacity
            onPress={onRefresh}
          >
            <MaterialCommunityIcons name="refresh" size={30} color={"white"} />
          </TouchableOpacity>
        </HeaderRight>
      ),
    });
  
    const unsubscribe = navigation.addListener("focus", () => {
      currentFilter === mainTranslate.t("all") ? loadMeetings() : audioVideoContext.loadPreacherAudioVideoAssignments();
    });

    return unsubscribe;
  }, [currentFilter, refreshing]);


  if (state.isLoading || audioVideoContext.state.isLoading) {
    return <Loading />;
  }

  const meetingsGroup = groupBy<IMeeting>(state.allMeetings!, "month");
  const isMonth = Object.keys(groupBy<IMeeting>(state.allMeetings!, "month")).includes(currentMonth);
  
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {currentFilter === mainTranslate.t("all") && <>
        <TopMenu state={type} data={types} updateState={setType} />
        {state.allMeetings?.length !== 0 && <TopMenu state={currentMonth} data={meetingsGroup && Object.keys(meetingsGroup)} updateState={setCurrentMonth} />}
      </>}
     
      {authContext.state.whoIsLoggedIn !== "admin" && <TopMenu state={currentFilter} data={filters} updateState={setCurrentFilter} />}

        {currentFilter === mainTranslate.t("all") ? <View style={styles.container}>
          {state?.allMeetings?.length === 0 ? <NotFound title={meetingsTranslate.t("noEntryText")} /> : <>
          {!isMonth && <NotFound title={mainTranslate.t("chooseMonth")} icon="calendar-month-outline" />}
          <FlatList
            keyExtractor={(meeting) => meeting._id}
            data={meetingsGroup && meetingsGroup[currentMonth]}
            renderItem={({ item }) => type === "Audio-video" ? <AudioVideo meeting={item} audioVideo={item.audioVideo} /> : <Attendant meeting={item} attendant={item.ordinal} />}
            scrollEnabled={false}
          />
          { authContext.state.whoIsLoggedIn === "admin" && <IconLink
                iconName="download"
                description={`Generuj plik ${type}_${currentMonth}`}
                onPress={() => generatePDF(meetingsGroup && meetingsGroup[currentMonth], currentMonth, type)}
              />}
          </>}
        </View>: <View style={styles.container}>
          <Text style={[styles.meeting, { color: settingsContext.state.mainColor }, { fontSize: 19 + settingsContext.state.fontIncrement }]}>Audio-video</Text>
          {audioVideoContext.state.audioVideos?.filter((audioVideo) => new Date(audioVideo.meeting?.date).toString() !== "Invalid Date").length === 0 ? <NotFound title={meetingsTranslate.t("noAssigmentsText")} /> : <FlatList
              keyExtractor={(audioVideo) => audioVideo._id}
              data={audioVideoContext.state.audioVideos?.filter((audioVideo) => new Date(audioVideo.meeting?.date).toString() !== "Invalid Date")}
              renderItem={({ item }) => <AudioVideoAssignment assignment={item} preacher={preachersContext.state.preacher!} />}
              scrollEnabled={false}
            />}
          <Text style={[styles.meeting, { color: settingsContext.state.mainColor }, { fontSize: 19 + settingsContext.state.fontIncrement }]}>{attendantTranslate.t("sectionText")}</Text>
          {audioVideoContext.state.ordinals?.filter((attendant) => new Date(attendant.meeting?.date).toString() !== "Invalid Date").length === 0 ? <NotFound title={meetingsTranslate.t("noAssigmentsText")} /> : <FlatList
            keyExtractor={(ordinal) => ordinal._id}
              data={audioVideoContext.state.ordinals?.filter((attendant) => new Date(attendant.meeting?.date).toString() !== "Invalid Date")}
              renderItem={({ item }) => <AttendantAssignment assignment={item} preacher={preachersContext.state.preacher!} />}
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
  fontFamily: 'PoppinsSemiBold',
  marginTop: 10
},
  activeType: {
    fontSize: 17,
    fontFamily: "MontserratRegular",
  },
});

export default AudioVideoIndexScreen;
