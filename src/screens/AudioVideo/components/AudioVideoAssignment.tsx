import React, { useContext } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { IAudioVideo, IPreacher } from "../../../contexts/interfaces";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addAudioVideoAssignmentToCalendar } from "../helpers/calendar";
import IconLink from "../../../commonComponents/IconLink";
import useLocaLization from "../../../hooks/useLocalization";
import { audioVideoTranslations } from "../translations";
import { mainTranslations } from "../../../../localization";
import { meetingsTranslations } from "../../Meetings/translations";
import { Context as SettingsContext } from "../../../contexts/SettingsContext";

interface AudioVideoAssignmentProps {
  assignment: IAudioVideo;
  preacher: IPreacher;
}

const AudioVideoAssignment: React.FC<AudioVideoAssignmentProps> = ({
  assignment,
  preacher,
}) => {
  const audioVideoTranslate = useLocaLization(audioVideoTranslations);
  const mainTranslate = useLocaLization(mainTranslations);
  const meetingTranslate = useLocaLization(meetingsTranslations);
  const settingsContext = useContext(SettingsContext);
  return (
    <View>
      {preacher && preacher._id === assignment.videoOperator?._id && (
        <View>
          <Text style={[styles.title, { fontSize: 18 + settingsContext.state.fontIncrement }]}>
            {new Date(assignment.meeting?.date).toLocaleString("pl-PL")} - {""}
            {audioVideoTranslate.t("videoOperatorLabel")}
          </Text>
          <IconLink
            onPress={() =>
              addAudioVideoAssignmentToCalendar(
                new Date(assignment.meeting?.date),
                audioVideoTranslate.t("videoOperatorLabel"),
                meetingTranslate.t("kingdomHallText")
              )
            }
            iconName="calendar-month-outline"
            description={mainTranslate.t("addToCalendar")}
            isCentered={true}
          />
        </View>
      )}
      {preacher && preacher._id === assignment.audioOperator?._id && (
        <View>
          <Text style={[styles.title, { fontSize: 18 + settingsContext.state.fontIncrement }]}>
            {new Date(assignment.meeting?.date).toLocaleString("pl-PL")} - {""}
            {audioVideoTranslate.t("audioOperatorLabel")}
          </Text>
          <IconLink
            onPress={() =>
              addAudioVideoAssignmentToCalendar(
                new Date(assignment.meeting?.date),
                audioVideoTranslate.t("audioOperatorLabel"),
                meetingTranslate.t("kingdomHallText")
              )
            }
            iconName="calendar-month-outline"
            description={mainTranslate.t("addToCalendar")}
            isCentered={true}
          />
        </View>
      )}
      {preacher && preacher._id === assignment.microphone1Operator?._id && (
        <View>
          <Text style={[styles.title, { fontSize: 18 + settingsContext.state.fontIncrement }]}>
            {new Date(assignment.meeting?.date).toLocaleString("pl-PL")} - {""}
            {audioVideoTranslate.t("mic1Label")}
          </Text>
          <IconLink
            onPress={() =>
              addAudioVideoAssignmentToCalendar(
                new Date(assignment.meeting?.date),
                audioVideoTranslate.t("mic1Label"),
                meetingTranslate.t("kingdomHallText")
              )
            }
            iconName="calendar-month-outline"
            description={mainTranslate.t("addToCalendar")}
            isCentered={true}
          />
        </View>
      )}
      {preacher && preacher._id === assignment.microphone2Operator?._id && (
        <View>
          <Text style={[styles.title, { fontSize: 18 + settingsContext.state.fontIncrement }]}>
            {new Date(assignment.meeting?.date).toLocaleString("pl-PL")} - {""}
            {audioVideoTranslate.t("mic2Label")}
          </Text>
          <IconLink
            onPress={() =>
              addAudioVideoAssignmentToCalendar(
                new Date(assignment.meeting?.date),
                audioVideoTranslate.t("mic2Label"),
                meetingTranslate.t("kingdomHallText")
              )
            }
            iconName="calendar-month-outline"
            description={mainTranslate.t("addToCalendar")}
            isCentered={true}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: "PoppinsRegular",
    marginTop: 6,
  },
  assignmentTitle: {
    paddingVertical: 10,
    fontSize: 18,
    fontFamily: "InterRegular",
  },
  participant: {
    fontSize: 16,
    fontFamily: "InterSemiBold",
  },
  text: {
    fontFamily: "InterRegular",
    fontSize: 16,
    marginTop: 20,
  },
  textBold: {
    fontFamily: "InterSemiBold",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  link: {
    fontSize: 17,
    paddingVertical: 10,
    color: "#1f8aad",
    textAlign: "center",
  },
});

export default AudioVideoAssignment;
