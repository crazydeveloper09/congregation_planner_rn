import * as Localization from 'expo-localization'
import { useState } from 'react';
import { Dict, I18n } from 'i18n-js';

const useLocaLization = (translations: Dict) => {
    const i18n = new I18n(translations)
    let [locale, setLocale] = useState(Localization.getLocales);
    i18n.locale = locale[0].languageCode!;
    i18n.enableFallback = true;
    i18n.defaultLocale = "en";

    return i18n;
}

export default useLocaLization;