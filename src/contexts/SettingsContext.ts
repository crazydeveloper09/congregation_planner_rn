import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";

interface ISettingsState {
    mainColor: string,
}

interface ISettingsContext {
    state: ISettingsState;
    changeMainColor: Function;
    loadColor: Function;
}

const settingsReducer = (state: ISettingsState, action: { type: string, payload: any }) => {
    switch(action.type){
        case 'change_color': {
            return { mainColor: action.payload  }
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
        const mainColor = await AsyncStorage.getItem('mainColor')
        if(mainColor){
            dispatch({ type: 'change_color', payload: mainColor })
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

export const { Context, Provider } = createDataContext<ISettingsState, ISettingsContext>(settingsReducer, { changeMainColor, loadColor }, { mainColor: '#1f8aad'})
