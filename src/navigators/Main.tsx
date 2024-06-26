import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MeetingsNavigator from "./Meetings";
import MinistryMeetingNavigator from "./MinistryMeetings";
import CartsScheduleNavigator from "./CartsSchedule";
import AudioVideoNavigator from "./AudioVideo";
import { useTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { mainNavigationRef } from "../RootNavigation";
import { Context as PreachersContext } from "../contexts/PreachersContext";
import { Context as AuthContext } from "../contexts/AuthContext";
import PreachersNavigator from "./Preachers";
import SettingsNavigator from "./Settings";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IPreacher } from "../contexts/interfaces";

const Tab = createMaterialBottomTabNavigator();

const MainNavigator = () => {
  const {state, loadPreacherInfo} = useContext(PreachersContext)
  const authContext = useContext(AuthContext)

  const theme = useTheme();
  theme.colors.secondaryContainer = '#97D7ED';
  useEffect(() => {
    loadPreacherInfo(authContext.state.preacherID)
  }, [])

  return (
    
        <Tab.Navigator
        initialRouteName="Meetings"
        barStyle={{ backgroundColor: "#CBEBF6" }}
        screenOptions={{
          tabBarColor: "#97D7ED",
        }}
      >
        {((state.preacher && state.preacher.roles?.includes('can_see_meetings')) || authContext.state.whoIsLoggedIn === "admin") &&  <Tab.Screen
          name="Meetings"
          component={MeetingsNavigator}
          options={{
            tabBarColor: "#97D7ED",
            tabBarLabel: "Zebrania",
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
            tabBarLabel: "Zbiórki",
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
            tabBarLabel: "Wózek",
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
            tabBarLabel: "Głosiciele",
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
            tabBarLabel: "Ustawienia",
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

      
  );
};

export default MainNavigator;
