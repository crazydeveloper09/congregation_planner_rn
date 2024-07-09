import { enCongregationTranslations, plCongregationTranslations } from "./src/screens/Congregation/translations";

export const translations = {
    pl: {
        greeting: "Witaj w Congregation Planner",
        adminLoginButton: "Logowanie administratora",
        preacherLoginButton: "Logowanie głosiciela",
        ...plCongregationTranslations
    },
    en: {
        greeting: "Welcome to Congregation Planner",
        adminLoginButton: "Admin login",
        preacherLoginButton: "Preacher login",
        ...enCongregationTranslations
    }
}