import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import arCommon from './locales/ar/common.json';

// Read persisted language; fallback to 'en'
const storedLang = (typeof window !== 'undefined' && localStorage.getItem('lang')) || 'en';
const lang = storedLang === 'ar' ? 'ar' : 'en';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { common: enCommon },
            ar: { common: arCommon },
        },
        lng: lang,
        fallbackLng: 'en',
        defaultNS: 'common',
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    });

export default i18n;
