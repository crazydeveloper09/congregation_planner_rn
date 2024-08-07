import React, { ReactElement, useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IMeeting, IMeetingAssignment } from "../../../contexts/interfaces";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Context as PreachersContext } from "../../../contexts/PreachersContext";
import { Context as AuthContext } from "../../../contexts/AuthContext";
import IconDescriptionValue from "../../../commonComponents/IconDescriptionValue";
import IconLink from "../../../commonComponents/IconLink";
import IconContainer from "../../../commonComponents/IconContainer";
import { chooseFontColorAndIcon } from "../Assignments/helpers/types";
import useLocaLization from "../../../hooks/useLocalization";
import { meetingAssignmentTranslations } from "../Assignments/translations";
import { meetingsTranslations } from "../translations";

interface MeetingAssignmentProps {
  type: string;
  assignments: {
    [key: string]: IMeetingAssignment[];
  };
  midSong: number;
  meeting: IMeeting;
}

const MeetingAssignment: React.FC<MeetingAssignmentProps> = ({
  type,
  assignments,
  midSong,
  meeting,
}) => {
  const { icon, fontColor } = chooseFontColorAndIcon(type);
  const navigation = useNavigation();
  const {state} = useContext(PreachersContext)
  const authContext = useContext(AuthContext)
  const meetingAssignmentsTranslate = useLocaLization(meetingAssignmentTranslations);
  const meetingTranslate = useLocaLization(meetingsTranslations);

  return (
    <View style={styles.container}>
      {(type === meetingAssignmentsTranslate.t("watchtowerStudy")) && (
        <IconDescriptionValue 
          iconName="music"
          description={meetingTranslate.t("songLabel")}
          value={midSong.toString()}
        />
    
      )}
      <Text style={[{ backgroundColor: fontColor }, styles.title]}>
        {icon}
        <Text>{type}</Text>
      </Text>
      <FlatList
        keyExtractor={(assignment) => assignment._id}
        data={assignments[type]}
        renderItem={(assignment) => (
          <>
            <Text style={[{ color: fontColor }, styles.assignmentTitle]}>
              {assignment.item.topic || assignment.item.defaultTopic}
            </Text>
            <IconDescriptionValue 
                    iconName="account"
                    value={assignment.item.participant?.name || assignment.item.otherParticipant}
              />
            {assignment.item.reader && (
              <IconDescriptionValue 
                iconName="account-tie-voice"
                description={meetingAssignmentsTranslate.t("readerLabel")}
                value={assignment.item.reader.name}
              />
          
            )}
            {((state.preacher && state.preacher.roles?.includes("can_edit_meetings")) || authContext.state.whoIsLoggedIn === "admin") && <IconContainer>
                    <IconLink 
                        onPress={() => navigation.navigate("Meetings Assignment Edit", { meeting, assignment: assignment.item })}
                        iconName="pencil"
                        description={meetingAssignmentsTranslate.t("editText")}
                        color={fontColor}
                    />
                    <IconLink 
                        onPress={() => navigation.navigate("Meetings Assignment Delete Confirm", { meeting, assignment: assignment.item })}
                        iconName="trash-can"
                        description={meetingAssignmentsTranslate.t("deleteText")}
                        color={fontColor}
                    />
                </IconContainer>}
            
          </>
        )}
        scrollEnabled={false}
      />
      
      {(type === meetingAssignmentsTranslate.t("applyYourselfToMinistry")) && (
        <IconDescriptionValue 
          iconName="music"
          description={meetingTranslate.t("songLabel")}
          value={midSong.toString()}
        />
    
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  title: {
    padding: 10,
    fontSize: 21,
    fontFamily: "PoppinsSemiBold",
    color: "white",
    gap: 6,
    width: '100%'
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
  },
});

export default MeetingAssignment;
