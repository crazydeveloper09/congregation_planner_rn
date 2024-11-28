import React, { useContext } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { IAttendant, IPreacher } from "../../../contexts/interfaces";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addAudioVideoAssignmentToCalendar } from "../helpers/calendar";
import IconLink from "../../../commonComponents/IconLink";
import useLocaLization from "../../../hooks/useLocalization";
import { Context as SettingsContext } from "../../../contexts/SettingsContext";
import { attendantTranslations } from "../Attendants/translations";
import { mainTranslations } from "../../../../localization";
import { meetingsTranslations } from "../../Meetings/translations";

interface AttendantAssignmentProps {
  assignment: IAttendant;
  preacher: IPreacher;
}

const AttendantAssignment: React.FC<AttendantAssignmentProps> = ({
  assignment,
  preacher,
}) => {
  const attendantTranslate = useLocaLization(attendantTranslations);
  const settingsContext = useContext(SettingsContext);
  const mainTranslate = useLocaLization(mainTranslations);
  const meetingTranslate = useLocaLization(meetingsTranslations);
  return (
    <View>
      {preacher && preacher._id === assignment.hallway1?._id && (
        <View>
          <Text style={[styles.title, { fontSize: 18 + settingsContext.state.fontIncrement }]}>
            {new Date(assignment.meeting?.date).toLocaleString("pl-PL")} - {""}
            {attendantTranslate.t("hallwayLabel")}
          </Text>
          <IconLink
            onPress={() =>
              addAudioVideoAssignmentToCalendar(
                new Date(assignment.meeting?.date),
                attendantTranslate.t("hallwayLabel"),
                meetingTranslate.t("kingdomHallText")
              )
            }
            iconName="calendar-month-outline"
            description={mainTranslate.t("addToCalendar")}
            isCentered={true}
          />
        </View>
      )}
      {preacher && preacher._id === assignment.hallway2?._id && (
        <View>
          <Text style={[styles.title, { fontSize: 18 + settingsContext.state.fontIncrement }]}>
            {new Date(assignment.meeting?.date).toLocaleString("pl-PL")} - {""}
            {attendantTranslate.t("hallway2Label")}
          </Text>
          <IconLink
            onPress={() =>
              addAudioVideoAssignmentToCalendar(
                new Date(assignment.meeting?.date),
                attendantTranslate.t("hallway2Label"),
                meetingTranslate.t("kingdomHallText")
              )
            }
            iconName="calendar-month-outline"
            description={mainTranslate.t("addToCalendar")}
            isCentered={true}
          />
        </View>
      )}
      {preacher && preacher._id === assignment.auditorium?._id && (
        <View>
          <Text style={[styles.title, { fontSize: 18 + settingsContext.state.fontIncrement }]}>
            {new Date(assignment.meeting?.date).toLocaleString("pl-PL")} - {""}
            {attendantTranslate.t("auditoriumLabel")}
          </Text>
          <IconLink
            onPress={() =>
              addAudioVideoAssignmentToCalendar(
                new Date(assignment.meeting?.date),
                attendantTranslate.t("auditoriumLabel"),
                meetingTranslate.t("kingdomHallText")
              )
            }
            iconName="calendar-month-outline"
            description={mainTranslate.t("addToCalendar")}
            isCentered={true}
          />
        </View>
      )}
      {preacher && preacher._id === assignment.parking?._id && (
        <View>
          <Text style={[styles.title, { fontSize: 18 + settingsContext.state.fontIncrement }]}>
            {new Date(assignment.meeting?.date).toLocaleString("pl-PL")} - {""}
            {attendantTranslate.t("parkingLabel")}
          </Text>
          <IconLink
            onPress={() =>
              addAudioVideoAssignmentToCalendar(
                new Date(assignment.meeting?.date),
                attendantTranslate.t("parkingLabel"),
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
});

export default AttendantAssignment;
