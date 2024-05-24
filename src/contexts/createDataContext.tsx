import React, { useReducer } from 'react';



export default <T, U>(
        reducer: {(state: T, action: {type: string, payload: any}): T},
        actions: {[index: string]: Function},
        initialState: T
    ) => {

    const Context = React.createContext<U>({initialState} as unknown as U);

    const Provider = ({ children }: { children: any}) => {

        const [state, dispatch] = useReducer(reducer, initialState);

        const boundActions: {[index: string]: Function} = {};

        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return (
            <Context.Provider value={{ state, ...boundActions, dispatch } as unknown as U }>
                {children}
            </Context.Provider>
        );
    }

    return { Context, Provider };

}