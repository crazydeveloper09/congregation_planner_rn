import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { addMeetingAssignmentToCalendar } from "../helpers/calendar";
import IconLink from "../../../commonComponents/IconLink";
import useLocaLization from "../../../hooks/useLocalization";
import { meetingsTranslations } from "../translations";
import { mainTranslations } from "../../../../localization";
import { Context as SettingsContext } from "../../../contexts/SettingsContext";

interface CleaningAssignmentProps {
  meetingDate: Date;
}

const CleaningAssignment: React.FC<CleaningAssignmentProps> = ({
 meetingDate
}) => {
  const settingsContext = useContext(SettingsContext);
  const meetingTranslate = useLocaLization(meetingsTranslations);
  const mainTranslate = useLocaLization(mainTranslations);
  return (
    <>
      <Text style={[{ fontSize: 18 + settingsContext.state.fontIncrement }, styles.title]}>
        <Text>{new Date(meetingDate).toLocaleDateString()} - </Text>
        <Text>Sprzątanie Sali Królestwa</Text>
      </Text>
      <IconLink
        onPress={() =>
          addMeetingAssignmentToCalendar(
            meetingDate,
            'Sprzątanie Sali Królestwa',
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
    fontSize: 18,
    fontFamily: "PoppinsRegular",
    marginTop: 6,
  },
});

export default CleaningAssignment;
