import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { IOrdinal, IPreacher } from "../../../contexts/interfaces";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addAudioVideoAssignmentToCalendar } from "../helpers/calendar";
import IconLink from "../../../commonComponents/IconLink";

interface OrdinalAssignmentProps {
  assignment: IOrdinal;
  preacher: IPreacher;
}

const OrdinalAssignment: React.FC<OrdinalAssignmentProps> = ({
  assignment,
  preacher,
}) => {
  return (
    <View>
      {preacher && preacher._id === assignment.hallway1?._id && (
       <View>
          <Text style={styles.title}>
              {new Date(assignment.meeting?.date).toLocaleString("pl-PL")} -
              Porządkowy
          </Text>
          <IconLink 
                        onPress={() => addAudioVideoAssignmentToCalendar(new Date(assignment.meeting?.date), `Porządkowy`, 'Sala Królestwa')}
                        iconName="calendar-month-outline"
                        description="Dodaj do kalendarza"
                        isCentered={true}
                    />
        
      </View>
      )}
      {preacher && preacher._id === assignment.hallway2?._id && (
        <View>
          <Text style={styles.title}>
              {new Date(assignment.meeting?.date).toLocaleString("pl-PL")} -
              Porządkowy 2
          </Text>
          <IconLink 
                        onPress={() => addAudioVideoAssignmentToCalendar(new Date(assignment.meeting?.date), `Porządkowy 2`, 'Sala Królestwa')}
                        iconName="calendar-month-outline"
                        description="Dodaj do kalendarza"
                        isCentered={true}
                    />
        
      </View>
      )}
      {preacher && preacher._id === assignment.auditorium?._id && (
        <View>
          <Text style={styles.title}>
              {new Date(assignment.meeting?.date).toLocaleString("pl-PL")} -
              Porządkowy audytorium
          </Text>
          <IconLink 
                        onPress={() => addAudioVideoAssignmentToCalendar(new Date(assignment.meeting?.date), `Porządkowy audytorium`, 'Sala Królestwa')}
                        iconName="calendar-month-outline"
                        description="Dodaj do kalendarza"
                        isCentered={true}
                    />
          
      </View>
      )}
      {preacher && preacher._id === assignment.parking?._id && (
        <View>
          <Text style={styles.title}>
              {new Date(assignment.meeting?.date).toLocaleString("pl-PL")} -
              Porządkowy parking
          </Text>
          <IconLink 
                        onPress={() => addAudioVideoAssignmentToCalendar(new Date(assignment.meeting?.date), `Porządkowy parking`, 'Sala Królestwa')}
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

export default OrdinalAssignment;
