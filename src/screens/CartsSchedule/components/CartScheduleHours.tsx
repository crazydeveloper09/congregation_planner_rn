import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ICartHour, IPreacher } from "../../../contexts/interfaces";
import { Context as CartsScheduleContext } from "../../../contexts/CartsScheduleContext";
import { Context as PreachersContext } from "../../../contexts/PreachersContext";
import { Context as AuthContext } from "../../../contexts/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import ButtonC from "../../../commonComponents/Button";
import { Input } from "react-native-elements";
import { Switch } from "@rneui/base";
import Label from "../../../commonComponents/Label";
import MyInput from "../../../commonComponents/MyInput";
import { defaultStyles } from "../../defaultStyles";
import useLocaLization from "../../../hooks/useLocalization";
import { cartScheduleTranslations } from "../translations";

interface CartsScheduleHoursProps {
  hour: ICartHour;
  preachers: IPreacher[];
  day: string;
  refresh: Function;
}

const CartsScheduleHours: React.FC<CartsScheduleHoursProps> = ({ hour, preachers, day, refresh }) => {
  const cartScheduleTranslate = useLocaLization(cartScheduleTranslations)
  const [preacher1Value, setPreacher1Value] = useState("");
  const [preacher1Open, setPreacher1Open] = useState(false);
  const [preacher1Items, setPreacher1Items] = useState([
    {label: cartScheduleTranslate.t("freeSpot"), value: ""}
  ]);
  const [preacher2Value, setPreacher2Value] = useState("");
  const [preacher2Open, setPreacher2Open] = useState(false);
  const [preacher2Items, setPreacher2Items] = useState([
    {label: cartScheduleTranslate.t("freeSpot"), value: ""}
  ]);
  const [isOtherPreacher1, setIsOtherPreacher1] = useState<boolean>(false);
  const [otherPreacher1, setOtherPreacher1] = useState<string>("")
  const [isOtherPreacher2, setIsOtherPreacher2] = useState<boolean>(false);
  const [otherPreacher2, setOtherPreacher2] = useState<string>("")
  const [editMode, setEditMode] = useState(false);
  const { assignPreachersToHours } = useContext(CartsScheduleContext);
  const {state} = useContext(PreachersContext)
  const authContext = useContext(AuthContext)

  useEffect(() => {

      const selectItems = preachers?.filter((preacher) => preacher.roles.includes("can_see_cartSchedule")).map((preacher) => {
        return { label: preacher?.name, value: preacher?._id } as never
      })
      setPreacher1Items([...preacher1Items, ...selectItems])
      setPreacher2Items([...preacher2Items, ...selectItems])
    
    setPreacher1Value(hour?.preacher1?._id || "")
    setPreacher2Value(hour?.preacher2?._id || "")
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{hour?.timeDescription}</Text>
        {((state.preacher && state.preacher.roles?.includes("can_edit_cartSchedule") || state.preacher?.roles?.includes("can_self-assign_cartHour")) || authContext.state.whoIsLoggedIn === "admin") && <TouchableOpacity onPress={() => setEditMode(!editMode)}>
        {editMode ? <MaterialCommunityIcons name="eye-outline" size={23} /> : <MaterialCommunityIcons name="pencil" size={23} />}
        </TouchableOpacity>}
      
      </View>
      {editMode ? <>
        {!isOtherPreacher1 && <DropDownPicker 
                value={preacher1Value}
                setValue={setPreacher1Value}
                open={preacher1Open}
                setOpen={setPreacher1Open}
                items={preacher1Items}
                listMode="MODAL"
                containerStyle={{
                  marginVertical: 10
                }}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                modalTitle={cartScheduleTranslate.t("choosePreacher1Label", { timeDescription: hour?.timeDescription })}
                placeholder={cartScheduleTranslate.t("choosePreacher1Placeholder")}
            />}
            <Label text={cartScheduleTranslate.t("isOtherPreacher1SwitchText")} />
            <Switch  
                value={isOtherPreacher1}
                onValueChange={(value) => setIsOtherPreacher1(value)}
                style={{ alignSelf: "flex-start",  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], marginVertical: 10 }}
                color={"#1F8AAD"}
            />

            {isOtherPreacher1 && <>
                <MyInput 
                    value={otherPreacher1}
                    onChangeText={setOtherPreacher1}
                    label={cartScheduleTranslate.t("otherPreacher1Label")}
                    placeholder={cartScheduleTranslate.t("otherPreacherPlaceholder")}
                />

            </>}
            {!isOtherPreacher2 && <DropDownPicker 
                value={preacher2Value}
                setValue={setPreacher2Value}
                open={preacher2Open}
                setOpen={setPreacher2Open}
                items={preacher2Items}
                labelStyle={defaultStyles.dropdown}
                placeholderStyle={defaultStyles.dropdown}
                listMode="MODAL"
                containerStyle={{
                  marginVertical: 10
                }}
                modalTitle={cartScheduleTranslate.t("choosePreacher2Label", { timeDescription: hour?.timeDescription })}
                placeholder={cartScheduleTranslate.t("choosePreacher2Placeholder")}
            />}
            <Label text={cartScheduleTranslate.t("isOtherPreacher2SwitchText")} />
            <Switch  
                value={isOtherPreacher2}
                onValueChange={(value) => setIsOtherPreacher2(value)}
                style={{ alignSelf: "flex-start",  transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], marginVertical: 10 }}
                color={"#1F8AAD"}
            />
            {isOtherPreacher2 && <>
                <MyInput 
                    value={otherPreacher2}
                    onChangeText={setOtherPreacher2}
                    label={cartScheduleTranslate.t("otherPreacher2Label")}
                    placeholder={cartScheduleTranslate.t("otherPreacherPlaceholder")}
                />

            </>}
            <ButtonC 
              title={cartScheduleTranslate.t("assignPreacherButtonText")}
              onPress={() => {
                assignPreachersToHours(hour?._id, preacher1Value, preacher2Value, otherPreacher1, otherPreacher2, day)
                setEditMode(false)
                refresh()
              }}
            />
      </> : <>
        
        <Text style={styles.preacher}>{hour?.preacher1?.name || hour.otherPreacher1 || cartScheduleTranslate.t("freeSpot")}</Text>
    
        <Text style={styles.preacher}>{hour?.preacher2?.name || hour.otherPreacher2 || cartScheduleTranslate.t("freeSpot")}</Text>
      </>}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
  titleContainer: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 23,
    fontWeight: "700",
  },
  preacher: {
    paddingVertical: 8,
    fontSize: 18,
  },
});

export default CartsScheduleHours;
