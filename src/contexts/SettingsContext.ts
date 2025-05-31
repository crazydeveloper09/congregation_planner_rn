import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import tmApi from "../api/territories";
import { navigate } from "../RootNavigation";
import { showMessage } from "react-native-flash-message";
import { AxiosError } from "axios";
import useLocaLization from "../hooks/useLocalization";
import { settingsTranslations } from "../screens/Settings/translations";

const settingsTranslate = useLocaLization(settingsTranslations)

interface ISettingsState {
  mainColor: string;
  fontIncrement: number;
  format12h: boolean;
  isLoading: boolean;
  errMessage: '';
  loaded: boolean;
}

interface ISettingsContext {
  state: ISettingsState;
  changeMainColor: Function;
  loadColor: Function;
  incrementFont: Function;
  changeFormat: Function;
  raiseIssue: Function;
  shareIdea: Function;
  helpInTranslation: Function;
}

const settingsReducer = (
  state: ISettingsState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "change_color": {
      return { ...state, mainColor: action.payload };
    }
    case "change_increment": {
      return { ...state, fontIncrement: action.payload };
    }
    case "set_loaded": {
      return { ...state, loaded: action.payload };
    }
    case "change_format": {
      return { ...state, format12h: action.payload };
    }
    case "load_color": {
      return state;
    }
    case "add_error":
      return { ...state, errMessage: action.payload, isLoading: false };
    case "turn_on_loading":
      return { ...state, isLoading: true, errMessage: "" };
    case "turn_off_loading":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

const loadColor = (dispatch: Function) => {
  return async () => {
    const mainColor = await AsyncStorage.getItem("mainColor");
    const fontIncrement = await AsyncStorage.getItem("fontIncrement");
    const is12hFormat = await AsyncStorage.getItem("is12hFormat");
    if (mainColor) {
      dispatch({ type: "change_color", payload: mainColor });
      if (fontIncrement) {
        dispatch({ type: "change_increment", payload: Number(fontIncrement) });
        if (is12hFormat) {
          dispatch({ type: "change_format", payload: Boolean(is12hFormat) });
          dispatch({ type: "set_loaded", payload: true})
        }
      } else {
        dispatch({ type: "load_color" });
      }
    } else {
      dispatch({ type: "load_color" });
    }
  };
};

const changeMainColor = (dispatch: Function) => {
  return async (newColor: string) => {
    await AsyncStorage.setItem("mainColor", newColor);

    dispatch({ type: "change_color", payload: newColor });
  };
};

const incrementFont = (dispatch: Function) => {
  return async (newIncrement: number) => {
    await AsyncStorage.setItem("fontIncrement", newIncrement.toString());

    dispatch({ type: "change_increment", payload: newIncrement });
  };
};

const changeFormat = (dispatch: Function) => {
  return async (is12hFormat: boolean) => {
    await AsyncStorage.setItem("is12hFormat", is12hFormat.toString());

    dispatch({ type: "change_format", payload: is12hFormat });
  };
};

const shareIdea = (dispatch: Function) => {
  return async (name: string, shortDescription: string, detailedDescription: string, contactEmail: string) => {
    try {
        dispatch({ type: 'turn_on_loading' })
        const response = await tmApi.post(`/share-idea`, {name, shortDescription, detailedDescription, contactEmail});
        navigate('Settings');
        dispatch({ type: 'turn_off_loading' })
        showMessage({
          message: settingsTranslate.t("successFeedbackLabel"),
          type: 'success',
      })
    } catch(err) {
        dispatch({ type: 'add_error', payload: (err as AxiosError).message })
    }
}
}

const raiseIssue = (dispatch: Function) => {
  return async (name: string, shortDescription: string, detailedDescription: string, contactEmail: string) => {
    try {
        dispatch({ type: 'turn_on_loading' })
        const response = await tmApi.post(`/raise-issue`, {name, shortDescription, detailedDescription, contactEmail});
        navigate('Settings');
        dispatch({ type: 'turn_off_loading' })
        showMessage({
          message: settingsTranslate.t("successRaiseIssueLabel"),
          type: 'success',
      })
    } catch(err) {
        dispatch({ type: 'add_error', payload: (err as AxiosError).message })
    }
}
}

const helpInTranslation = (dispatch: Function) => {
  return async (name: string, primaryLanguage: string, toLanguage: string, contactEmail: string) => {
    try {
        dispatch({ type: 'turn_on_loading' })
        const response = await tmApi.post(`/translate`, {name, primaryLanguage, toLanguage, contactEmail});
        navigate('Settings');
        dispatch({ type: 'turn_off_loading' })
        showMessage({
          message: settingsTranslate.t("successTranslateLabel"),
          type: 'success',
      })
    } catch(err) {
        dispatch({ type: 'add_error', payload: (err as AxiosError).message })
    }
}
}

export const { Context, Provider } = createDataContext<
  ISettingsState,
  ISettingsContext
>(
  settingsReducer,
  { changeMainColor, changeFormat, loadColor, incrementFont, shareIdea, raiseIssue, helpInTranslation },
  { mainColor: "#1f8aad", fontIncrement: 0, format12h: false, isLoading: false, errMessage: '', loaded: false }
);
