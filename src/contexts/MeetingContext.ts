import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import { IMeeting, IMeetingAssignment, PaginateResult } from "./interfaces";
import territories from "../api/territories";
import { AxiosError } from "axios";
import { navigate } from "../RootNavigation";
import { showMessage } from "react-native-flash-message";
import useLocaLization from "../hooks/useLocalization";
import { meetingAssignmentTranslations } from "../screens/Meetings/Assignments/translations";
import { meetingsTranslations } from "../screens/Meetings/translations";
import * as Localization from 'expo-localization';

const meetingAssignmentsTranslate = useLocaLization(meetingAssignmentTranslations);
const meetingTranslate = useLocaLization(meetingsTranslations);

interface IMeetingState {
  isLoading?: boolean;
  meetings?: IMeeting[];
  assignments?: IMeetingAssignment[];
  errMessage?: string;
}

interface IMeetingContext {
  state: IMeetingState;
  loadMeetings: Function;
  loadPreacherMeetingAssignments: Function;
  addMeeting: Function;
  editMeeting: Function;
  deleteMeeting: Function;
  addAssignment: Function;
  editAssignment: Function;
  deleteAssignment: Function;
}

const meetingReducer = (
  state: IMeetingState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "turn_on_loading":
      return { ...state, isLoading: true, errMessage: "" };
    case "load_data":
      return {
        ...state,
        isLoading: false,
        meetings: action.payload,
        errMessage: "",
      };
    case "load_preacher_data":
      return {
        ...state,
        isLoading: false,
        meetings: action.payload.meetings,
        assignments: action.payload.assignments,
        errMessage: "",
      };
    case "turn_off_loading":
      return { ...state, isLoading: false, errMessage: "" };
    case "add_error":
      return { ...state, isLoading: false, errMessage: action.payload };
    default:
      return state;
  }
};

const loadMeetings = (dispatch: Function) => {
  return async () => {
    try {
      dispatch({ type: "turn_on_loading" });
      const token = await AsyncStorage.getItem("token");
      const congregationID = await AsyncStorage.getItem("congregationID");
      const response = await territories.get(`/meetings?congregationID=${congregationID}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      dispatch({ type: "load_data", payload: response.data });
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

const loadPreacherMeetingAssignments = (dispatch: Function) => {
  return async () => {
    try {
      dispatch({ type: "turn_on_loading" });
      const token = await AsyncStorage.getItem("token");
      const response = await territories.get(`/meetings/preacher/assignments`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      dispatch({ type: "load_preacher_data", payload: response.data });
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

const addMeeting = (dispatch: Function) => {
  return async (
    type: string,
    cleaningGroup: string,
    lead: string,
    date: Date,
    beginPrayer: string,
    beginSong: string,
    midSong: string,
    endSong: string,
    endPrayer: string,
    otherEndPrayer: string
  ) => {
    try {
      dispatch({ type: "turn_on_loading" });
      const token = await AsyncStorage.getItem("token");
      const locale = Localization.getLocales()[0].languageCode!;
      const response = await territories.post(
        `/meetings?locale=${locale}`,
        {
          type,
          cleaningGroup,
          lead,
          date,
          beginPrayer,
          beginSong,
          midSong,
          endSong,
          endPrayer,
          otherEndPrayer,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      dispatch({ type: "turn_off_loading" });
      navigate("Meetings Index");
      showMessage({
        message: `${meetingTranslate.t("successAddMessage")}: ${date.toLocaleString()}`,
        type: "success",
      });
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

const editMeeting = (dispatch: Function) => {
  return async (
    meetingID: string,
    type: string,
    cleaningGroup: string,
    lead: string,
    date: Date,
    beginPrayer: string,
    beginSong: string,
    midSong: string,
    endSong: string,
    endPrayer: string,
    otherEndPrayer: string
  ) => {
    try {
      dispatch({ type: "turn_on_loading" });
      const token = await AsyncStorage.getItem("token");
      const locale = Localization.getLocales()[0].languageCode!;
      const congregationID = await AsyncStorage.getItem("congregationID");
      const response = await territories.put(
        `/meetings/${meetingID}?congregationID=${congregationID}&locale=${locale}`,
        {
          meeting: {
            type,
            cleaningGroup,
            lead,
            date,
            beginPrayer,
            beginSong,
            midSong,
            endSong,
            endPrayer,
            otherEndPrayer,
          },
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      navigate("Meetings Index");
      dispatch({ type: "turn_off_loading" });
      showMessage({
        message: `${meetingTranslate.t("successAddMessage")}: ${type} ${date.toLocaleDateString()}`,
        type: "success",
      });
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

const deleteMeeting = (dispatch: Function) => {
  return async (meetingID: string) => {
    try {
      dispatch({ type: "turn_on_loading" });
      const token = await AsyncStorage.getItem("token");
      const congregationID = await AsyncStorage.getItem("congregationID");
      const response = await territories.delete(`/meetings/${meetingID}?congregationID=${congregationID}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      dispatch({ type: "turn_off_loading" });
      navigate("Meetings Index");
      showMessage({
        message: meetingTranslate.t("successDeleteMessage"),
        type: "success",
      });
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

const addAssignment = (dispatch: Function) => {
  return async (
    meetingID: string,
    topic: string,
    type: string,
    participant: string,
    reader: string,
    otherParticipant: string,
    defaultTopic: string,
    meetingDate: Date,
  ) => {
    try {
      dispatch({ type: "turn_on_loading" });
      const token = await AsyncStorage.getItem("token");
      const congregationID = await AsyncStorage.getItem("congregationID");
      const locale = Localization.getLocales()[0].languageCode!;
      const response = await territories.post(
        `/meetings/${meetingID}/assignments?congregationID=${congregationID}&locale=${locale}`,
        { topic, type, participant, reader, otherParticipant, defaultTopic, meetingDate },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      dispatch({ type: "turn_off_loading" });
      navigate("Meetings Index");
      showMessage({
        message: `${meetingAssignmentsTranslate.t("successAddMessage")}: ${topic || defaultTopic}`,
        type: "success",
      });
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

const editAssignment = (dispatch: Function) => {
  return async (
    meetingID: string,
    meetingAssignmentID: string,
    topic: string,
    type: string,
    participant: string,
    reader: string,
    otherParticipant: string,
    defaultTopic: string,
  ) => {
    try {
      dispatch({ type: "turn_on_loading" });
      const token = await AsyncStorage.getItem("token");
      const congregationID = await AsyncStorage.getItem("congregationID");
      const locale = Localization.getLocales()[0].languageCode!;
      const response = await territories.put(
        `/meetings/${meetingID}/assignments/${meetingAssignmentID}?congregationID=${congregationID}&locale=${locale}`,
        {assignment: { topic, type, participant, reader, otherParticipant, defaultTopic }},
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      dispatch({ type: "turn_off_loading" });
      navigate("Meetings Index");
      showMessage({
        message: `${meetingAssignmentsTranslate.t("successEditMessage")}: ${topic || defaultTopic}`,
        type: "success",
      });
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

const deleteAssignment = (dispatch: Function) => {
  return async (meetingID: string, meetingAssignmentID: string) => {
    try {
      dispatch({ type: "turn_on_loading" });
      const token = await AsyncStorage.getItem("token");
      const congregationID = await AsyncStorage.getItem("congregationID");
      const response = await territories.delete(
        `/meetings/${meetingID}/assignments/${meetingAssignmentID}?congregationID=${congregationID}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      dispatch({ type: "turn_off_loading" });
      navigate("Meetings Index");
      showMessage({
        message: meetingAssignmentsTranslate.t("successDeleteMessage"),
        type: "success",
      });
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

export const { Context, Provider } = createDataContext<
  IMeetingState,
  IMeetingContext
>(
  meetingReducer,
  { loadMeetings, loadPreacherMeetingAssignments, addMeeting, editMeeting, deleteMeeting, addAssignment, editAssignment, deleteAssignment },
  { isLoading: false, meetings: [] }
);
