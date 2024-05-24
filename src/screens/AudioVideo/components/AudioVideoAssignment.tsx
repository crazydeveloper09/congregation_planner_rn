import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { IAudioVideo, IPreacher } from "../../../contexts/interfaces";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addAudioVideoAssignmentToCalendar } from "../helpers/calendar";
import IconLink from "../../../commonComponents/IconLink";

interface AudioVideoAssignmentProps {
  assignment: IAudioVideo;
  preacher: IPreacher;
}

const AudioVideoAssignment: React.FC<AudioVideoAssignmentProps> = ({
  assignment,
  preacher,
}) => {
  return (
    <View>
      {preacher && preacher._id === assignment.videoOperator?._id && (
          <View>
            <Text style={styles.title}>
                {new Date(assignment.meeting?.date).toLocaleString("pl-PL")} -
                Operator wideo
            </Text>
            <IconLink 
                        onPress={() => addAudioVideoAssignmentToCalendar(new Date(assignment.meeting?.date), `Operator wideo`, 'Sala Królestwa')}
                        iconName="calendar-month-outline"
                        description="Dodaj do kalendarza"
                        isCentered={true}
                    />
    
        </View>
      )}
      {preacher && preacher._id === assignment.audioOperator?._id && (
        <View>
            <Text style={styles.title}>
                {new Date(assignment.meeting?.date).toLocaleString("pl-PL")} -
                Operator audio
            </Text>
            <IconLink 
                        onPress={() => addAudioVideoAssignmentToCalendar(new Date(assignment.meeting?.date), `Operator audio`, 'Sala Królestwa')}
                        iconName="calendar-month-outline"
                        description="Dodaj do kalendarza"
                        isCentered={true}
                    />
        </View>
      )}
      {preacher && preacher._id === assignment.microphone1Operator?._id && (
        <View>
            <Text style={styles.title}>
                {new Date(assignment.meeting?.date).toLocaleString("pl-PL")} -
                Mikrofon 1 (lewy)
            </Text>
            <IconLink 
                        onPress={() => addAudioVideoAssignmentToCalendar(new Date(assignment.meeting?.date), `Mikrofon 1 (lewy)`, 'Sala Królestwa')}
                        iconName="calendar-month-outline"
                        description="Dodaj do kalendarza"
                        isCentered={true}
                    />
        </View>
      )}
      {preacher && preacher._id === assignment.microphone2Operator?._id && (
        <View>
          <Text style={styles.title}>
              {new Date(assignment.meeting?.date).toLocaleString("pl-PL")} -
              Mikrofon 2 (prawy)
          </Text>
          <IconLink 
                        onPress={() => addAudioVideoAssignmentToCalendar(new Date(assignment.meeting?.date), `Mikrofon 2 (prawy)`, 'Sala Królestwa')}
                        iconName="calendar-month-outline"
                        description="Dodaj do kalendarza"
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
    color: '#1f8aad',
    textAlign: 'center'
  },
});

export default AudioVideoAssignment;
