import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";

interface ISettingsState {
    mainColor: string,
    fontIncrement: number,
}

interface ISettingsContext {
    state: ISettingsState;
    changeMainColor: Function;
    loadColor: Function;
    incrementFont: Function;
}

const settingsReducer = (state: ISettingsState, action: { type: string, payload: any }) => {
    switch(action.type){
        case 'change_color': {
            return { ...state, mainColor: action.payload  }
        }
        case 'change_increment': {
            return { ...state, fontIncrement: action.payload  }
        }
        case 'load_color': {
            return state
        }
        default: 
            return state;
    }
}

const loadColor = (dispatch: Function) => {
    return async () => {
        const mainColor = await AsyncStorage.getItem('mainColor');
        const fontIncrement = await AsyncStorage.getItem('fontIncrement')
        if(mainColor){
            dispatch({ type: 'change_color', payload: mainColor })
            if(fontIncrement){
                dispatch({ type: 'change_increment', payload: Number(fontIncrement) })
            } else {
                dispatch({ type: 'load_color' })
            }
        } else {
            dispatch({ type: 'load_color' })
        }
    }
}

const changeMainColor = (dispatch: Function) => {
    return async (newColor: string) => {
        await AsyncStorage.setItem('mainColor', newColor);

        dispatch({ type: 'change_color', payload: newColor })
    }
}

const incrementFont = (dispatch: Function) => {
    return async (newIncrement: number) => {
        await AsyncStorage.setItem('fontIncrement', newIncrement.toString())

        dispatch({ type: 'change_increment', payload: newIncrement })
    }
}

export const { Context, Provider } = createDataContext<ISettingsState, ISettingsContext>(settingsReducer, { changeMainColor, loadColor, incrementFont }, { mainColor: '#1f8aad', fontIncrement: 0})
