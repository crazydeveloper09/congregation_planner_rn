import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactElement } from "react";

export const chooseFontColorAndIcon = (type: string): {icon: ReactElement, fontColor: string} => {
    let fontColor: string;
    let icon: ReactElement;
    switch (type) {
        case "Studium Strażnicy": {
          fontColor = "#588D3F";
          icon = <MaterialCommunityIcons
              name="book-open-blank-variant"
              size={21}
              color={"white"}
            />;
          break;
        }
        case "Wykład biblijny": {
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
        case "Skarby ze Słowa Bożego": {
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
        case "Ulepszajmy swoją służbę": {
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
        case "Chrześcijański tryb życia": {
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