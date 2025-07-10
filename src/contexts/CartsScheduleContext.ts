import createDataContext from "./createDataContext"
import { ICartDay, ICartHour, PaginateResult } from "./interfaces"
import territories from "../api/territories"
import { AxiosError } from "axios"
import { navigate } from "../RootNavigation"
import { showMessage } from "react-native-flash-message";
import useLocaLization from "../hooks/useLocalization"
import { cartScheduleTranslations } from "../screens/CartsSchedule/translations"
import { storage } from "../helpers/storage"

const cartScheduleTranslate = useLocaLization(cartScheduleTranslations)

interface ICartDayState {
    isLoading?: boolean,
    cartDay?: ICartDay,
    cartHours?: ICartHour[]
    errMessage?: string
}

interface ICartDayContext {
    state: ICartDayState
    loadCartDayInfo: Function,
    loadPreacherHours: Function,
    addCartDay: Function,
    editCartDay: Function,
    deleteCartDay: Function,
    assignPreachersToHours: Function,
}

const CartDayReducer = (state: ICartDayState, action: { type: string, payload: any }) => {
    switch(action.type) {
        case 'turn_on_loading':
            return { ...state, isLoading: true, errMessage: '' }
        case 'turn_off_loading':
            return { ...state, isLoading: false, errMessage: '' }
        case 'load_data':
            return { ...state, isLoading: false, cartDay: action.payload, errMessage: '' }
        case 'load_hours':
            return { ...state, isLoading: false, cartHours: action.payload, errMessage: '' }
        case 'add_error': 
            return { ...state, isLoading: false, errMessage: action.payload }
        default:
            return state;
    }
}

const loadCartDayInfo = (dispatch: Function) => {
    return async (date: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await storage.getItem('token', "session");
            const congregationID = await storage.getItem("congregationID");
            const response = await territories.get(`/cartsSchedule?date=${date}`, {
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

const loadPreacherHours = (dispatch: Function) => {
    return async () => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await storage.getItem('token', "session");
            const response = await territories.get(`/cartsSchedule/cartDay/cartHours/preacher`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
        
            dispatch({ type: 'load_hours', payload: response.data })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
        


    }
}

const addCartDay = (dispatch: Function) => {
    return async (place: string, startHour: string, date: Date, finalHour: string, startMinute: string, finishMinute: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await storage.getItem('token', "session");
            const congregationID = await storage.getItem("congregationID");
            const response = await territories.post(`/cartsSchedule/cartDay?congregationID=${congregationID}`, {place, startHour: +startHour, date, finalHour: +finalHour, startMinute, finishMinute}, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch({ type: 'turn_off_loading' })
            navigate('Carts Schedule Index', { date: date.toLocaleDateString('pl-PL')})
            showMessage({
                message: `${cartScheduleTranslate.t("successfullyAddedMessage")}: ${date.toLocaleDateString('pl-PL')}`,
                type: 'success',
            })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
        


    }
}

const editCartDay = (dispatch: Function) => {
    return async (cartDayID: string, place: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await storage.getItem('token', "session");
            const response = await territories.put(`/cartsSchedule/cartDay/${cartDayID}`, {cartDay: {place}}, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            navigate('Carts Schedule Index')
            dispatch({ type: 'turn_off_loading' })
            showMessage({
                message: cartScheduleTranslate.t("successfullyEditedMessage"),
                type: 'success',
            })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
        


    }
}

const deleteCartDay = (dispatch: Function) => {
    return async (cartDayID: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await storage.getItem('token', "session");
            const response = await territories.delete(`/cartsSchedule/cartDay/${cartDayID}`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch({ type: 'turn_off_loading' })
            navigate('Carts Schedule Index')
            showMessage({
                message: cartScheduleTranslate.t("successfullyDeletedMessage"),
                type: 'success',
            })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
        


    }
}

const assignPreachersToHours = (dispatch: Function) => {
    return async (cartHourID: string, preacher1: string, preacher2: string, otherPreacher1: string, otherPreacher2: string, day: string) => {
        try {
            dispatch({ type: 'turn_on_loading' })
            const token = await storage.getItem('token', "session");
            const congregationID = await storage.getItem("congregationID");
            const response = await territories.post(`/cartsSchedule/cartDay/cartHour/${cartHourID}/assignPreachers?congregationID=${congregationID}`, { preacher1, preacher2, otherPreacher1, otherPreacher2 }, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });
            dispatch({ type: 'turn_off_loading' })
            navigate('Carts Schedule Index', { date: day })
            showMessage({
                message: cartScheduleTranslate.t("successfullyAssignedMessage"),
                type: 'success',
            })
        } catch (err) {
            dispatch({ type: 'add_error', payload: (err as AxiosError).message })
        }
    }
}

export const { Context, Provider } = createDataContext<ICartDayState, ICartDayContext>(CartDayReducer, {loadCartDayInfo, loadPreacherHours, addCartDay, editCartDay, deleteCartDay, assignPreachersToHours}, { isLoading: false})