import { Alert, Share } from "react-native";
import IconLink from "../../../commonComponents/IconLink"

const HelpInWorking: React.FC = () => {
    const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `Witaj, potrzebuję pomocy z opracowaniem terenu. Kiedy moglibyśmy się umówić do służby?`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

    return (
        <IconLink
            onPress={onShare} 
            description="Poproś o pomoc w opracowaniu terenu"
            isCentered
            iconName="handshake-outline"
        />
    )
}

export default HelpInWorking;