import AsyncStorage from "@react-native-async-storage/async-storage"
import createDataContext from "./createDataContext"
import territories from "../api/territories"
import { AxiosError } from "axios"
import { navigate } from "../RootNavigation"
import { showMessage } from "react-native-flash-message";
import useLocaLization from "../hooks/useLocalization"
import { attendantTranslations } from "../screens/AudioVideo/Attendants/translations"

const attendantTranslate = useLocaLization(attendantTranslations)

interface IAttendantState {
    isLoading?: boolean,
    errMessage?: string
}

interface IAttendantContext {
    state: IAttendantState
    addAttendant: Function,
    editAttendant: Function,
    deleteAttendant: Function,
}

const AttendantReducer = (state: IAttendantState, action: { type: string, payload: any }) => {
    switch(action.type) {
        case 'turn_on_loading':
            return { ...state, isLoading: true, errMessage: '' }
        case 'turn_off_loading':
            return { ...state, isLoading: false, errMessage: '' }
        case 'add_error': 
            return { ...state, isloading: false, errMessage: action.payload }
        default:
            return state;
    }
}

const addAttendant = (dispatch: Function) => {
    return async (
      meetingID: string,
      hallway1: string,
      hallway2: string,
      auditorium: string,
      parking: string,
    ) => {
      try {
        dispatch({ type: "turn_on_loading" });
        const token = await AsyncStorage.getItem("token");
        const congregationID = await AsyncStorage.getItem("congregationID");
        const response = await territories.post(
          `/meetings/${meetingID}/attendants?congregationID=${congregationID}`,
          { hallway1, hallway2, auditorium, parking },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        dispatch({ type: "turn_off_loading" });
        navigate("Audio Index");
        showMessage({
          message: attendantTranslate.t("successfullyAddedMessage"),
          type: "success",
        });
      } catch (err) {
        dispatch({ type: "add_error", payload: (err as AxiosError).message });
      }
    };
  };
  
  const editAttendant = (dispatch: Function) => {
    return async (
      meetingID: string,
      meetingAttendantID: string,
      hallway1: string,
      hallway2: string,
      auditorium: string,
      parking: string
    ) => {
      try {
        dispatch({ type: "turn_on_loading" });
        const token = await AsyncStorage.getItem("token");
        const congregationID = await AsyncStorage.getItem("congregationID");
        const response = await territories.put(
          `/meetings/${meetingID}/attendants/${meetingAttendantID}?congregationID=${congregationID}`,
          {attendant: { hallway1, hallway2, auditorium, parking }},
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        dispatch({ type: "turn_off_loading" });
        navigate("Audio Index");
        showMessage({
          message: attendantTranslate.t("successfullyEditedMessage"),
          type: "success",
        });
      } catch (err) {
        dispatch({ type: "add_error", payload: (err as AxiosError).message });
      }
    };
  };
  
  const deleteAttendant = (dispatch: Function) => {
    return async (meetingID: string, meetingAttendantID: string) => {
      try {
        dispatch({ type: "turn_on_loading" });
        const token = await AsyncStorage.getItem("token");
        const congregationID = await AsyncStorage.getItem("congregationID");
        const response = await territories.delete(
          `/meetings/${meetingID}/attendants/${meetingAttendantID}?congregationID=${congregationID}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        dispatch({ type: "turn_off_loading" });
        navigate("Audio Index");
        showMessage({
          message: attendantTranslate.t("successfullyDeletedMessage"),
          type: "success",
        });
      } catch (err) {
        dispatch({ type: "add_error", payload: (err as AxiosError).message });
      }
    };
  };

export const { Context, Provider } = createDataContext<IAttendantState, IAttendantContext>(AttendantReducer, { addAttendant, editAttendant, deleteAttendant}, { isLoading: false})