import { mainTranslations } from "./localization";
import useLocaLization from "./src/hooks/useLocalization";

const mainTranslate = useLocaLization(mainTranslations)

export const months = [
    mainTranslate.t("january"), 
    mainTranslate.t("february"), 
    mainTranslate.t("march"), 
    mainTranslate.t("april"), 
    mainTranslate.t("may"), 
    mainTranslate.t("june"), 
    mainTranslate.t("july"), 
    mainTranslate.t("august"), 
    mainTranslate.t("september"), 
    mainTranslate.t("october"), 
    mainTranslate.t("november"), 
    mainTranslate.t("december")
];

export const weekdays = [
    mainTranslate.t("monday"), 
    mainTranslate.t("tuesday"), 
    mainTranslate.t("wednesday"), 
    mainTranslate.t("thursday"), 
    mainTranslate.t("friday"), 
    mainTranslate.t("saturday"), 
    mainTranslate.t("sunday")
]