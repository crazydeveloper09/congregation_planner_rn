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
  let fontColor: string;
  let icon: ReactElement;
  const navigation = useNavigation();
  const {state} = useContext(PreachersContext)
  const authContext = useContext(AuthContext)
  switch (type) {
    case "Studium Strażnicy": {
      fontColor = "#588D3F";
      icon = (
        <MaterialCommunityIcons
          name="book-open-blank-variant"
          size={21}
          color={"white"}
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
          color={"white"}
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
          color={"white"}
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
          color={"white"}
        />
      );
      break;
    }
    case "Chrześcijański tryb życia": {
      fontColor = "#942926";
      icon = <MaterialCommunityIcons name="sheep" size={21} color={"white"} />;
      break;
    }
    default: {
      break;
    }
  }
  return (
    <View style={styles.container}>
      {(type === "Studium Strażnicy") && (
        <IconDescriptionValue 
          iconName="music"
          description="Pieśń"
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
              {assignment.item.topic}
            </Text>
            <IconDescriptionValue 
                    iconName="account"
                    value={assignment.item.participant?.name || assignment.item.otherParticipant}
              />
            {assignment.item.reader && (
              <IconDescriptionValue 
                iconName="account-tie-voice"
                description="Lektor"
                value={assignment.item.reader.name}
              />
          
            )}
            {((state.preacher && state.preacher.roles?.includes("can_edit_meetings")) || authContext.state.whoIsLoggedIn === "admin") && <IconContainer>
                    <IconLink 
                        onPress={() => navigation.navigate("Meetings Assignment Edit", { meeting, assignment: assignment.item })}
                        iconName="pencil"
                        description="Edytuj zadanie"
                        color={fontColor}
                    />
                    <IconLink 
                        onPress={() => navigation.navigate("Meetings Assignment Delete Confirm", { meeting, assignment: assignment.item })}
                        iconName="trash-can"
                        description="Usuń zadanie"
                        color={fontColor}
                    />
                </IconContainer>}
            
          </>
        )}
        scrollEnabled={false}
      />
      
      {(type === "Ulepszajmy swoją służbę") && (
        <IconDescriptionValue 
          iconName="music"
          description="Pieśń"
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
