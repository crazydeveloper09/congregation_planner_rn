import createDataContext from "./createDataContext"
import territories from "../api/territories"
import { AxiosError } from "axios"
import { navigate } from "../RootNavigation"
import { showMessage } from "react-native-flash-message"
import { IAudioVideo, IAttendant } from "./interfaces"
import useLocaLization from "../hooks/useLocalization";
import { audioVideoTranslations } from "../screens/AudioVideo/translations";
import * as Localization from 'expo-localization';
import { storage } from "../helpers/storage"

const audioVideoTranslate = useLocaLization(audioVideoTranslations)

interface IAudioVideoState {
    isLoading?: boolean,
    audioVideos?: IAudioVideo[],
    ordinals?: IAttendant[],
    errMessage?: string
}

interface IAudioVideoContext {
    state: IAudioVideoState,
    loadPreacherAudioVideoAssignments: Function,
    addAudioVideo: Function,
    editAudioVideo: Function,
    deleteAudioVideo: Function,
}

const AudioVideoReducer = (state: IAudioVideoState, action: { type: string, payload: any }) => {
    switch(action.type) {
        case 'turn_on_loading':
          return { ...state, isLoading: true, errMessage: '' }
        case 'turn_off_loading':
          return { ...state, isLoading: false, errMessage: '' }
        case 'load_data':
          return { ...state, audioVideos: action.payload.audioVideo, ordinals: action.payload.ordinals, isLoading: false, errMessage: '' }
        case 'add_error': 
          return { ...state, isLoading: false, errMessage: action.payload }
        default:
          return state;
    }
}

const loadPreacherAudioVideoAssignments = (dispatch: Function) => {
  return async () => {
      try {
          dispatch({ type: 'turn_on_loading' })
          const token = await storage.getItem("token", "session");
          const response = await territories.get(`/meetings/preacher/audioVideo/assignments`, {
              headers: {
                  'Authorization': `bearer ${token}`
              }
          });
  
          dispatch({ type: 'load_data', payload: response.data })
      } catch (err) {
          dispatch({ type: 'add_error', payload: (err as AxiosError).message })
      }
      


  }
}

const addAudioVideo = (dispatch: Function) => {
    return async (
      meetingID: string,
      audioOperator: string,
      videoOperator: string,
      microphone1Operator: string,
      microphone2Operator: string,
      meetingDate: Date,
    ) => {
      try {
        dispatch({ type: "turn_on_loading" });
        const token = await storage.getItem("token", "session");
        const congregationID = await storage.getItem("congregationID");
        const locale = Localization.getLocales()[0].languageCode!;
        const response = await territories.post(
          `/meetings/${meetingID}/audioVideo?congregationID=${congregationID}&locale=${locale}`,
          { audioOperator, videoOperator, microphone1Operator, microphone2Operator, meetingDate },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        dispatch({ type: "turn_off_loading" });
        navigate("Audio Index");
        showMessage({
          message: audioVideoTranslate.t("successfullyAddedMessage"),
          type: "success",
        });
      } catch (err) {
        dispatch({ type: "add_error", payload: (err as AxiosError).message });
      }
    };
  };
  
  const editAudioVideo = (dispatch: Function) => {
    return async (
      meetingID: string,
      meetingAudioVideoID: string,
      audioOperator: string,
      videoOperator: string,
      microphone1Operator: string,
      microphone2Operator: string,
    ) => {
      try {
        dispatch({ type: "turn_on_loading" });
        const token = await storage.getItem("token", "session");
        const locale = Localization.getLocales()[0].languageCode!;
        const congregationID = await storage.getItem("congregationID");
        const response = await territories.put(
          `/meetings/${meetingID}/audioVideo/${meetingAudioVideoID}?congregationID=${congregationID}&locale=${locale}`,
          {audioVideo: { audioOperator, videoOperator, microphone1Operator, microphone2Operator }},
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        dispatch({ type: "turn_off_loading" });
        navigate("Audio Index");
        showMessage({
          message: audioVideoTranslate.t("successfullyEditedMessage"),
          type: "success",
        });
      } catch (err) {
        dispatch({ type: "add_error", payload: (err as AxiosError).message });
      }
    };
  };
  
  const deleteAudioVideo = (dispatch: Function) => {
    return async (meetingID: string, meetingAudioVideoID: string) => {
      try {
        dispatch({ type: "turn_on_loading" });
        const token = await storage.getItem("token", "session");
        const congregationID = await storage.getItem("congregationID");
        const response = await territories.delete(
          `/meetings/${meetingID}/audioVideo/${meetingAudioVideoID}?congregationID=${congregationID}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        dispatch({ type: "turn_off_loading" });
        navigate("Audio Index");
        showMessage({
          message: audioVideoTranslate.t("successfullyDeletedMessage"),
          type: "success",
        });
      } catch (err) {
        dispatch({ type: "add_error", payload: (err as AxiosError).message });
      }
    };
  };

export const { Context, Provider } = createDataContext<IAudioVideoState, IAudioVideoContext>(AudioVideoReducer, { loadPreacherAudioVideoAssignments, addAudioVideo, editAudioVideo, deleteAudioVideo}, { isLoading: false})