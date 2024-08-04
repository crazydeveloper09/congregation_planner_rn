import * as Localization from 'expo-localization'
import { useState } from 'react';
import { Dict, I18n } from 'i18n-js';

const useLocaLization = (translations: Dict) => {
    const i18n = new I18n(translations)
    i18n.locale = Localization.getLocales()[0].languageCode!;
    i18n.enableFallback = true;
    i18n.defaultLocale = "en";

    return i18n;
}

export default useLocaLization;