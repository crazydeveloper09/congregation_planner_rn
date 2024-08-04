import { NavigationContainer } from '@react-navigation/native';
import { Provider as AuthProvider } from './src/contexts/AuthContext';
import { Provider as MeetingProvider } from './src/contexts/MeetingContext';
import { Provider as MinistryMeetingProvider } from './src/contexts/MinistryMeetingContext';
import { Provider as CartsScheduleProvider } from './src/contexts/CartsScheduleContext';
import { Provider as AudioVideoProvider } from './src/contexts/AudioVideoContext';
import { Provider as OrdinalsProvider } from './src/contexts/AttendantsContext';
import { Provider as PreachersProvider } from './src/contexts/PreachersContext';
import { Provider as MinistryGroupProvider } from './src/contexts/MinistryGroupContext';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { navigationRef } from './src/RootNavigation';
import SwitchNavigator from './src/navigators/Switch';
import FlashMessage from 'react-native-flash-message';
import * as Calendar from 'expo-calendar';
import { useEffect, useState } from 'react';
StatusBar.setBarStyle('light-content')

function App() {
  
  const [fontsLoaded] = useFonts({
    'FontAwesome': require('./assets/fonts/FontAwesome.ttf'),
    'InterThin': require('./assets/fonts/inter/Inter-Thin.ttf'),
    'InterRegular': require('./assets/fonts/inter/Inter-Regular.ttf'),
    'InterSemiBold': require('./assets/fonts/inter/Inter-SemiBold.ttf'),
    'MontserratRegular': require('./assets/fonts/montserrat/Montserrat-Regular.ttf'),
    'MontserratSemiBold': require('./assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
    'PoppinsThin': require('./assets/fonts/Poppins/Poppins-Thin.ttf'),
    'PoppinsSemiBold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'PoppinsRegular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    'SatisfyRegular': require('./assets/fonts/Satisfy/Satisfy-Regular.ttf')
  });
  const [permissionStatus, setPermissionStatus] = useState<string>('')
  const loadCalendarPermission = async () => {
    const {status} = await Calendar.requestCalendarPermissionsAsync();
    setPermissionStatus(status)
  }

  useEffect(() => {
    loadCalendarPermission()
  }, [])

  if(!fontsLoaded && permissionStatus === 'granted') {
    return null;
  }
  
  return (
    
     <AudioVideoProvider>
      <AuthProvider>
        <CartsScheduleProvider>
          <MeetingProvider>
            <MinistryMeetingProvider>
              <OrdinalsProvider>
                <PreachersProvider>
                  <MinistryGroupProvider>
                    <NavigationContainer ref={navigationRef}>
                      <SwitchNavigator />
                    </NavigationContainer>
                  </MinistryGroupProvider>
                </PreachersProvider>
              </OrdinalsProvider>
            </MinistryMeetingProvider>
          </MeetingProvider>
        </CartsScheduleProvider>
      </AuthProvider>
      <FlashMessage position={'bottom'} />
     </AudioVideoProvider>
  
   
  );
}
export default App;