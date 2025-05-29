import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MeetingsNavigator from "./Meetings";
import MinistryMeetingNavigator from "./MinistryMeetings";
import CartsScheduleNavigator from "./CartsSchedule";
import AudioVideoNavigator from "./AudioVideo";
import { Button, PaperProvider, useTheme } from "react-native-paper";
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
import { StatusBar, View } from "react-native";
import { Context as SettingsContext } from "../contexts/SettingsContext";
import { Platform } from "react-native";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import territories from "../api/territories";

const Tab = createMaterialBottomTabNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

StatusBar.setBarStyle("light-content")

const MainNavigator = () => {
  const {state, loadPreacherInfo} = useContext(PreachersContext)
  const authContext = useContext(AuthContext);
  const cartScheduleTranslate = useLocaLization(cartScheduleTranslations);
  const meetingTranslate = useLocaLization(meetingsTranslations);
  const ministryMeetingTranslate = useLocaLization(ministryMeetingsTranslations);
  const preacherTranslate = useLocaLization(preachersTranslations);
  const mainTranslate = useLocaLization(mainTranslations);

  const [secondaryContainerColor, setSecondaryContainerColor] = useState<string>('#97D7ED40');
  const settingsContext = useContext(SettingsContext);

  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');


  useEffect(() => {
    loadPreacherInfo(authContext.state.preacherID);
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
    // Listen for incoming notifications
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
      // Handle the received notification
    });

    // Handle notification when app is in foreground
    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification tapped:', response);
      // Handle the notification response
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  useEffect(() => {
    settingsContext.loadColor();
    StatusBar.setBackgroundColor(settingsContext.state.mainColor);
    setSecondaryContainerColor(`${settingsContext.state.mainColor}50`);
  }, [settingsContext.state.mainColor]);

  useEffect(() => {
    if (expoPushToken) {
      // Send the token to your backend
      sendTokenToBackend(expoPushToken, authContext.state?.preacherID!);
    }
  }, [expoPushToken]);

  const theme = useTheme();
  theme.colors.secondaryContainer = secondaryContainerColor;
  theme.dark = false;

  return (
    <PaperProvider theme={theme}>
      <Tab.Navigator
        initialRouteName="Meetings"
        barStyle={{ backgroundColor: `${settingsContext.state.mainColor}15` }}
        screenOptions={{
          tabBarColor: secondaryContainerColor,
        }}
        theme={theme}
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

async function registerForPushNotificationsAsync() {
  let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    if (Constants.appOwnership === 'expo') {
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      token = (await Notifications.getDevicePushTokenAsync()).data;
    }


  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

async function sendTokenToBackend(token: string, preacherId: string) {
  try {
    const response = await territories.post('/register-device', {
      token,
      preacherId,
      platform: Platform.OS,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error sending token to backend:', error);
  }
}

export default MainNavigator;
