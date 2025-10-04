import AsyncStorage from "@react-native-async-storage/async-storage"
import createDataContext from "./createDataContext"
import { ITerritory, PaginateResult } from "./interfaces"
import territories from "../api/territories"
import { AxiosError } from "axios"
import { navigate } from "../RootNavigation"
import { showMessage } from "react-native-flash-message"
import { storage } from "../helpers/storage"

interface ITerritoryState {
    isLoading?: boolean,
    territories?: PaginateResult<ITerritory>
    errMessage?: string,
    territory?: ITerritory;
    allTerritories?: ITerritory[],
    currentIndex?: number
}

interface ITerritoryContext {
    state: ITerritoryState
    loadTerritories: Function,
    loadTerritoryHistory: Function,
    loadAvailableTerritories: Function,
    searchTerritory: Function,
    turnOnLoading: Function,
    turnOffLoading: Function,
    clearError: Function;
}

const TerritoryReducer = (state: ITerritoryState, action: { type: string, payload: any }) => {
    switch(action.type) {
        case 'turn_on_loading':
            return { ...state, isLoading: true, errMessage: '' }
        case 'turn_off_loading':
            return { ...state, isLoading: false, errMessage: '' }
        case 'load_data':
            return { ...state, isLoading: false, territories: action.payload, errMessage: '' }
        case 'load_territory':
            return { 
                ...state, 
                isLoading: false, 
                territory: action.payload.territory, 
                currentIndex: action.payload.currentIndex, 
                allTerritories: action.payload.territories,
                errMessage: ''
            }
        case 'add_error': 
            return { ...state, isLoading: false, errMessage: action.payload }
        case 'clear_error':
            return { ...state, errMessage: '' }
        default:
            return state;
    }
}

const clearError = (dispatch: Function) => {
    return () => {
        dispatch({ type: "clear_error" })
    }
}

const loadTerritories = (dispatch: Function) => {
    return async (page: number, limit: number) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await storage.getItem('token', "session");
            const response = await territories.get(`/territories?page=${page}&limit=${limit}`, {
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

const loadTerritoryHistory = (dispatch: Function) => {
    return async (territoryID: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await storage.getItem('token', "session");
            const response = await territories.get(`/territories/${territoryID}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch({ type: 'load_territory', payload: response.data })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
    
    }
}

const loadAvailableTerritories = (dispatch: Function) => {
    return async (page: number, limit: number) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await storage.getItem('token', "session");
            const response = await territories.get(`/territories/available?page=${page}&limit=${limit}`, {
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

const searchTerritory = (dispatch: Function) => {
    return async (param: string, paramValue: string, page: number, limit: number, type: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await storage.getItem('token', "session");
            const response = await territories.get(`/territories/${type}/search?${param}=${paramValue}&page=${page}&limit=${limit}`, {
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

const turnOnLoading = (dispatch: Function) => {
    return () => {
        dispatch({ type: 'turn_on_loading' })
    }
}

const turnOffLoading = (dispatch: Function) => {
    return () => {
        dispatch({ type: 'turn_off_loading' })
    }
}

export const { Context, Provider } = createDataContext<ITerritoryState, ITerritoryContext>(TerritoryReducer, {loadTerritories, loadTerritoryHistory, searchTerritory, loadAvailableTerritories, turnOffLoading, turnOnLoading, clearError}, { isLoading: false})