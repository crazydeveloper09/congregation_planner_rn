import React, { ReactElement } from "react";
import { Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IMeetingAssignment, IPreacher } from "../../../contexts/interfaces";
import { TouchableOpacity } from "react-native-gesture-handler";
import { addMeetingAssignmentToCalendar } from "../helpers/calendar";
import IconLink from "../../../commonComponents/IconLink";

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
  let fontColor: string;
  let icon: ReactElement;
  switch (type) {
    case "Studium Strażnicy": {
      fontColor = "#588D3F";
      icon = (
        <MaterialCommunityIcons
          name="book-open-blank-variant"
          size={21}
          color={fontColor}
        />
      );
      break;
    }
    case "Wykład biblijny": {
      fontColor = "#292929";
      icon = (
        <MaterialCommunityIcons
          name="book-education"
          size={21}
          color={fontColor}
        />
      );
      break;
    }
    case "Skarby ze Słowa Bożego": {
      fontColor = "#2A6B77";
      icon = (
        <MaterialCommunityIcons
          name="diamond-stone"
          size={21}
          color={fontColor}
        />
      );
      break;
    }
    case "Ulepszajmy swoją służbę": {
      fontColor = "#9B6D17";
      icon = (
        <MaterialCommunityIcons
          name="briefcase-upload"
          size={21}
          color={fontColor}
        />
      );
      break;
    }
    case "Chrześcijański tryb życia": {
      fontColor = "#942926";
      icon = (
        <MaterialCommunityIcons name="sheep" size={21} color={fontColor} />
      );
      break;
    }
    default: {
      break;
    }
  }
  return (
    <>
      <Text style={[{ color: fontColor }, styles.title]}>
        <Text>{new Date(assignment.meeting.date).toLocaleDateString()} - </Text>
        <Text>{assignment.topic}</Text>
        {preacher && preacher._id === assignment.reader?._id && (
          <Text> - Lektor</Text>
        )}
      </Text>
      <IconLink
        onPress={() =>
          addMeetingAssignmentToCalendar(
            new Date(assignment.meeting?.date),
            `${assignment.topic}${
              preacher && preacher._id === assignment.reader?._id
                ? "- Lektor"
                : ""
            }`,
            "Sala Królestwa"
          )
        }
        iconName="calendar-month-outline"
        description="Dodaj do kalendarza"
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
