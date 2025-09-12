import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { IMinistryMeeting } from "../../../contexts/interfaces";
import { Context as PreachersContext } from "../../../contexts/PreachersContext";
import { Context as AuthContext } from "../../../contexts/AuthContext";
import { Context as SettingsContext } from "../../../contexts/SettingsContext";
import { ListItem } from "@rneui/themed";
import { addMinistryMeetingAssignmentToCalendar } from "../helpers/calendar";
import IconDescriptionValue from "../../../commonComponents/IconDescriptionValue";
import IconLink from "../../../commonComponents/IconLink";
import IconContainer from "../../../commonComponents/IconContainer";
import { Divider } from "@rneui/base";
import useLocaLization from "../../../hooks/useLocalization";
import { ministryMeetingsTranslations } from "../translations";
import { mainTranslations } from "../../../../localization";

interface MinistryMeetingProps {
  meeting: IMinistryMeeting;
  navigate: Function;
}

const MinistryMeeting: React.FC<MinistryMeetingProps> = ({
  meeting,
  navigate,
}) => {
  const [expanded, setExpanded] = useState<boolean>(
    new Date(meeting.date).toLocaleDateString("pl-PL") ===
      new Date().toLocaleDateString("pl-PL")
  );
  const { state } = useContext(PreachersContext);
  const authContext = useContext(AuthContext);
  const settingsContext = useContext(SettingsContext);
  const ministryMeetingTranslate = useLocaLization(
    ministryMeetingsTranslations
  );
  const mainTranslate = useLocaLization(mainTranslations);
  const dateToDisplay = new Date(meeting?.date).toLocaleString("pl-PL", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    hour12: settingsContext.state.format12h,
  });

  return (
    <View>
      <ListItem.Accordion
        containerStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.0)",
          paddingHorizontal: 0,
        }}
        content={
          <>
            <ListItem.Content>
              <ListItem.Title
                style={[
                  styles.date,
                  { fontSize: 20 + settingsContext.state.fontIncrement },
                ]}
              >
                {meeting.defaultPlace !== "Grupy"
                  ? dateToDisplay
                  : new Date(meeting.date).toLocaleDateString("pl-PL", {
                      day: "2-digit",
                      year: "numeric",
                      month: "2-digit",
                    })}{" "}
                {new Date(meeting.date).toLocaleDateString("pl-PL") ===
                  new Date().toLocaleDateString("pl-PL") &&
                  mainTranslate.t("today")}
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <IconDescriptionValue
          iconName={meeting?.defaultPlace === "Zoom" ? "video-box" : "home"}
          description={ministryMeetingTranslate.t("placeLabel")}
          value={meeting?.place || meeting?.defaultPlace}
        />
        {(meeting.defaultPlace !== "Grupy" || meeting.defaultPlace !== 'Groups') && (
          <IconDescriptionValue
            iconName="account-tie"
            description={ministryMeetingTranslate.t("leadLabel")}
            value={meeting?.lead?.name}
          />
        )}

        {meeting?.topic && (
          <IconDescriptionValue
            iconName="table-of-contents"
            description={ministryMeetingTranslate.t("topicLabel")}
            value={meeting?.topic}
          />
        )}
        {((state.preacher &&
          state.preacher.roles?.includes("can_edit_minimeetings")) ||
          authContext.state.whoIsLoggedIn === "admin") && (
          <IconContainer>
            <IconLink
              onPress={() => navigate("Ministry Meeting Edit", { meeting })}
              iconName="pencil"
              description={ministryMeetingTranslate.t("editText")}
            />
            <IconLink
              onPress={() =>
                navigate("Ministry Meeting Delete Confirm", { meeting })
              }
              iconName="trash-can"
              description={ministryMeetingTranslate.t("deleteText")}
            />
          </IconContainer>
        )}
        {state.preacher && state.preacher?._id === meeting?.lead?._id && (
          <IconLink
            onPress={() =>
              addMinistryMeetingAssignmentToCalendar(
                meeting?.date,
                meeting?.place,
                meeting?.topic!
              )
            }
            iconName="calendar-month-outline"
            description={mainTranslate.t("addToCalendar")}
            isCentered={true}
          />
        )}
      </ListItem.Accordion>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    fontFamily: "MontserratRegular",
    fontSize: 20,
  },
  text: {
    fontFamily: "InterRegular",
    fontSize: 16,
    marginBottom: 10,
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
    color: "#1f8aad",
    paddingVertical: 10,
  },
});

export default MinistryMeeting;
