import AsyncStorage from "@react-native-async-storage/async-storage"
import createDataContext from "./createDataContext"
import { IPreacher, PaginateResult } from "./interfaces"
import territories from "../api/territories"
import { AxiosError } from "axios"
import { navigate } from "../RootNavigation"
import { showMessage } from "react-native-flash-message"
import { isLoaded } from "expo-font";
import useLocaLization from "../hooks/useLocalization"
import { preachersTranslations } from "../screens/Preachers/translations"

const preacherTranslate = useLocaLization(preachersTranslations)

interface IPreacherState {
    isLoading?: boolean;
    preachers?: PaginateResult<IPreacher>;
    errMessage?: string;
    preacher?: IPreacher;
    searchResults?: IPreacher[];
    allPreachers?: IPreacher[]
}

interface IPreacherContext {
    state: IPreacherState
    loadPreachers: Function,
    loadAllPreachers: Function,
    loadPreacherInfo: Function,
    addPreacher: Function,
    editPreacher: Function,
    deletePreacher: Function,
    searchPreacher: Function,
    generateLink: Function
}

const preacherReducer = (state: IPreacherState, action: { type: string, payload: any }) => {
    switch(action.type) {
        case 'turn_on_loading':
            return { ...state, isLoading: true, errMessage: '' }
        case 'turn_off_loading':
            return { ...state, isLoading: false }
        case 'load_data':
            return { ...state, isLoading: false, preachers: action.payload, errMessage: '' }
        case 'load_all':
            return { ...state, isLoading: false, allPreachers: action.payload, errMessage: '' }
        case 'load_preacher':
            return { ...state, isLoading: false, preacher: action.payload, errMessage: '' }
        case 'search': {
            return { ...state, isLoading: false, searchResults: action.payload, errMessage: '' }
        }
        case 'add_error': 
            return { ...state, isLoading: false, errMessage: action.payload }
        default:
            return state;
    }
}

const loadPreachers = (dispatch: Function) => {
    return async (page: number, limit: number) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.get(`/preachers?page=${page}&limit=${limit}`, {
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

const loadAllPreachers = (dispatch: Function) => {
    return async () => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.get(`/preachers/all`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
    
            dispatch({ type: 'load_all', payload: response.data })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
        


    }
}

const loadPreacherInfo = (dispatch: Function) => {
    return async (preacherID: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.get(`/preachers/${preacherID}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch({ type: 'load_preacher', payload: response.data })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
        


    }
}

const generateLink = (dispatch: Function) => {
    return async (preacherID: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.post(`/preachers/${preacherID}/generateLink`, {}, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch({ type: 'turn_off_loading' })
            navigate('PreachersList');
            
            showMessage({
                message: `Poprawnie wygenerowano link dla głosiciela `,
                type: 'success',
            })
        } catch(err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
    }
}

const addPreacher = (dispatch: Function) => {
    return async (name: string, roles: string[], privileges: string[]) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.post('/preachers', {name, roles, privileges}, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            navigate('PreachersList');
            dispatch({ type: 'turn_off_loading' })
            showMessage({
                message: `${preacherTranslate.t("successfulAddedMessage")}: ${name} `,
                type: 'success',
            })
        } catch(err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
    }
}

const editPreacher = (dispatch: Function) => {
    return async (name: string, preacherID: string, roles: string[], privileges: string[]) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.put(`/preachers/${preacherID}`, {preacher: {name, roles, privileges}}, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            navigate('PreachersList');
            dispatch({ type: 'turn_off_loading' })
            showMessage({
                message: `${preacherTranslate.t("successfulEditedMessage")}: ${name} `,
                type: 'success',
            })
        } catch(err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
    }
}

const searchPreacher = (dispatch: Function) => {
    return async (param: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.get(`/preachers/search?search=${param}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch({ type: 'search', payload: response.data })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
        


    }
}

const deletePreacher = (dispatch: Function) => {
    return async (preacherID: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.delete(`/preachers/${preacherID}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });

            navigate('PreachersList');
            dispatch({ type: 'turn_off_loading' })
            showMessage({
                message: preacherTranslate.t("successfulDeletedMessage"),
                type: 'success',
            })
        } catch(err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
    }
}

export const { Context, Provider } = createDataContext<IPreacherState, IPreacherContext>(preacherReducer, {generateLink, loadPreachers, loadAllPreachers, searchPreacher, loadPreacherInfo, addPreacher, editPreacher, deletePreacher}, { isLoading: false, allPreachers: []})