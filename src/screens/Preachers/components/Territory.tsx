import React from "react";
import { IPreacher, ITerritory } from "../../../contexts/interfaces";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Badge } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { changeColorForDates, countDaysFromNow } from "../../../helpers/dates";
import { isTablet, isWeb } from "../../../helpers/devices";
import DescriptionAndValue from "./DescriptionAndValue";
import HelpInWorking from "./HelpInWorking";
import IconDescriptionValue from "../../../commonComponents/IconDescriptionValue";


interface TerritoryProps {
  territory: ITerritory;
  preachers?: IPreacher[];
}

const Territory: React.FC<TerritoryProps> = ({ territory, preachers }) => {
  const navigation = useNavigation();
 

    
  let backgroundColor;
  let territoryKindText;
  switch (territory.kind) {
    case "city":
      backgroundColor = "#f6edd9";
      territoryKindText = 'Teren miejski';
      break;
    case "market":
      backgroundColor = "white";
      territoryKindText = 'Teren handlowo-usługowy';
      break;
    case "village":
      backgroundColor = "#e1f1ff";
      territoryKindText = 'Teren wiejski';
      break;
    default:
      break;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor },
        !territory.isPhysicalCard && { borderWidth: 3, borderColor: "#9999CC" },
      ]}
    >
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.title}>Karta terenu nr {territory.number}</Text>
          <Text style={styles.territoryKind}>{territoryKindText}</Text>
        </View>
        
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TerritoryHistory", { id: territory._id })
            }
          >
            <MaterialCommunityIcons name="map" color="black" size={26} />
          </TouchableOpacity>
        
        </View>
      </View>
      <DescriptionAndValue description="Miejscowość" value={territory.city} />
      

      {territory.street && (
        <DescriptionAndValue description="Ulica" value={`${territory.street} ${territory.beginNumber ? territory.beginNumber : ''} ${territory.endNumber ? '-' + territory.endNumber : ''} `} />
      )}
      {territory.description && (
          <DescriptionAndValue description="Opis" value={territory.description} />
      )}
      
        <>
          {!territory.isPhysicalCard && (
            <Text style={[styles.text, styles.textBold, { color: "#9999CC" }]}>
              <Text>Teren nie ma karty fizycznej </Text>
            </Text>
          )}
        </>
      {territory?.preacher && (
        <>
          <DescriptionAndValue description="Pobrany" value={territory?.taken} />
          <Text style={styles.text}>
            <Text>Masz ten teren </Text>
            <Text
              style={[
                styles.textBold,
                { color: changeColorForDates(territory?.taken!) },
              ]}
            >
              {countDaysFromNow(territory?.taken!)}
            </Text>
            <Text> dni</Text>
          </Text>
        </>
      )}
      {territory?.kind === "city" && <IconDescriptionValue 
          iconName='information-outline'
          description='Przypomnienie'
          value='Upewnij się proszę, że na fizycznej karcie jest karteczka ile mieszkań jest na klatce'
        />}
      {territory?.preacher && countDaysFromNow(territory.taken) >= 120 && (
        <><Badge
          value="Do oddania"
          status="error"
          containerStyle={{ position: "absolute", top: 65, right: 5 }} /><HelpInWorking /></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    height: "auto",
    width: isTablet || isWeb ? "49%" : "auto",
    marginRight: isTablet || isWeb ? 15 : 0,
  },
  titleContainer: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
  },
  territoryKind: {
    fontFamily: "MontserratRegular",
  },
  title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 19,
  },
  text: {
    fontFamily: "InterRegular",
    fontSize: 16,
    marginBottom: 10,
  },
  textBold: {
    fontFamily: "InterSemiBold",
  },
  freeBadge: {
    backgroundColor: "#28a745",
  },
  
});

export default Territory;
