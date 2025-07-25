import createDataContext from "./createDataContext";
import tmApi from "../api/territories";
import { AxiosError } from "axios";
import { mainNavNavigate, navigate } from "../RootNavigation";
import { IActivity, ICongregation } from "./interfaces";
import { showMessage } from "react-native-flash-message";
import { AffixAdornment } from "react-native-paper/lib/typescript/components/TextInput/Adornment/TextInputAffix";
import useLocaLization from "../hooks/useLocalization";
import { authTranslations } from "../screens/Congregation/translations";
import * as Localization from "expo-localization";
import { storage } from "../helpers/storage";

const authTranslate = useLocaLization(authTranslations);

export interface IAuth {
  token: string;
  errMessage: string;
  successMessage: string;
  userID?: string;
  isLoading?: boolean;
  congregation?: ICongregation;
  activities?: IActivity[];
  preacherID?: string;
  whoIsLoggedIn?: string;
}

export interface IAuthContext {
  state: IAuth;
  signIn: Function;
  signOut: Function;
  verifyUser: Function;
  tryLocalSignIn: Function;
  logInPreacher: Function;
  editCongregation: Function;
  loadCongregationInfo: Function;
  loadCongregationActivities: Function;
  askAccess: Function;
  registerCongregation: Function;
  verifyNewUser: Function;
  resendVerificationCode: Function;
}

interface ISignIn {
  username: string;
  password: string;
}

type ITwoFactor = { code: number; userID: string };

const authReducer = (state: IAuth, action: { type: string; payload: any }) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errMessage: action.payload, isLoading: false };
    case "add_success":
      return {
        ...state,
        successMessage: action.payload.message,
        errMessage: "",
        userID: action.payload.userID,
        isLoading: false,
      };
    case "signin":
      return {
        ...state,
        errMessage: "",
        successMessage: action.payload.message,
        token: action.payload.token,
        isLoading: false,
        preacherID: action.payload?.preacherID,
        whoIsLoggedIn: action.payload?.whoIsLoggedIn,
      };
    case "signout":
      return { ...state, token: "", userID: "", successMessage: "" };
    case "add_cong_info":
      return {
        ...state,
        isLoading: false,
        congregation: action.payload,
        errMessage: "",
        successMessage: state.successMessage,
      };
    case "add_cong_activities":
      return {
        ...state,
        isLoading: false,
        activities: action.payload,
        errMessage: "",
      };
    case "turn_on_loading":
      return { ...state, isLoading: true, errMessage: "" };
    case "set_preacher_id":
      return { ...state, preacherID: action.payload.preacherID };
    case "turn_off_loading":
      return { ...state, isLoading: false };
    case "debug":
      return state;
    default:
      return state;
  }
};

const signIn = (dispatch: Function) => {
  return async (body: ISignIn) => {
    try {
      dispatch({ type: "turn_on_loading" });
      const locale = Localization.getLocales()[0].languageCode!;
      const response = await tmApi.post(
        `/login?app=Congregation Planner&locale=${locale}`,
        body
      );
      if (response.data === "Zła nazwa użytkownika lub hasło") {
        dispatch({ type: "add_error", payload: response.data });
      } else {
        await storage.setItem("congregationID", response.data.userID);
        dispatch({
          type: "add_success",
          payload: {
            message: response.data.message,
            userID: response.data.userID,
          },
        });
        navigate("TwoFactor");
      }
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

const signOut = (dispatch: Function) => {
  return async () => {
    await storage.removeItem("token", "session");
    await storage.removeItem("preacherID");
    await storage.removeItem("congregationID");
    dispatch({ type: "signout" });
    showMessage({
      message: authTranslate.t("logOutMessage"),
      type: "success",
    });
  };
};

const logInPreacher = (dispatch: Function) => {
  return async (link: string) => {
    try {
      dispatch({ type: "turn_on_loading" });
      const response = await tmApi.post("/preachers/login", { link });
      if (response.data === authTranslate.t("noUserFound")) {
        dispatch({ type: "add_error", payload: response.data });
      } else {
        await storage.setItem("token", response.data.token, "session");
        await storage.setItem("whoIsLoggedIn", "preacher");
        await storage.setItem(
          "preacherID",
          JSON.stringify(response.data.preacher._id)
        );
        await storage.setItem(
          "congregationID",
          JSON.stringify(response.data.preacher.congregation)
        );
        dispatch({
          type: "signin",
          payload: {
            token: response.data.token,
            message: response.data?.message,
            whoIsLoggedIn: "preacher",
            preacherID: response.data.preacher._id,
          },
        });
        mainNavNavigate("Meetings");
      }
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

const verifyUser = (dispatch: Function) => {
  return async (body: ITwoFactor) => {
    try {
      dispatch({ type: "turn_on_loading" });
      const locale = Localization.getLocales()[0].languageCode!;
      const response = await tmApi.post(
        `/congregations/${body?.userID}/two-factor?app=Congregation Planner&locale=${locale}`,
        body
      );
      await storage.setItem("token", response.data.token, "session");
      await storage.setItem("whoIsLoggedIn", "admin");
      dispatch({
        type: "signin",
        payload: {
          token: response.data.token,
          message: response.data?.message,
          whoIsLoggedIn: "admin",
        },
      });
      mainNavNavigate("Meetings");
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

const verifyNewUser = (dispatch: Function) => {
  return async (body: ITwoFactor) => {
    try {
      dispatch({ type: "turn_on_loading" });
      const locale = Localization.getLocales()[0].languageCode!;
      const response = await tmApi.post(
        `/congregations/${body?.userID}/verification?app=Congregation Planner&locale=${locale}`,
        body
      );
      await storage.setItem("token", response.data.token, "session");
      await storage.setItem("whoIsLoggedIn", "admin");
      dispatch({
        type: "signin",
        payload: {
          token: response.data.token,
          message: response.data?.message,
          whoIsLoggedIn: "admin",
        },
      });
      mainNavNavigate("Meetings");
      showMessage({
        message: authTranslate.t("successfulRegisterMessage"),
        type: "success",
      });
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

const registerCongregation = (dispatch: Function) => {
  return async (
    username: string,
    mainAdminEmail: string,
    secondAdminEmail: string,
    password: string
  ) => {
    try {
      dispatch({ type: "turn_on_loading" });
      const locale = Localization.getLocales()[0].languageCode!;
      const response = await tmApi.post(
        `/congregations?app=Congregation Planner&locale=${locale}`,
        { username, mainAdminEmail, secondAdminEmail, password }
      );
      await storage.setItem("congregationID", response.data.userID);
      dispatch({
        type: "add_success",
        payload: {
          message: authTranslate.t("emailVerificationMessage"),
          userID: response.data.userID,
        },
      });
      navigate("Verification");
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

const resendVerificationCode = (dispatch: Function) => {};

const verifyNewUser = (dispatch: Function) => {
  return async (body: ITwoFactor) => {
    try {
      dispatch({ type: "turn_on_loading" });
      const locale = Localization.getLocales()[0].languageCode!;
      const response = await tmApi.post(
        `/congregations/${body?.userID}/verification?app=Congregation Planner&locale=${locale}`,
        body
      );
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("whoIsLoggedIn", "admin");
      dispatch({
        type: "signin",
        payload: {
          token: response.data.token,
          message: response.data?.message,
          whoIsLoggedIn: "admin",
        },
      });
      mainNavNavigate("Meetings");
      showMessage({
        message: authTranslate.t("successfulRegisterMessage"),
        type: "success",
      });
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

const registerCongregation = (dispatch: Function) => {
  return async (
    username: string,
    mainAdminEmail: string,
    secondAdminEmail: string,
    password: string
  ) => {
    try {
      dispatch({ type: "turn_on_loading" });
      const locale = Localization.getLocales()[0].languageCode!;
      const response = await tmApi.post(
        `/congregations?app=Congregation Planner&locale=${locale}`,
        { username, mainAdminEmail, secondAdminEmail, password }
      );
      await AsyncStorage.setItem("congregationID", response.data.userID);
      dispatch({
        type: "add_success",
        payload: {
          message: authTranslate.t("emailVerificationMessage"),
          userID: response.data.userID,
        },
      });
      navigate("Verification");
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

const resendVerificationCode = (dispatch: Function) => {};

const tryLocalSignIn = (dispatch: Function) => {
  return async () => {
    const token = await storage.getItem("token", "session");
    const preacherID = await storage.getItem("preacherID");
    const whoIsLoggedIn = await storage.getItem("whoIsLoggedIn");
    dispatch({
      type: "signin",
      payload: {
        token: token,
        successMessage: "Automatycznie zalogowano do aplikacji",
        preacherID,
        whoIsLoggedIn,
      },
    });
    showMessage({
      message: authTranslate.t("automaticLoginMessage"),
      type: "success",
    });
  };
};

const loadCongregationInfo = (dispatch: Function) => {
  return async () => {
    try {
      dispatch({ type: "turn_on_loading" });
      const token = await storage.getItem("token", "session");
      const response = await tmApi.get(`/congregations`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      dispatch({ type: "add_cong_info", payload: response.data.congregation });
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

const loadCongregationActivities = (dispatch: Function) => {
  return async (congregationID: string) => {
    try {
      dispatch({ type: "turn_on_loading" });
      const token = await storage.getItem("token", "session");
      const response = await tmApi.get(
        `/congregations/${congregationID}/activities?app=Congregation Planner`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      dispatch({ type: "add_cong_activities", payload: response.data });
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

const editCongregation = (dispatch: Function) => {
  return async (
    username: string,
    territoryServantEmail: string,
    ministryOverseerEmail: string,
    congregationID: string
  ) => {
    try {
      dispatch({ type: "turn_on_loading" });
      const token = await storage.getItem("token", "session");
      const response = await tmApi.put(
        `/congregations/${congregationID}`,
        {
          congregation: {
            username,
            territoryServantEmail,
            ministryOverseerEmail,
          },
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      navigate("CongInfo");
      dispatch({ type: "turn_off_loading" });
      showMessage({
        message: authTranslate.t("editCongMessage"),
        type: "success",
      });
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

const askAccess = (dispatch: Function) => {
  return async (name: string, congName: string, contactEmail: string) => {
    try {
      dispatch({ type: "turn_on_loading" });
      const response = await tmApi.post(`/ask-access`, {
        name,
        congName,
        contactEmail,
      });
      navigate("Welcome");
      dispatch({ type: "turn_off_loading" });
      showMessage({
        message: authTranslate.t("askAccessMessage"),
        type: "success",
      });
    } catch (err) {
      dispatch({ type: "add_error", payload: (err as AxiosError).message });
    }
  };
};

export const { Context, Provider } = createDataContext<IAuth, IAuthContext>(
  authReducer,
  {
    signIn,
    signOut,
    verifyUser,
    tryLocalSignIn,
    loadCongregationActivities,
    editCongregation,
    loadCongregationInfo,
    logInPreacher,
    askAccess,
    verifyNewUser,
    registerCongregation,
  },
  { token: "", errMessage: "", successMessage: "" }
);
