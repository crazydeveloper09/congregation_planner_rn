// App.tsx

import { useContext, useEffect } from "react";
import { Context as SettingsContext } from "./src/contexts/SettingsContext"; // make sure this is exported
import { navigationRef } from './src/RootNavigation';
import { NavigationContainer } from "@react-navigation/native";
import SwitchNavigator from "./src/navigators/Switch";
import { Provider as PaperProvider } from "react-native-paper";
import { buildTheme } from "./src/helpers/colors";
import { Text } from "react-native";

export const AppContent = () => {
  const { state: settingsState, loadColor } = useContext(SettingsContext);

  useEffect(() => {
    loadColor();
  }, [settingsState.loaded])

  if (!settingsState.loaded) {
    return <Text>Loading theme</Text>;
  }

  const theme = buildTheme(settingsState.mainColor);

  return (
    <PaperProvider theme={theme}>
        <NavigationContainer ref={navigationRef}>
          <SwitchNavigator />
        </NavigationContainer>
    </PaperProvider>
  );
}
