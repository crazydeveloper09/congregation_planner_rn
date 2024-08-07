import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactElement } from "react";
import useLocaLization from "../../../../hooks/useLocalization";
import { meetingAssignmentTranslations } from "../translations";

export const chooseFontColorAndIcon = (type: string): {icon: ReactElement, fontColor: string} => {
    let fontColor: string;
    let icon: ReactElement;
    const meetingAssignmentsTranslate = useLocaLization(meetingAssignmentTranslations)
    switch (type) {
        case "Studium Strażnicy":
        case "Watchtower Study": {
          fontColor = "#588D3F";
          icon = <MaterialCommunityIcons
              name="book-open-blank-variant"
              size={21}
              color={"white"}
            />;
          break;
        }
        case "Wykład biblijny":
        case "Bible Talk": {
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
        case "Skarby ze Słowa Bożego":
        case "Treasures From God's Word": {
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
        case "Ulepszajmy swoją służbę":
        case "Apply Yourself to The Field Ministry": {
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
        case "Chrześcijański tryb życia":
        case "Living As Christians": {
          fontColor = "#942926";
          icon = <MaterialCommunityIcons name="sheep" size={21} color={"white"} />;
          break;
        }
        default: {
          break;
        }
      }
      return { icon, fontColor }
}