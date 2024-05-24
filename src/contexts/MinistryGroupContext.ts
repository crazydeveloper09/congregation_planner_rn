import AsyncStorage from "@react-native-async-storage/async-storage"
import createDataContext from "./createDataContext"
import { IMinistryGroup, PaginateResult } from "./interfaces"
import territories from "../api/territories"
import { AxiosError } from "axios"
import { navigate } from "../RootNavigation"
import { showMessage } from "react-native-flash-message"

interface IMinistryGroupState {
    isLoading?: boolean,
    ministryGroups?: IMinistryGroup[]
    errMessage?: string
}

interface IMinistryGroupContext {
    state: IMinistryGroupState
    loadMinistryGroups: Function,
    addMinistryGroup: Function,
    editMinistryGroup: Function,
    deleteMinistryGroup: Function,
}

const ministryGroupReducer = (state: IMinistryGroupState, action: { type: string, payload: any }) => {
    switch(action.type) {
        case 'turn_on_loading':
            return { ...state, isLoading: true, errMessage: '' }
        case 'load_data':
            return { ...state, isLoading: false, ministryGroups: action.payload, errMessage: '' }
        case 'add_error': 
            return { ...state, errMessage: action.payload }
        default:
            return state;
    }
}

const loadMinistryGroups = (dispatch: Function) => {
    return async () => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const congregationID = await AsyncStorage.getItem('congregationID');
            const response = await territories.get(`/congregations/${congregationID}/ministryGroups`, {
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

const addMinistryGroup = (dispatch: Function) => {
    return async (congregationID: string, name: string, preachers: string[], overseer: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.post(`/congregations/${congregationID}/ministryGroups`, {name, preachers, overseer}, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch({ type: 'turn_off_loading' })
            navigate('CongInfo')
            showMessage({
                message: `Poprawnie dodano grupę służby: ${name}`,
                type: 'success',
            })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
        


    }
}

const editMinistryGroup = (dispatch: Function) => {
    return async (congregationID: string, ministryGroupID: string, name: string, preachers: string[], overseer: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.put(`/congregations/${congregationID}/ministryGroups/${ministryGroupID}`, {ministryGroup: {name, preachers, overseer}}, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            navigate('CongInfo')
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

const deleteMinistryGroup = (dispatch: Function) => {
    return async (congregationID: string, ministryGroupID: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await AsyncStorage.getItem('token');
            const response = await territories.delete(`/congregations/${congregationID}/ministryGroups/${ministryGroupID}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch({ type: 'turn_off_loading' })
            navigate('CongInfo')
            showMessage({
                message: `Poprawnie usunięto grupę służby`,
                type: 'success',
            })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
        


    }
}

export const { Context, Provider } = createDataContext<IMinistryGroupState, IMinistryGroupContext>(ministryGroupReducer, {loadMinistryGroups, addMinistryGroup, editMinistryGroup, deleteMinistryGroup}, { isLoading: false, ministryGroups: []})