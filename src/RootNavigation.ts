import { CommonActions, createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: object) {
    if(navigationRef.isReady()){
        navigationRef.dispatch(CommonActions.navigate(name, params));
    }
}

export const mainNavigationRef = createNavigationContainerRef();

export function mainNavNavigate(name: string, params?: object) {
    if(mainNavigationRef.isReady()){
        mainNavigationRef.dispatch(CommonActions.navigate(name, params));
    }
}