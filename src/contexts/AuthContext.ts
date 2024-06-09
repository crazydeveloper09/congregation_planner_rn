import createDataContext from "./createDataContext";
import tmApi from "../api/territories";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mainNavNavigate, navigate } from "../RootNavigation";
import { IActivity, ICongregation } from "./interfaces";
import { showMessage } from "react-native-flash-message";
import { AffixAdornment } from "react-native-paper/lib/typescript/components/TextInput/Adornment/TextInputAffix";

export interface IAuth {
  token: string;
  errMessage: string;
  successMessage: string;
  userID?: string;
  isLoading?: boolean,
  congregation?: ICongregation
  activities?: IActivity[],
  preacherID?: string,
  whoIsLoggedIn?: string,
}

export interface IAuthContext {
  state: IAuth;
  signIn: Function;
  signOut: Function;
  verifyUser: Function;
  tryLocalSignIn: Function;
  logInPreacher: Function;
  loadCongregationActivities: Function;
}

interface ISignIn {
  username: string;
  password: string;
}

type ITwoFactor = { code: number, userID: string }

const authReducer = (state: IAuth, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'add_error': 
        return { ...state, errMessage: action.payload, isLoading: false }
    case 'add_success': 
        return { ...state, successMessage: action.payload.message, errMessage: '', userID: action.payload.userID, isLoading: false }
    case 'signin': 
        return { ...state, errMessage: '', successMessage: action.payload.message, token: action.payload.token, isLoading: false, preacherID: action.payload?.preacherID, whoIsLoggedIn: action.payload?.whoIsLoggedIn}
    case 'signout': 
        return {...state, token: '', userID: '', successMessage: 'Wylogowano z Congregation Planner'}
    case 'add_cong_info': 
      return {...state, isLoading: false, congregation: action.payload, errMessage: '', successMessage: state.successMessage}
    case 'add_cong_activities': 
      return {...state, isLoading: false, activities: action.payload, errMessage: ''}
    case 'turn_on_loading': 
      return {...state, isLoading: true, errMessage: ''}
    case 'set_preacher_id':
      return {...state, preacherID: action.payload.preacherID}
    case 'turn_off_loading': 
      return {...state, isLoading: false}
    case 'debug':
        return state;
    default:
      return state;
  }
};

const signIn = (dispatch: Function) => {
  return async (body: ISignIn) => {
    try {
      dispatch({ type: 'turn_on_loading' })
      const response = await tmApi.post("/login?app=Congregation Planner", body);
      if(response.data === 'Zła nazwa użytkownika lub hasło'){
        dispatch({ type: 'add_error', payload: response.data })
      } else {
        await AsyncStorage.setItem('congregationID', response.data.userID)
        dispatch({ type: 'add_success', payload: {message: response.data.message, userID: response.data.userID} })
        navigate("TwoFactor");
      }
    } catch (err) {
      dispatch({ type: 'add_error', payload: (err as AxiosError).message })
    }
  };
};

const signOut = (dispatch: Function) => {
    return async () => {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('preacherID')
        await AsyncStorage.removeItem('congregationID')
        dispatch({ type: 'signout' })
    };
};

const logInPreacher = (dispatch: Function) => {
  return async (link: string) => {
    try {
      dispatch({ type: 'turn_on_loading' })
      const response = await tmApi.post("/preachers/login", {link});
      if(response.data === 'Nie znaleziono takiego użytkownika'){
        dispatch({ type: 'add_error', payload: response.data })
      } else {
        await AsyncStorage.setItem('token', response.data.token)
        await AsyncStorage.setItem('whoIsLoggedIn', 'preacher')
        await AsyncStorage.setItem('preacherID', JSON.stringify(response.data.preacher._id))
        await AsyncStorage.setItem('congregationID', JSON.stringify(response.data.preacher.congregation))
        dispatch({ type: 'signin', payload: { token: response.data.token, message: response.data?.message, whoIsLoggedIn: 'preacher', preacherID: response.data.preacher._id  } })
        mainNavNavigate('Meetings')
      }
    } catch (err) {
      dispatch({ type: 'add_error', payload: (err as AxiosError).message })
    }
  };
}

const verifyUser = (dispatch: Function) => {
    return async(body: ITwoFactor) => {
        try {
          dispatch({ type: 'turn_on_loading' })
            const response = await tmApi.post(`/congregations/${body?.userID}/two-factor?app=Congregation Planner`, body);
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('whoIsLoggedIn', 'admin')
            dispatch({ type: 'signin', payload: { token: response.data.token, message: response.data?.message, whoIsLoggedIn: 'admin' } });
            mainNavNavigate('Meetings')
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
    }
}

const tryLocalSignIn = (dispatch: Function) => {
  return async () => {
    const token = await AsyncStorage.getItem('token')
    const preacherID = await AsyncStorage.getItem('preacherID')
    const whoIsLoggedIn = await AsyncStorage.getItem('whoIsLoggedIn')
    dispatch({ type: 'signin', payload: { token: token, successMessage: 'Automatycznie zalogowano do aplikacji', preacherID, whoIsLoggedIn } })
    showMessage({
      message: 'Automatycznie zalogowano do aplikacji',
      type: 'success'
    })
  }
}

const loadCongregationActivities = (dispatch: Function) => {
  return async (congregationID: string) => {
    try {
      dispatch({ type: 'turn_on_loading' })
      const token = await AsyncStorage.getItem('token');
      const response = await tmApi.get(`/congregations/${congregationID}/activities?app=Congregation Planner`, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
      dispatch({ type: 'add_cong_activities', payload: response.data })
    } catch(err) {
      dispatch({ type: 'add_error', payload: (err as AxiosError).message })
    }
  }
}



export const { Context, Provider } = createDataContext<IAuth, IAuthContext>(
  authReducer,
  { signIn, signOut, verifyUser, tryLocalSignIn, loadCongregationActivities, logInPreacher },
  { token: "", errMessage: "", successMessage: "" }
);
