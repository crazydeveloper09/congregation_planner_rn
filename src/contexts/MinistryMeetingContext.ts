import AsyncStorage from "@react-native-async-storage/async-storage"
import createDataContext from "./createDataContext"
import { IMinistryMeeting, PaginateResult } from "./interfaces"
import territories from "../api/territories"
import { AxiosError } from "axios"
import { mainNavNavigate, navigate } from "../RootNavigation"
import { showMessage } from "react-native-flash-message"
import { isLoading } from "expo-font"

interface IMinistryMeetingState {
    isLoading?: boolean,
    ministryMeetings?: IMinistryMeeting[]
    errMessage?: string
}

interface IMinistryMeetingContext {
    state: IMinistryMeetingState
    loadMinistryMeetings: Function,
    loadMinistryMeetingsOfPreacher: Function,
    addMinistryMeeting: Function,
    editMinistryMeeting: Function,
    deleteMinistryMeeting: Function,
}

const ministryMeetingReducer = (state: IMinistryMeetingState, action: { type: string, payload: any }) => {
    switch(action.type) {
        case 'turn_on_loading':
            return { ...state, isLoading: true, errMessage: '' }
        case 'turn_off_loading':
            return { ...state, isLoading: false, errMessage: '' }
        case 'load_data':
            return { ...state, isLoading: false, ministryMeetings: action.payload, errMessage: '' }
        case 'add_error': 
            return { ...state, errMessage: action.payload, isLoading: false }
        default:
            return state;
    }
}

const loadMinistryMeetings = (dispatch: Function) => {
    return async () => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const congregationID = await AsyncStorage.getItem("congregationID");
            const response = await territories.get(`/ministryMeetings?congregationID=${congregationID}`, {
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

const loadMinistryMeetingsOfPreacher = (dispatch: Function) => {
    return async () => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.get(`/ministryMeetings/preacher`, {
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

const addMinistryMeeting = (dispatch: Function) => {
    return async (place: string, lead: string, date: Date, hour: string, topic?: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const congregationID = await AsyncStorage.getItem("congregationID");
            const response = await territories.post(`/ministryMeetings?congregationID=${congregationID}`, {place, lead, date, hour, topic}, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch({ type: 'turn_off_loading' })
            navigate('Ministry Meeting Index')
            showMessage({
                message: `Poprawnie dodano zbiórkę`,
                type: 'success',
            })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
        


    }
}

const editMinistryMeeting = (dispatch: Function) => {
    return async (ministryMeetingID: string, place: string, lead: string, date: Date, hour: string, topic?: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const congregationID = await AsyncStorage.getItem("congregationID");
            const response = await territories.put(`/ministryMeetings/${ministryMeetingID}?congregationID=${congregationID}`, {ministryMeeting: {place, lead, date, hour, topic}}, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            navigate('Ministry Meeting Index')
            dispatch({ type: 'turn_off_loading' })
            showMessage({
                message: `Poprawnie edytowano grupę służby: ${name}`,
                type: 'success',
            })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
        


    }
}

const deleteMinistryMeeting = (dispatch: Function) => {
    return async (ministryMeetingID: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const congregationID = await AsyncStorage.getItem("congregationID");
            const response = await territories.delete(`/ministryMeetings/${ministryMeetingID}?congregationID=${congregationID}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch({ type: 'turn_off_loading' })
            navigate('MinistryMeetings')
            showMessage({
                message: `Poprawnie usunięto grupę służby`,
                type: 'success',
            })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
        


    }
}

export const { Context, Provider } = createDataContext<IMinistryMeetingState, IMinistryMeetingContext>(ministryMeetingReducer, {loadMinistryMeetings, loadMinistryMeetingsOfPreacher, addMinistryMeeting, editMinistryMeeting, deleteMinistryMeeting}, { isLoading: false})