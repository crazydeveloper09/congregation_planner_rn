                   import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { IMeetingAssignment, IPreacher } from "../../../contexts/interfaces";
import { addMeetingAssignmentToCalendar } from "../helpers/calendar";
import IconLink from "../../../commonComponents/IconLink";
import { chooseFontColorAndIcon } from "../Assignments/helpers/types";
import useLocaLization from "../../../hooks/useLocalization";
import { meetingAssignmentTranslations } from "../Assignments/translations";
import { meetingsTranslations } from "../translations";
import { mainTranslations } from "../../../../localization";
import { Context as SettingsContext } from "../../../contexts/SettingsContext";

interface PreacherAssignmentProps {
  type: string;
  assignment: IMeetingAssignment;
  preacher: IPreacher;
}

const PreacherAssignment: React.FC<PreacherAssignmentProps> = ({
  type,
  assignment,
  preacher,
}) => {
  const settingsContext = useContext(SettingsContext);
  const {icon, fontColor} = chooseFontColorAndIcon(type, settingsContext.state.fontIncrement);
  const meetingAssignmentsTranslate = useLocaLization(meetingAssignmentTranslations);
  const meetingTranslate = useLocaLization(meetingsTranslations);
  const mainTranslate = useLocaLization(mainTranslations);
  return (
    <>
      <Text style={[{ color: fontColor, fontSize: 18 + settingsContext.state.fontIncrement }, styles.title]}>
        <Text>{new Date(assignment.meeting.date).toLocaleDateString()} - </Text>
        <Text>{assignment.topic || assignment.defaultTopic}</Text>
        {preacher && preacher._id === assignment.reader?._id && (
          <Text> - {meetingAssignmentsTranslate.t("readerLabel")}</Text>
        )}
        {preacher && preacher._id === assignment.helper?._id && (
          <Text> - {meetingAssignmentsTranslate.t("helperLabel")}</Text>
        )}
      </Text>
      <IconLink
        onPress={() =>
          addMeetingAssignmentToCalendar(
            new Date(assignment.meeting?.date),
            `${assignment.topic || assignment.defaultTopic}${
              preacher && preacher._id === assignment.reader?._id
                ? `- ${meetingAssignmentsTranslate.t('readerLabel')}`
                : ""
            }${
              preacher && preacher._id === assignment.helper?._id
                ? `- ${meetingAssignmentsTranslate.t('helperLabel')}`
                : ""
            }`,
            meetingTranslate.t("kingdomHallText")
          )
        }
        iconName="calendar-month-outline"
        description={mainTranslate.t("addToCalendar")}
        isCentered={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  title: {
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
  link: {
    fontSize: 17,
    color: "#1f8aad",
    paddingBottom: 10,
    textAlign: "center",
  },
});

export default PreacherAssignment;
