import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactElement } from "react";

export const chooseFontColorAndIcon = (type: string, fontIncrement: number = 0): {icon: ReactElement, fontColor: string, role: string} => {
    let fontColor: string;
    let icon: ReactElement;
    let role: string;
    switch (type) {
        case "watchtowerStudy": {
          fontColor = "#588D3F";
          icon = <MaterialCommunityIcons
              name="book-open-blank-variant"
              size={21 + fontIncrement}
              color={"white"}
            />;
          role = "can_do_watchtower";
          break;
        }
        case "bibleTalk": {
          fontColor = "#292929";
          icon = (
            <MaterialCommunityIcons
              name="book-education"
              size={21 + fontIncrement}
              color={"white"}
            />
          );
          role = "can_do_talk";
          break;
        }
        case "treasuresFromGodsWord": {
          fontColor = "#2A6B77";
          icon = (
            <MaterialCommunityIcons
              name="diamond-stone"
              size={21 + fontIncrement}
              color={"white"}
            />
          );
          role = "can_do_treasures";
          break;
        }
        case "applyYourselfToMinistry": {
          fontColor = "#9B6D17";
          icon = (
            <MaterialCommunityIcons
              name="briefcase-upload"
              size={21 + fontIncrement}
              color={"white"}
            />
          );
          role = "can_do_exercise";
          break;
        }

        case "livingAsChristians": {
          fontColor = "#942926";
          icon = <MaterialCommunityIcons name="sheep" size={21 + fontIncrement} color={"white"} />;
          role = "can_do_las"
          break;
        }
        default: {
          break;
        }
      }
      return { icon, fontColor, role }
}