import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MeetingsNavigator from "./Meetings";
import MinistryMeetingNavigator from "./MinistryMeetings";
import CartsScheduleNavigator from "./CartsSchedule";
import AudioVideoNavigator from "./AudioVideo";
import { PaperProvider, useTheme } from "react-native-paper";
import { Context as PreachersContext } from "../contexts/PreachersContext";
import { Context as AuthContext } from "../contexts/AuthContext";
import PreachersNavigator from "./Preachers";
import SettingsNavigator from "./Settings";
import { useContext, useEffect, useState } from "react";
import useLocaLization from "../hooks/useLocalization";
import { cartScheduleTranslations } from "../screens/CartsSchedule/translations";
import { meetingsTranslations } from "../screens/Meetings/translations";
import { ministryMeetingsTranslations } from "../screens/MinistryMeeting/translations";
import { preachersTranslations } from "../screens/Preachers/translations";
import { mainTranslations } from "../../localization";
import { StatusBar } from "react-native";
import { Context as SettingsContext } from "../contexts/SettingsContext";

const Tab = createMaterialBottomTabNavigator();

const MainNavigator = () => {
  const {state, loadPreacherInfo} = useContext(PreachersContext)
  const authContext = useContext(AuthContext);
  const cartScheduleTranslate = useLocaLization(cartScheduleTranslations);
  const meetingTranslate = useLocaLization(meetingsTranslations);
  const ministryMeetingTranslate = useLocaLization(ministryMeetingsTranslations);
  const preacherTranslate = useLocaLization(preachersTranslations);
  const mainTranslate = useLocaLization(mainTranslations);

  useEffect(() => {
    loadPreacherInfo(authContext.state.preacherID)
  }, [])

  const [secondaryContainerColor, setSecondaryContainerColor] = useState<string>('#97D7ED40');
    const settingsContext = useContext(SettingsContext);
   
    useEffect(() => {
      settingsContext.loadColor()
      StatusBar.setBackgroundColor(settingsContext.state.mainColor)
      setSecondaryContainerColor(`${settingsContext.state.mainColor}50`)
    }, [settingsContext.state.mainColor])

  const theme = useTheme();
  theme.colors.secondaryContainer = secondaryContainerColor;

  return (
    <PaperProvider>
      <Tab.Navigator
        initialRouteName="Meetings"
        barStyle={{ backgroundColor: `${settingsContext.state.mainColor}15` }}
        screenOptions={{
          tabBarColor: secondaryContainerColor,
        }}
      >
        {((state.preacher && state.preacher.roles?.includes('can_see_meetings')) || authContext.state.whoIsLoggedIn === "admin") &&  <Tab.Screen
          name="Meetings"
          component={MeetingsNavigator}
          options={{
            tabBarColor: secondaryContainerColor,
            tabBarLabel: meetingTranslate.t("sectionText"),
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-tie"
                color={color}
                size={26}
              />
            ),
          }}
        /> }
        
        {((state.preacher && state.preacher.roles?.includes('can_see_minimeetings')) || authContext.state.whoIsLoggedIn === "admin") &&  <Tab.Screen
          name="MinistryMeetings"
          component={MinistryMeetingNavigator}
          options={{
            tabBarLabel: ministryMeetingTranslate.t("navText"),
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="briefcase-variant"
                color={color}
                size={26}
              />
            ),
          }}
        /> }
      
        {((state.preacher && state.preacher.roles?.includes('can_see_cartSchedule')) || authContext.state.whoIsLoggedIn === "admin") && <Tab.Screen
          name="CartsSchedule"
          component={CartsScheduleNavigator}
          options={{
            tabBarLabel: cartScheduleTranslate.t("navText"),
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="window-open"
                color={color}
                size={26}
              />
            ),
          }} //view-split-horizontal
        /> }
        {((state.preacher && state.preacher.roles?.includes('can_see_audio_video')) || authContext.state.whoIsLoggedIn === "admin") && <Tab.Screen
          name="Audio-video"
          component={AudioVideoNavigator}
          options={{
            tabBarLabel: "Audio-video",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="cast-audio"
                color={color}
                size={26}
              />
            ),
          }}
        /> }

        {authContext.state.whoIsLoggedIn === "admin" && <Tab.Screen
          name="Preachers"
          component={PreachersNavigator}
          options={{
            tabBarLabel: preacherTranslate.t("sectionText"),
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-group"
                color={color}
                size={26}
              />
            ),
          }}
        /> }
        
        
        <Tab.Screen
          name="Settings Navigator"
          component={SettingsNavigator}
          options={{
            tabBarLabel: mainTranslate.t("settingsLabel"),
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="cog"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>

    </PaperProvider>
        

      
  );
};

export default MainNavigator;
