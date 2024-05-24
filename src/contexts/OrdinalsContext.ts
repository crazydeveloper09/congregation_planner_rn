import AsyncStorage from "@react-native-async-storage/async-storage"
import createDataContext from "./createDataContext"
import territories from "../api/territories"
import { AxiosError } from "axios"
import { navigate } from "../RootNavigation"
import { showMessage } from "react-native-flash-message"

interface IOrdinalState {
    isLoading?: boolean,
    errMessage?: string
}

interface IOrdinalContext {
    state: IOrdinalState
    addOrdinal: Function,
    editOrdinal: Function,
    deleteOrdinal: Function,
}

const OrdinalReducer = (state: IOrdinalState, action: { type: string, payload: any }) => {
    switch(action.type) {
        case 'turn_on_loading':
            return { ...state, isLoading: true, errMessage: '' }
        case 'turn_off_loading':
            return { ...state, isLoading: false, errMessage: '' }
        case 'add_error': 
            return { ...state, errMessage: action.payload }
        default:
            return state;
    }
}

const addOrdinal = (dispatch: Function) => {
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
          `/meetings/${meetingID}/ordinals?congregationID=${congregationID}`,
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
          message: `Poprawnie dodano dane o porządkowych na zebranie`,
          type: "success",
        });
      } catch (err) {
        dispatch({ type: "add_error", payload: (err as AxiosError).message });
      }
    };
  };
  
  const editOrdinal = (dispatch: Function) => {
    return async (
      meetingID: string,
      meetingOrdinalID: string,
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
          `/meetings/${meetingID}/ordinals/${meetingOrdinalID}?congregationID=${congregationID}`,
          {ordinal: { hallway1, hallway2, auditorium, parking }},
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        dispatch({ type: "turn_off_loading" });
        navigate("Audio Index");
        showMessage({
          message: `Poprawnie edytowano dane o porządkowych na zebranie`,
          type: "success",
        });
      } catch (err) {
        dispatch({ type: "add_error", payload: (err as AxiosError).message });
      }
    };
  };
  
  const deleteOrdinal = (dispatch: Function) => {
    return async (meetingID: string, meetingOrdinalID: string) => {
      try {
        dispatch({ type: "turn_on_loading" });
        const token = await AsyncStorage.getItem("token");
        const congregationID = await AsyncStorage.getItem("congregationID");
        const response = await territories.delete(
          `/meetings/${meetingID}/ordinals/${meetingOrdinalID}?congregationID=${congregationID}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        dispatch({ type: "turn_off_loading" });
        navigate("Audio Index");
        showMessage({
          message: `Poprawnie usunięto dane o porządkowych na zebranie`,
          type: "success",
        });
      } catch (err) {
        dispatch({ type: "add_error", payload: (err as AxiosError).message });
      }
    };
  };

export const { Context, Provider } = createDataContext<IOrdinalState, IOrdinalContext>(OrdinalReducer, { addOrdinal, editOrdinal, deleteOrdinal}, { isLoading: false})